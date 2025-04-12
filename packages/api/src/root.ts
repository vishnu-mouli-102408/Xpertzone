import { accountRouter } from "./router/account-router";
import { authRouter } from "./router/auth-router";
import { expertRouter } from "./router/expert-router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  account: accountRouter,
  expert: expertRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
