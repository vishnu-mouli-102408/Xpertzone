import { db } from "@repo/db";

export async function GET() {
  try {
    await db.call.updateMany({
      where: {
        status: "SCHEDULED",
        endedAt: {
          lte: new Date(),
        },
      },
      data: {
        status: "COMPLETED",
      },
    });

    return new Response("Calls updated successfully", { status: 200 });
  } catch (error) {
    console.log("ERROR", error);
    return new Response("Error", { status: 500 });
  }
}
