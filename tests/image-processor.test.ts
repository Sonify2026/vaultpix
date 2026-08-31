import { describe, expect, it } from "vitest";
import { calculateImageGeometry } from "../src/core/image/BrowserImageProcessor";
import type { ImageProcessSettings } from "../src/types";

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
