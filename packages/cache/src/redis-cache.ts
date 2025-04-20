import { Redis } from "ioredis";

import { ICache } from "./cache";

export class RedisCache implements ICache {
  private client: Redis;
  private static instance: RedisCache | undefined = undefined;

  private constructor(redisUrl: string) {
    this.client = new Redis(redisUrl);
  }

  static getInstance(redisUrl: string): RedisCache {
    this.instance ??= new RedisCache(redisUrl);
    return this.instance;
  }

  async set<T>(
    type: string,
    args: string[],
    value: T,
    expirySeconds: number = parseInt(process.env.CACHE_EXPIRE ?? "1800", 10)
  ): Promise<void> {
    const key = this.generateKey(type, args);
    const serializedValue = JSON.stringify(value);

    if (expirySeconds > 0) {
      await this.client.set(key, serializedValue, "EX", expirySeconds);
    } else {
      await this.client.set(key, serializedValue);
    }
  }

  async get<T>(type: string, args: string[]): Promise<T | null> {
    const key = this.generateKey(type, args);
    const value = await this.client.get(key);

    return value ? (JSON.parse(value) as T) : null;
  }

  async evict(type: string, args: string[]): Promise<void> {
    const key = this.generateKey(type, args);
    await this.client.del(key);
  }

  async evictAllByPrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);
    if (keys.length > 0) {
      await this.client.del(...keys);
    }
  }

  private generateKey(type: string, args: string[]): string {
    return `${type}:${args.join(":")}`;
  }
}
