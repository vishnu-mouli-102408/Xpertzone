import { Server, Socket } from "socket.io";

import {
  EventTypeSchema,
  JoinRoomPayloadSchema,
  type Event,
  type EventType,
  type JoinRoomPayload,
} from "../types";
import { roomManager } from "./room-manager";

export class UserManager {
  constructor(private io: Server) {}

  addUser(socket: Socket) {
    socket.on("join-room", (payload: JoinRoomPayload) => {
      const parsedPayload = JoinRoomPayloadSchema.safeParse(payload);
      if (!parsedPayload.success) {
        socket.emit("invalid-payload");
        return;
      }

      const { roomId } = parsedPayload.data;

      const user = roomManager.addUserToRoom(roomId, socket.id);

      if (!user) {
        socket.emit("room-full");
        return;
      }

      void socket.join(roomId);
      socket.data.roomId = roomId;
      socket.data.isInitiator = user.isInitiator;

      console.log(
        `User ${socket.id} joined room ${roomId} as ${user.isInitiator ? "Initiator" : "Receiver"}`
      );

      if (user.isInitiator) {
        socket.emit("role", { isInitiator: true });
      } else {
        socket.emit("role", { isInitiator: false });
        // Notify initiator that receiver joined
        const otherId = roomManager.getOtherUser(roomId, socket.id);
        if (otherId) this.io.to(otherId).emit("ready");
      }

      this.initHandlers(socket);
    });
  }

  initHandlers(socket: Socket) {
    const forward = (event: EventType) => {
      socket.on(event, (payload: Event["payload"]) => {
        const roomId = socket.data.roomId;
        const targetId = roomManager.getOtherUser(roomId, socket.id);
        if (targetId) {
          this.io.to(targetId).emit(event, { from: socket.id, ...payload });
        }
      });
    };

    forward(EventTypeSchema.Enum.ANSWER);
    forward(EventTypeSchema.Enum.OFFER);
    forward(EventTypeSchema.Enum.ICE_CANDIDATE);
  }
}
