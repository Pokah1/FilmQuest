/**
 * Simple in-memory cache for API responses.
 * Lives for the browser session — cleared on page refresh.
 * Prevents duplicate API calls when navigating back and forth.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const store = new Map<string, CacheEntry<unknown>>();

// How long a cache entry is valid (5 minutes)
const TTL_MS = 5 * 60 * 1000;

export const cache = {
  get<T>(key: string): T | null {
    const entry = store.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;
    if (Date.now() - entry.timestamp > TTL_MS) {
      store.delete(key);
      return null;
    }
    return entry.data;
  },

  set<T>(key: string, data: T): void {
    store.set(key, { data, timestamp: Date.now() });
  },

  clear(): void {
    store.clear();
  },
};