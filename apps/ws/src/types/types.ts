import { z } from "zod";

// Define individual payloads
const InitPayload = z.object({
  userId: z.string(),
});

const MessagePayload = z.object({
  senderId: z.string().min(1, "senderId must be a non-empty string"),
  receiverId: z.string().min(1, "receiverId must be a non-empty string"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profilePic: z.string().optional(),
  content: z.string().min(1, "content must be a non-empty string"),
  contentType: z.enum(["TEXT", "IMAGE", "FILE"]).default("TEXT"),
  timestamp: z
    .string()
    .optional()
    .default(() => new Date().toISOString()),
});

const TypingPayload = z.object({
  senderId: z.string().min(1, "senderId must be a non-empty string"),
  receiverId: z.string().min(1, "receiverId must be a non-empty string"),
  typing: z.boolean(),
});

// types for online and offline
const OnlinePayload = z.object({
  userId: z.string().min(1, "userId must be a non-empty string"),
  online: z.boolean(),
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
  z.object({
    type: z.literal("TYPING"),
    payload: TypingPayload,
  }),
  z.object({
    type: z.literal("ONLINE"),
    payload: OnlinePayload,
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
export type TypingPayloadType = z.infer<typeof TypingPayload>;
export type OnlinePayloadType = z.infer<typeof OnlinePayload>;
export type SocketMessagePayload = z.infer<
  typeof SocketMessageSchema
>["payload"];

export type SocketMessage = z.infer<typeof SocketMessageSchema>;
