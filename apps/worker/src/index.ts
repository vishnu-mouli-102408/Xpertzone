import { getRedisClient, logger } from "@repo/common";
import dotenv from "dotenv";

import { startEmailWorker } from "./email";

dotenv.config();

const redisClient = getRedisClient();

// console.log("Redis URL:", process.env.REDIS_URL);

async function loopHandler() {
  if (!redisClient) {
    logger.error("Redis client is not initialized");
    return;
  }

  await startEmailWorker(redisClient);
}

redisClient.on("error", (err) => {
  logger.error(err, "Redis Client Error");
});

redisClient.on("connect", () => {
  logger.info("Redis Client Connected");
});

redisClient.on("ready", () => {
  logger.info("Redis Client Ready. Starting loop handler");
  void loopHandler();
});
