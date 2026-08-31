import type { App, TFile } from "obsidian";
import type { AssetManifestItem, PipelineRequest, PipelineResult, PluginSettings, TemplateContext, UploadResult } from "../../types";
import { BrowserImageProcessor } from "../image/BrowserImageProcessor";
import { TemplateEngine } from "../../naming/TemplateEngine";
import { S3Uploader } from "../../uploaders/S3Uploader";
import { UploadVerifier } from "../../uploaders/UploadVerifier";
import { ManifestStore } from "../../manifest/ManifestStore";
import { joinVaultPath } from "../../utils/path";
import { sha256 } from "../../utils/hash";
import { ImageAssetError, ImageErrorCode } from "../../utils/errors";
import { withRetry } from "../../queue/retry";

export class ImagePipeline {
  private readonly processor = new BrowserImageProcessor();
  private readonly templates = new TemplateEngine();
  private readonly inflightUploads = new Map<string, Promise<{ remotePath: string; uploadResult: UploadResult }>>();

  constructor(
    private readonly app: App,
    private readonly getSettings: () => PluginSettings,
    private readonly manifest: ManifestStore
  ) {}

  async execute(request: PipelineRequest): Promise<PipelineResult> {
    const settings = this.getSettings();
    const frontmatter = request.note ? this.app.metadataCache.getFileCache(request.note)?.frontmatter : undefined;
    const imageSettings = { ...settings.image };
    if (typeof frontmatter?.["image-format"] === "string" && ["webp", "jpeg", "png", "avif", "original"].includes(frontmatter["image-format"])) {
      imageSettings.outputFormat = frontmatter["image-format"] as typeof imageSettings.outputFormat;
    }
    if (typeof frontmatter?.["image-quality"] === "number") {
      const quality = Math.max(1, Math.min(100, frontmatter["image-quality"]));
      imageSettings.webpQuality = quality; imageSettings.jpegQuality = quality; imageSettings.avifQuality = quality;
    }
    const processed = await this.processor.process(request.input, imageSettings);
    const existing = settings.advanced.manifestEnabled ? await this.manifest.findByProcessedHash(processed.hash) : undefined;
    const context = this.templateContext(request.note, request.input.name, request.index ?? 1, processed.hash, frontmatter);
    const filenameBase = this.templates.render(settings.naming.filenameTemplate, context, false, settings.naming.unicodeFilenames);
    const filename = `${filenameBase}.${processed.format}`;

    const customFolder = typeof frontmatter?.["image-folder"] === "string" ? frontmatter["image-folder"] : "";
    const renderedFolder = customFolder || this.templates.render(settings.naming.remotePathTemplate, context, true, settings.naming.unicodeFilenames);
    let remotePath = joinVaultPath(settings.uploader.pathPrefix, renderedFolder, filename);
    if (!request.upload) return { input: request.input, processed, filename, remotePath, reused: false };
    if (existing?.url) {
      return {
        input: request.input, processed, filename, reused: true,
        remotePath: existing.remotePath,
        uploadResult: { success: true, provider: existing.provider, remotePath: existing.remotePath, url: existing.url }
      };
    }

    const inflight = this.inflightUploads.get(processed.hash);
    if (inflight) {
      const shared = await inflight;
      return { input: request.input, processed, filename, remotePath: shared.remotePath, uploadResult: shared.uploadResult, reused: true };
    }
    const operation = this.upload(processed.data, processed.mimeType, processed.hash, remotePath, settings);
    this.inflightUploads.set(processed.hash, operation);
    try {
      const uploaded = await operation;
      return { input: request.input, processed, filename, ...uploaded, reused: false };
    } finally {
      this.inflightUploads.delete(processed.hash);
    }
  }

  async commitManifest(result: PipelineResult, sourcePath: string, notePaths: string[]): Promise<void> {
    if (!result.uploadResult || !this.getSettings().advanced.manifestEnabled) return;
    const sourceHash = await sha256(result.input.data);
    const now = Date.now();
    const item: AssetManifestItem = {
      id: result.processed.hash,
      sourcePath,
      sourceHash,
      processedHash: result.processed.hash,
      processedFormat: result.processed.format,
      originalSize: result.processed.originalSize,
      processedSize: result.processed.processedSize,
      width: result.processed.width,
      height: result.processed.height,
      provider: result.uploadResult.provider,
      remotePath: result.uploadResult.remotePath,
      url: result.uploadResult.url,
      createdAt: now,
      updatedAt: now,
      references: notePaths
    };
    await this.manifest.upsert(item);
  }

  markdownFor(url: string, alt = "", displayWidth?: number): string {
    const settings = this.getSettings().markdown;
    if (displayWidth && settings.wikiSizeStrategy === "html") {
      const altAttribute = settings.preserveAlt && alt ? ` alt="${this.escapeHtml(alt)}"` : "";
      return `<img src="${this.escapeHtml(url)}" width="${Math.round(displayWidth)}"${altAttribute}>`;
    }
    return `![${settings.preserveAlt ? alt.replace(/([\\\]])/g, "\\$1") : ""}](${url})`;
  }

  private templateContext(note: TFile | undefined, inputName: string, index: number, hash: string, frontmatter?: Record<string, unknown>): TemplateContext {
    const notePath = note?.path ?? "";
    return {
      noteName: note?.basename ?? this.baseName(inputName).replace(/\.[^.]+$/, ""),
      fileName: this.baseName(inputName).replace(/\.[^.]+$/, ""),
      folderName: note ? this.baseName(note.parent?.path ?? "") || "根目录" : "剪贴板",
      vaultName: this.app.vault.getName(), notePath, index, hash, now: new Date(), uuid: crypto.randomUUID(), frontmatter
    };
  }

  private async resolveConflict(remotePath: string, hash: string, uploader: S3Uploader, settings: PluginSettings): Promise<string> {
    if (settings.naming.conflictStrategy === "overwrite") return remotePath;
    if (!(await uploader.exists(remotePath))) return remotePath;
    if (settings.naming.conflictStrategy === "skip") throw new ImageAssetError(ImageErrorCode.UPLOAD_FAILED, `远程文件已存在，已按设置跳过：${remotePath}`);
    const dot = remotePath.lastIndexOf(".");
    const stem = dot >= 0 ? remotePath.slice(0, dot) : remotePath;
    const extension = dot >= 0 ? remotePath.slice(dot) : "";
    if (settings.naming.conflictStrategy === "hash") return `${stem}-${hash.slice(0, settings.naming.hashLength)}${extension}`;
    for (let index = 2; index <= 999; index++) {
      const candidate = `${stem}-${String(index).padStart(3, "0")}${extension}`;
      if (!(await uploader.exists(candidate))) return candidate;
    }
    throw new ImageAssetError(ImageErrorCode.UPLOAD_FAILED, `无法为远程路径生成不冲突的文件名：${remotePath}`);
  }

  private async upload(data: ArrayBuffer, mimeType: string, hash: string, desiredPath: string, settings: PluginSettings): Promise<{ remotePath: string; uploadResult: UploadResult }> {
    const uploader = new S3Uploader(settings.uploader);
    const remotePath = await this.resolveConflict(desiredPath, hash, uploader, settings);
    const uploadResult = await withRetry(
      () => uploader.upload(data, remotePath, { contentType: mimeType, hash }).then(result => {
        if (!result.success) throw new ImageAssetError(ImageErrorCode.UPLOAD_FAILED, result.error || "上传服务返回失败。");
        return result;
      }), settings.batch.retries
    );
    if (settings.batch.verifyUpload) await new UploadVerifier(settings.batch.timeoutMs).verify(uploadResult.url);
    return { remotePath, uploadResult };
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  private baseName(path: string): string { return path.replace(/\\/g, "/").split("/").pop() ?? path; }
}
