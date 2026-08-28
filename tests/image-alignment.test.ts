import { describe, expect, it } from "vitest";
import { imageAlignmentReplacement } from "../src/markdown/ImageAlignment";
import { MarkdownImageParser } from "../src/markdown/MarkdownImageParser";
import { MarkdownReplacer } from "../src/markdown/MarkdownReplacer";

describe("imageAlignmentReplacement", () => {
  const parser = new MarkdownImageParser();
  const replacer = new MarkdownReplacer();

  it("wraps a local wiki image with an explicit alignment", () => {
    const source = "before ![[image.png]] after";
    const reference = parser.parse(source, "note.md")[0];
    expect(reference).toBeDefined();
    const replacement = imageAlignmentReplacement(source, reference!, "center");
    expect(replacer.apply(source, [replacement])).toBe('before <span class="iam-image-align-center">![[image.png]]</span> after');
  });

  it("replaces an existing wrapper instead of nesting wrappers", () => {
    const source = '<span class="iam-image-align-left">![alt](https://example.com/a.png)</span>';
    const reference = parser.parse(source, "note.md")[0];
    expect(reference).toBeDefined();
    const replacement = imageAlignmentReplacement(source, reference!, "right");
    expect(replacer.apply(source, [replacement])).toBe('<span class="iam-image-align-right">![alt](https://example.com/a.png)</span>');
  });

  it("removes an explicit wrapper when restoring the default", () => {
    const source = '<span class="iam-image-align-center">![[image.png]]</span>';
    const reference = parser.parse(source, "note.md")[0];
    expect(reference).toBeDefined();
    expect(replacer.apply(source, [imageAlignmentReplacement(source, reference!)])).toBe("![[image.png]]");
  });
});
