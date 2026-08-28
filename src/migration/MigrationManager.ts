import { normalizePath, Notice, TFile, type App } from "obsidian";
import type { ImageAsset, ImageInput, MigrationItem, MigrationRecord, PipelineResult, PluginSettings, ScanReport } from "../types";
import type { Replacement } from "../markdown/MarkdownReplacer";
import { MarkdownReplacer } from "../markdown/MarkdownReplacer";
import { ImagePipeline } from "../core/pipeline/ImagePipeline";
import { MigrationStore } from "../manifest/MigrationStore";
import { ManifestStore } from "../manifest/ManifestStore";
import { TaskQueue } from "../queue/TaskQueue";
import { errorMessage } from "../utils/errors";
import { joinVaultPath } from "../utils/path";
import { mimeFromName } from "../utils/mime";

export interface MigrationProgress { completed: number; total: number; success: number; failed: number; current?: string; }
export interface DryRunItem { sourcePath: string; originalSize: number; processedSize: number; remotePath?: string; referenceCount: number; error?: string; }

interface CompletedAsset { asset: ImageAsset; result: PipelineResult; item: MigrationItem; }

export class MigrationManager {
  private activeQueue?: TaskQueue;
  private readonly replacer = new MarkdownReplacer();

  constructor(
    private readonly app: App,
    private readonly getSettings: () => PluginSettings,
    private readonly pipeline: ImagePipeline,
    private readonly migrations: MigrationStore,
    private readonly manifest: ManifestStore
  ) {}

  pause(): void { this.activeQueue?.pause(); }
  resume(): void { this.activeQueue?.resume(); }
  cancel(): void { this.activeQueue?.cancel(); }

  async dryRun(report: ScanReport, notePath?: string, onProgress?: (progress: MigrationProgress) => void): Promise<DryRunItem[]> {
    const assets = this.selectAssets(report, notePath);
    const output: DryRunItem[] = [];
    let completed = 0, success = 0, failed = 0;
    for (const asset of assets) {
      const note = this.noteFor(asset);
      try {
        const input = await this.readInput(asset.localPath);
        const result = await this.pipeline.execute({ input, note, sourceFile: this.file(asset.localPath), index: completed + 1, upload: false });
        output.push({ sourcePath: asset.localPath, originalSize: input.data.byteLength, processedSize: result.processed.processedSize, remotePath: result.remotePath, referenceCount: asset.references.length });
        success++;
      } catch (error) {
        output.push({ sourcePath: asset.localPath, originalSize: asset.size, processedSize: asset.size, referenceCount: asset.references.length, error: errorMessage(error) });
        failed++;
      }
      onProgress?.({ completed: ++completed, total: assets.length, success, failed, current: asset.localPath });
    }
    return output;
  }

  async migrate(report: ScanReport, notePath?: string, onProgress?: (progress: MigrationProgress) => void): Promise<MigrationRecord> {
    const assets = this.selectAssets(report, notePath);
    const record: MigrationRecord = {
      migrationId: `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
      createdAt: Date.now(), updatedAt: Date.now(), status: "running", items: [], noteBackups: []
    };
    for (const asset of assets) record.items.push({ sourcePath: asset.localPath, notesModified: [], status: "pending" });
    await this.migrations.save(record);

    const completedAssets: CompletedAsset[] = [];
    let success = 0, failed = 0;
    this.activeQueue = new TaskQueue(this.getSettings().batch.concurrency);
    const tasks = assets.map((asset, index) => async () => {
      const item = record.items[index];
      if (!item) throw new Error("迁移记录损坏。");
      item.status = "processing"; record.updatedAt = Date.now(); await this.migrations.save(record);
      try {
        const note = this.noteFor(asset);
        const frontmatter = note ? this.app.metadataCache.getFileCache(note)?.frontmatter : undefined;
        if (frontmatter?.["image-upload"] === false) {
          item.status = "skipped"; item.error = "该笔记通过 image-upload: false 禁用了上传。"; return;
        }
        const input = await this.readInput(asset.localPath);
        const result = await this.pipeline.execute({ input, note, sourceFile: this.file(asset.localPath), index: index + 1, upload: true });
        item.remoteUrl = result.uploadResult?.url; item.reused = result.reused; item.status = "uploaded";
        await this.pipeline.commitManifest(result, asset.localPath, asset.references.map(reference => reference.notePath));
        completedAssets.push({ asset, result, item });
        success++;
      } catch (error) {
        item.status = "failed"; item.error = errorMessage(error); failed++;
      } finally {
        record.updatedAt = Date.now(); await this.migrations.save(record);
      }
    });
    await this.activeQueue.run(tasks, progress => onProgress?.({ completed: progress.completed, total: progress.total, success, failed }));
    const cancelled = this.activeQueue.isCancelled;
    this.activeQueue = undefined;

    let transactionCommitted = false;
    try {
      await this.commitMarkdown(completedAssets, record);
      for (const completed of completedAssets) {
        const notes = [...new Set(completed.asset.references.map(reference => reference.notePath))];
        await this.pipeline.commitManifest(completed.result, completed.asset.localPath, notes);
        completed.item.status = "completed";
      }
      record.status = cancelled ? "cancelled" : failed > 0 ? "failed" : "completed";
      if (!notePath && this.getSettings().cleanup.strategy === "backup") {
        for (const completed of completedAssets) {
          const original = report.assets.get(completed.asset.localPath);
          if (original && original.references.length === completed.asset.references.length) {
            completed.item.backupPath = joinVaultPath(this.getSettings().cleanup.backupFolder, record.migrationId, completed.asset.localPath);
          }
        }
      }
      record.updatedAt = Date.now();
      await this.migrations.save(record);
      transactionCommitted = true;
    } catch (error) {
      await this.restoreNotes(record);
      record.status = "failed";
      for (const completed of completedAssets) {
        completed.item.status = "failed";
        completed.item.error = `Markdown 事务已回滚：${errorMessage(error)}`;
      }
    }
    if (transactionCommitted && !notePath) {
      try {
        const safeToClean = completedAssets.filter(completed => report.assets.get(completed.asset.localPath)?.references.length === completed.asset.references.length);
        const cleanupFailed = await this.cleanupFiles(safeToClean, record);
        if (cleanupFailed) record.status = "failed";
      } catch (error) {
        record.status = "failed";
        for (const completed of completedAssets) completed.item.error ??= `远程链接已经生效，但清理日志写入失败：${errorMessage(error)}`;
      }
    }
    record.updatedAt = Date.now();
    await this.migrations.save(record);
    return record;
  }

  async rollbackLatest(): Promise<MigrationRecord | undefined> {
    const record = await this.migrations.loadLatest();
    if (!record || record.status === "rolled-back") return record;
    await this.restoreNotes(record);
    for (const item of record.items) {
      if (!item.backupPath) continue;
      const backup = this.app.vault.getAbstractFileByPath(item.backupPath);
      if (!(backup instanceof TFile)) continue;
      if (this.app.vault.getAbstractFileByPath(item.sourcePath)) continue;
      await this.ensureFolder(item.sourcePath.split("/").slice(0, -1).join("/"));
      await this.app.fileManager.renameFile(backup, item.sourcePath);
    }
    await this.manifest.removeByMigrationUrls(new Set(record.items.flatMap(item => item.remoteUrl && !item.reused ? [item.remoteUrl] : [])));
    record.status = "rolled-back"; record.updatedAt = Date.now(); await this.migrations.save(record);
    return record;
  }

  async prepareResume(record: MigrationRecord): Promise<void> {
    await this.restoreNotes(record);
    for (const item of record.items) {
      if (!item.backupPath) continue;
      const backup = this.app.vault.getAbstractFileByPath(item.backupPath);
      if (!(backup instanceof TFile) || this.app.vault.getAbstractFileByPath(item.sourcePath)) continue;
      await this.ensureFolder(item.sourcePath.split("/").slice(0, -1).join("/"));
      await this.app.fileManager.renameFile(backup, item.sourcePath);
    }
    record.status = "cancelled";
    record.updatedAt = Date.now();
    await this.migrations.save(record);
  }

  private async commitMarkdown(completedAssets: CompletedAsset[], record: MigrationRecord): Promise<void> {
    const perNote = new Map<string, Replacement[]>();
    const itemsByNote = new Map<string, MigrationItem[]>();
    for (const completed of completedAssets) {
      const url = completed.result.uploadResult?.url;
      if (!url) continue;
      for (const reference of completed.asset.references) {
        const replacement = this.pipeline.markdownFor(url, reference.alt, reference.displayWidth);
        perNote.set(reference.notePath, [...(perNote.get(reference.notePath) ?? []), { start: reference.start, end: reference.end, expected: reference.rawLink, replacement }]);
        itemsByNote.set(reference.notePath, [...(itemsByNote.get(reference.notePath) ?? []), completed.item]);
      }
    }

    for (const [notePath, replacements] of perNote) {
      const note = this.file(notePath);
      const before = await this.app.vault.read(note);
      record.noteBackups.push({ notePath, content: before });
      await this.migrations.save(record);
      const after = this.replacer.apply(before, replacements);
      await this.app.vault.modify(note, after);
      const verified = await this.app.vault.read(note);
      if (verified !== after) throw new Error(`写入后校验失败：${notePath}`);
      for (const item of itemsByNote.get(notePath) ?? []) {
        item.notesModified = [...new Set([...item.notesModified, notePath])]; item.status = "replaced";
      }
      await this.migrations.save(record);
    }
  }

  private async cleanupFiles(completedAssets: CompletedAsset[], record: MigrationRecord): Promise<boolean> {
    const strategy = this.getSettings().cleanup.strategy;
    if (strategy === "keep") return false;
    let failed = false;
    for (const completed of completedAssets) {
      const file = this.app.vault.getAbstractFileByPath(completed.asset.localPath);
      if (!(file instanceof TFile)) continue;
      try {
        if (strategy === "trash") await this.app.vault.trash(file, true);
        else {
          const backupPath = completed.item.backupPath ?? joinVaultPath(this.getSettings().cleanup.backupFolder, record.migrationId, completed.asset.localPath);
          completed.item.backupPath = backupPath;
          await this.ensureFolder(backupPath.split("/").slice(0, -1).join("/"));
          await this.app.fileManager.renameFile(file, backupPath);
        }
      } catch (error) {
        failed = true;
        completed.item.error = `远程链接已更新，但本地文件清理失败；原文件仍保留：${errorMessage(error)}`;
      }
      await this.migrations.save(record);
    }
    return failed;
  }

  private async restoreNotes(record: MigrationRecord): Promise<void> {
    for (const backup of record.noteBackups) {
      const note = this.app.vault.getAbstractFileByPath(backup.notePath);
      if (note instanceof TFile) await this.app.vault.modify(note, backup.content);
    }
  }

  private selectAssets(report: ScanReport, notePath?: string): ImageAsset[] {
    return [...report.assets.values()].map(asset => ({
      ...asset,
      references: asset.references.filter(reference => {
        if (notePath && reference.notePath !== notePath) return false;
        const note = this.app.vault.getAbstractFileByPath(reference.notePath);
        return !(note instanceof TFile) || this.app.metadataCache.getFileCache(note)?.frontmatter?.["image-upload"] !== false;
      })
    }))
      .filter(asset => asset.references.length > 0);
  }

  private noteFor(asset: ImageAsset): TFile | undefined {
    const path = asset.references[0]?.notePath;
    const file = path ? this.app.vault.getAbstractFileByPath(path) : undefined;
    return file instanceof TFile ? file : undefined;
  }

  private file(path: string): TFile {
    const file = this.app.vault.getAbstractFileByPath(path);
    if (!(file instanceof TFile)) throw new Error(`找不到文件：${path}`);
    return file;
  }

  private async readInput(path: string): Promise<ImageInput> {
    const file = this.file(path);
    return { name: file.name, mimeType: mimeFromName(file.name), data: await this.app.vault.readBinary(file) };
  }

  private async ensureFolder(path: string): Promise<void> {
    let current = "";
    for (const segment of normalizePath(path).split("/").filter(Boolean)) {
      current = joinVaultPath(current, segment);
      if (!this.app.vault.getAbstractFileByPath(current)) await this.app.vault.createFolder(current);
    }
  }
}
