import { describe, expect, it } from "vitest";
import { canRestoreNote } from "../src/migration/restoreSafety";

describe("migration note recovery", () => {
  it("restores only the text the plugin wrote, not a later user edit", () => {
    const backup = { content: "before", after: "after" };
    expect(canRestoreNote("after", backup)).toBe(true);
    expect(canRestoreNote("before", backup)).toBe(true);
    expect(canRestoreNote("after with my edits", backup)).toBe(false);
  });

  it("does not overwrite modified notes from older records without an after snapshot", () => {
    expect(canRestoreNote("changed", { content: "before" })).toBe(false);
  });
});
