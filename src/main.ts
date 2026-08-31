import { Editor, MarkdownView, Notice, Plugin, TFile, WorkspaceLeaf, type MarkdownFileInfo } from "obsidian";
import { DEFAULT_SETTINGS, mergeSettings } from "./settings";
import type { ImageAlignment, ImageInput, ImageReference, PipelineResult, PluginSettings, ScanReport, TestResult } from "./types";
import { Logger } from "./utils/logger";
import { isImageName, mimeFromName } from "./utils/mime";
import { MarkdownImageParser } from "./markdown/MarkdownImageParser";
import { MarkdownReplacer } from "./markdown/MarkdownReplacer";
import type { Replacement } from "./markdown/MarkdownReplacer";
import { imageAlignmentReplacement } from "./markdown/ImageAlignment";
import { ManifestStore } from "./manifest/ManifestStore";
import { MigrationStore } from "./manifest/MigrationStore";
import { VaultScanner } from "./scanner/VaultScanner";
import { ImagePipeline } from "./core/pipeline/ImagePipeline";
import { MigrationManager } from "./migration/MigrationManager";
import { S3Uploader } from "./uploaders/S3Uploader";
import { errorMessage } from "./utils/errors";
import { ImageAssetSettingsTab } from "./ui/SettingsTab";
import { DryRunModal, ProgressModal, RecoveryModal, ScanReportModal } from "./ui/ReportModals";
import { IMAGE_MANAGER_VIEW, ImageManagerView } from "./ui/ImageManagerView";

export default class VaultPixPlugin extends Plugin {
  override settings: PluginSettings = DEFAULT_SETTINGS;
  private logger!: Logger;
  private parser!: MarkdownImageParser;
  private manifestStore!: ManifestStore;
  private migrations!: MigrationStore;
  private scanner!: VaultScanner;
  private pipeline!: ImagePipeline;
  private migrationManager!: MigrationManager;

  override async onload(): Promise<void> {
    this.settings = mergeSettings(await this.loadData());
    this.logger = new Logger(this.settings.advanced.logLevel);
    this.parser = new MarkdownImageParser();
    this.manifestStore = new ManifestStore(this.app, this.manifest.id);
    this.migrations = new MigrationStore(this.app, this.manifest.id);
    this.scanner = new VaultScanner(this.app, this.parser);
    this.pipeline = new ImagePipeline(this.app, () => this.settings, this.manifestStore);
    this.migrationManager = new MigrationManager(this.app, () => this.settings, this.pipeline, this.migrations, this.manifestStore);
    await this.manifestStore.load();

    this.registerView(IMAGE_MANAGER_VIEW, leaf => new ImageManagerView(leaf, this.manifestStore, this.scanner));
    this.addSettingTab(new ImageAssetSettingsTab(this.app, this));
    this.addRibbonIcon("images", "打开图片管理器", () => void this.openManager());
    this.registerCommands();
    this.registerInputEvents();
    this.registerContextMenus();
    this.registerMarkdownPostProcessor(element => {
      const alignment = this.settings.markdown.imageAlignment;
      if (alignment === "theme") return;
      for (const image of element.querySelectorAll<HTMLImageElement>("img:not(.emoji)")) {
        if (!image.closest(".iam-image-align-left, .iam-image-align-center, .iam-image-align-right")) image.addClass(`iam-image-default-${alignment}`);
      }
    });
    this.applyImageAlignment();
    this.app.workspace.onLayoutReady(() => void this.checkRecovery());
    this.logger.info("VaultPix 已加载");
  }

  override onunload(): void {
    this.app.workspace.detachLeavesOfType(IMAGE_MANAGER_VIEW);
    this.clearImageAlignmentClasses();
  }

  async saveSettings(): Promise<void> {
    this.logger.setLevel(this.settings.advanced.logLevel);
    await this.saveData(this.settings);
    this.applyImageAlignment();
  }

  applyImageAlignment(): void {
    this.clearImageAlignmentClasses();
    if (this.settings.markdown.imageAlignment !== "theme") document.body.addClass(`iam-default-image-align-${this.settings.markdown.imageAlignment}`);
  }

  async testConnection(): Promise<TestResult> {
    const notice = new Notice("正在测试图床连接…", 0);
    const result = await new S3Uploader(this.settings.uploader).testConnection();
    notice.hide(); new Notice(result.message, result.success ? 5000 : 10000);
    return result;
  }

  private registerCommands(): void {
    this.addCommand({ id: "optimize-current-image", name: "优化当前图片", editorCheckCallback: (checking, editor, view) => this.currentImageCommand(checking, editor, view, false) });
    this.addCommand({ id: "upload-current-image", name: "上传当前图片", editorCheckCallback: (checking, editor, view) => this.currentImageCommand(checking, editor, view, true) });
    this.addCommand({ id: "optimize-upload-current-image", name: "优化并上传当前图片", editorCheckCallback: (checking, editor, view) => this.currentImageCommand(checking, editor, view, true) });
    this.addCommand({ id: "align-current-image-left", name: "当前图片：居左", editorCheckCallback: (checking, editor, view) => this.currentImageAlignmentCommand(checking, editor, view, "left") });
    this.addCommand({ id: "align-current-image-center", name: "当前图片：居中", editorCheckCallback: (checking, editor, view) => this.currentImageAlignmentCommand(checking, editor, view, "center") });
    this.addCommand({ id: "align-current-image-right", name: "当前图片：居右", editorCheckCallback: (checking, editor, view) => this.currentImageAlignmentCommand(checking, editor, view, "right") });
    this.addCommand({ id: "align-current-image-default", name: "当前图片：恢复默认对齐", editorCheckCallback: (checking, editor, view) => this.currentImageAlignmentCommand(checking, editor, view) });
    this.addCommand({ id: "process-current-note", name: "按当前模式处理本笔记全部图片", checkCallback: checking => { const note = this.app.workspace.getActiveFile(); if (!note) return false; if (!checking) void (this.shouldUpload(note) ? this.runMigration(note.path) : this.optimizeLocalReferences(note.path)); return true; } });
    this.addCommand({ id: "scan-vault-images", name: "扫描整个库中的图片", callback: () => void this.scanVault() });
    this.addCommand({ id: "migrate-vault-images", name: "上传并迁移整个库中的图片", callback: () => void this.runMigration() });
    this.addCommand({ id: "open-image-manager", name: "打开图片管理器", callback: () => void this.openManager() });
    this.addCommand({ id: "test-uploader", name: "测试图床连接", callback: () => void this.testConnection() });
    this.addCommand({ id: "undo-last-migration", name: "撤销上一次图片迁移", callback: () => void this.undoMigration() });
  }

  private registerInputEvents(): void {
    this.registerEvent(this.app.workspace.on("editor-paste", (event, editor, view) => {
      if (!(view instanceof MarkdownView)) return;
      const files = Array.from(event.clipboardData?.files ?? []).filter(file => file.type.startsWith("image/") || isImageName(file.name));
      this.maybeHandleInput(event, files, editor, view, "粘贴");
    }));
    this.registerEvent(this.app.workspace.on("editor-drop", (event, editor, view) => {
      if (!(view instanceof MarkdownView)) return;
      const files = Array.from(event.dataTransfer?.files ?? []).filter(file => file.type.startsWith("image/") || isImageName(file.name));
      this.maybeHandleInput(event, files, editor, view, "拖拽");
    }));
  }

  private registerContextMenus(): void {
    this.registerEvent(this.app.workspace.on("file-menu", (menu, file) => {
      if (!(file instanceof TFile) || !isImageName(file.name)) return;
      const upload = this.settings.workMode === "automatic";
      menu.addItem(item => item.setTitle(upload ? "优化并上传图片" : "优化、命名并更新引用").setIcon(upload ? "upload" : "image").onClick(() => void (upload ? this.runFileMigration(file) : this.optimizeLocalReferences(undefined, file.path))));
      menu.addItem(item => item.setTitle("复制 Markdown 图片链接").setIcon("copy").onClick(async () => {
        await navigator.clipboard.writeText(`![[${file.path}]]`); new Notice("已复制图片链接。");
      }));
    }));
  }

  private maybeHandleInput(event: ClipboardEvent | DragEvent, files: File[], editor: Editor, view: MarkdownView, source: string): void {
    if (!files.length || !this.settings.enabled || this.settings.workMode === "manual") return;
    if (source === "粘贴" && !this.settings.autoProcessPaste) return;
    if (source === "拖拽" && !this.settings.autoProcessDrop) return;
    const note = view.file;
    if (!note) return;
    event.preventDefault();
    void this.processIncoming(files, editor, note, source);
  }

  private async processIncoming(files: File[], editor: Editor, note: TFile, source: string): Promise<void> {
    const links: string[] = [];
    const upload = this.shouldUpload(note);
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (!file) continue;
      const fallbackName = file.name || `剪贴板-${Date.now()}-${index + 1}.png`;
      const input: ImageInput = { name: fallbackName, mimeType: file.type || mimeFromName(fallbackName), data: await file.arrayBuffer() };
      try {
        const result = await this.pipeline.execute({ input, note, index: index + 1, upload });
        if (upload && result.uploadResult) {
          links.push(this.pipeline.markdownFor(result.uploadResult.url, fallbackName.replace(/\.[^.]+$/, "")));
          await this.pipeline.commitManifest(result, `${source}:${fallbackName}`, [note.path]);
        } else links.push(await this.saveLocalResult(result, note));
      } catch (error) {
        this.logger.error(`${source}图片处理失败`, errorMessage(error));
        links.push(await this.saveOriginalFallback(input, note));
        new Notice(`图片处理或上传失败\n文件：${fallbackName}\n原因：${errorMessage(error)}\n已保留为本地附件，笔记未插入失效远程地址。`, 12000);
      }
    }
    if (links.length) {
      const markdown = links.join("\n");
      try { editor.replaceSelection(markdown); }
      catch (error) {
        await navigator.clipboard.writeText(markdown);
        new Notice(`图片已经安全保存或上传，但编辑器插入失败：${errorMessage(error)}\n生成的 Markdown 已复制到剪贴板。`, 12000);
      }
    }
  }

  private currentImageCommand(checking: boolean, editor: Editor, view: MarkdownView | MarkdownFileInfo, upload: boolean): boolean {
    const note = view.file;
    if (!note) return false;
    const content = editor.getValue();
    const cursorOffset = editor.posToOffset(editor.getCursor());
    const reference = this.parser.parse(content, note.path).find(candidate => cursorOffset >= candidate.start && cursorOffset <= candidate.end);
    if (!reference || reference.remote) return false;
    const target = this.app.metadataCache.getFirstLinkpathDest(reference.imagePath, note.path);
    if (!(target instanceof TFile) || !isImageName(target.name)) return false;
    if (!checking) void this.processCurrentReference(note, target, reference, upload);
    return true;
  }

  private currentImageAlignmentCommand(
    checking: boolean,
    editor: Editor,
    view: MarkdownView | MarkdownFileInfo,
    alignment?: Exclude<ImageAlignment, "theme">
  ): boolean {
    const note = view.file;
    if (!note) return false;
    const content = editor.getValue();
    const cursorOffset = editor.posToOffset(editor.getCursor());
    const reference = this.parser.parse(content, note.path).find(candidate => cursorOffset >= candidate.start && cursorOffset <= candidate.end);
    if (!reference) return false;
    if (!checking) {
      const replacement = imageAlignmentReplacement(content, reference, alignment);
      editor.replaceRange(replacement.replacement, editor.offsetToPos(replacement.start), editor.offsetToPos(replacement.end));
      const label = alignment === "left" ? "居左" : alignment === "center" ? "居中" : alignment === "right" ? "居右" : "跟随默认设置";
      new Notice(`当前图片已设为${label}。`);
    }
    return true;
  }

  private clearImageAlignmentClasses(): void {
    document.body.removeClass("iam-default-image-align-left", "iam-default-image-align-center", "iam-default-image-align-right");
  }

  private shouldUpload(note: TFile): boolean {
    return this.settings.workMode === "automatic" && this.app.metadataCache.getFileCache(note)?.frontmatter?.["image-upload"] !== false;
  }

  private async processCurrentReference(note: TFile, image: TFile, reference: ImageReference, upload: boolean): Promise<void> {
    const before = await this.app.vault.read(note);
    try {
      const input: ImageInput = { name: image.name, mimeType: mimeFromName(image.name), data: await this.app.vault.readBinary(image) };
      const result = await this.pipeline.execute({ input, note, sourceFile: image, upload });
      const replacement = upload && result.uploadResult ? this.pipeline.markdownFor(result.uploadResult.url, reference.alt, reference.displayWidth) : await this.saveLocalResult(result, note, reference.alt);
      const after = new MarkdownReplacer().apply(before, [{ start: reference.start, end: reference.end, expected: reference.rawLink, replacement }]);
      await this.app.vault.modify(note, after);
      if (await this.app.vault.read(note) !== after) throw new Error("写入后校验失败。");
      await this.pipeline.commitManifest(result, image.path, [note.path]);
      new Notice(upload ? "当前图片已优化、上传并安全替换。" : "当前图片已优化并保存为新附件。");
    } catch (error) {
      if (await this.app.vault.read(note) !== before) await this.app.vault.modify(note, before);
      new Notice(`处理失败：${errorMessage(error)}\n原图片与笔记已保留。`, 10000);
    }
  }

  private async saveLocalResult(result: PipelineResult, note: TFile, alt = ""): Promise<string> {
    const path = await this.app.fileManager.getAvailablePathForAttachment(result.filename, note.path);
    const file = await this.app.vault.createBinary(path, result.processed.data);
    return `!${this.app.fileManager.generateMarkdownLink(file, note.path, undefined, alt || undefined)}`;
  }

  private async saveOriginalFallback(input: ImageInput, note: TFile): Promise<string> {
    const path = await this.app.fileManager.getAvailablePathForAttachment(input.name, note.path);
    const file = await this.app.vault.createBinary(path, input.data);
    return `!${this.app.fileManager.generateMarkdownLink(file, note.path)}`;
  }

  private async optimizeLocalReferences(notePath?: string, imagePath?: string): Promise<void> {
    const notice = new Notice(notePath ? "正在本地处理当前笔记的图片…" : "正在本地处理图片…", 0);
    const createdFiles: TFile[] = [];
    const noteBackups = new Map<string, string>();
    try {
      const report = await this.scanner.scan(false);
      const assets = [...report.assets.values()]
        .filter(asset => !imagePath || asset.localPath === imagePath)
        .map(asset => ({ ...asset, references: asset.references.filter(reference => !notePath || reference.notePath === notePath) }))
        .filter(asset => asset.references.length > 0);
      if (!assets.length) { notice.hide(); new Notice("没有找到需要本地处理的图片引用。"); return; }

      const replacementsByNote = new Map<string, Replacement[]>();
      for (let index = 0; index < assets.length; index++) {
        const asset = assets[index];
        if (!asset) continue;
        const source = this.app.vault.getAbstractFileByPath(asset.localPath);
        const contextNotePath = asset.references[0]?.notePath;
        const contextNote = contextNotePath ? this.app.vault.getAbstractFileByPath(contextNotePath) : undefined;
        if (!(source instanceof TFile) || !(contextNote instanceof TFile)) continue;
        notice.setMessage(`正在优化 ${index + 1}/${assets.length}：${source.name}`);
        const input: ImageInput = { name: source.name, mimeType: mimeFromName(source.name), data: await this.app.vault.readBinary(source) };
        const result = await this.pipeline.execute({ input, note: contextNote, sourceFile: source, index: index + 1, upload: false });
        const outputPath = await this.app.fileManager.getAvailablePathForAttachment(result.filename, contextNote.path);
        const output = await this.app.vault.createBinary(outputPath, result.processed.data);
        createdFiles.push(output);

        for (const reference of asset.references) {
          const note = this.app.vault.getAbstractFileByPath(reference.notePath);
          if (!(note instanceof TFile)) continue;
          const alias = reference.displayWidth ? String(Math.round(reference.displayWidth)) : reference.alt || undefined;
          const replacement = `!${this.app.fileManager.generateMarkdownLink(output, note.path, undefined, alias)}`;
          replacementsByNote.set(reference.notePath, [...(replacementsByNote.get(reference.notePath) ?? []), {
            start: reference.start, end: reference.end, expected: reference.rawLink, replacement
          }]);
        }
      }

      for (const [path, replacements] of replacementsByNote) {
        const note = this.app.vault.getAbstractFileByPath(path);
        if (!(note instanceof TFile)) continue;
        const before = await this.app.vault.read(note);
        noteBackups.set(path, before);
        const after = new MarkdownReplacer().apply(before, replacements);
        await this.app.vault.modify(note, after);
        if (await this.app.vault.read(note) !== after) throw new Error(`写入后校验失败：${path}`);
      }

      notice.hide();
      const referenceCount = [...replacementsByNote.values()].reduce((sum, replacements) => sum + replacements.length, 0);
      new Notice(`本地处理完成：优化并命名 ${createdFiles.length} 张图片，更新 ${referenceCount} 处引用。原图片已保留。`, 8000);
    } catch (error) {
      for (const [path, content] of noteBackups) {
        const note = this.app.vault.getAbstractFileByPath(path);
        if (note instanceof TFile) await this.app.vault.modify(note, content);
      }
      for (const file of createdFiles) {
        if (this.app.vault.getAbstractFileByPath(file.path) instanceof TFile) await this.app.vault.delete(file);
      }
      notice.hide();
      new Notice(`本地处理失败：${errorMessage(error)}\n笔记已恢复，未留下不完整的新图片。`, 12000);
    }
  }

  private async scanVault(): Promise<void> {
    const notice = new Notice("正在扫描图片资产…", 0);
    try { const report = await this.scanner.scan(true); notice.hide(); new ScanReportModal(this.app, report).open(); }
    catch (error) { notice.hide(); new Notice(`扫描失败：${errorMessage(error)}`, 10000); }
  }

  private async runMigration(notePath?: string, existingReport?: ScanReport): Promise<void> {
    const scanning = new Notice(notePath ? "正在分析当前笔记…" : "正在扫描整个库…", 0);
    try {
      const report = existingReport ?? await this.scanner.scan(false);
      scanning.setMessage("正在执行试运行（不会上传或修改文件）…");
      const preview = await this.migrationManager.dryRun(report, notePath);
      scanning.hide();
      if (!preview.length) { new Notice("没有需要迁移的本地图片。"); return; }
      if (!(await new DryRunModal(this.app, preview).wait())) return;
      const progress = new ProgressModal(this.app, () => this.migrationManager.pause(), () => this.migrationManager.resume(), () => this.migrationManager.cancel());
      progress.open();
      const record = await this.migrationManager.migrate(report, notePath, value => progress.update(value));
      progress.finish(record);
      new Notice(`迁移结束：${record.status === "completed" ? "全部成功" : "存在失败项"}。`, 8000);
    } catch (error) { scanning.hide(); new Notice(`迁移未开始或已安全停止：${errorMessage(error)}`, 12000); }
  }

  private async runFileMigration(file: TFile): Promise<void> {
    const report = await this.scanner.scan(false);
    const asset = report.assets.get(file.path);
    if (!asset) { new Notice("没有找到引用该图片的笔记；为安全起见未上传或清理文件。"); return; }
    const scoped: ScanReport = { ...report, assets: new Map([[file.path, asset]]) };
    await this.runMigration(undefined, scoped);
  }

  private async undoMigration(): Promise<void> {
    const record = await this.migrationManager.rollbackLatest();
    if (!record) { new Notice("没有可撤销的迁移记录。"); return; }
    new Notice(record.status === "rolled-back" ? "已恢复笔记和备份目录中的本地图片。远程对象未删除。" : "该迁移已经撤销。", 8000);
  }

  private async openManager(): Promise<void> {
    let leaf: WorkspaceLeaf | null = this.app.workspace.getLeavesOfType(IMAGE_MANAGER_VIEW)[0] ?? null;
    if (!leaf) { leaf = this.app.workspace.getLeaf("tab"); await leaf.setViewState({ type: IMAGE_MANAGER_VIEW, active: true }); }
    this.app.workspace.revealLeaf(leaf);
  }

  private async checkRecovery(): Promise<void> {
    const record = await this.migrations.loadLatest();
    if (!record || (record.status !== "running" && record.status !== "paused")) return;
    const action = await new RecoveryModal(this.app, record).wait();
    if (action === "rollback") await this.undoMigration();
    if (action === "resume") {
      await this.migrationManager.prepareResume(record);
      await this.runMigration();
    }
  }
}
