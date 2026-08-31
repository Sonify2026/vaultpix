import type { PluginSettings } from "./types";

export const DEFAULT_SETTINGS: PluginSettings = {
  enabled: true,
  workMode: "semi-automatic",
  autoProcessPaste: true,
  autoProcessDrop: true,
  image: {
    outputFormat: "webp",
    webpQuality: 82,
    jpegQuality: 85,
    avifQuality: 70,
    resizeMode: "long-edge",
    resizeWidth: 2560,
    resizeHeight: 2560,
    longEdge: 2560,
    shortEdge: 1440,
    preventUpscale: true,
    preserveGif: true,
    preserveSvg: true
  },
  naming: {
    filenameTemplate: "{noteName}-{index}",
    remotePathTemplate: "obsidian/{YYYY}/{MM}/{noteName}",
    conflictStrategy: "hash",
    hashLength: 12,
    unicodeFilenames: true
  },
  uploader: {
    provider: "r2",
    endpoint: "",
    region: "auto",
    bucket: "",
    accessKeyId: "",
    secretAccessKey: "",
    publicBaseUrl: "",
    pathPrefix: ""
    ,forcePathStyle: false
  },
  markdown: { preserveAlt: true, wikiSizeStrategy: "html", imageAlignment: "center" },
  cleanup: { strategy: "backup", backupFolder: ".vaultpix-backup" },
  batch: { concurrency: 3, retries: 3, timeoutMs: 15000, verifyUpload: true },
  advanced: { manifestEnabled: true, logLevel: "info" }
};

export function mergeSettings(data: unknown): PluginSettings {
  const saved = (data && typeof data === "object" ? data : {}) as Partial<PluginSettings>;
  return {
    ...DEFAULT_SETTINGS,
    ...saved,
    image: { ...DEFAULT_SETTINGS.image, ...saved.image },
    naming: { ...DEFAULT_SETTINGS.naming, ...saved.naming },
    uploader: { ...DEFAULT_SETTINGS.uploader, ...saved.uploader },
    markdown: { ...DEFAULT_SETTINGS.markdown, ...saved.markdown },
    cleanup: { ...DEFAULT_SETTINGS.cleanup, ...saved.cleanup },
    batch: { ...DEFAULT_SETTINGS.batch, ...saved.batch },
    advanced: { ...DEFAULT_SETTINGS.advanced, ...saved.advanced }
  };
}
