import { Redis } from "ioredis";

class RateLimiter {
  private client: Redis;

  constructor(redisUrl: string) {
    this.client = new Redis(redisUrl);
  }

  async isAllowed(
    identifier: string,
    limit: number,
    windowSeconds = 60
  ): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
    const key = `rate-limit:${identifier}:${Math.floor(Date.now() / 1000 / windowSeconds)}`;

    const currentCount = await this.client.incr(key);

    if (currentCount === 1) {
      await this.client.expire(key, windowSeconds);
    }

    const remaining = Math.max(0, limit - currentCount);
    const resetIn = await this.client.ttl(key);

    return {
      allowed: currentCount <= limit,
      remaining,
      resetIn: resetIn > 0 ? resetIn : windowSeconds,
    };
  }
}

// ✅ Export a **singleton**

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";
console.log("REDIS_URL", redisUrl);

export const rateLimiter = new RateLimiter(redisUrl);
