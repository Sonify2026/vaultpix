import { describe, expect, it } from "vitest";
import { TaskQueue } from "../src/queue/TaskQueue";

describe("TaskQueue", () => {
  it("isolates failures and reports all settled tasks", async () => {
    const queue = new TaskQueue(2);
    const progress: number[] = [];
    const results = await queue.run([async () => 1, async () => { throw new Error("x"); }, async () => 3], value => progress.push(value.completed));
    expect(results.map(result => result.status)).toEqual(["fulfilled", "rejected", "fulfilled"]);
    expect(progress.sort()).toEqual([1, 2, 3]);
  });
});
