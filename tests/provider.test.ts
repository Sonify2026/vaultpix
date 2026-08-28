import { describe, expect, it } from "vitest";
import { applyProviderDefaults, ossEndpoint, ossPublicBaseUrl } from "../src/uploaders/provider";
import type { S3Settings } from "../src/types";

function settings(): S3Settings {
  return {
    provider: "s3",
    endpoint: "",
    region: "auto",
    bucket: "vaultpix-images",
    accessKeyId: "id",
    secretAccessKey: "secret",
    publicBaseUrl: "",
    pathPrefix: "obsidian",
    forcePathStyle: true
  };
}

describe("OSS provider preset", () => {
  it("builds the S3-compatible endpoint and public object URL", () => {
    expect(ossEndpoint("cn-hangzhou")).toBe("https://s3.oss-cn-hangzhou.aliyuncs.com");
    expect(ossPublicBaseUrl("vaultpix-images", "cn-hangzhou")).toBe("https://vaultpix-images.oss-cn-hangzhou.aliyuncs.com");
  });

  it("selects safe OSS defaults and disables path-style requests", () => {
    const value = settings();
    applyProviderDefaults(value, "oss");
    expect(value).toMatchObject({
      provider: "oss",
      region: "cn-hangzhou",
      endpoint: "https://s3.oss-cn-hangzhou.aliyuncs.com",
      publicBaseUrl: "https://vaultpix-images.oss-cn-hangzhou.aliyuncs.com",
      forcePathStyle: false
    });
  });

  it("does not overwrite an existing custom OSS domain", () => {
    const value = settings();
    value.publicBaseUrl = "https://images.example.com";
    applyProviderDefaults(value, "oss");
    expect(value.publicBaseUrl).toBe("https://images.example.com");
  });
});
