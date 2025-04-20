import { ICache } from "./cache";

interface ICacheEntry<T> {
  value: T;
  expiry: number;
}

export class InMemoryCache implements ICache {
  private inMemoryDb: Map<string, ICacheEntry<unknown>>;
  private static instance: InMemoryCache | undefined = undefined;

  private constructor() {
    this.inMemoryDb = new Map<string, ICacheEntry<unknown>>();
  }

  static getInstance(): InMemoryCache {
    this.instance ??= new InMemoryCache();
    return this.instance;
  }

  set<T>(
    type: string,
    args: string[],
    value: T,
    expirySeconds: number = parseInt(process.env.CACHE_EXPIRE ?? "1800", 10)
  ): Promise<void> {
    const key = this.generateKey(type, args);
    this.inMemoryDb.set(key, {
      value,
      expiry: Date.now() + expirySeconds * 1000,
    });
    return Promise.resolve();
  }

  get<T>(type: string, args: string[]): Promise<T | null> {
    const key = this.generateKey(type, args);
    const entry = this.inMemoryDb.get(key) as ICacheEntry<T> | undefined;

    if (!entry) {
      return Promise.resolve(null);
    }

    if (Date.now() > entry.expiry) {
      this.inMemoryDb.delete(key);
      return Promise.resolve(null);
    }

    return Promise.resolve(entry.value);
  }

  async evict(type: string, args: string[]): Promise<void> {
    const key = this.generateKey(type, args);
    this.inMemoryDb.delete(key);
    return Promise.resolve();
  }

  async evictAllByPrefix(prefix: string): Promise<void> {
    const prefixWithColon = `${prefix}:`;
    for (const key of this.inMemoryDb.keys()) {
      if (key.startsWith(prefixWithColon)) {
        this.inMemoryDb.delete(key);
      }
    }
    return Promise.resolve();
  }

  private generateKey(type: string, args: string[]): string {
    return `${type}:${JSON.stringify(args)}`;
  }
}
