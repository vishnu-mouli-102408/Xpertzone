import { createServer } from "http";
import { logger } from "@repo/common";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";

import { handleConnection } from "./socket";

declare module "ws" {
  interface WebSocket {
    userId?: string;
  }
}

dotenv.config();

const PORT = 4000;

function setupWebSocketServer(httpServer: ReturnType<typeof createServer>) {
  const wss = new WebSocketServer({
    server: httpServer,
    // Enable ping-pong heartbeat
    clientTracking: true,
    perMessageDeflate: {
      zlibDeflateOptions: {
        level: 6, // Balance between CPU usage and compression ratio
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024,
      },
      concurrencyLimit: 10, // Limit concurrent deflate operations
      threshold: 1024, // Only compress messages larger than 1KB
    },
  });

  wss.on("connection", (ws, req) => {
    handleConnection(ws, req);
  });

  return wss;
}

const httpServer = createServer();
const wss = setupWebSocketServer(httpServer);

httpServer.listen(PORT, () => {
  logger.info(`WebSocket server running on ws://localhost:${PORT}`);
});

httpServer.on("error", (err) => {
  logger.error(err, "❌ Failed to start the server");
  process.exit(1);
});

// Graceful shutdown
const shutdownGracefully = () => {
  logger.info(`Worker ${process.pid} is shutting down...`);

  // Close WebSocket server first to stop accepting new connections
  wss.close(() => {
    logger.info(`Worker ${process.pid} WebSocket server closed`);

    // Finally close the HTTP server
    httpServer.close(() => {
      logger.info(`Worker ${process.pid} HTTP server closed`);
      process.exit(0);
    });

    // Force exit after timeout if something hangs
    setTimeout(() => {
      logger.warn("Forcing exit after timeout");
      process.exit(1);
    }, 10000);
  });

  wss.clients.forEach((client) => {
    client.close();
  });
};

// Handle termination signals
process.on("SIGINT", shutdownGracefully);
process.on("SIGTERM", shutdownGracefully);

// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", (err) => {
  logger.fatal(err, "UNCAUGHT EXCEPTION");
  shutdownGracefully();
});

process.on("unhandledRejection", (reason, promise) => {
  logger.fatal({ reason, promise }, "UNHANDLED REJECTION");
  shutdownGracefully();
});
