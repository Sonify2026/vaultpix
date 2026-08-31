import type { ImageInput, ImageProcessSettings, ProcessedImage } from "../../types";
import { ImageAssetError, ImageErrorCode } from "../../utils/errors";
import { extensionForMime, extensionOf } from "../../utils/mime";
import { sha256 } from "../../utils/hash";

export interface ImageGeometry { canvasWidth: number; canvasHeight: number; sx: number; sy: number; sw: number; sh: number; }

export function calculateImageGeometry(width: number, height: number, settings: ImageProcessSettings): ImageGeometry {
  const identity = { canvasWidth: width, canvasHeight: height, sx: 0, sy: 0, sw: width, sh: height };
  if (settings.resizeMode === "none") return identity;

  let targetWidth = width;
  let targetHeight = height;
  if (settings.resizeMode === "width") targetWidth = settings.resizeWidth;
  if (settings.resizeMode === "height") targetHeight = settings.resizeHeight;
  if (settings.resizeMode === "long-edge") {
    const scale = settings.longEdge / Math.max(width, height);
    targetWidth = width * scale; targetHeight = height * scale;
  } else if (settings.resizeMode === "short-edge") {
    const scale = settings.shortEdge / Math.min(width, height);
    targetWidth = width * scale; targetHeight = height * scale;
  } else if (settings.resizeMode === "width") {
    targetHeight = height * (targetWidth / width);
  } else if (settings.resizeMode === "height") {
    targetWidth = width * (targetHeight / height);
  } else if (settings.resizeMode === "fit") {
    const scale = Math.min(settings.resizeWidth / width, settings.resizeHeight / height);
    targetWidth = width * scale; targetHeight = height * scale;
  } else if (settings.resizeMode === "fill" || settings.resizeMode === "fixed") {
    const canvasWidth = settings.resizeWidth;
    const canvasHeight = settings.resizeHeight;
    const scale = Math.max(canvasWidth / width, canvasHeight / height);
    if (settings.preventUpscale && scale > 1) return identity;
    const sourceRatio = width / height;
    const targetRatio = canvasWidth / canvasHeight;
    let sw = width, sh = height, sx = 0, sy = 0;
    if (sourceRatio > targetRatio) { sw = height * targetRatio; sx = (width - sw) / 2; }
    else { sh = width / targetRatio; sy = (height - sh) / 2; }
    return { canvasWidth, canvasHeight, sx, sy, sw, sh };
  }

  const scale = Math.min(targetWidth / width, targetHeight / height);
  if (settings.preventUpscale && scale >= 1) return identity;
  return { ...identity, canvasWidth: Math.max(1, Math.round(targetWidth)), canvasHeight: Math.max(1, Math.round(targetHeight)) };
}

export class BrowserImageProcessor {
  async process(input: ImageInput, settings: ImageProcessSettings): Promise<ProcessedImage> {
    if (!input.data.byteLength || !input.mimeType.startsWith("image/")) {
      throw new ImageAssetError(ImageErrorCode.INVALID_IMAGE, `“${input.name}”不是有效图片。`);
    }

    const inputExtension = extensionOf(input.name);
    const preserve = settings.outputFormat === "original" ||
      ((inputExtension === "gif" || input.mimeType === "image/gif") && settings.preserveGif) ||
      ((inputExtension === "svg" || input.mimeType === "image/svg+xml") && settings.preserveSvg);

    if (preserve) {
      const dimensions = await this.readDimensions(input).catch(() => ({ width: 0, height: 0 }));
      return this.finish(input.data.slice(0), input.mimeType, dimensions.width, dimensions.height, input.data.byteLength);
    }

    const bitmap = await this.decode(input);
    try {
      const geometry = calculateImageGeometry(bitmap.width, bitmap.height, settings);
      const canvas = document.createElement("canvas");
      canvas.width = geometry.canvasWidth;
      canvas.height = geometry.canvasHeight;
      const context = canvas.getContext("2d", { alpha: true });
      if (!context) throw new ImageAssetError(ImageErrorCode.ENCODE_FAILED, "当前环境无法创建图片画布。");
      const mimeType = this.outputMime(settings.outputFormat);
      if (mimeType === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, geometry.canvasWidth, geometry.canvasHeight);
      }
      context.drawImage(bitmap, geometry.sx, geometry.sy, geometry.sw, geometry.sh, 0, 0, geometry.canvasWidth, geometry.canvasHeight);
      const quality = this.quality(settings);
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, mimeType, quality));
      if (!blob || (settings.outputFormat === "avif" && blob.type !== "image/avif")) {
        throw new ImageAssetError(ImageErrorCode.UNSUPPORTED_FORMAT, `当前 Obsidian/Electron 环境不支持输出 ${settings.outputFormat.toUpperCase()}。`);
      }
      return this.finish(await blob.arrayBuffer(), blob.type || mimeType, canvas.width, canvas.height, input.data.byteLength);
    } finally {
      bitmap.close();
    }
  }

  private async decode(input: ImageInput): Promise<ImageBitmap> {
    try {
      return await createImageBitmap(new Blob([input.data], { type: input.mimeType }), { imageOrientation: "from-image" });
    } catch (error) {
      throw new ImageAssetError(ImageErrorCode.DECODE_FAILED, `无法解码“${input.name}”，该格式可能不受当前环境支持。`, error);
    }
  }

  private async readDimensions(input: ImageInput): Promise<{ width: number; height: number }> {
    const bitmap = await this.decode(input);
    try { return { width: bitmap.width, height: bitmap.height }; }
    finally { bitmap.close(); }
  }

  private async finish(data: ArrayBuffer, mimeType: string, width: number, height: number, originalSize: number): Promise<ProcessedImage> {
    return {
      data, mimeType, width, height, originalSize, processedSize: data.byteLength,
      format: extensionForMime(mimeType), hash: await sha256(data)
    };
  }

  private outputMime(format: ImageProcessSettings["outputFormat"]): string {
    if (format === "jpeg") return "image/jpeg";
    if (format === "png") return "image/png";
    if (format === "avif") return "image/avif";
    return "image/webp";
  }

  private quality(settings: ImageProcessSettings): number {
    if (settings.outputFormat === "jpeg") return settings.jpegQuality / 100;
    if (settings.outputFormat === "avif") return settings.avifQuality / 100;
    return settings.webpQuality / 100;
  }

}
