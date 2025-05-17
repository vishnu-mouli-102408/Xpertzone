import { Socket } from "socket.io";
import { z } from "zod";

export const UserSchema = z.object({
  userId: z.string(),
  socket: z.custom<Socket>((val) => val instanceof Socket, {
    message: "Invalid socket instance",
  }),
});

export type User = z.infer<typeof UserSchema>;

export const RoomSchema = z.object({
  roomId: z.string(),
  users: z.array(UserSchema).max(2),
});

export type Room = z.infer<typeof RoomSchema>;

export const JoinRoomPayloadSchema = z.object({
  roomId: z.string(),
  userId: z.string(),
});

export type JoinRoomPayload = z.infer<typeof JoinRoomPayloadSchema>;

export const EventTypeSchema = z.enum([
  "OFFER",
  "ANSWER",
  "ICE_CANDIDATE",
  "READY",
  "JOIN_ROOM",
  "PEER_DISCONNECTED",
  "PEER_CONNECTED",
  "ROLE",
  "INVALID_PAYLOAD",
  "ROOM_FULL",
  "USER_ALREADY_IN_ROOM",
  "SEND_OFFER",
  "CONNECTED",
  "WAITING_FOR_MATCH",
]);

export type EventType = z.infer<typeof EventTypeSchema>;

export const EventSchema = z.object({
  type: EventTypeSchema,
  payload: z.object({
    sdp: z.string().optional(),
    candidate: z.string().optional(),
    type: z.enum(["SENDER", "RECEIVER"]).optional(),
  }),
});

export type Event = z.infer<typeof EventSchema>;
