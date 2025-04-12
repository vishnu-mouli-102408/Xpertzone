import { OK } from "@repo/common";

import { publicProcedure } from "../trpc";

export const healthCheckRouter = {
  healthCheck: publicProcedure.query(() => {
    return {
      message: "Server is up and running",
      success: true,
      code: OK,
    };
  }),
};
