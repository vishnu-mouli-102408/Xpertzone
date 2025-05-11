/**
 * The POST function pushes a welcome email message to a Redis queue for processing.
 * @returns The function `POST` is returning a new `Response` object with a status of 200 and a body of
 * "ok".
 */
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
