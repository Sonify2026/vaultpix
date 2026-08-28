import { DeleteObjectCommand, HeadBucketCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { ImageUploader, S3Settings, TestResult, UploadMetadata, UploadResult } from "../types";
import { encodeUrlPath, normalizeVaultPath } from "../utils/path";
import { errorMessage } from "../utils/errors";
import { PROVIDER_LABELS } from "./provider";

export class S3Uploader implements ImageUploader {
  readonly id: string;
  readonly name: string;
  private readonly client: S3Client;

  constructor(private readonly settings: S3Settings) {
    this.id = settings.provider;
    this.name = PROVIDER_LABELS[settings.provider];
    this.client = new S3Client({
      region: settings.region || (settings.provider === "r2" ? "auto" : settings.provider === "oss" ? "cn-hangzhou" : "us-east-1"),
      endpoint: settings.endpoint || undefined,
      forcePathStyle: settings.forcePathStyle,
      credentials: { accessKeyId: settings.accessKeyId, secretAccessKey: settings.secretAccessKey }
    });
  }

  async testConnection(): Promise<TestResult> {
    try {
      this.validateSettings();
      await this.client.send(new HeadBucketCommand({ Bucket: this.settings.bucket }));
      return { success: true, message: `已成功连接 ${this.name}，Bucket 可访问。` };
    } catch (error) {
      return { success: false, message: `连接失败：${errorMessage(error)}` };
    }
  }

  async upload(data: ArrayBuffer, remotePath: string, metadata?: UploadMetadata): Promise<UploadResult> {
    const key = normalizeVaultPath(remotePath);
    try {
      this.validateSettings();
      const response = await this.client.send(new PutObjectCommand({
        Bucket: this.settings.bucket,
        Key: key,
        Body: new Uint8Array(data),
        ContentType: metadata?.contentType,
        Metadata: metadata?.hash ? { "processed-sha256": metadata.hash } : undefined
      }));
      return { success: true, provider: this.id, remotePath: key, url: this.publicUrl(key), etag: response.ETag };
    } catch (error) {
      return { success: false, provider: this.id, remotePath: key, url: "", error: errorMessage(error) };
    }
  }

  async exists(remotePath: string): Promise<boolean> {
    this.validateSettings();
    try {
      await this.client.send(new HeadObjectCommand({ Bucket: this.settings.bucket, Key: normalizeVaultPath(remotePath) }));
      return true;
    } catch (error) {
      const status = (error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode;
      if (status === 404) return false;
      throw error;
    }
  }

  async delete(remotePath: string): Promise<void> {
    await this.client.send(new DeleteObjectCommand({ Bucket: this.settings.bucket, Key: normalizeVaultPath(remotePath) }));
  }

  private validateSettings(): void {
    const missing: string[] = [];
    if (!this.settings.endpoint && (this.settings.provider === "r2" || this.settings.provider === "oss")) missing.push("Endpoint");
    if (!this.settings.bucket) missing.push("Bucket");
    if (!this.settings.accessKeyId) missing.push("Access Key ID");
    if (!this.settings.secretAccessKey) missing.push("Secret Access Key");
    if (!this.settings.publicBaseUrl) missing.push("公共访问域名");
    if (missing.length) throw new Error(`请先填写：${missing.join("、")}`);
  }

  private publicUrl(key: string): string {
    return `${this.settings.publicBaseUrl.replace(/\/+$/, "")}/${encodeUrlPath(key)}`;
  }
}
