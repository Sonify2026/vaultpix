import { describe, expect, it } from "vitest";
import { resolveRemoteConflict } from "../src/naming/RemoteConflict";

describe("remote hash conflict", () => {
  it("never overwrites an existing short-hash object", async () => {
    const existing = new Set(["notes/image.webp", "notes/image-abcdef12.webp"]);
    expect(await resolveRemoteConflict("notes/image.webp", "abcdef1234567890", "hash", 8, async path => existing.has(path)))
      .toBe("notes/image-abcdef123456.webp");
  });
});
