import { describe, expect, it } from "vitest";
import { MarkdownImageParser } from "../src/markdown/MarkdownImageParser";

describe("MarkdownImageParser", () => {
  const parser = new MarkdownImageParser();

  it("parses wiki, markdown and html image embeds", () => {
    const content = "![[附件/图.png|600]]\n![说明](<../assets/a b.jpg>)\n<img src=\"https://x.test/a.webp\" width=\"320\" alt=\"远程\">";
    const result = parser.parse(content, "笔记.md");
    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({ linkType: "wiki", imagePath: "附件/图.png", displayWidth: 600, remote: false });
    expect(result[1]).toMatchObject({ linkType: "markdown", imagePath: "../assets/a b.jpg", alt: "说明" });
    expect(result[2]).toMatchObject({ linkType: "html", remote: true, displayWidth: 320, alt: "远程" });
  });

  it("never parses examples in frontmatter, code or comments", () => {
    const content = ["---", "example: '![[front.png]]'", "---", "`![[inline.png]]`", "```md", "![[block.png]]", "```", "<!-- ![](hidden.png) -->", "<pre>![[pre.png]]</pre>", "![[real.png]]"].join("\n");
    const result = parser.parse(content, "note.md");
    expect(result.map(item => item.imagePath)).toEqual(["real.png"]);
  });
});
