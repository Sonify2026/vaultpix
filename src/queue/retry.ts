export async function withRetry<T>(operation: () => Promise<T>, retries: number, delays = [1000, 3000, 10000]): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try { return await operation(); }
    catch (error) {
      lastError = error;
      if (attempt === retries) break;
      await new Promise(resolve => window.setTimeout(resolve, delays[Math.min(attempt, delays.length - 1)] ?? 1000));
    }
  }
  throw lastError;
}
