export function normalizeVaultPath(path: string): string {
  return path.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "").replace(/\/{2,}/g, "/");
}

export function joinVaultPath(...parts: string[]): string {
  return normalizeVaultPath(parts.filter(Boolean).join("/"));
}

export function sanitizePathSegment(value: string, unicode = true): string {
  let result = value.normalize("NFKC").replace(/[\\/:*?"<>|#^[\]]/g, "-").replace(/\s+/g, "-").replace(/-{2,}/g, "-").replace(/^[-. ]+|[-. ]+$/g, "");
  if (!unicode) result = result.normalize("NFKD").replace(/[^\x00-\x7F]/g, "").replace(/[^A-Za-z0-9._-]/g, "-");
  return result || "image";
}

export function encodeUrlPath(path: string): string {
  return normalizeVaultPath(path).split("/").map(encodeURIComponent).join("/");
}
