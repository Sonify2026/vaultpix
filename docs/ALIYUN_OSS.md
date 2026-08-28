# 阿里云 OSS 零基础配置

VaultPix 通过阿里云官方的 S3 兼容接口访问 OSS。整个流程只需要创建一个专用 Bucket、一个专用 RAM 用户，然后在 VaultPix 中填写地域、Bucket 和密钥。

## 先理解三个词

- **Bucket**：云端图片文件夹。
- **AccessKey**：允许 VaultPix 上传图片的专用账号密码。
- **公共访问域名**：最终写入 Obsidian 笔记的图片网址。

## 1. 创建 Bucket

1. 登录[阿里云 OSS 控制台](https://oss.console.aliyun.com/)。
2. 创建 Bucket。
3. 名称只使用小写英文、数字和连字符，例如 `my-vaultpix-images`。
4. 地域选择离自己较近的位置。
5. 存储类型选择“标准存储”，冗余类型选择“本地冗余”即可。
6. 初始读写权限保持“私有”，创建完成后再单独调整。

进入 Bucket 概览并记录：

- Bucket 名称，例如 `my-vaultpix-images`
- 地域 ID，例如杭州 `cn-hangzhou`、上海 `cn-shanghai`、东京 `ap-northeast-1`

## 2. 让笔记中的图片可以显示

VaultPix 写入的是永久公开 URL，因此该 Bucket 中的图片需要允许匿名读取。

1. 进入 Bucket → 权限控制。
2. 如果“阻止公共访问”已开启，先关闭。
3. 打开 Bucket ACL，将权限设为“公共读”。
4. 绝对不要选择“公共读写”。

公共读意味着任何知道 URL 的人都可以查看图片，但匿名用户不能上传。这个 Bucket 只应存放准备公开展示的笔记图片，不要上传敏感内容。

## 3. 创建专用 RAM 用户

1. 在阿里云进入“RAM 访问控制”。
2. 创建用户，例如 `vaultpix-uploader`。
3. 开启 OpenAPI / 永久 AccessKey 访问。
4. 保存只显示一次的 AccessKey ID 和 AccessKey Secret。
5. 给该用户添加 OSS 上传权限。

第一次排查配置时可以临时使用系统策略 `AliyunOSSFullAccess`。确认可用后，应改成只允许访问目标 Bucket 的最小权限策略。不要使用阿里云主账号 AccessKey。

## 4. 在 VaultPix 中填写

打开 Obsidian → 设置 → VaultPix → 上传服务：

1. 服务类型选择“阿里云 OSS”。
2. Region 填 Bucket 的地域 ID。
3. Bucket 填 Bucket 名称。
4. 点击“生成并填入”，让 VaultPix 自动生成 Endpoint 和默认公共访问域名。
5. 填写 RAM 用户的 Access Key ID 和 Secret Access Key。
6. 路径前缀可以填写 `obsidian`，也可以留空。
7. 点击“测试连接”。

杭州地域示例：

```text
服务类型：阿里云 OSS
Region：cn-hangzhou
Bucket：my-vaultpix-images
Endpoint：https://s3.oss-cn-hangzhou.aliyuncs.com
公共访问域名：https://my-vaultpix-images.oss-cn-hangzhou.aliyuncs.com
路径前缀：obsidian
Path Style：关闭
```

Endpoint 中包含 `s3.`，公共访问域名中不包含。VaultPix 会自动生成这两个地址，无需手工拼接。

## 5. 完成真实上传测试

1. 新建一篇临时笔记。
2. 粘贴一张不敏感的测试图片。
3. 等待 VaultPix 插入远程 Markdown 链接。
4. 在无痕浏览器中打开该 URL。
5. 可以直接看到图片即表示上传和公共读取都正常。

## 常见错误

| 错误 | 检查方法 |
|---|---|
| `AccessDenied` / 403 | 检查 RAM 权限、AccessKey，以及 Bucket 是否仍阻止公共访问 |
| `NoSuchBucket` | 检查 Bucket 名称和 Region 是否完全一致 |
| `SignatureDoesNotMatch` | 检查 Secret、Region、Endpoint 和系统时间 |
| 连接成功但图片打不开 | 检查 Bucket ACL 是否为公共读，以及公共访问域名是否正确 |
| URL 或请求路径异常 | 确认使用“阿里云 OSS”服务类型；OSS 不允许 Path Style |

阿里云 OSS 会按存储量和外网流量计费。建议开启费用提醒，并定期查看用量。

官方参考：

- [使用 AWS SDK 访问 OSS](https://help.aliyun.com/zh/oss/developer-reference/use-aws-sdks-to-access-oss)
- [地域和 Endpoint](https://help.aliyun.com/zh/oss/user-guide/regions-and-endpoints)
- [Bucket ACL](https://help.aliyun.com/zh/oss/user-guide/oss-bucket-acl)
