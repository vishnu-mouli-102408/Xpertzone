import { z } from "zod";

export const UserSchema = z.object({
  socketId: z.string(),
  isInitiator: z.boolean().default(false),
});

export type User = z.infer<typeof UserSchema>;

export const RoomSchema = z.object({
  roomId: z.string(),
  users: z.array(UserSchema).max(2), // Only 2 allowed
});

export type Room = z.infer<typeof RoomSchema>;

export const JoinRoomPayloadSchema = z.object({
  roomId: z.string(),
});

export type JoinRoomPayload = z.infer<typeof JoinRoomPayloadSchema>;

export const EventTypeSchema = z.enum(["OFFER", "ANSWER", "ICE_CANDIDATE"]);

export type EventType = z.infer<typeof EventTypeSchema>;

export const EventSchema = z.object({
  type: EventTypeSchema,
  payload: z.object({
    sdp: z.string().optional(),
    candidate: z.string().optional(),
  }),
});

export type Event = z.infer<typeof EventSchema>;
