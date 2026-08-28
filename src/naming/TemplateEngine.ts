import type { TemplateContext } from "../types";
import { sanitizePathSegment } from "../utils/path";

function pad(value: number, size = 2): string { return String(value).padStart(size, "0"); }

export class TemplateEngine {
  render(template: string, context: TemplateContext, pathMode = false, unicode = true): string {
    const now = context.now ?? new Date();
    const values: Record<string, string> = {
      noteName: context.noteName,
      fileName: context.fileName,
      folderName: context.folderName,
      vaultName: context.vaultName,
      notePath: context.notePath.replace(/\.md$/i, ""),
      YYYY: String(now.getFullYear()),
      MM: pad(now.getMonth() + 1),
      DD: pad(now.getDate()),
      HH: pad(now.getHours()),
      mm: pad(now.getMinutes()),
      ss: pad(now.getSeconds()),
      timestamp: String(now.getTime()),
      index: pad(context.index, 3),
      uuid: crypto.randomUUID(),
      hash: context.hash
    };

    const rendered = template.replace(/\{(frontmatter:([^}]+)|hash(?::(\d+))?|[A-Za-z]+)\}/g, (_match, token: string, frontmatterKey?: string, hashLength?: string) => {
      if (token.startsWith("frontmatter:")) {
        const value = context.frontmatter?.[frontmatterKey ?? ""];
        return value === undefined || value === null ? "" : String(value);
      }
      if (token.startsWith("hash")) return context.hash.slice(0, Number(hashLength || context.hash.length));
      return values[token] ?? "";
    });

    if (!pathMode) return sanitizePathSegment(rendered, unicode);
    return rendered.split(/[\\/]+/).filter(Boolean).map(part => sanitizePathSegment(part, unicode)).join("/");
  }
}
