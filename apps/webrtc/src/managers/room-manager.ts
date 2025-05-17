import type { User } from "../types";

class RoomManager {
  private rooms = new Map<string, User[]>();

  addUserToRoom(roomId: string, socketId: string): User | null {
    const users = this.rooms.get(roomId) ?? [];

    if (users.length >= 2) {
      return null; // Room full
    }

    const isInitiator = users.length === 0;
    const newUser: User = { socketId, isInitiator };
    this.rooms.set(roomId, [...users, newUser]);

    return newUser;
  }

  removeUser(socketId: string): void {
    for (const [roomId, users] of this.rooms.entries()) {
      const updated = users.filter((u) => u.socketId !== socketId);
      if (updated.length === 0) {
        this.rooms.delete(roomId);
      } else {
        this.rooms.set(roomId, updated);
      }
    }
  }

  getOtherUser(roomId: string, socketId: string): string | null {
    const users = this.rooms.get(roomId) ?? [];
    const other = users.find((u) => u.socketId !== socketId);
    return other?.socketId ?? null;
  }

  getRoom(roomId: string): User[] {
    return this.rooms.get(roomId) ?? [];
  }
}

export const roomManager = new RoomManager();
