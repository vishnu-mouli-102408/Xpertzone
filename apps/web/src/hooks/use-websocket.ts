"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export enum MessageType {
  MESSAGE = "MESSAGE",
  ERROR = "ERROR",
  INIT_ACK = "INIT_ACK",
  TYPING = "TYPING",
  PING = "PING",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
  WILDCARD = "*",
}

export type OutGoingMessagePayload = {
  type: MessageType;
  payload: {
    senderId: string;
    receiverId: string;
    content: string;
    contentType: "TEXT" | "IMAGE" | "FILE";
    timestamp: string;
    firstName: string;
    lastName: string;
    profilePic: string;
  };
};

export function useWebSocket(
  url: string,
  options = {
    reconnectOnUnmount: false,
    userId: "",
  }
) {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const messageHandlers = useRef<
    Map<MessageType | string, Set<(data: unknown) => void>>
  >(new Map());

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data);
      const { type, data } = message;

      if (type && messageHandlers.current.has(type)) {
        messageHandlers.current.get(type)?.forEach((handler) => {
          try {
            handler(data ?? message.payload ?? message);
          } catch (err) {
            console.error(`Error in handler for type "${type}":`, err);
          }
        });
      }

      if (messageHandlers.current.has(MessageType.WILDCARD)) {
        messageHandlers.current
          .get(MessageType.WILDCARD)
          ?.forEach((handler) => {
            try {
              handler(message);
            } catch (err) {
              console.error("Error in wildcard handler:", err);
            }
          });
      }
    } catch (error) {
      console.error("Failed to parse WebSocket message:", error);
    }
  }, []);

  const connect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.onclose = null;
      socketRef.current.close();
    }

    try {
      console.log(`Connecting to WebSocket: ${url}`);
      const ws = new WebSocket(url);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log("🟢 WebSocket connected");
        setIsConnected(true);
        // ✅ Send INIT on connect
        const initMessage = {
          type: "INIT",
          payload: { userId: options.userId },
        };

        ws.send(JSON.stringify(initMessage));
      };

      ws.onclose = (event) => {
        console.warn(`🔴 Disconnected: ${event.code} - ${event.reason}`);
        setIsConnected(false);
      };

      ws.onerror = (error) => {
        console.error("❌ WebSocket error:", error);
      };

      ws.onmessage = handleMessage;
    } catch (error) {
      console.error("WebSocket connection failed:", error);
    }
  }, [url, handleMessage, options.userId]);

  const sendMessage = useCallback(
    (
      type: MessageType | string,
      payload: OutGoingMessagePayload["payload"]
    ) => {
      const message = JSON.stringify({ type, payload });

      if (
        !socketRef.current ||
        socketRef.current.readyState !== WebSocket.OPEN
      ) {
        console.warn("WebSocket is not open. Message not sent.");
        return false;
      }

      try {
        socketRef.current.send(message);
        return true;
      } catch (error) {
        console.error("Error sending message:", error);
        return false;
      }
    },
    []
  );

  const on = useCallback(
    (type: MessageType | string, callback: (data: unknown) => void) => {
      if (!messageHandlers.current.has(type)) {
        messageHandlers.current.set(type, new Set());
      }

      messageHandlers.current.get(type)?.add(callback);

      return () => {
        const handlers = messageHandlers.current.get(type);
        if (handlers) {
          handlers.delete(callback);
          if (handlers.size === 0) {
            messageHandlers.current.delete(type);
          }
        }
      };
    },
    []
  );

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close(1000, "Manual disconnect");
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (socketRef.current) {
        const wasConnected = socketRef.current.readyState === WebSocket.OPEN;
        socketRef.current.onclose = null;
        socketRef.current.close();

        if (wasConnected && options.reconnectOnUnmount) {
          console.log(
            "Component unmounted. You may handle reconnect externally."
          );
        }
      }
    };
  }, [connect, options.reconnectOnUnmount]);

  return {
    socket: socketRef.current,
    isConnected,
    sendMessage,
    connect,
    disconnect,
    on,
  };
}
