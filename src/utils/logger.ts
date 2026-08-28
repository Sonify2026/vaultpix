type Level = "error" | "warn" | "info" | "debug";
const RANK: Record<Level, number> = { error: 0, warn: 1, info: 2, debug: 3 };

export class Logger {
  constructor(private level: Level = "info") {}
  setLevel(level: Level): void { this.level = level; }
  error(message: string, detail?: unknown): void { this.log("error", message, detail); }
  warn(message: string, detail?: unknown): void { this.log("warn", message, detail); }
  info(message: string, detail?: unknown): void { this.log("info", message, detail); }
  debug(message: string, detail?: unknown): void { this.log("debug", message, detail); }
  private log(level: Level, message: string, detail?: unknown): void {
    if (RANK[level] > RANK[this.level]) return;
    const safeDetail = typeof detail === "string" ? detail.replace(/(authorization|secret|token|access.?key)\s*[:=]\s*\S+/gi, "$1=[已隐藏]") : detail;
    const fn = level === "debug" ? console.debug : level === "info" ? console.info : level === "warn" ? console.warn : console.error;
    fn(`[图片资产管家][${level.toUpperCase()}] ${message}`, safeDetail ?? "");
  }
}
