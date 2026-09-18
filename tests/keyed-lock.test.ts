import { describe, expect, it } from "vitest";
import { KeyedLock } from "../src/queue/KeyedLock";

describe("KeyedLock", () => {
  it("serializes writes to one remote path without blocking other paths", async () => {
    const lock = new KeyedLock();
    const order: string[] = [];
    let releaseFirst!: () => void;
    const firstGate = new Promise<void>(resolve => { releaseFirst = resolve; });
    const first = lock.run("same", async () => { order.push("first start"); await firstGate; order.push("first end"); });
    const second = lock.run("same", async () => { order.push("second start"); });
    const other = lock.run("other", async () => { order.push("other start"); });
    await other;
    expect(order).toEqual(["first start", "other start"]);
    releaseFirst();
    await Promise.all([first, second]);
    expect(order).toEqual(["first start", "other start", "first end", "second start"]);
  });
});
