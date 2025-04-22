import { z } from "zod";

// Define individual payloads
const InitPayload = z.object({
  userId: z.string(),
});

const MessagePayload = z.object({
  from: z.string(),
  to: z.string(),
  content: z.string().min(1),
  contentType: z.enum(["TEXT", "IMAGE", "VIDEO"]),
  timestamp: z.string().optional(),
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

export type SocketMessage = z.infer<typeof SocketMessageSchema>;
