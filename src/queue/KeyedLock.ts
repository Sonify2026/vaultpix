export class KeyedLock {
  private readonly pending = new Map<string, Promise<void>>();

  async run<T>(key: string, operation: () => Promise<T>): Promise<T> {
    const previous = this.pending.get(key) ?? Promise.resolve();
    let release!: () => void;
    const current = new Promise<void>(resolve => { release = resolve; });
    this.pending.set(key, current);
    await previous;
    try { return await operation(); }
    finally {
      release();
      if (this.pending.get(key) === current) this.pending.delete(key);
    }
  }
}
