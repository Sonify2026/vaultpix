import type { ConflictStrategy } from "../types";
import { ImageAssetError, ImageErrorCode } from "../utils/errors";

export async function resolveRemoteConflict(
  remotePath: string,
  hash: string,
  strategy: ConflictStrategy,
  hashLength: number,
  exists: (path: string) => Promise<boolean>
): Promise<string> {
  if (strategy === "overwrite") return remotePath;
  if (!(await exists(remotePath))) return remotePath;
  if (strategy === "skip") throw new ImageAssetError(ImageErrorCode.UPLOAD_FAILED, `远程文件已存在，已按设置跳过：${remotePath}`);
  const dot = remotePath.lastIndexOf(".");
  const stem = dot >= 0 ? remotePath.slice(0, dot) : remotePath;
  const extension = dot >= 0 ? remotePath.slice(dot) : "";
  if (strategy === "hash") {
    for (let length = hashLength; length < hash.length; length += 4) {
      const candidate = `${stem}-${hash.slice(0, Math.min(length, hash.length))}${extension}`;
      if (!(await exists(candidate))) return candidate;
    }
    const fullHashCandidate = `${stem}-${hash}${extension}`;
    if (!(await exists(fullHashCandidate))) return fullHashCandidate;
    for (let index = 2; index <= 999; index++) {
      const candidate = `${stem}-${hash}-${String(index).padStart(3, "0")}${extension}`;
      if (!(await exists(candidate))) return candidate;
    }
  } else {
    for (let index = 2; index <= 999; index++) {
      const candidate = `${stem}-${String(index).padStart(3, "0")}${extension}`;
      if (!(await exists(candidate))) return candidate;
    }
  }
  throw new ImageAssetError(ImageErrorCode.UPLOAD_FAILED, `无法为远程路径生成不冲突的文件名：${remotePath}`);
}
