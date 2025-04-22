import { logger } from "@repo/common";
import { WebSocket } from "ws";

import { inMemoryStore } from "./store/in-memory";
import { SocketMessageSchema, type SocketMessage } from "./types/types";

export function handleConnection(ws: WebSocket) {
  ws.on("error", (err) => {
    logger.error(err, "❌ WebSocket Error");
  });
  ws.on("close", () => {
    const userId = ws.userId;
    if (userId) {
      inMemoryStore.removeConnection(userId);
    }
    logger.info(`🔒 WebSocket connection closed for ${userId}`);
  });

  ws.send("Hello! You are connected to the WebSocket server.");

  // Handle incoming messages
  ws.on("message", (data) => {
    console.log("DATA", data);

    try {
      let parsedData: string;

      if (data instanceof Buffer) {
        parsedData = JSON.parse(data.toString("utf-8"));
      } else if (typeof data === "string") {
        parsedData = data;
      } else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
        parsedData = Buffer.from(data).toString("utf-8");
      } else if (Array.isArray(data)) {
        parsedData = Buffer.concat(
          data.map((chunk) =>
            Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
          )
        ).toString("utf-8");
      } else {
        logger.error("Unexpected data format received");
        ws.send(
          JSON.stringify({ type: "ERROR", message: "Invalid data format" })
        );
        throw new Error("Unexpected data format received");
      }

      const message: SocketMessage = SocketMessageSchema.parse(parsedData);
      logger.info(message, "📩 Received message");

      if (message.type === "INIT") {
        const { userId } = message.payload;
        if (userId) {
          ws.userId = userId;
          logger.info(`User ${userId} initialized`);
          inMemoryStore.addConnection(userId, ws);

          ws.send(
            JSON.stringify({
              type: "INIT_ACK",
              message: "Initialization successful",
            })
          );
        }
      }

      if (message.type === "MESSAGE") {
        try {
          const { content, contentType, receiverId, senderId, timestamp } =
            message.payload;
          const isReceiverOnline = inMemoryStore.hasConnection(receiverId);
          if (isReceiverOnline) {
            const receiverSocket = inMemoryStore.getConnection(receiverId);
            if (receiverSocket) {
              receiverSocket.send(
                JSON.stringify({
                  type: "MESSAGE",
                  payload: {
                    content,
                    contentType,
                    senderId,
                    timestamp,
                  },
                })
              );
            } else {
              logger.warn("Receiver Socket Might be Offline");
              ws.send(
                JSON.stringify({
                  type: "ERROR",
                  message: "Receiver Socket Might be Offline",
                })
              );
            }
          } else {
            logger.warn("Receiver is not online");
            ws.send(
              JSON.stringify({
                type: "ERROR",
                message: "Receiver is not online",
              })
            );
          }

          // Store the message in the batch
          inMemoryStore.addMessageToBatch(receiverId, message.payload);
        } catch (error) {
          logger.error(error, "❌ Error processing message");
          ws.send(
            JSON.stringify({
              type: "ERROR",
              message: "Error processing message",
            })
          );
        }
      }
    } catch (error) {
      logger.error(error, "❌ Error handling message");

      ws.send(
        JSON.stringify({ type: "ERROR", message: "Invalid payload format" })
      );
    }
  });
}
