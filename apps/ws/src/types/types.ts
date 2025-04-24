import { z } from "zod";

// Define individual payloads
const InitPayload = z.object({
  userId: z.string(),
});

const MessagePayload = z.object({
  senderId: z.string().min(1, "senderId must be a non-empty string"),
  receiverId: z.string().min(1, "receiverId must be a non-empty string"),
  content: z.string().min(1, "content must be a non-empty string"),
  contentType: z.enum(["TEXT", "IMAGE", "VIDEO"]),
  timestamp: z
    .string()
    .optional()
    .default(() => new Date().toISOString()),
});

// Discriminated union based on 'type'
export const SocketMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("INIT"),
    payload: InitPayload,
  }),
  z.object({
    type: z.literal("MESSAGE"),
    payload: MessagePayload,
  }),
  // Add more types like 'TYPING', 'PING', etc.
]);

export enum OutGoingSocketMessageType {
  MESSAGE = "MESSAGE",
  ERROR = "ERROR",
  INIT_ACK = "INIT_ACK",
  TYPING = "TYPING",
  PING = "PING",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
}

export enum InComingSocketMessageType {
  INIT = "INIT",
  MESSAGE = "MESSAGE",
  TYPING = "TYPING",
}

export type SocketMessageType = z.infer<typeof SocketMessageSchema>["type"];
export type InitPayloadType = z.infer<typeof InitPayload>;
export type MessagePayloadType = z.infer<typeof MessagePayload>;
export type SocketMessagePayload = z.infer<
  typeof SocketMessageSchema
>["payload"];

export type SocketMessage = z.infer<typeof SocketMessageSchema>;
