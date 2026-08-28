import type { S3Provider, S3Settings } from "../types";

export const PROVIDER_LABELS: Record<S3Provider, string> = {
  r2: "Cloudflare R2",
  oss: "阿里云 OSS",
  s3: "通用 S3"
};

export function ossEndpoint(region: string): string {
  const normalized = region.trim() || "cn-hangzhou";
  return `https://s3.oss-${normalized}.aliyuncs.com`;
}

export function ossPublicBaseUrl(bucket: string, region: string): string {
  const normalizedBucket = bucket.trim();
  const normalizedRegion = region.trim() || "cn-hangzhou";
  return normalizedBucket ? `https://${normalizedBucket}.oss-${normalizedRegion}.aliyuncs.com` : "";
}

export function isGeneratedOssEndpoint(value: string): boolean {
  return /^https:\/\/s3\.oss-[a-z0-9-]+\.aliyuncs\.com\/?$/i.test(value.trim());
}

export function isGeneratedOssPublicUrl(value: string): boolean {
  return /^https:\/\/[a-z0-9-]+\.oss-[a-z0-9-]+\.aliyuncs\.com\/?$/i.test(value.trim());
}

export function applyProviderDefaults(settings: S3Settings, provider: S3Provider): void {
  settings.provider = provider;
  if (provider === "r2") {
    if (!settings.region.trim() || settings.region === "us-east-1") settings.region = "auto";
    settings.forcePathStyle = false;
    return;
  }
  if (provider === "oss") {
    if (!settings.region.trim() || settings.region === "auto" || settings.region === "us-east-1") settings.region = "cn-hangzhou";
    settings.endpoint = ossEndpoint(settings.region);
    settings.forcePathStyle = false;
    if (!settings.publicBaseUrl.trim()) settings.publicBaseUrl = ossPublicBaseUrl(settings.bucket, settings.region);
    return;
  }
  if (settings.region === "auto") settings.region = "us-east-1";
}
