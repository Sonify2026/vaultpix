export interface QueueProgress<T> { completed: number; total: number; result?: T; error?: unknown; }

export class TaskQueue {
  private paused = false;
  private cancelled = false;
  private resumeWaiters: Array<() => void> = [];

  constructor(private readonly concurrency: number) {
    if (!Number.isInteger(concurrency) || concurrency < 1) throw new Error("并发数必须至少为 1。");
  }

  get isCancelled(): boolean { return this.cancelled; }

  pause(): void { this.paused = true; }
  resume(): void { this.paused = false; this.resumeWaiters.splice(0).forEach(resolve => resolve()); }
  cancel(): void { this.cancelled = true; this.resume(); }

  async run<T>(tasks: Array<() => Promise<T>>, onProgress?: (progress: QueueProgress<T>) => void): Promise<Array<PromiseSettledResult<T>>> {
    const results: Array<PromiseSettledResult<T>> = new Array(tasks.length);
    let next = 0, completed = 0;
    const worker = async (): Promise<void> => {
      while (true) {
        await this.waitIfPaused();
        if (this.cancelled || next >= tasks.length) return;
        const index = next++;
        const task = tasks[index];
        if (!task) return;
        try {
          const value = await task();
          results[index] = { status: "fulfilled", value };
          onProgress?.({ completed: ++completed, total: tasks.length, result: value });
        } catch (reason) {
          results[index] = { status: "rejected", reason };
          onProgress?.({ completed: ++completed, total: tasks.length, error: reason });
        }
      }
    };
    await Promise.all(Array.from({ length: Math.min(this.concurrency, tasks.length) }, () => worker()));
    return results.filter(Boolean);
  }

  private async waitIfPaused(): Promise<void> {
    if (!this.paused) return;
    await new Promise<void>(resolve => this.resumeWaiters.push(resolve));
  }
}
