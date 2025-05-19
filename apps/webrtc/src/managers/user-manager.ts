import { Socket } from "socket.io";

import {
  EventTypeSchema,
  JoinRoomPayloadSchema,
  type Event,
  type JoinRoomPayload,
} from "../types";
import { roomManager } from "./room-manager";

export class UserManager {
  addUser(socket: Socket) {
    console.log("INSIDE ADD USER");

    socket.on(EventTypeSchema.Enum.JOIN_ROOM, (payload: JoinRoomPayload) => {
      console.log("ON JOIN ROOM", payload);

      const parsedPayload = JoinRoomPayloadSchema.safeParse(payload);
      console.log("PARSED PAYLOAD", parsedPayload);

      if (!parsedPayload.success) {
        socket.emit(EventTypeSchema.Enum.INVALID_PAYLOAD);
        return;
      }

      const { roomId, userId } = parsedPayload.data;
      console.log("PAYLOAD", parsedPayload.data);

      const ifRoomExists = roomManager.getRoom(roomId);
      if (ifRoomExists.length >= 2) {
        socket.emit(EventTypeSchema.Enum.ROOM_FULL);
        return;
      }

      const userAlreadyInRoom = roomManager.checkIfUserAlreadyInRoom(userId);
      if (userAlreadyInRoom) {
        socket.emit(EventTypeSchema.Enum.USER_ALREADY_IN_ROOM);
        return;
      }

      const user = roomManager.addUserToRoom(roomId, userId, socket);
      if (!user) {
        socket.emit(EventTypeSchema.Enum.ROOM_FULL);
        return;
      }

      socket.data.roomId = roomId;
      socket.data.userId = userId;

      console.log(`User ${userId} joined room ${roomId}`);

      const usersInRoom = roomManager.getRoom(roomId);
      console.log("USERS IN ROOM", usersInRoom.length, usersInRoom);

      // ✅ Only emit SEND_OFFER to the first user when 2 users are in the room
      if (usersInRoom.length === 2) {
        const [user1, _user2] = usersInRoom;
        // Tell the first user to send offer
        console.log("EMITTING SEND OFFER", user1?.userId);
        user1?.socket.emit(EventTypeSchema.Enum.SEND_OFFER);
      }

      this.initHandlers(socket);
    });
  }

  initHandlers(socket: Socket) {
    console.log("INIT HANDLERS");

    socket.on(EventTypeSchema.Enum.OFFER, (payload: Event["payload"]) => {
      console.log("OFFER", payload);
      const roomId = socket.data.roomId;
      const targetUser = roomManager.getOtherUser(roomId, socket.data.userId);
      console.log("TARGET USER IN OFFER", targetUser?.userId);

      if (targetUser) {
        targetUser.socket.emit(EventTypeSchema.Enum.OFFER, payload?.sdp);
      }
    });

    socket.on(
      EventTypeSchema.Enum.ICE_CANDIDATE,
      (payload: Event["payload"]) => {
        console.log("ICE CANDIDATE", payload);
        const roomId = socket.data.roomId;
        const targetUser = roomManager.getOtherUser(roomId, socket.data.userId);
        console.log("TARGET USER IN ICE CANDIDATE", targetUser?.userId);

        if (targetUser) {
          targetUser.socket.emit(EventTypeSchema.Enum.ICE_CANDIDATE, payload);
        }
      }
    );

    socket.on(EventTypeSchema.Enum.ANSWER, (payload: Event["payload"]) => {
      console.log("ANSWER", payload);
      const roomId = socket.data.roomId;
      const targetUser = roomManager.getOtherUser(roomId, socket.data.userId);
      if (targetUser) {
        targetUser.socket.emit(EventTypeSchema.Enum.ANSWER, payload?.sdp);
      }
    });

    socket.on(EventTypeSchema.Enum.NEGO_NEEDED, (payload: Event["payload"]) => {
      console.log("NEGO NEEDED", payload);
      const roomId = socket.data.roomId;
      const targetUser = roomManager.getOtherUser(roomId, socket.data.userId);
      if (targetUser) {
        targetUser.socket.emit(EventTypeSchema.Enum.NEGO_NEEDED, payload?.sdp);
      }
    });

    socket.on(EventTypeSchema.Enum.NEGO_DONE, (payload: Event["payload"]) => {
      console.log("NEGO DONE", payload);
      const roomId = socket.data.roomId;
      const targetUser = roomManager.getOtherUser(roomId, socket.data.userId);
      if (targetUser) {
        targetUser.socket.emit(EventTypeSchema.Enum.NEGO_DONE, payload?.sdp);
      }
    });

    // Add handler for camera state changes
    socket.on(
      EventTypeSchema.Enum.CAMERA_STATE_CHANGE,
      (payload: { isCameraOn: boolean }) => {
        console.log("CAMERA STATE CHANGE", payload);
        const roomId = socket.data.roomId;
        const targetUser = roomManager.getOtherUser(roomId, socket.data.userId);
        console.log("TARGET USER IN CAMERA STATE CHANGE", targetUser?.userId);
        if (targetUser) {
          targetUser.socket.emit(
            EventTypeSchema.Enum.CAMERA_STATE_CHANGE,
            payload
          );
        }
      }
    );
  }
}
