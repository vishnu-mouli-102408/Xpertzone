import type { TRPCRouterRecord } from "@trpc/server";

import { publicProcedure } from "../trpc";

export const postRouter = {
  health: publicProcedure.query(({ ctx }) => {
    return {
      message: "OK",
      timestamp: new Date().toISOString(),
      code: 200,
      data: ctx.user?.bio,
    };
  }),
} satisfies TRPCRouterRecord;
