import type { App } from "obsidian";
import type { MigrationRecord } from "../types";
import { joinVaultPath } from "../utils/path";

export class MigrationStore {
  private writeChain: Promise<void> = Promise.resolve();
  constructor(private readonly app: App, private readonly pluginId: string) {}

  async save(record: MigrationRecord): Promise<void> {
    const content = JSON.stringify(record, null, 2);
    const pointer = JSON.stringify({ migrationId: record.migrationId });
    this.writeChain = this.writeChain.then(async () => {
      await this.ensureDirectory();
      await this.app.vault.adapter.write(this.recordPath(record.migrationId), content);
      await this.app.vault.adapter.write(joinVaultPath(this.directory(), "latest.json"), pointer);
    });
    await this.writeChain;
  }

  async loadLatest(): Promise<MigrationRecord | undefined> {
    const pointer = joinVaultPath(this.directory(), "latest.json");
    if (!(await this.app.vault.adapter.exists(pointer))) return undefined;
    try {
      const { migrationId } = JSON.parse(await this.app.vault.adapter.read(pointer)) as { migrationId?: string };
      if (!migrationId || !(await this.app.vault.adapter.exists(this.recordPath(migrationId)))) return undefined;
      return JSON.parse(await this.app.vault.adapter.read(this.recordPath(migrationId))) as MigrationRecord;
    } catch { return undefined; }
  }

  private directory(): string { return joinVaultPath(this.app.vault.configDir, "plugins", this.pluginId, "data", "migrations"); }
  private recordPath(id: string): string { return joinVaultPath(this.directory(), `${id}.json`); }
  private async ensureDirectory(): Promise<void> {
    let current = "";
    for (const segment of this.directory().split("/").filter(Boolean)) {
      current = joinVaultPath(current, segment);
      if (!(await this.app.vault.adapter.exists(current))) await this.app.vault.adapter.mkdir(current);
    }
  }
}
