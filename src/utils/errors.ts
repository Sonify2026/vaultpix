export enum ImageErrorCode {
  INVALID_IMAGE = "INVALID_IMAGE",
  UNSUPPORTED_FORMAT = "UNSUPPORTED_FORMAT",
  DECODE_FAILED = "DECODE_FAILED",
  ENCODE_FAILED = "ENCODE_FAILED",
  UPLOAD_FAILED = "UPLOAD_FAILED",
  AUTH_FAILED = "AUTH_FAILED",
  NETWORK_FAILED = "NETWORK_FAILED",
  VERIFY_FAILED = "VERIFY_FAILED",
  MARKDOWN_PARSE_FAILED = "MARKDOWN_PARSE_FAILED",
  MARKDOWN_WRITE_FAILED = "MARKDOWN_WRITE_FAILED",
  MANIFEST_WRITE_FAILED = "MANIFEST_WRITE_FAILED",
  CLEANUP_FAILED = "CLEANUP_FAILED"
}

export class ImageAssetError extends Error {
  constructor(public readonly code: ImageErrorCode, message: string, public override readonly cause?: unknown) {
    super(message);
    this.name = "ImageAssetError";
  }
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
