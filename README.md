# VaultPix · 云图匣

VaultPix 是一个面向 Obsidian Desktop 的图片工作流插件：粘贴或拖入图片后，它可以自动优化尺寸和格式、按模板命名、上传到对象存储、验证公开地址、替换 Markdown 链接，并以可恢复的方式处理本地原图。

> English: VaultPix optimizes, aligns, uploads, migrates, and safely manages images in an Obsidian vault. The interface and documentation are currently Chinese-first.

## 主要能力

- 粘贴与拖拽图片：本地、云端或按需三种工作模式；默认不上传。
- 图片优化：WebP、JPEG、PNG、AVIF 或保持原格式；支持多种缩放与裁剪策略。
- 云端上传：原生引导 Cloudflare R2、阿里云 OSS，以及 AWS S3、MinIO、B2、Wasabi 等 S3 兼容服务。
- 安全替换：上传完成且公开 URL 验证成功后才修改笔记。
- 批量迁移：先试运行，再批量上传；写入异常时恢复已经修改的笔记。
- Hash 去重：相同内容复用既有远程地址，并隔离并发中的重复上传。
- 本地恢复：默认把原图移动到 `.vaultpix-backup/`，保留原目录结构和迁移记录。
- 图片对齐：全局默认居中，也可按单张图片设置居左、居中、居右或恢复默认。
- 资产清单：查看已管理图片、压缩前后大小、远程地址和引用数量。

## 安装

### 从 GitHub Release 手动安装

1. 下载最新 Release 中的 `vaultpix-<版本>.zip`。
2. 解压到 `<你的 Vault>/.obsidian/plugins/vaultpix/`。
3. 确认目录中直接包含 `main.js`、`manifest.json` 和 `styles.css`。
4. 在 Obsidian → 设置 → 第三方插件中刷新并启用 **VaultPix**。

### 从源码构建

```bash
npm ci
npm run check
npm run build
```

然后把 `main.js`、`manifest.json`、`styles.css` 复制到 Vault 的 `.obsidian/plugins/vaultpix/`。

## 三分钟开始使用

1. 打开 Obsidian → 设置 → VaultPix。
2. 第一次使用保持“本地模式：仅优化与命名”即可，不需要配置上传服务。
3. 如果需要远程图片链接，再切换到云端模式并展开“上传服务”。
4. 云端模式下点击“测试连接”。
5. 在临时笔记中粘贴一张图片，确认生成的本地附件或远程地址符合预期。

服务商教程：

- [阿里云 OSS 零基础配置](docs/ALIYUN_OSS.md)
- [Cloudflare R2 配置](docs/CLOUDFLARE_R2.md)
- [完整设置字段说明](docs/CONFIGURATION.md)

## 工作模式

| 模式 | 粘贴/拖入时的行为 | 适合人群 |
|---|---|---|
| 本地模式（默认） | 优化、按模板命名并保存为本地附件，不检查上传配置 | 不使用图床，只希望整理和压缩图片 |
| 云端模式 | 优化、命名、上传、验证并插入远程链接 | 已配置对象存储，希望无感使用 |
| 按需模式 | 不接管粘贴和拖拽，只响应命令 | 希望完全控制处理时机 |

任何自动处理失败都会保留成本地附件，不会向笔记插入失效的远程地址。

## 常用命令

在命令面板中搜索 VaultPix：

- 优化当前图片
- 上传当前图片
- 优化并上传当前图片
- 按当前模式处理本笔记全部图片
- 扫描整个库中的图片
- 上传并迁移整个库中的图片
- 打开图片管理器
- 测试图床连接
- 撤销上一次图片迁移
- 当前图片：居左 / 居中 / 居右 / 恢复默认对齐

单张图片对齐命令要求光标位于该图片链接中。

## Frontmatter 覆盖

```yaml
---
image-upload: true
image-format: webp
image-quality: 82
image-folder: projects/design
---
```

| 字段 | 含义 |
|---|---|
| `image-upload: false` | 禁止该笔记自动上传；本地优化与命名仍然可用 |
| `image-format` | 覆盖输出格式：`webp`、`jpeg`、`png`、`avif`、`original` |
| `image-quality` | 覆盖有损格式质量，范围 1–100 |
| `image-folder` | 覆盖该笔记图片的远程目录模板 |

## 安全原则

- AccessKey 存储在当前 Vault 的 `.obsidian/plugins/vaultpix/data.json` 中，不会写入笔记、资产清单或日志。
- 不要提交或分享 `data.json`，也不要把包含插件配置的 Vault 公开同步。
- 为 VaultPix 创建权限独立的专用凭证，不要使用云平台主账号密钥。
- 默认开启公开 URL 验证；验证失败时保留本地图片和原笔记。
- 默认备份而非永久删除本地图片；远程对象不会在撤销迁移时自动删除。

更多内容见[安全说明](SECURITY.md)。

## 兼容性与限制

- 最低 Obsidian 版本：1.5.0。
- 当前仅支持 Desktop；图片重编码依赖 Obsidian/Electron 的 Canvas 能力。
- GIF 和 SVG 默认保持原格式；不受当前运行时支持的格式会明确失败并保留原文件。
- 远程 URL 必须可匿名读取，插件当前不会在笔记中生成会过期的签名 URL。
- “测试连接”验证 Bucket 与凭证；第一次真实上传还会验证最终公共访问地址。
- 本地批量处理会创建优化后的新附件并更新引用，为安全起见保留原图片。

## 开发与发布

```bash
npm run dev             # 监听构建
npm run check           # TypeScript + 测试
npm run build           # 生产构建
npm run release:verify  # 发布前完整校验
```

推送 `v*` 标签会通过 GitHub Actions 构建并发布 `main.js`、`manifest.json`、`styles.css` 和安装压缩包。贡献前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

## License

[MIT](LICENSE)
