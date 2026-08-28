const MIME_BY_EXTENSION: Record<string, string> = {
  png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp",
  avif: "image/avif", gif: "image/gif", svg: "image/svg+xml", bmp: "image/bmp",
  tif: "image/tiff", tiff: "image/tiff", heic: "image/heic", heif: "image/heif"
};

export const IMAGE_EXTENSIONS = new Set(Object.keys(MIME_BY_EXTENSION));

export function extensionOf(name: string): string {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

export function mimeFromName(name: string): string {
  return MIME_BY_EXTENSION[extensionOf(name)] ?? "application/octet-stream";
}

export function extensionForMime(mime: string): string {
  const hit = Object.entries(MIME_BY_EXTENSION).find(([, value]) => value === mime);
  return hit?.[0] === "jpg" ? "jpeg" : (hit?.[0] ?? "bin");
}

export function isImageName(name: string): boolean {
  return IMAGE_EXTENSIONS.has(extensionOf(name));
}
