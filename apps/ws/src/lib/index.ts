import { db } from "@repo/db";

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
