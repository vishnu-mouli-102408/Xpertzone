import { EMAIL_QUEUE_NAME, getRedisClient } from "@repo/common";

export async function POST() {
  const redis = getRedisClient();

  await redis.lpush(
    EMAIL_QUEUE_NAME,
    JSON.stringify({
      email: "vishnumouli1@gmail.com",
      name: "Vishnu",
      subject: "Welcome to our service",
      type: "welcome",
    })
  );

  return new Response("ok", { status: 200 });
}
