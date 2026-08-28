import type { App } from "obsidian";
import type { AssetManifestItem } from "../types";
import { joinVaultPath } from "../utils/path";

interface ManifestData { version: 1; items: AssetManifestItem[]; }

export class ManifestStore {
  private data: ManifestData = { version: 1, items: [] };
  private loaded = false;
  private writeChain: Promise<void> = Promise.resolve();

  constructor(private readonly app: App, private readonly pluginId: string) {}

  async load(): Promise<void> {
    if (this.loaded) return;
    const path = this.filePath();
    if (await this.app.vault.adapter.exists(path)) {
      const raw = await this.app.vault.adapter.read(path);
      try {
        const parsed = JSON.parse(raw) as Partial<ManifestData>;
        this.data = { version: 1, items: Array.isArray(parsed.items) ? parsed.items : [] };
      } catch {
        await this.ensureDirectory();
        await this.app.vault.adapter.write(joinVaultPath(this.directory(), `image-manifest.corrupt-${Date.now()}.json`), raw);
        this.data = { version: 1, items: [] };
      }
    }
    this.loaded = true;
  }

  async upsert(item: AssetManifestItem): Promise<void> {
    await this.load();
    const existingIndex = this.data.items.findIndex(candidate => candidate.id === item.id || candidate.processedHash === item.processedHash);
    if (existingIndex >= 0) {
      const previous = this.data.items[existingIndex];
      if (previous) this.data.items[existingIndex] = { ...previous, ...item, sourcePath: previous.sourcePath, createdAt: previous.createdAt, references: [...new Set([...previous.references, ...item.references])] };
    } else this.data.items.push(item);
    await this.save();
  }

  async findByProcessedHash(hash: string): Promise<AssetManifestItem | undefined> { await this.load(); return this.data.items.find(item => item.processedHash === hash); }
  async findBySourcePath(path: string): Promise<AssetManifestItem | undefined> { await this.load(); return this.data.items.find(item => item.sourcePath === path); }
  async all(): Promise<AssetManifestItem[]> { await this.load(); return this.data.items.map(item => ({ ...item, references: [...item.references] })); }
  async removeByMigrationUrls(urls: Set<string>): Promise<void> { await this.load(); this.data.items = this.data.items.filter(item => !urls.has(item.url)); await this.save(); }

  private async save(): Promise<void> {
    this.writeChain = this.writeChain.then(async () => {
      await this.ensureDirectory();
      await this.app.vault.adapter.write(this.filePath(), JSON.stringify(this.data, null, 2));
    });
    await this.writeChain;
  }

  private directory(): string { return joinVaultPath(this.app.vault.configDir, "plugins", this.pluginId, "data"); }
  private filePath(): string { return joinVaultPath(this.directory(), "image-manifest.json"); }
  private async ensureDirectory(): Promise<void> {
    let current = "";
    for (const segment of this.directory().split("/").filter(Boolean)) {
      current = joinVaultPath(current, segment);
      if (!(await this.app.vault.adapter.exists(current))) await this.app.vault.adapter.mkdir(current);
    }
  }
}
