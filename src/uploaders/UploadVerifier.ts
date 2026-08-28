import { requestUrl, type RequestUrlResponse } from "obsidian";
import { ImageAssetError, ImageErrorCode, errorMessage } from "../utils/errors";

export class UploadVerifier {
  constructor(private readonly timeoutMs: number) {}

  async verify(url: string): Promise<void> {
    let headStatus = 0;
    try {
      const head = await this.timed(requestUrl({ url, method: "HEAD", throw: false }));
      headStatus = head.status;
      if (head.status === 200 || head.status === 206) return;
    } catch { /* 某些 CDN 禁止 HEAD，继续尝试 Range GET。 */ }
    try {
      const range = await this.timed(requestUrl({ url, method: "GET", headers: { Range: "bytes=0-0" }, throw: false }));
      if (range.status === 200 || range.status === 206) return;
      throw new Error(`HTTP ${range.status || headStatus}`);
    } catch (error) {
      throw new ImageAssetError(ImageErrorCode.VERIFY_FAILED, `上传已返回成功，但无法在 ${Math.round(this.timeoutMs / 1000)} 秒内验证公开地址：${errorMessage(error)}`, error);
    }
  }

  private async timed(request: Promise<RequestUrlResponse>): Promise<RequestUrlResponse> {
    let timer = 0;
    const timeout = new Promise<never>((_, reject) => { timer = window.setTimeout(() => reject(new Error("请求超时")), this.timeoutMs); });
    try { return await Promise.race([request, timeout]); }
    finally { window.clearTimeout(timer); }
  }
}
