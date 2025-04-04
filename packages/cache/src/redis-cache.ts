import { Redis } from "ioredis";

import { ICache } from "./cache";

export class RedisCache implements ICache {
  private client: Redis;
  private static instance: RedisCache;

  private constructor(redisUrl: string) {
    this.client = new Redis(redisUrl);
  }

  static getInstance(redisUrl: string): RedisCache {
    if (!this.instance) {
      this.instance = new RedisCache(redisUrl);
    }
    return this.instance;
  }

  async set<T>(
    type: string,
    args: string[],
    value: T,
    expirySeconds: number
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

  private generateKey(type: string, args: string[]): string {
    return `${type}:${args.join(":")}`;
  }
}
