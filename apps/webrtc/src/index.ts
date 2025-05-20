import http from "http";
import { logger } from "@repo/common";
import { Server, Socket } from "socket.io";

import { roomManager } from "./managers/room-manager";
import { UserManager } from "./managers/user-manager";
import { EventTypeSchema } from "./types";

const PORT = 4001;

function setupWebrtcSignallingServer(httpServer: http.Server) {
  const io = new Server(httpServer, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const userManager = new UserManager();
  io.on("error", (err) => {
    logger.error(err, "❌ Socket.io error");
  });
  io.on("connection", (socket: Socket) => {
    console.log("a user connected");
    userManager.addUser(socket);
    socket.on("disconnect", () => {
      const userId = socket.data.userId;
      console.log("userId in disconnect", userId);
      const roomId = socket.data.roomId;

      roomManager.removeUser(userId);
      const targetUser = roomManager.getOtherUser(roomId, userId);
      if (targetUser) {
        targetUser.socket.emit(EventTypeSchema.Enum.PEER_DISCONNECTED, {
          socketId: socket.id,
          userId,
        });
      }
      socket.disconnect();
    });
  });

  return io;
}

const httpServer = http.createServer((req, res) => {
  if (req.url === "/healthz") {
    res.writeHead(200);
    res.end("OK");
  }
});
const io = setupWebrtcSignallingServer(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Webrtc Signalling Server running on ws://localhost:${PORT}`);
});

httpServer.on("error", (err) => {
  logger.error(err, "❌ Failed to start the server");
  process.exit(1);
});

// Graceful shutdown
const shutdownGracefully = () => {
  logger.info(`Worker ${process.pid} is shutting down...`);

  httpServer.close(() => {
    logger.info(`Worker ${process.pid} HTTP server closed`);
    process.exit(0);
  });

  void io.close(() => {
    logger.info(`Worker ${process.pid} WebSocket server closed`);
  });

  // Force exit after timeout if something hangs
  setTimeout(() => {
    logger.warn("Forcing exit after timeout");
    process.exit(1);
  }, 10000);
};

// Handle termination signals
process.on("SIGINT", shutdownGracefully);
process.on("SIGTERM", shutdownGracefully);

// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", (err) => {
  logger.fatal(err, "UNCAUGHT EXCEPTION");
  shutdownGracefully();
});
