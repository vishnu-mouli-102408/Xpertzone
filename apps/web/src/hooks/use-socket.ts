import { io, Socket } from "socket.io-client";

type SocketInstance = Socket;

const SOCKET_CONFIG = {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true,
};

// Create a singleton instance
let socketInstance: SocketInstance | null = null;

// Function to get or create socket instance
export const getSocket = (): SocketInstance => {
  socketInstance ??= io("http://localhost:4001", SOCKET_CONFIG);
  return socketInstance;
};
