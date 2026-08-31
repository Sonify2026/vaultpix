import { App, PluginSettingTab, Setting, setIcon, type ButtonComponent, type ToggleComponent } from "obsidian";
import type VaultPixPlugin from "../main";
import type { OutputFormat, ResizeMode, S3Provider, S3Settings } from "../types";
import { applyProviderDefaults, ossEndpoint, ossPublicBaseUrl, PROVIDER_LABELS } from "../uploaders/provider";
import { TemplateEngine } from "../naming/TemplateEngine";
import { joinVaultPath } from "../utils/path";

type Settings = VaultPixPlugin["settings"];

export class ImageAssetSettingsTab extends PluginSettingTab {
  private readonly templates = new TemplateEngine();

  constructor(app: App, private readonly plugin: VaultPixPlugin) { super(app, plugin); }

  override display(): void {
    this.containerEl.empty();
    this.containerEl.addClass("iam-settings");
    this.renderHeader();
    const refreshSetup = this.renderSetupGuide();
    this.renderGeneral(refreshSetup);
    this.renderUploader(refreshSetup);
    this.renderImageProcessing(refreshSetup);
    this.renderNaming();
    this.renderMarkdownAndCleanup();
    this.renderBatchAndAdvanced();
    const footer = this.containerEl.createDiv({ cls: "iam-settings-footer" });
    const icon = footer.createSpan(); setIcon(icon, "check");
    footer.createSpan({ text: "所有更改都会自动保存到当前 Vault。" });
  }

  private renderHeader(): void {
    const header = this.containerEl.createDiv({ cls: "iam-settings-hero" });
    const mark = header.createDiv({ cls: "iam-settings-hero__mark" }); setIcon(mark, "images");
    const copy = header.createDiv({ cls: "iam-settings-hero__copy" });
    copy.createEl("h2", { text: "VaultPix · 云图匣" });
    copy.createEl("p", { text: "只在本地优化与命名，或连接云端自动上传——两种方式都可以独立、安静地使用。" });
  }

  private renderSetupGuide(): () => void {
    const usesUpload = this.usesUpload();
    const manual = this.plugin.settings.workMode === "manual";
    const guide = this.containerEl.createDiv({ cls: "iam-setup-guide" });
    const top = guide.createDiv({ cls: "iam-setup-guide__top" });
    const copy = top.createDiv();
    copy.createEl("h3", { text: "开始前检查" });
    copy.createEl("p", { text: usesUpload ? "云端模式需要完成服务配置；第一次使用约 3 分钟。" : manual ? "按需模式不会接管粘贴或拖拽，只在你运行命令时处理。" : "本地模式无需配置上传服务，也不会显示上传提醒。" });
    const status = top.createSpan({ cls: "iam-status-badge" });
    const steps = guide.createEl("ol", { cls: "iam-setup-steps" });
    const behaviorStep = this.setupStep(steps, "选择工作方式", usesUpload ? "优化、命名后上传到云端" : manual ? "仅在运行命令时处理" : "优化、命名后保存到本地");
    const providerStep = this.setupStep(steps, usesUpload ? "填写上传服务" : "设置图片优化", usesUpload ? "配置 Bucket、密钥和公开域名" : "选择格式、画质和目标尺寸");
    const testStep = this.setupStep(steps, usesUpload ? "测试真实连接" : "设置文件命名", usesUpload ? "确认 Bucket 权限；首次上传再验证公开地址" : "按模板生成清晰、一致的文件名");
    const summary = guide.createDiv({ cls: "iam-workflow-summary" });
    const summaryIcon = summary.createSpan(); setIcon(summaryIcon, "workflow");
    const summaryText = summary.createSpan();

    const update = (): void => {
      const missing = this.missingUploaderFields();
      const tested = this.currentConnectionTest();
      behaviorStep.toggleClass("is-complete", true);
      providerStep.toggleClass("is-complete", !usesUpload || missing.length === 0);
      testStep.toggleClass("is-complete", !usesUpload || tested?.success === true);
      status.removeClass("is-ready", "is-warning", "is-error");
      if (!this.plugin.settings.enabled) { status.addClass("is-warning"); status.setText("插件已停用"); }
      else if (!usesUpload) { status.addClass("is-ready"); status.setText(manual ? "按需处理已就绪" : "本地处理已就绪"); }
      else if (missing.length) { status.addClass("is-warning"); status.setText(`还需填写 ${missing.length} 项`); }
      else if (!tested) { status.addClass("is-warning"); status.setText("等待连接测试"); }
      else if (tested.success) { status.addClass("is-ready"); status.setText("可以开始使用"); }
      else { status.addClass("is-error"); status.setText("连接测试失败"); }
      const mode = this.plugin.settings.workMode === "automatic" ? "云端：优化、命名并上传" : this.plugin.settings.workMode === "semi-automatic" ? "本地：仅优化与命名" : "按需：仅运行命令";
      const resize = this.plugin.settings.image.resizeMode === "long-edge" ? `最长边 ${this.plugin.settings.image.longEdge}px` : this.resizeModeLabel(this.plugin.settings.image.resizeMode);
      summaryText.setText(`当前流程：${mode} · ${this.plugin.settings.image.outputFormat.toUpperCase()} · ${resize}${usesUpload ? ` · ${this.providerLabel()}` : " · Obsidian 本地附件"}`);
    };
    update();
    return update;
  }

  private renderGeneral(refreshSetup: () => void): void {
    const content = this.section("基础行为", "控制插件何时介入，以及图片进入笔记后的默认动作。", "sliders-horizontal", true, this.plugin.settings.enabled ? "已启用" : "已停用");
    new Setting(content).setName("启用图片处理").setDesc("关闭后，粘贴和拖拽会完全交给 Obsidian；图片管理器和手动命令仍可使用。")
      .addToggle(toggle => toggle.setValue(this.plugin.settings.enabled).onChange(value => this.persist(s => s.enabled = value, () => { this.updateSectionMeta(content, value ? "已启用" : "已停用"); refreshSetup(); })));

    let pasteToggle: ToggleComponent | undefined;
    let dropToggle: ToggleComponent | undefined;
    let updateAutomationState = (): void => undefined;
    new Setting(content).setName("图片处理方式").setDesc("推荐本地模式：无需图床，只做图片优化和命名。需要远程链接时再切换到云端模式。")
      .addDropdown(dropdown => dropdown.addOptions({ "semi-automatic": "本地模式：仅优化与命名（推荐）", automatic: "云端模式：优化、命名并上传", manual: "按需模式：仅运行命令" }).setValue(this.plugin.settings.workMode).onChange(async value => {
        await this.persist(s => s.workMode = value as Settings["workMode"]);
        this.display();
      }));
    const pasteSetting = new Setting(content).setName("处理粘贴图片").setDesc("从剪贴板粘贴图片时执行当前工作模式。失败时会自动保留为本地附件。")
      .addToggle(toggle => { pasteToggle = toggle; toggle.setValue(this.plugin.settings.autoProcessPaste).onChange(value => this.persist(s => s.autoProcessPaste = value)); });
    const dropSetting = new Setting(content).setName("处理拖入图片").setDesc("从文件管理器拖入图片时执行当前工作模式。失败时不会删除源文件。")
      .addToggle(toggle => { dropToggle = toggle; toggle.setValue(this.plugin.settings.autoProcessDrop).onChange(value => this.persist(s => s.autoProcessDrop = value)); });
    updateAutomationState = (): void => {
      const manual = this.plugin.settings.workMode === "manual";
      pasteSetting.settingEl.toggleClass("is-disabled", manual);
      dropSetting.settingEl.toggleClass("is-disabled", manual);
      pasteToggle?.setDisabled(manual);
      dropToggle?.setDisabled(manual);
    };
    updateAutomationState();
  }

  private renderUploader(refreshSetup: () => void): void {
    const usesUpload = this.usesUpload();
    const missing = this.missingUploaderFields();
    const tested = this.currentConnectionTest();
    const needsUploadSetup = this.plugin.settings.workMode === "automatic" && (missing.length > 0 || tested?.success !== true);
    const content = this.section("上传服务", usesUpload ? "连接 Cloudflare R2、阿里云 OSS 或其他 S3 兼容对象存储。" : "可选功能。当前模式只在本地优化和命名，不检查凭据，也不会提醒配置。", "cloud-upload", needsUploadSetup, !usesUpload ? "当前未使用" : tested?.success ? "连接正常" : missing.length ? `缺少 ${missing.length} 项` : "待测试");
    const connectionState = content.createDiv({ cls: "iam-connection-state" });
    const connectionIcon = connectionState.createSpan({ cls: "iam-connection-state__icon" });
    const connectionCopy = connectionState.createDiv();
    const connectionTitle = connectionCopy.createEl("strong");
    const connectionDescription = connectionCopy.createEl("span");

    const refreshConnectionState = (): void => {
      const fields = this.missingUploaderFields();
      const result = this.currentConnectionTest();
      connectionState.removeClass("is-ready", "is-warning", "is-error", "is-idle"); connectionIcon.empty();
      if (!usesUpload) {
        connectionState.addClass("is-idle"); setIcon(connectionIcon, "cloud-off");
        connectionTitle.setText("当前不会上传图片"); connectionDescription.setText("当前模式只优化格式、尺寸和文件名。这里可以保持空白，需要云端链接时再配置。");
        this.updateSectionMeta(content, "当前未使用");
      } else if (fields.length) {
        connectionState.addClass("is-warning"); setIcon(connectionIcon, "circle-alert");
        connectionTitle.setText("配置尚未完成"); connectionDescription.setText(`请填写：${fields.join("、")}。`);
        this.updateSectionMeta(content, `缺少 ${fields.length} 项`);
      } else if (!result) {
        connectionState.addClass("is-warning"); setIcon(connectionIcon, "plug-zap");
        connectionTitle.setText("配置已填写，尚未验证"); connectionDescription.setText("点击本分类底部的“测试连接”，不会上传或修改任何笔记。");
        this.updateSectionMeta(content, "待测试");
      } else if (result.success) {
        connectionState.addClass("is-ready"); setIcon(connectionIcon, "badge-check");
        connectionTitle.setText("上传服务可以使用"); connectionDescription.setText(`最近验证：${new Date(result.testedAt).toLocaleString()}。`);
        this.updateSectionMeta(content, "连接正常");
      } else {
        connectionState.addClass("is-error"); setIcon(connectionIcon, "circle-x");
        connectionTitle.setText("上次连接测试失败"); connectionDescription.setText(result.message || "请检查 Endpoint、密钥权限和 Bucket 名称后重试。");
        this.updateSectionMeta(content, "测试失败");
      }
      refreshSetup();
    };

    new Setting(content).setName("服务类型").setDesc("直接选择实际使用的服务；只有未单独列出的兼容服务才选择“通用 S3”。")
      .addDropdown(dropdown => dropdown.addOptions(PROVIDER_LABELS).setValue(this.plugin.settings.uploader.provider).onChange(async value => {
        await this.persistUploader(s => applyProviderDefaults(s, value as S3Provider)); this.display();
      }));
    this.providerHelp(content);
    if (this.plugin.settings.uploader.provider === "oss") {
      this.text(content, "Region（地域 ID）", "从 OSS Bucket 概览复制，例如杭州是 cn-hangzhou、东京是 ap-northeast-1。", this.plugin.settings.uploader.region, "cn-hangzhou", value => this.persistUploader(s => {
        s.region = value.trim(); s.endpoint = ossEndpoint(s.region);
      }, refreshConnectionState));
      this.readonlyText(content, "Endpoint（自动生成）", "VaultPix 会按地域生成 OSS 的 S3 兼容 API 地址，无需手动修改。", ossEndpoint(this.plugin.settings.uploader.region));
    } else {
      this.text(content, "Endpoint", "对象存储 API 地址，不是图片的公开访问域名。", this.plugin.settings.uploader.endpoint, this.plugin.settings.uploader.provider === "r2" ? "https://<账户ID>.r2.cloudflarestorage.com" : "https://s3.example.com", value => this.persistUploader(s => s.endpoint = value, refreshConnectionState));
      this.text(content, "Region", this.plugin.settings.uploader.provider === "r2" ? "R2 固定使用 auto，通常无需修改。" : "对象存储所在区域，例如 ap-northeast-1。", this.plugin.settings.uploader.region, this.plugin.settings.uploader.provider === "r2" ? "auto" : "ap-northeast-1", value => this.persistUploader(s => s.region = value, refreshConnectionState));
    }
    this.text(content, "Bucket", "存储图片的对象存储桶名称，必须与 API 密钥权限匹配。", this.plugin.settings.uploader.bucket, "obsidian-images", value => this.persistUploader(s => {
      s.bucket = value.trim();
    }, refreshConnectionState));
    if (this.plugin.settings.uploader.provider === "oss") {
      new Setting(content).setName("自动填写 OSS 地址").setDesc("根据上面的地域和 Bucket 生成 Endpoint 与默认公共访问域名；使用自定义域名时可在生成后修改。")
        .addButton(button => button.setButtonText("生成并填入").setIcon("wand-sparkles").onClick(async () => {
          await this.persistUploader(s => {
            s.endpoint = ossEndpoint(s.region);
            s.publicBaseUrl = ossPublicBaseUrl(s.bucket, s.region);
            s.forcePathStyle = false;
          });
          this.display();
        }));
    }
    this.secret(content, "Access Key ID", "对象存储 API 密钥的标识，不是 Cloudflare 登录邮箱。", this.plugin.settings.uploader.accessKeyId, value => this.persistUploader(s => s.accessKeyId = value, refreshConnectionState));
    this.secret(content, "Secret Access Key", "仅保存在当前 Vault 的插件配置中；界面不会再次显示明文。", this.plugin.settings.uploader.secretAccessKey, value => this.persistUploader(s => s.secretAccessKey = value, refreshConnectionState));
    this.text(content, "公共访问域名", this.plugin.settings.uploader.provider === "oss" ? "最终写入 Markdown 的图片域名。默认地址已自动生成，也可以换成绑定到 OSS 的自定义域名。" : "最终写入 Markdown 的图片域名，必须允许匿名读取。", this.plugin.settings.uploader.publicBaseUrl, this.plugin.settings.uploader.provider === "oss" ? "填写 Bucket 后自动生成" : "https://img.example.com", value => this.persistUploader(s => s.publicBaseUrl = value, refreshConnectionState));
    this.text(content, "路径前缀", "可选。统一放在所有远程路径前，例如 notes；不要以斜杠开头。", this.plugin.settings.uploader.pathPrefix, "notes", value => this.persistUploader(s => s.pathPrefix = value));
    if (this.plugin.settings.uploader.provider === "s3") {
      new Setting(content).setName("使用 Path Style").setDesc("仅 MinIO 或明确要求路径式 URL 的服务需要开启；AWS S3 通常保持关闭。")
        .addToggle(toggle => toggle.setValue(this.plugin.settings.uploader.forcePathStyle).onChange(value => this.persistUploader(s => s.forcePathStyle = value, refreshConnectionState)));
    }
    const security = content.createDiv({ cls: "iam-security-note" });
    const securityIcon = security.createSpan(); setIcon(securityIcon, "shield-check");
    security.createSpan({ text: "密钥存储在本地 data.json 中，不会写入笔记、Manifest 或日志。请勿公开同步 Vault 的配置目录。" });
    new Setting(content).setName("验证这组配置").setDesc("检查 Bucket 权限。自动上传时还会验证最终公开 URL 是否可访问。")
      .addButton(button => this.connectionButton(button, refreshConnectionState));
    refreshConnectionState();
  }

  private providerHelp(content: HTMLElement): void {
    const help = content.createEl("details", { cls: "iam-inline-help" });
    const summary = help.createEl("summary");
    const icon = summary.createSpan(); setIcon(icon, "circle-help");
    summary.createSpan({ text: this.plugin.settings.uploader.provider === "r2" ? "我在哪里找到 R2 配置？" : this.plugin.settings.uploader.provider === "oss" ? "第一次使用 OSS，应该怎么配置？" : "这些 S3 字段分别是什么？" });
    const body = help.createDiv({ cls: "iam-inline-help__body" });
    if (this.plugin.settings.uploader.provider === "r2") {
      body.createEl("p", { text: "在 Cloudflare 控制台打开 R2：" });
      const list = body.createEl("ol");
      list.createEl("li", { text: "在“管理 R2 API 令牌”中创建具有对象读写权限的令牌，复制 Access Key ID 和 Secret Access Key。" });
      list.createEl("li", { text: "Endpoint 形如 https://<账户ID>.r2.cloudflarestorage.com，Bucket 填 R2 存储桶名称。" });
      list.createEl("li", { text: "在存储桶设置中绑定自定义域名或启用 r2.dev，填入可公开访问的基础域名。" });
      const links = body.createDiv({ cls: "iam-help-links" });
      links.createEl("a", { text: "R2 API 凭据文档", href: "https://developers.cloudflare.com/r2/api/tokens/" });
      links.createEl("a", { text: "R2 公共访问文档", href: "https://developers.cloudflare.com/r2/buckets/public-buckets/" });
    } else if (this.plugin.settings.uploader.provider === "oss") {
      body.createEl("p", { text: "在阿里云控制台完成以下设置后，再回到这里填写：" });
      const list = body.createEl("ol");
      list.createEl("li", { text: "创建一个只存公开笔记图片的 OSS Bucket，记录 Bucket 名称和地域 ID。" });
      list.createEl("li", { text: "将该 Bucket 设为“公共读”，绝对不要选择“公共读写”。" });
      list.createEl("li", { text: "创建专用 RAM 用户并授予 OSS 上传权限，复制 AccessKey ID 和 AccessKey Secret。" });
      list.createEl("li", { text: "在本页填写地域、Bucket 和密钥；Endpoint 与默认公共域名会自动生成。" });
      const links = body.createDiv({ cls: "iam-help-links" });
      links.createEl("a", { text: "VaultPix OSS 完整教程", href: "https://github.com/Sonify2026/vaultpix/blob/main/docs/ALIYUN_OSS.md" });
      links.createEl("a", { text: "阿里云 OSS 控制台", href: "https://oss.console.aliyun.com/" });
    } else {
      body.createEl("p", { text: "Endpoint 是对象存储 API 地址；Region 是区域标识；公共访问域名是最终写入 Markdown 的图片域名。MinIO 通常还需要开启 Path Style。" });
      body.createDiv({ cls: "iam-help-links" }).createEl("a", { text: "AWS S3 URL 格式说明", href: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html" });
    }
  }

  private renderImageProcessing(refreshSetup: () => void): void {
    const content = this.section("图片优化", "决定输出格式、画质与尺寸。推荐默认值适合截图、照片和一般笔记。", "image", false, this.plugin.settings.image.outputFormat.toUpperCase());
    const note = content.createDiv({ cls: "iam-context-note" });
    const noteIcon = note.createSpan(); setIcon(noteIcon, "info");
    note.createSpan({ text: "WebP 兼顾体积、清晰度和透明背景，是最稳妥的默认选择。GIF 与 SVG 默认保持原格式。" });
    const qualityRows = new Map<OutputFormat, Setting>();
    const updateQualityRows = (): void => {
      for (const [format, row] of qualityRows) row.settingEl.toggle(format === this.plugin.settings.image.outputFormat);
      this.updateSectionMeta(content, this.plugin.settings.image.outputFormat.toUpperCase());
      refreshSetup();
    };
    new Setting(content).setName("输出格式").setDesc("保持原格式不会重新编码，也不会清理元数据。AVIF 是否可用取决于 Obsidian/Electron 版本。")
      .addDropdown(dropdown => dropdown.addOptions({ webp: "WebP（推荐）", jpeg: "JPEG（照片）", png: "PNG（无损）", avif: "AVIF（实验性）", original: "保持原格式" }).setValue(this.plugin.settings.image.outputFormat).onChange(async value => {
        await this.persist(s => s.image.outputFormat = value as OutputFormat); updateQualityRows();
      }));
    qualityRows.set("webp", this.slider(content, "WebP 质量", "82 是清晰度与体积的均衡点；提高质量会显著增加文件大小。", this.plugin.settings.image.webpQuality, value => this.persist(s => s.image.webpQuality = value)));
    qualityRows.set("jpeg", this.slider(content, "JPEG 质量", "85 适合照片；JPEG 不支持透明背景。", this.plugin.settings.image.jpegQuality, value => this.persist(s => s.image.jpegQuality = value)));
    qualityRows.set("avif", this.slider(content, "AVIF 质量", "70 通常已足够清晰；编码失败时原图会保留。", this.plugin.settings.image.avifQuality, value => this.persist(s => s.image.avifQuality = value)));

    const resizeRows = new Map<"width" | "height" | "long" | "short", Setting>();
    const updateResizeRows = (): void => {
      const mode = this.plugin.settings.image.resizeMode;
      resizeRows.get("width")?.settingEl.toggle(["width", "fit", "fill", "fixed"].includes(mode));
      resizeRows.get("height")?.settingEl.toggle(["height", "fit", "fill", "fixed"].includes(mode));
      resizeRows.get("long")?.settingEl.toggle(mode === "long-edge");
      resizeRows.get("short")?.settingEl.toggle(mode === "short-edge");
      refreshSetup();
    };
    new Setting(content).setName("尺寸调整方式").setDesc("最长边适合日常使用；Fit 完整保留画面，Fill 会裁剪边缘以填满目标尺寸。")
      .addDropdown(dropdown => dropdown.addOptions({ none: "不调整尺寸", width: "限制宽度", height: "限制高度", "long-edge": "限制最长边（推荐）", "short-edge": "限制最短边", fit: "适应目标范围", fill: "填充并裁剪", fixed: "固定尺寸并裁剪" }).setValue(this.plugin.settings.image.resizeMode).onChange(async value => {
        await this.persist(s => s.image.resizeMode = value as ResizeMode); updateResizeRows();
      }));
    resizeRows.set("long", this.number(content, "最长边", "横图限制宽度、竖图限制高度；2560px 适合高分屏查看。", this.plugin.settings.image.longEdge, "px", 1, 20000, value => this.persist(s => s.image.longEdge = value, refreshSetup)));
    resizeRows.set("short", this.number(content, "最短边", "保证较短的一边达到该尺寸，可能产生较大的图片。", this.plugin.settings.image.shortEdge, "px", 1, 20000, value => this.persist(s => s.image.shortEdge = value, refreshSetup)));
    resizeRows.set("width", this.number(content, "目标宽度", "用于限制宽度、Fit、Fill 和固定尺寸模式。", this.plugin.settings.image.resizeWidth, "px", 1, 20000, value => this.persist(s => s.image.resizeWidth = value)));
    resizeRows.set("height", this.number(content, "目标高度", "用于限制高度、Fit、Fill 和固定尺寸模式。", this.plugin.settings.image.resizeHeight, "px", 1, 20000, value => this.persist(s => s.image.resizeHeight = value)));
    new Setting(content).setName("禁止放大小图").setDesc("图片小于目标尺寸时保持原尺寸，避免插值放大导致模糊。")
      .addToggle(toggle => toggle.setValue(this.plugin.settings.image.preventUpscale).onChange(value => this.persist(s => s.image.preventUpscale = value)));
    new Setting(content).setName("保留 GIF 动画").setDesc("开启后 GIF 不会转码，避免动画丢失。")
      .addToggle(toggle => toggle.setValue(this.plugin.settings.image.preserveGif).onChange(value => this.persist(s => s.image.preserveGif = value)));
    new Setting(content).setName("保留 SVG 矢量图").setDesc("开启后 SVG 不会栅格化，缩放时仍保持清晰。")
      .addToggle(toggle => toggle.setValue(this.plugin.settings.image.preserveSvg).onChange(value => this.persist(s => s.image.preserveSvg = value)));
    updateQualityRows(); updateResizeRows();
  }

  private renderNaming(): void {
    const usesUpload = this.usesUpload();
    const content = this.section("命名与目录", usesUpload ? "定义最终文件名和对象存储中的目录结构；预览与实际处理使用同一套模板引擎。" : "定义优化后保存到 Obsidian 的文件名；本地模式不会使用远程目录。", "folder-tree", false, usesUpload ? "云端模板" : "本地命名");
    const preview = content.createDiv({ cls: "iam-template-preview" });
    preview.createEl("strong", { text: "实时示例" });
    const filenamePreview = preview.createEl("code");
    const pathPreview = preview.createEl("code");
    let updateHashLength = (): void => undefined;
    const updatePreview = (): void => {
      const context = {
        noteName: "项目复盘", fileName: "截图", folderName: "工作", vaultName: this.app.vault.getName(), notePath: "工作/项目复盘.md",
        index: 1, hash: "9f31a2bc410e7d58", now: new Date(2026, 7, 31, 9, 30, 0), uuid: "a1b2c3d4-e5f6-4789-abcd-0123456789ab", frontmatter: { category: "设计" }
      };
      const extension = this.plugin.settings.image.outputFormat === "original" ? "png" : this.plugin.settings.image.outputFormat;
      const filename = `${this.templates.render(this.plugin.settings.naming.filenameTemplate, context, false, this.plugin.settings.naming.unicodeFilenames)}.${extension}`;
      filenamePreview.setText(`文件名  ${filename}`);
      if (usesUpload) {
        const folder = this.templates.render(this.plugin.settings.naming.remotePathTemplate, context, true, this.plugin.settings.naming.unicodeFilenames);
        pathPreview.setText(`远程路径  ${joinVaultPath(this.plugin.settings.uploader.pathPrefix, folder, filename)}`);
      } else pathPreview.setText(`保存结果  Obsidian 附件目录/${filename}`);
    };
    const refreshNamingPreview = (): void => { updatePreview(); updateHashLength(); };
    this.text(content, "文件名模板", "控制最终图片文件名。无需填写扩展名，插件会自动添加。", this.plugin.settings.naming.filenameTemplate, "{noteName}-{index}", value => this.persist(s => s.naming.filenameTemplate = value, refreshNamingPreview));
    if (usesUpload) this.text(content, "远程目录模板", "只用于云端上传。控制 Bucket 内的目录层级；路径前缀会自动放在它前面。", this.plugin.settings.naming.remotePathTemplate, "obsidian/{YYYY}/{MM}/{noteName}", value => this.persist(s => s.naming.remotePathTemplate = value, refreshNamingPreview));
    const help = content.createEl("details", { cls: "iam-inline-help" });
    const summary = help.createEl("summary"); const helpIcon = summary.createSpan(); setIcon(helpIcon, "braces"); summary.createSpan({ text: "查看可用模板变量" });
    const variables = help.createDiv({ cls: "iam-token-list" });
    for (const token of ["{noteName}", "{fileName}", "{folderName}", "{vaultName}", "{notePath}", "{YYYY}", "{MM}", "{DD}", "{HH}", "{mm}", "{ss}", "{index}", "{hash:12}", "{uuid}", "{frontmatter:key}"]) variables.createEl("code", { text: token });
    const hashLength = this.number(content, "Hash 长度", "模板使用 {hash} 或云端 Hash 冲突策略时生效；12 位通常足够。", this.plugin.settings.naming.hashLength, "位", 6, 64, value => this.persist(s => s.naming.hashLength = value, updatePreview));
    updateHashLength = (): void => {
      const templateUsesHash = this.plugin.settings.naming.filenameTemplate.includes("{hash") || (usesUpload && this.plugin.settings.naming.remotePathTemplate.includes("{hash"));
      hashLength.settingEl.toggle(templateUsesHash || (usesUpload && this.plugin.settings.naming.conflictStrategy === "hash"));
    };
    if (usesUpload) new Setting(content).setName("远程文件冲突时").setDesc("推荐 Hash：相同内容复用远程地址，不同内容追加摘要；覆盖可能替换已有对象。")
      .addDropdown(dropdown => dropdown.addOptions({ hash: "按内容 Hash 判断（推荐）", increment: "自动追加编号", skip: "跳过冲突文件", overwrite: "覆盖远程文件" }).setValue(this.plugin.settings.naming.conflictStrategy).onChange(async value => {
        await this.persist(s => s.naming.conflictStrategy = value as Settings["naming"]["conflictStrategy"]); updateHashLength();
      }));
    new Setting(content).setName("允许中文文件名").setDesc("关闭后会移除非 ASCII 字符，适合不支持 Unicode 路径的旧系统。")
      .addToggle(toggle => toggle.setValue(this.plugin.settings.naming.unicodeFilenames).onChange(value => this.persist(s => s.naming.unicodeFilenames = value, updatePreview)));
    updateHashLength(); updatePreview();
  }

  private renderMarkdownAndCleanup(): void {
    const content = this.section("链接与本地备份", "控制远程链接的写法，以及迁移成功后如何处理原始图片。", "file-symlink", false, this.cleanupLabel());
    let updateAlignmentPreview = (): void => undefined;
    new Setting(content).setName("默认图片对齐").setDesc("作用于 Vault 中所有未单独指定对齐方式的图片。默认居中；也可把光标放在图片链接上，通过命令面板单独设为居左、居中或居右。")
      .addDropdown(dropdown => dropdown.addOptions({ center: "居中（推荐）", left: "居左", right: "居右", theme: "跟随当前主题" }).setValue(this.plugin.settings.markdown.imageAlignment).onChange(async value => {
        await this.persist(s => s.markdown.imageAlignment = value as Settings["markdown"]["imageAlignment"]);
        updateAlignmentPreview();
      }));
    const alignmentPreview = content.createDiv({ cls: "iam-alignment-preview" });
    alignmentPreview.createSpan({ cls: "iam-alignment-preview__label", text: "对齐预览" });
    const alignmentCanvas = alignmentPreview.createDiv({ cls: "iam-alignment-preview__canvas" });
    const previewImage = alignmentCanvas.createDiv({ cls: "iam-alignment-preview__image" });
    setIcon(previewImage, "image");
    updateAlignmentPreview = (): void => {
      alignmentCanvas.removeClass("is-left", "is-center", "is-right", "is-theme");
      alignmentCanvas.addClass(`is-${this.plugin.settings.markdown.imageAlignment}`);
    };
    updateAlignmentPreview();
    new Setting(content).setName("保留图片说明文字").setDesc("保留 Markdown 的 alt 文本，例如 ![架构图](...) 中的“架构图”。")
      .addToggle(toggle => toggle.setValue(this.plugin.settings.markdown.preserveAlt).onChange(value => this.persist(s => s.markdown.preserveAlt = value)));
    new Setting(content).setName("Wiki 图片的显示宽度").setDesc("遇到 ![[image.png|600]] 时，转换为 HTML 才能在远程链接中继续保留 600px 宽度。")
      .addDropdown(dropdown => dropdown.addOptions({ html: "转换为 HTML 图片标签并保留宽度", ignore: "输出普通 Markdown，忽略宽度" }).setValue(this.plugin.settings.markdown.wikiSizeStrategy).onChange(value => this.persist(s => s.markdown.wikiSizeStrategy = value as "html" | "ignore")));
    let backupFolder!: Setting;
    let warning!: HTMLElement;
    const updateCleanup = (): void => {
      backupFolder.settingEl.toggle(this.plugin.settings.cleanup.strategy === "backup");
      warning.toggle(this.plugin.settings.cleanup.strategy === "trash");
      this.updateSectionMeta(content, this.cleanupLabel());
    };
    new Setting(content).setName("Vault 迁移成功后").setDesc("推荐移动到插件备份目录。只有全部引用写入并验证成功后才会执行。")
      .addDropdown(dropdown => dropdown.addOptions({ backup: "移动到备份目录（推荐）", keep: "保留原图片", trash: "移动到系统回收站" }).setValue(this.plugin.settings.cleanup.strategy).onChange(async value => {
        await this.persist(s => s.cleanup.strategy = value as Settings["cleanup"]["strategy"]); updateCleanup();
      }));
    backupFolder = this.text(content, "备份目录", "原目录结构会保留在迁移 ID 下，便于完整撤销。", this.plugin.settings.cleanup.backupFolder, ".vaultpix-backup", value => this.persist(s => s.cleanup.backupFolder = value));
    warning = content.createDiv({ cls: "iam-danger-note" });
    const warningIcon = warning.createSpan(); setIcon(warningIcon, "triangle-alert");
    warning.createSpan({ text: "系统回收站中的文件无法由插件自动恢复。只有确认远程备份可靠时才使用此选项。" });
    updateCleanup();
  }

  private renderBatchAndAdvanced(): void {
    const usesUpload = this.usesUpload();
    const content = this.section("任务与诊断", usesUpload ? "批量迁移的速度、网络容错和问题排查选项。" : "本地资产清单和问题排查选项；上传相关参数已隐藏。", "gauge", false, usesUpload ? `并发 ${this.plugin.settings.batch.concurrency}` : "本地诊断");
    if (usesUpload) {
      this.number(content, "并发上传数", "网络不稳定或服务限流时降低到 1–2；不建议超过 5。", this.plugin.settings.batch.concurrency, "个", 1, 10, value => this.persist(s => s.batch.concurrency = value, () => this.updateSectionMeta(content, `并发 ${value}`)));
      this.number(content, "失败重试次数", "网络错误时按 1 秒、3 秒、10 秒的退避间隔重试。认证失败通常不会因重试解决。", this.plugin.settings.batch.retries, "次", 0, 10, value => this.persist(s => s.batch.retries = value));
      this.number(content, "单次网络超时", "HEAD 验证超时后会尝试 Range GET；网络较慢时可适当增加。", Math.round(this.plugin.settings.batch.timeoutMs / 1000), "秒", 1, 120, value => this.persist(s => s.batch.timeoutMs = value * 1000));
      new Setting(content).setName("验证公开图片地址").setDesc("强烈建议开启。只有 URL 返回 200/206 后才替换笔记链接。")
        .addToggle(toggle => toggle.setValue(this.plugin.settings.batch.verifyUpload).onChange(value => this.persist(s => s.batch.verifyUpload = value)));
    }
    new Setting(content).setName("维护资产清单").setDesc("用于增量扫描、Hash 去重、图片管理器和迁移恢复；关闭会失去跨任务去重能力。")
      .addToggle(toggle => toggle.setValue(this.plugin.settings.advanced.manifestEnabled).onChange(value => this.persist(s => s.advanced.manifestEnabled = value)));
    new Setting(content).setName("日志详细程度").setDesc("正常使用保持“信息”；排查问题时临时选择“调试”。日志不会记录密钥。")
      .addDropdown(dropdown => dropdown.addOptions({ error: "仅错误", warn: "错误与警告", info: "信息（推荐）", debug: "调试详情" }).setValue(this.plugin.settings.advanced.logLevel).onChange(value => this.persist(s => s.advanced.logLevel = value as Settings["advanced"]["logLevel"])));
  }

  private section(title: string, description: string, icon: string, open: boolean, meta: string): HTMLElement {
    const details = this.containerEl.createEl("details", { cls: "iam-settings-section" }); details.open = open;
    const summary = details.createEl("summary", { cls: "iam-settings-section__summary" });
    const iconEl = summary.createSpan({ cls: "iam-settings-section__icon" }); setIcon(iconEl, icon);
    const copy = summary.createSpan({ cls: "iam-settings-section__copy" });
    copy.createSpan({ cls: "iam-settings-section__title", text: title });
    copy.createSpan({ cls: "iam-settings-section__description", text: description });
    summary.createSpan({ cls: "iam-settings-section__meta", text: meta });
    const chevron = summary.createSpan({ cls: "iam-settings-section__chevron" }); setIcon(chevron, "chevron-right");
    return details.createDiv({ cls: "iam-settings-section__content" });
  }

  private setupStep(list: HTMLOListElement, title: string, description: string): HTMLLIElement {
    const item = list.createEl("li");
    const state = item.createSpan({ cls: "iam-setup-step__state" }); setIcon(state, "check");
    const copy = item.createSpan({ cls: "iam-setup-step__copy" }); copy.createEl("strong", { text: title }); copy.createEl("span", { text: description });
    return item;
  }

  private updateSectionMeta(content: HTMLElement, text: string): void {
    const meta = content.closest(".iam-settings-section")?.querySelector<HTMLElement>(".iam-settings-section__meta");
    meta?.setText(text);
  }

  private text(container: HTMLElement, name: string, description: string, value: string, placeholder: string, change: (value: string) => void | Promise<void>): Setting {
    return new Setting(container).setName(name).setDesc(description).addText(text => {
      text.setValue(value).setPlaceholder(placeholder).onChange(change); text.inputEl.spellcheck = false;
    });
  }

  private secret(container: HTMLElement, name: string, description: string, value: string, change: (value: string) => void | Promise<void>): Setting {
    return new Setting(container).setName(name).setDesc(description).addText(text => {
      text.inputEl.type = "password"; text.inputEl.autocomplete = "new-password"; text.inputEl.spellcheck = false;
      text.setValue(value).setPlaceholder("••••••••••••").onChange(change);
    });
  }

  private readonlyText(container: HTMLElement, name: string, description: string, value: string): Setting {
    return new Setting(container).setName(name).setDesc(description).addText(text => {
      text.setValue(value).setDisabled(true); text.inputEl.spellcheck = false;
    });
  }

  private number(container: HTMLElement, name: string, description: string, value: number, suffix: string, min: number, max: number, change: (value: number) => void | Promise<void>): Setting {
    const setting = new Setting(container).setName(name).setDesc(description); setting.controlEl.addClass("iam-number-control");
    setting.addText(text => {
      text.inputEl.type = "number"; text.inputEl.min = String(min); text.inputEl.max = String(max);
      text.setValue(String(value)).onChange(raw => { const number = Number(raw); if (Number.isFinite(number)) void change(Math.max(min, Math.min(max, Math.round(number)))); });
    });
    setting.controlEl.createSpan({ cls: "iam-control-suffix", text: suffix });
    return setting;
  }

  private slider(container: HTMLElement, name: string, description: string, value: number, change: (value: number) => void | Promise<void>): Setting {
    const setting = new Setting(container).setName(name).setDesc(description);
    const output = setting.controlEl.createSpan({ cls: "iam-slider-value", text: String(value) });
    setting.addSlider(slider => slider.setLimits(1, 100, 1).setValue(value).setDynamicTooltip().onChange(next => { output.setText(String(next)); void change(next); }));
    return setting;
  }

  private connectionButton(button: ButtonComponent, refresh: () => void): void {
    button.setButtonText("测试连接").setCta().setIcon("plug-zap").onClick(async () => {
      button.setDisabled(true).setButtonText("正在测试…");
      const result = await this.plugin.testConnection();
      this.plugin.settings.uploader.lastConnectionTest = { success: result.success, testedAt: Date.now(), message: result.message, signature: this.connectionSignature() };
      await this.plugin.saveSettings();
      button.setDisabled(false).setButtonText(result.success ? "连接正常" : "重新测试"); refresh();
    });
  }

  private async persist(change: (settings: Settings) => void, after?: () => void): Promise<void> { change(this.plugin.settings); await this.plugin.saveSettings(); after?.(); }
  private async persistUploader(change: (uploader: S3Settings) => void, after?: () => void): Promise<void> {
    change(this.plugin.settings.uploader); this.plugin.settings.uploader.lastConnectionTest = undefined;
    await this.plugin.saveSettings(); after?.();
  }

  private missingUploaderFields(): string[] {
    const uploader = this.plugin.settings.uploader; const missing: string[] = [];
    if ((uploader.provider === "r2" || uploader.provider === "oss") && !uploader.endpoint.trim()) missing.push("Endpoint");
    if (!uploader.bucket.trim()) missing.push("Bucket");
    if (!uploader.accessKeyId.trim()) missing.push("Access Key ID");
    if (!uploader.secretAccessKey.trim()) missing.push("Secret Access Key");
    if (!uploader.publicBaseUrl.trim()) missing.push("公共访问域名");
    return missing;
  }

  private currentConnectionTest(): S3Settings["lastConnectionTest"] | undefined {
    const result = this.plugin.settings.uploader.lastConnectionTest;
    return result?.signature === this.connectionSignature() ? result : undefined;
  }

  private connectionSignature(): string {
    const uploader = this.plugin.settings.uploader;
    return [uploader.provider, uploader.endpoint, uploader.region, uploader.bucket, uploader.accessKeyId, uploader.publicBaseUrl, String(uploader.forcePathStyle)].join("|");
  }

  private providerLabel(): string { return PROVIDER_LABELS[this.plugin.settings.uploader.provider]; }
  private usesUpload(): boolean { return this.plugin.settings.workMode === "automatic"; }
  private cleanupLabel(): string { return this.plugin.settings.cleanup.strategy === "backup" ? "备份后清理" : this.plugin.settings.cleanup.strategy === "keep" ? "保留原图" : "移至回收站"; }
  private resizeModeLabel(mode: ResizeMode): string {
    const labels: Record<ResizeMode, string> = { none: "不调整尺寸", width: "限制宽度", height: "限制高度", "long-edge": "限制最长边", "short-edge": "限制最短边", fit: "适应范围", fill: "填充裁剪", fixed: "固定尺寸" };
    return labels[mode];
  }
}
