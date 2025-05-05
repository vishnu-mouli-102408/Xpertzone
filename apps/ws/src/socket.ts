import type { IncomingMessage } from "http";
import { logger } from "@repo/common";
import { db } from "@repo/db";
import { rateLimiter } from "@repo/rate-limit";
import { WebSocket } from "ws";

import { checkIfUserExistsInDB } from "./lib";
import { inMemoryStore } from "./store/in-memory";
import {
  InComingSocketMessageType,
  OutGoingSocketMessageType,
  SocketMessageSchema,
  type SocketMessage,
} from "./types/types";

setInterval(() => {
  void (async () => {
    try {
      const allMessages = inMemoryStore.getAllMessages();
      const parsedData = Array.from(allMessages.values()).flat();
      //   console.log("Parsed Data", parsedData);

      if (parsedData.length === 0 || !parsedData) return;
      const dataToSave = parsedData.map((message) => ({
        messageType: message.contentType,
        receiverId: message.receiverId,
        senderId: message.senderId,
        content: message.content,
        sentAt: new Date(message.timestamp),
      }));

      await db.message.createMany({
        data: dataToSave,
        skipDuplicates: true,
      });

      // Clear the in-memory store after saving to the database
      inMemoryStore.removeMessagesFromBatch(allMessages);
    } catch (error) {
      logger.error(error, "❌ Error saving messages to the database");
    }
  })();
}, 5000);

export function handleConnection(ws: WebSocket, req: IncomingMessage) {
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

  ws.send(
    JSON.stringify({
      type: OutGoingSocketMessageType.PING,
      message: "Hello! You are connected to the WebSocket server.",
    })
  );

  // Handle incoming messages
  ws.on("message", (data) => {
    // console.log("DATA", data);

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
          JSON.stringify({
            type: OutGoingSocketMessageType.ERROR,
            message: "Invalid data format",
          })
        );
        throw new Error("Unexpected data format received");
      }

      const message: SocketMessage = SocketMessageSchema.parse(parsedData);
      logger.info(message, "📩 Received message");

      const forwardedFor = req?.headers?.["x-forwarded-for"];
      const ip =
        req.socket.remoteAddress ??
        (Array.isArray(forwardedFor)
          ? forwardedFor[0]
          : forwardedFor?.split(",")[0]?.trim());
      logger.info(`Received message from IP: ${ip}`);

      void (async () => {
        const { allowed, resetIn } = await rateLimiter.isAllowed(
          ip ?? "",
          100,
          60
        );

        if (!allowed) {
          logger.warn(`Rate limit exceeded for IP: ${ip}`);
          ws.send(
            JSON.stringify({
              type: OutGoingSocketMessageType.TOO_MANY_REQUESTS,
              message: `Rate limit exceeded. Try again in ${resetIn} seconds.`,
            })
          );
          return;
        }
      })();

      if (message.type === InComingSocketMessageType.INIT) {
        const { userId } = message.payload;

        if (!userId) {
          logger.warn("User ID is required for initialization");
          ws.send(
            JSON.stringify({
              type: OutGoingSocketMessageType.ERROR,
              message: "User ID is required",
            })
          );
          return;
        }

        const isUserExists = inMemoryStore.hasConnection(userId);
        if (isUserExists) {
          logger.warn(`User ${userId} already exists`);
          ws.send(
            JSON.stringify({
              type: OutGoingSocketMessageType.ERROR,
              message: "User already Connected to the server",
            })
          );
          return;
        }

        void (async () => {
          try {
            const userExistsInDb = await checkIfUserExistsInDB(userId);
            if (userExistsInDb && userId) {
              ws.userId = userId;
              logger.info(`User ${userId} initialized`);
              inMemoryStore.addConnection(userId, ws);

              ws.send(
                JSON.stringify({
                  type: OutGoingSocketMessageType.INIT_ACK,
                  message: "Initialization successful",
                })
              );
            }
            if (!userExistsInDb) {
              logger.warn(`User ${userId} does not exist in the database`);
              ws.send(
                JSON.stringify({
                  type: OutGoingSocketMessageType.ERROR,
                  message: "User does not exist in the database",
                })
              );
              return;
            }
          } catch (error) {
            logger.error(error, "❌ Error checking user existence in DB");
            ws.send(
              JSON.stringify({
                type: OutGoingSocketMessageType.ERROR,
                message: "Error checking user existence",
              })
            );
          }
        })();
      }

      if (message.type === InComingSocketMessageType.MESSAGE) {
        try {
          const {
            content,
            contentType,
            receiverId,
            senderId,
            timestamp,
            firstName,
            lastName,
            profilePic,
          } = message.payload;

          if (!content || !receiverId || !senderId) {
            logger.warn("Invalid message payload");
            ws.send(
              JSON.stringify({
                type: OutGoingSocketMessageType.ERROR,
                message: "Invalid message payload",
              })
            );
            return;
          }

          const isSenderExists = inMemoryStore.hasConnection(senderId);
          if (!isSenderExists) {
            logger.warn("Sender is not available in the store");
            ws.send(
              JSON.stringify({
                type: OutGoingSocketMessageType.ERROR,
                message: "Sender is Not Connected to the Server",
              })
            );
            return;
          }

          const isReceiverOnline = inMemoryStore.hasConnection(receiverId);
          if (isReceiverOnline) {
            const receiverSocket = inMemoryStore.getConnection(receiverId);
            if (receiverSocket) {
              receiverSocket.send(
                JSON.stringify({
                  type: OutGoingSocketMessageType.MESSAGE,
                  payload: {
                    content,
                    contentType,
                    senderId,
                    timestamp,
                    receiverId,
                    firstName,
                    lastName,
                    profilePic,
                  },
                })
              );
            } else {
              logger.warn("Receiver Socket Might be Offline");
              ws.send(
                JSON.stringify({
                  type: OutGoingSocketMessageType.ERROR,
                  message: "Receiver Socket Might be Offline",
                })
              );
            }
          } else {
            logger.warn("Receiver is not online");
            ws.send(
              JSON.stringify({
                type: OutGoingSocketMessageType.ERROR,
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
              type: OutGoingSocketMessageType.ERROR,
              message: "Error processing message",
            })
          );
        }
      }
    } catch (error) {
      logger.error(error, "❌ Error handling message");

      ws.send(
        JSON.stringify({
          type: OutGoingSocketMessageType.ERROR,
          message: "Invalid payload format",
        })
      );
    }
  });
}
