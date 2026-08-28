import { ItemView, WorkspaceLeaf } from "obsidian";
import type { ManifestStore } from "../manifest/ManifestStore";
import type { VaultScanner } from "../scanner/VaultScanner";

export const IMAGE_MANAGER_VIEW = "vaultpix-image-manager";

export class ImageManagerView extends ItemView {
  constructor(leaf: WorkspaceLeaf, private readonly manifest: ManifestStore, private readonly scanner: VaultScanner) { super(leaf); }
  override getViewType(): string { return IMAGE_MANAGER_VIEW; }
  override getDisplayText(): string { return "VaultPix 图片库"; }
  override getIcon(): string { return "images"; }
  override async onOpen(): Promise<void> {
    const root = this.contentEl;
    root.empty(); root.addClass("iam-manager");
    const header = root.createDiv({ cls: "iam-manager-header" });
    header.createEl("h2", { text: "VaultPix 图片库" });
    header.createEl("p", { text: "正在读取资产清单和 Vault 索引…", cls: "iam-muted" });
    const [items, report] = await Promise.all([this.manifest.all(), this.scanner.scan(false)]);
    header.lastElementChild?.remove();
    header.createEl("p", { text: `已管理 ${items.length} 项 · 本地 ${report.imageFiles} 张 · 远程引用 ${report.remoteReferences} 个 · 未引用 ${report.unreferenced.length} 张`, cls: "iam-muted" });
    const toolbar = root.createDiv({ cls: "iam-toolbar" });
    const search = toolbar.createEl("input", { type: "search", placeholder: "搜索文件名、笔记或 URL" });
    search.setAttr("aria-label", "搜索 VaultPix 图片资产");
    const table = root.createEl("table", { cls: "iam-table" });
    const head = table.createTHead().insertRow();
    for (const label of ["来源", "格式", "大小", "上传服务", "远程地址", "引用"]) head.createEl("th", { text: label });
    const body = table.createTBody();
    const render = (query = "") => {
      body.empty();
      const normalized = query.toLowerCase();
      for (const item of items.filter(candidate => JSON.stringify(candidate).toLowerCase().includes(normalized))) {
        const row = body.insertRow();
        row.createEl("td", { text: item.sourcePath });
        row.createEl("td", { text: item.processedFormat.toUpperCase() });
        row.createEl("td", { text: `${Math.round(item.originalSize / 1024)} → ${Math.round(item.processedSize / 1024)} KB` });
        row.createEl("td", { text: item.provider.toUpperCase() });
        const urlCell = row.createEl("td"); urlCell.createEl("a", { text: item.url, href: item.url });
        row.createEl("td", { text: String(item.references.length) });
      }
    };
    search.addEventListener("input", () => render(search.value)); render();
    if (!items.length) root.createDiv({ cls: "iam-empty", text: "资产清单还是空的。完成一次上传或迁移后，图片会出现在这里。" });
  }
}
