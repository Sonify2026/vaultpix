import { TFile, type App } from "obsidian";
import type { ImageAsset, ScanReport } from "../types";
import { MarkdownImageParser } from "../markdown/MarkdownImageParser";
import { isImageName } from "../utils/mime";
import { sha256 } from "../utils/hash";

export class VaultScanner {
  constructor(private readonly app: App, private readonly parser: MarkdownImageParser) {}

  async scan(calculateDuplicates = true): Promise<ScanReport> {
    const markdownFiles = this.app.vault.getMarkdownFiles();
    const imageFiles = this.app.vault.getFiles().filter(file => isImageName(file.name));
    const assets = new Map<string, ImageAsset>();
    let localReferences = 0, remoteReferences = 0, missingReferences = 0;

    for (const note of markdownFiles) {
      const content = await this.app.vault.cachedRead(note);
      for (const reference of this.parser.parse(content, note.path)) {
        if (reference.remote) { remoteReferences++; continue; }
        const target = this.app.metadataCache.getFirstLinkpathDest(reference.imagePath, note.path);
        if (!(target instanceof TFile) || !isImageName(target.name)) { missingReferences++; continue; }
        localReferences++;
        reference.imagePath = target.path;
        const asset = assets.get(target.path) ?? { localPath: target.path, size: target.stat.size, references: [] };
        asset.references.push(reference);
        assets.set(target.path, asset);
      }
    }

    const duplicatesByHash = new Map<string, string[]>();
    if (calculateDuplicates) {
      const sizeGroups = new Map<number, TFile[]>();
      for (const file of imageFiles) sizeGroups.set(file.stat.size, [...(sizeGroups.get(file.stat.size) ?? []), file]);
      for (const group of sizeGroups.values()) {
        if (group.length < 2) continue;
        for (const file of group) {
          const hash = await sha256(await this.app.vault.readBinary(file));
          duplicatesByHash.set(hash, [...(duplicatesByHash.get(hash) ?? []), file.path]);
          const asset = assets.get(file.path);
          if (asset) asset.hash = hash;
        }
      }
    }

    return {
      markdownFiles: markdownFiles.length,
      imageFiles: imageFiles.length,
      localReferences, remoteReferences, missingReferences,
      unreferenced: imageFiles.filter(file => !assets.has(file.path)).map(file => file.path),
      duplicates: [...duplicatesByHash.values()].filter(paths => paths.length > 1),
      localBytes: imageFiles.reduce((sum, file) => sum + file.stat.size, 0),
      assets
    };
  }
}
