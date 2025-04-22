import { WebSocket } from "ws";

class InMemoryStore {
  private static instance: InMemoryStore;
  private connections: Map<string, WebSocket>;
  private onlineStatus: Map<string, boolean>;

  private constructor() {
    this.connections = new Map();
    this.onlineStatus = new Map();
  }

  // Singleton accessor
  public static getInstance(): InMemoryStore {
    if (!InMemoryStore.instance) {
      InMemoryStore.instance = new InMemoryStore();
    }
    return InMemoryStore.instance;
  }

  public addConnection(userId: string, socket: WebSocket): void {
    const existing = this.connections.get(userId);
    if (existing && existing !== socket) {
      existing.close();
    }
    this.connections.set(userId, socket);
    this.setOnlineStatus(userId, true);
  }

  public getConnection(userId: string): WebSocket | undefined {
    return this.connections.get(userId);
  }

  public setOnlineStatus(userId: string, status: boolean): void {
    this.onlineStatus.set(userId, status);
  }

  public getOnlineStatus(userId: string): boolean {
    return this.onlineStatus.get(userId) ?? false; // Default to false if not set
  }

  public hasConnection(userId: string): boolean {
    return this.connections.has(userId);
  }

  public removeConnection(userId: string): void {
    this.connections.delete(userId);
    this.setOnlineStatus(userId, false);
  }

  public getAllConnections(): Map<string, WebSocket> {
    return this.connections;
  }

  public getOnlineUserIds(): string[] {
    return Array.from(this.onlineStatus.entries())
      .filter(([_, status]) => status)
      .map(([userId]) => userId);
  }
}

export const inMemoryStore = InMemoryStore.getInstance();
