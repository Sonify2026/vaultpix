import { afterEach, describe, expect, it, vi } from "vitest";
import { BrowserImageProcessor, calculateImageGeometry } from "../src/core/image/BrowserImageProcessor";
import type { ImageProcessSettings } from "../src/types";
import { DEFAULT_SETTINGS } from "../src/settings";

afterEach(() => vi.unstubAllGlobals());

function settings(overrides: Partial<ImageProcessSettings> = {}): ImageProcessSettings {
  return {
    outputFormat: "webp",
    webpQuality: 82,
    jpegQuality: 85,
    avifQuality: 70,
    resizeMode: "long-edge",
    resizeWidth: 1600,
    resizeHeight: 900,
    longEdge: 2560,
    shortEdge: 1440,
    preventUpscale: true,
    preserveGif: true,
    preserveSvg: true,
    ...overrides
  };
}

describe("calculateImageGeometry", () => {
  it("keeps aspect ratio when limiting the longest edge", () => {
    expect(calculateImageGeometry(4000, 3000, settings())).toMatchObject({ canvasWidth: 2560, canvasHeight: 1920 });
  });

  it("does not enlarge a small image in fill mode when either axis needs scaling up", () => {
    const result = calculateImageGeometry(1200, 600, settings({ resizeMode: "fill", resizeWidth: 1000, resizeHeight: 1000 }));
    expect(result).toEqual({ canvasWidth: 1200, canvasHeight: 600, sx: 0, sy: 0, sw: 1200, sh: 600 });
  });

  it("crops from the center when fill mode only scales down", () => {
    const result = calculateImageGeometry(2400, 1600, settings({ resizeMode: "fill", resizeWidth: 1200, resizeHeight: 1200 }));
    expect(result).toEqual({ canvasWidth: 1200, canvasHeight: 1200, sx: 400, sy: 0, sw: 1600, sh: 1600 });
  });
});

describe("BrowserImageProcessor fidelity", () => {
  it("defaults to preserving source bytes without resampling", async () => {
    expect(DEFAULT_SETTINGS.image.outputFormat).toBe("original");
    expect(DEFAULT_SETTINGS.image.resizeMode).toBe("none");
    vi.stubGlobal("createImageBitmap", vi.fn().mockRejectedValue(new Error("dimensions unavailable")));
    const bytes = new Uint8Array([1, 2, 3, 4]);
    const result = await new BrowserImageProcessor().process({ name: "source.png", mimeType: "image/png", data: bytes.buffer }, DEFAULT_SETTINGS.image);
    expect(new Uint8Array(result.data)).toEqual(bytes);
    expect(result.mimeType).toBe("image/png");
    expect(result.format).toBe("png");
  });

  it("rejects a browser silently returning PNG for requested WebP", async () => {
    const bitmap = { width: 100, height: 100, close: vi.fn() };
    vi.stubGlobal("createImageBitmap", vi.fn().mockResolvedValue(bitmap));
    vi.stubGlobal("document", { createElement: () => ({
      width: 0, height: 0,
      getContext: () => ({ drawImage: vi.fn(), fillRect: vi.fn(), imageSmoothingQuality: "low" }),
      toBlob: (callback: (blob: Blob) => void) => callback(new Blob(["png"], { type: "image/png" }))
    }) });
    await expect(new BrowserImageProcessor().process({ name: "source.png", mimeType: "image/png", data: new Uint8Array([1]).buffer }, settings({ resizeMode: "none" })))
      .rejects.toThrow("不支持输出 WEBP");
    expect(bitmap.close).toHaveBeenCalledOnce();
  });
});
