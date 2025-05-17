import { Socket } from "socket.io";

import { type User } from "../types";

class RoomManager {
  private rooms = new Map<string, User[]>();
  private userRooms = new Map<string, string>();
  addUserToRoom(roomId: string, userId: string, socket: Socket): User | null {
    // User already in a room
    if (this.userRooms.has(userId)) {
      const users = this.rooms.get(roomId) ?? [];
      return users.find((u) => u.userId === userId) ?? null;
    }

    const users = this.rooms.get(roomId) ?? [];

    if (users.length >= 2) {
      console.log("ROOM FULL");
      return null;
    }

    const updatedUsers = [...users, { userId, socket }];
    this.rooms.set(roomId, updatedUsers);
    this.userRooms.set(userId, roomId);

    return { userId, socket };
  }

  removeUser(userId: string): void {
    const roomId = this.userRooms.get(userId);
    if (!roomId) return;

    const users = this.rooms.get(roomId) ?? [];
    const updated = users.filter((u) => u.userId !== userId);

    if (updated.length === 0) {
      this.rooms.delete(roomId);
    } else {
      this.rooms.set(roomId, updated);
    }

    // Remove user from tracking
    this.userRooms.delete(userId);
  }

  getOtherUser(roomId: string, userId: string): User | null {
    const users = this.rooms.get(roomId) ?? [];
    const other = users.find((u) => u.userId !== userId);
    return other ?? null;
  }

  getRoom(roomId: string): User[] {
    return this.rooms.get(roomId) ?? [];
  }

  getUserRoom(userId: string): string | null {
    return this.userRooms.get(userId) ?? null;
  }

  checkIfUserAlreadyInRoom(userId: string): User | null {
    const roomId = this.userRooms.get(userId);
    if (!roomId) return null;

    const users = this.rooms.get(roomId) ?? [];
    return users.find((u) => u.userId === userId) ?? null;
  }
}

export const roomManager = new RoomManager();
