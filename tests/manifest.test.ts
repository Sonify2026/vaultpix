import { describe, expect, it } from "vitest";
import { ManifestStore } from "../src/manifest/ManifestStore";
import { DEFAULT_SETTINGS } from "../src/settings";
import type { AssetManifestItem } from "../src/types";

describe("ManifestStore upload identity", () => {
  it("does not reuse identical image content from another bucket or endpoint", async () => {
    const files = new Map<string, string>();
    const app = { vault: {
      configDir: ".obsidian",
      adapter: {
        exists: async (path: string) => files.has(path),
        read: async (path: string) => files.get(path) ?? "",
        write: async (path: string, value: string) => { files.set(path, value); },
        mkdir: async (path: string) => { files.set(path, ""); }
      }
    } } as unknown as ConstructorParameters<typeof ManifestStore>[0];
    const store = new ManifestStore(app, "vaultpix");
    const base = { ...DEFAULT_SETTINGS.uploader, bucket: "first", endpoint: "https://first.example", publicBaseUrl: "https://img.first.example" };
    const item: AssetManifestItem = {
      id: "hash", processedHash: "hash", sourcePath: "a.png", sourceHash: "source", processedFormat: "png",
      originalSize: 4, processedSize: 4, provider: "s3", bucket: base.bucket, endpoint: base.endpoint,
      publicBaseUrl: base.publicBaseUrl, remotePath: "a.png", url: "https://img.first.example/a.png",
      createdAt: 1, updatedAt: 1, references: ["note.md"]
    };
    await store.upsert(item);
    expect(await store.findByProcessedHash("hash", { ...base, provider: "s3" })).toEqual(item);
    expect(await store.findByProcessedHash("hash", { ...base, provider: "s3", bucket: "second" })).toBeUndefined();
    expect(await store.findByProcessedHash("hash", { ...base, provider: "s3", endpoint: "https://second.example" })).toBeUndefined();
  });
});
