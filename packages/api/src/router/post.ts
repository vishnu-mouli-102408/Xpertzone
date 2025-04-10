import type { TRPCRouterRecord } from "@trpc/server";

import { publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure.query(() => {
    return {
      id: 1,
      title: "Hello World",
      content: "This is a test post",
      published: true,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }),
} satisfies TRPCRouterRecord;
