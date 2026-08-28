import type { TFile } from "obsidian";

export type WorkMode = "automatic" | "semi-automatic" | "manual";
export type OutputFormat = "webp" | "jpeg" | "png" | "avif" | "original";
export type ResizeMode = "none" | "width" | "height" | "long-edge" | "short-edge" | "fit" | "fill" | "fixed";
export type ConflictStrategy = "skip" | "overwrite" | "increment" | "hash";
export type LocalCleanupStrategy = "keep" | "backup" | "trash";
export type LinkType = "wiki" | "markdown" | "html";
export type ImageAlignment = "theme" | "left" | "center" | "right";
export type S3Provider = "r2" | "oss" | "s3";

export interface ImageProcessSettings {
  outputFormat: OutputFormat;
  webpQuality: number;
  jpegQuality: number;
  avifQuality: number;
  resizeMode: ResizeMode;
  resizeWidth: number;
  resizeHeight: number;
  longEdge: number;
  shortEdge: number;
  preventUpscale: boolean;
  preserveGif: boolean;
  preserveSvg: boolean;
}

export interface NamingSettings {
  filenameTemplate: string;
  remotePathTemplate: string;
  conflictStrategy: ConflictStrategy;
  hashLength: number;
  unicodeFilenames: boolean;
}

export interface S3Settings {
  provider: S3Provider;
  endpoint: string;
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicBaseUrl: string;
  pathPrefix: string;
  forcePathStyle: boolean;
  lastConnectionTest?: {
    success: boolean;
    testedAt: number;
    message: string;
    signature: string;
  };
}

export interface MarkdownSettings {
  preserveAlt: boolean;
  wikiSizeStrategy: "html" | "ignore";
  imageAlignment: ImageAlignment;
}

export interface BatchSettings {
  concurrency: number;
  retries: number;
  timeoutMs: number;
  verifyUpload: boolean;
}

export interface PluginSettings {
  enabled: boolean;
  workMode: WorkMode;
  autoProcessPaste: boolean;
  autoProcessDrop: boolean;
  image: ImageProcessSettings;
  naming: NamingSettings;
  uploader: S3Settings;
  markdown: MarkdownSettings;
  cleanup: { strategy: LocalCleanupStrategy; backupFolder: string };
  batch: BatchSettings;
  advanced: { manifestEnabled: boolean; logLevel: "error" | "warn" | "info" | "debug" };
}

export interface ImageInput {
  name: string;
  mimeType: string;
  data: ArrayBuffer;
}

export interface ProcessedImage {
  data: ArrayBuffer;
  format: string;
  mimeType: string;
  width: number;
  height: number;
  originalSize: number;
  processedSize: number;
  hash: string;
}

export interface TemplateContext {
  noteName: string;
  fileName: string;
  folderName: string;
  vaultName: string;
  notePath: string;
  index: number;
  hash: string;
  now?: Date;
  frontmatter?: Record<string, unknown>;
}

export interface UploadMetadata { contentType: string; hash: string; }
export interface UploadResult {
  success: boolean;
  provider: string;
  remotePath: string;
  url: string;
  etag?: string;
  error?: string;
}
export interface TestResult { success: boolean; message: string; }

export interface ImageUploader {
  readonly id: string;
  readonly name: string;
  testConnection(): Promise<TestResult>;
  upload(data: ArrayBuffer, remotePath: string, metadata?: UploadMetadata): Promise<UploadResult>;
  exists?(remotePath: string): Promise<boolean>;
  delete?(remotePath: string): Promise<void>;
}

export interface ImageReference {
  notePath: string;
  imagePath: string;
  rawLink: string;
  linkType: LinkType;
  alt: string;
  displayWidth?: number;
  start: number;
  end: number;
  remote: boolean;
}

export interface ImageAsset {
  localPath: string;
  hash?: string;
  size: number;
  references: ImageReference[];
}

export interface AssetManifestItem {
  id: string;
  sourcePath: string;
  sourceHash: string;
  processedHash: string;
  processedFormat: string;
  originalSize: number;
  processedSize: number;
  width?: number;
  height?: number;
  provider: string;
  remotePath: string;
  url: string;
  createdAt: number;
  updatedAt: number;
  references: string[];
}

export type MigrationItemStatus = "pending" | "processing" | "uploaded" | "replaced" | "completed" | "failed" | "skipped";
export interface MigrationItem {
  sourcePath: string;
  remoteUrl?: string;
  notesModified: string[];
  backupPath?: string;
  reused?: boolean;
  status: MigrationItemStatus;
  error?: string;
}
export interface NoteBackup { notePath: string; content: string; }
export interface MigrationRecord {
  migrationId: string;
  createdAt: number;
  updatedAt: number;
  status: "running" | "paused" | "completed" | "failed" | "cancelled" | "rolled-back";
  items: MigrationItem[];
  noteBackups: NoteBackup[];
}

export interface PipelineRequest {
  input: ImageInput;
  note?: TFile;
  sourceFile?: TFile;
  index?: number;
  upload: boolean;
}

export interface PipelineResult {
  input: ImageInput;
  processed: ProcessedImage;
  filename: string;
  remotePath?: string;
  uploadResult?: UploadResult;
  markdownReplacement?: string;
  reused: boolean;
}

export interface ScanReport {
  markdownFiles: number;
  imageFiles: number;
  localReferences: number;
  remoteReferences: number;
  missingReferences: number;
  unreferenced: string[];
  duplicates: string[][];
  localBytes: number;
  assets: Map<string, ImageAsset>;
}
