import { Modal, Notice, Setting, type App } from "obsidian";
import type { DryRunItem, MigrationProgress } from "../migration/MigrationManager";
import type { MigrationRecord, ScanReport } from "../types";

function bytes(value: number): string {
  if (value < 1024) return `${value} B`;
  if (value < 1024 ** 2) return `${(value / 1024).toFixed(1)} KB`;
  if (value < 1024 ** 3) return `${(value / 1024 ** 2).toFixed(1)} MB`;
  return `${(value / 1024 ** 3).toFixed(2)} GB`;
}

export class ScanReportModal extends Modal {
  constructor(app: App, private readonly report: ScanReport) { super(app); }
  override onOpen(): void {
    this.titleEl.setText("图片资产扫描报告");
    const grid = this.contentEl.createDiv({ cls: "iam-stats" });
    const stats: Array<[string, string]> = [
      ["Markdown 文件", String(this.report.markdownFiles)], ["图片文件", String(this.report.imageFiles)],
      ["本地引用", String(this.report.localReferences)], ["远程引用", String(this.report.remoteReferences)],
      ["缺失引用", String(this.report.missingReferences)], ["未引用图片", String(this.report.unreferenced.length)],
      ["重复组", String(this.report.duplicates.length)], ["本地图片总大小", bytes(this.report.localBytes)]
    ];
    for (const [label, value] of stats) { const card = grid.createDiv({ cls: "iam-stat" }); card.createSpan({ text: value, cls: "iam-stat-value" }); card.createSpan({ text: label, cls: "iam-stat-label" }); }
    new Setting(this.contentEl).addButton(button => button.setButtonText("关闭").setCta().onClick(() => this.close()));
  }
  override onClose(): void { this.contentEl.empty(); }
}

export class DryRunModal extends Modal {
  private resolve?: (confirmed: boolean) => void;
  constructor(app: App, private readonly items: DryRunItem[]) { super(app); }
  wait(): Promise<boolean> { this.open(); return new Promise(resolve => this.resolve = resolve); }
  override onOpen(): void {
    this.titleEl.setText("迁移试运行结果");
    const success = this.items.filter(item => !item.error);
    const before = success.reduce((sum, item) => sum + item.originalSize, 0);
    const after = success.reduce((sum, item) => sum + item.processedSize, 0);
    this.contentEl.createEl("p", { text: `计划处理 ${success.length} 张图片；预计 ${bytes(before)} → ${bytes(after)}。试运行未上传、未修改笔记、未移动文件。` });
    const list = this.contentEl.createDiv({ cls: "iam-preview-list" });
    for (const item of this.items.slice(0, 100)) {
      const row = list.createDiv({ cls: "iam-preview-row" });
      row.createDiv({ text: item.sourcePath, cls: "iam-preview-path" });
      row.createDiv({ text: item.error ? `跳过：${item.error}` : `${bytes(item.originalSize)} → ${bytes(item.processedSize)} · ${item.referenceCount} 个引用 · ${item.remotePath ?? ""}`, cls: item.error ? "iam-error" : "iam-muted" });
    }
    if (this.items.length > 100) this.contentEl.createEl("p", { text: `仅显示前 100 项，其余 ${this.items.length - 100} 项将在任务中处理。`, cls: "iam-muted" });
    new Setting(this.contentEl)
      .addButton(button => button.setButtonText("取消").onClick(() => this.finish(false)))
      .addButton(button => button.setButtonText("开始迁移").setCta().onClick(() => this.finish(true)));
  }
  override onClose(): void { this.resolve?.(false); this.resolve = undefined; this.contentEl.empty(); }
  private finish(value: boolean): void { const resolve = this.resolve; this.resolve = undefined; this.close(); resolve?.(value); }
}

export class ProgressModal extends Modal {
  private textEl?: HTMLElement;
  private pauseButton?: HTMLButtonElement;
  private paused = false;
  constructor(app: App, private readonly onPause: () => void, private readonly onResume: () => void, private readonly onCancel: () => void) { super(app); }
  override onOpen(): void {
    this.titleEl.setText("图片迁移进行中");
    this.textEl = this.contentEl.createEl("p", { text: "正在准备…" });
    new Setting(this.contentEl)
      .addButton(button => { this.pauseButton = button.buttonEl; button.setButtonText("暂停").onClick(() => { this.paused = !this.paused; if (this.paused) { this.onPause(); button.setButtonText("继续"); } else { this.onResume(); button.setButtonText("暂停"); } }); })
      .addButton(button => button.setButtonText("取消").setWarning().onClick(() => { this.onCancel(); new Notice("已请求取消，正在执行的图片会安全结束。"); }));
  }
  update(progress: MigrationProgress): void { this.textEl?.setText(`已完成 ${progress.completed}/${progress.total} · 成功 ${progress.success} · 失败 ${progress.failed}${progress.current ? `\n${progress.current}` : ""}`); }
  finish(record: MigrationRecord): void { this.textEl?.setText(`任务${record.status === "completed" ? "完成" : "结束"}：成功 ${record.items.filter(item => item.status === "completed").length}，失败 ${record.items.filter(item => item.status === "failed").length}。`); this.pauseButton?.setAttribute("disabled", "true"); }
}

export class RecoveryModal extends Modal {
  private resolve?: (action: "resume" | "rollback" | "ignore") => void;
  constructor(app: App, private readonly record: MigrationRecord) { super(app); }
  wait(): Promise<"resume" | "rollback" | "ignore"> { this.open(); return new Promise(resolve => this.resolve = resolve); }
  override onOpen(): void {
    this.titleEl.setText("检测到未完成的图片迁移");
    this.contentEl.createEl("p", { text: `任务 ${this.record.migrationId} 未正常结束。可以恢复笔记后重新继续，或仅查看并暂不处理。` });
    new Setting(this.contentEl)
      .addButton(button => button.setButtonText("暂不处理").onClick(() => this.finish("ignore")))
      .addButton(button => button.setButtonText("回滚").setWarning().onClick(() => this.finish("rollback")))
      .addButton(button => button.setButtonText("恢复并继续").setCta().onClick(() => this.finish("resume")));
  }
  override onClose(): void { this.resolve?.("ignore"); this.resolve = undefined; this.contentEl.empty(); }
  private finish(action: "resume" | "rollback" | "ignore"): void { const resolve = this.resolve; this.resolve = undefined; this.close(); resolve?.(action); }
}
