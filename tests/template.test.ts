import { describe, expect, it, vi } from "vitest";
import { TemplateEngine } from "../src/naming/TemplateEngine";

describe("TemplateEngine", () => {
  it("renders dates, index, hash and frontmatter safely", () => {
    vi.stubGlobal("crypto", { randomUUID: () => "uuid" });
    const result = new TemplateEngine().render("{YYYY}/{MM}/{noteName}/{frontmatter:category}-{index}-{hash:8}", {
      noteName: "插件：开发", fileName: "a", folderName: "工作", vaultName: "库", notePath: "工作/插件.md",
      index: 7, hash: "1234567890abcdef", now: new Date(2026, 7, 28, 1, 2, 3), frontmatter: { category: "前端/设计" }
    }, true);
    expect(result).toBe("2026/08/插件-开发/前端/设计-007-12345678");
    vi.unstubAllGlobals();
  });

  it("uses one stable timestamp and UUID across filename and path templates", () => {
    const context = {
      noteName: "Note", fileName: "Image", folderName: "Folder", vaultName: "Vault", notePath: "Folder/Note.md",
      index: 1, hash: "abcdef1234567890", now: new Date(2026, 7, 31, 9, 30, 0), uuid: "stable-uuid"
    };
    const engine = new TemplateEngine();
    expect(engine.render("{timestamp}-{uuid}", context)).toBe(`${context.now.getTime()}-stable-uuid`);
    expect(engine.render("{YYYY}/{MM}/{uuid}", context, true)).toBe("2026/08/stable-uuid");
  });
});
