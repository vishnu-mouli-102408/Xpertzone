import { db } from "@repo/db";

import { inMemoryStore } from "../store/in-memory";
import type { OnlinePayloadType } from "../types/types";

export async function checkIfUserExistsInDB(userId: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return false;
  }
  return true;
}

export function broadCastStatus(userId: string, status: "online" | "offline") {
  const payload: OnlinePayloadType = {
    online: status === "online",
    userId: userId,
  };

  const allConnections = inMemoryStore.getAllConnections();
  console.log("Broadcasting status to all connections:", allConnections.size);

  for (const [, socket] of allConnections) {
    socket.send(
      JSON.stringify({
        type: "ONLINE",
        payload: payload,
      })
    );
  }
}
