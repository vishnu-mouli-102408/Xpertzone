import { ICache } from "./cache";
import { InMemoryCache } from "./in-memory-cache";
import { RedisCache } from "./redis-cache";

const redisUrl: string = process.env.REDIS_URL ?? "";
const cacheExpireSeconds: number = Number(process.env.CACHE_EXPIRE) || 1800;

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
}

export const cache = Cache.getInstance();
