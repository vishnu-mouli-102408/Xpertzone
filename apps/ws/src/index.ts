import { createServer } from "http";
import { getRedisClient, logger } from "@repo/common";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";

dotenv.config();

const redisClient = getRedisClient();

function setupWebSocketServer(server: ReturnType<typeof createServer>) {
  const wss = new WebSocketServer({ server });
  // wss.on('connection', handleConnection);

  return wss;
}

function setupRedisClient(onReady: () => void) {
  redisClient.on("error", (err) => {
    logger.error(err, "Redis Client Error");
  });

  redisClient.on("connect", () => {
    logger.info("Redis Client Connected");
  });

  redisClient.on("ready", () => {
    logger.info("Redis Client Ready. Starting loop handler");
    onReady();
  });
}

const server = createServer();
setupWebSocketServer(server);

setupRedisClient(() => {
  server.listen(4000, () => {
    logger.info("WebSocket server is running on ws://localhost:4000");
  });
});

server.on("error", (err) => {
  logger.error(err, "Failed to start the server");
  process.exit(1);
});

process.on("SIGINT", () => {
  logger.info("Shutting down gracefully...");
  void redisClient.quit();
  server.close(() => {
    logger.info("Server closed.");
    process.exit(0);
  });
});
