import { ICache } from "./cache";
import { InMemoryCache } from "./in-memory-cache";
import { RedisCache } from "./redis-cache";

const redisUrl: string =
  process.env.NEXT_PUBLIC_REDIS_URL ?? "redis://localhost:6379";
const cacheExpireSeconds: number =
  Number(process.env.NEXT_PUBLIC_CACHE_EXPIRE) || 1800;

export class Cache implements ICache {
  private static instance: Cache;
  private delegate: ICache;

  private constructor() {
    if (redisUrl) {
      this.delegate = RedisCache.getInstance(redisUrl);
    } else {
      this.delegate = InMemoryCache.getInstance();
    }
  }

  static getInstance(): Cache {
    if (!this.instance) {
      this.instance = new Cache();
    }
    return this.instance;
  }

  async set<T>(
    type: string,
    args: string[],
    value: T,
    expirySeconds: number = cacheExpireSeconds
  ): Promise<void> {
    return this.delegate.set(type, args, value, expirySeconds);
  }

  async get<T>(type: string, args: string[]): Promise<T | null> {
    return this.delegate.get(type, args);
  }

  async evict(type: string, args: string[]): Promise<void> {
    return this.delegate.evict(type, args);
  }

  async evictAllByPrefix(prefix: string): Promise<void> {
    return this.delegate.evictAllByPrefix(prefix);
  }
}

export const cache = Cache.getInstance();
