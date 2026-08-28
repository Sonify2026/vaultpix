# Cloudflare R2 配置

## 1. 创建 Bucket

在 Cloudflare Dashboard → R2 Object Storage 中创建一个 Bucket，例如 `vaultpix-images`。

## 2. 创建 API 令牌

1. 打开“管理 R2 API 令牌”。
2. 创建只允许目标 Bucket 对象读写的令牌。
3. 保存 Access Key ID、Secret Access Key 和 S3 Endpoint。

不要使用全账号管理权限，也不要公开 Secret Access Key。

## 3. 配置公共访问

在 Bucket 设置中绑定自定义域名，或仅在测试阶段启用 `r2.dev` 公共开发 URL。公共地址必须能够匿名读取图片。

## 4. 填写 VaultPix

```text
服务类型：Cloudflare R2
Endpoint：https://<账户ID>.r2.cloudflarestorage.com
Region：auto
Bucket：你的 Bucket 名称
Access Key ID：令牌中的 Access Key ID
Secret Access Key：令牌中的 Secret Access Key
公共访问域名：https://你的图片域名
路径前缀：obsidian（可选）
```

点击“测试连接”，然后在临时笔记中粘贴一张图片验证公共 URL。

官方参考：

- [R2 API 令牌](https://developers.cloudflare.com/r2/api/tokens/)
- [R2 公共 Bucket](https://developers.cloudflare.com/r2/buckets/public-buckets/)
