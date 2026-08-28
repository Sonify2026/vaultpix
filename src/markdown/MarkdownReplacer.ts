export interface Replacement { start: number; end: number; expected: string; replacement: string; }

export class MarkdownReplacer {
  apply(content: string, replacements: Replacement[]): string {
    const sorted = [...replacements].sort((a, b) => b.start - a.start);
    let previousStart = content.length + 1;
    let result = content;
    for (const replacement of sorted) {
      if (replacement.start < 0 || replacement.end > content.length || replacement.start >= replacement.end) throw new Error("Markdown 替换范围无效。");
      if (replacement.end > previousStart) throw new Error("Markdown 替换范围互相重叠。");
      if (content.slice(replacement.start, replacement.end) !== replacement.expected) throw new Error("笔记已发生变化，已停止写入以避免覆盖新内容。");
      result = result.slice(0, replacement.start) + replacement.replacement + result.slice(replacement.end);
      previousStart = replacement.start;
    }
    return result;
  }
}
