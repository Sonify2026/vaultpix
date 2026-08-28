import { describe, expect, it } from "vitest";
import { MarkdownReplacer } from "../src/markdown/MarkdownReplacer";

describe("MarkdownReplacer", () => {
  it("applies multiple replacements from the end", () => {
    const source = "a ![[one.png]] b ![](two.png) c";
    const first = source.indexOf("![[one.png]]");
    const second = source.indexOf("![](two.png)");
    const result = new MarkdownReplacer().apply(source, [
      { start: first, end: first + 12, expected: "![[one.png]]", replacement: "![](https://x/1)" },
      { start: second, end: second + 12, expected: "![](two.png)", replacement: "![](https://x/2)" }
    ]);
    expect(result).toBe("a ![](https://x/1) b ![](https://x/2) c");
  });

  it("refuses to overwrite changed content", () => {
    expect(() => new MarkdownReplacer().apply("changed", [{ start: 0, end: 3, expected: "old", replacement: "new" }])).toThrow(/发生变化/);
  });
});
