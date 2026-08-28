import type { ImageReference, LinkType } from "../types";

interface Range { start: number; end: number; }

export class MarkdownImageParser {
  parse(content: string, notePath: string): ImageReference[] {
    const protectedRanges = this.protectedRanges(content);
    const references: ImageReference[] = [];
    this.collect(content, notePath, /!\[\[([^\]\n]+)\]\]/g, "wiki", protectedRanges, references);
    this.collect(content, notePath, /!\[([^\]\n]*)\]\(\s*(?:<([^>\n]+)>|([^\s)]+))(?:\s+["'][^"'\n]*["'])?\s*\)/g, "markdown", protectedRanges, references);
    this.collect(content, notePath, /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi, "html", protectedRanges, references);
    return references.sort((a, b) => a.start - b.start);
  }

  private collect(content: string, notePath: string, regex: RegExp, type: LinkType, protectedRanges: Range[], output: ImageReference[]): void {
    for (const match of content.matchAll(regex)) {
      const start = match.index;
      if (start === undefined || this.isProtected(start, protectedRanges)) continue;
      let imagePath = "", alt = "", displayWidth: number | undefined;
      if (type === "wiki") {
        const parts = (match[1] ?? "").split("|");
        imagePath = parts[0]?.trim() ?? "";
        const width = Number(parts[1]);
        if (Number.isFinite(width) && width > 0) displayWidth = width;
      } else if (type === "markdown") {
        alt = match[1] ?? "";
        imagePath = (match[2] ?? match[3] ?? "").trim();
      } else {
        imagePath = match[1]?.trim() ?? "";
        alt = /\balt\s*=\s*["']([^"']*)["']/i.exec(match[0])?.[1] ?? "";
        const width = Number(/\bwidth\s*=\s*["']?(\d+)/i.exec(match[0])?.[1]);
        if (Number.isFinite(width) && width > 0) displayWidth = width;
      }
      if (!imagePath) continue;
      try { imagePath = decodeURIComponent(imagePath); } catch { /* keep literal path */ }
      output.push({
        notePath, imagePath, rawLink: match[0], linkType: type, alt, displayWidth,
        start, end: start + match[0].length, remote: /^(?:https?:)?\/\//i.test(imagePath)
      });
    }
  }

  private protectedRanges(content: string): Range[] {
    const ranges: Range[] = [];
    if (content.startsWith("---\n") || content.startsWith("---\r\n")) {
      const match = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/.exec(content);
      if (match) ranges.push({ start: 0, end: match[0].length });
    }
    for (const match of content.matchAll(/^( {0,3})(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\2\s*$/gm)) {
      if (match.index !== undefined) ranges.push({ start: match.index, end: match.index + match[0].length });
    }
    for (const match of content.matchAll(/<!--(?:[\s\S]*?)-->|<(?:pre|code)\b[^>]*>[\s\S]*?<\/(?:pre|code)>/gi)) {
      if (match.index !== undefined) ranges.push({ start: match.index, end: match.index + match[0].length });
    }
    for (const match of content.matchAll(/(`+)(?!`)(?:[^`\n]|`(?!\1))*?\1/g)) {
      if (match.index !== undefined) ranges.push({ start: match.index, end: match.index + match[0].length });
    }
    return ranges.sort((a, b) => a.start - b.start);
  }

  private isProtected(position: number, ranges: Range[]): boolean {
    return ranges.some(range => position >= range.start && position < range.end);
  }
}
