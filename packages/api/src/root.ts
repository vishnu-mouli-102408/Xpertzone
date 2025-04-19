import { accountRouter } from "./router/account-router";
import { authRouter } from "./router/auth-router";
import { expertRouter } from "./router/expert-router";
import { healthCheckRouter } from "./router/health-check-router";
import { paymentRouter } from "./router/payment-router";
import { userRouter } from "./router/user-router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  account: accountRouter,
  expert: expertRouter,
  health: healthCheckRouter,
  user: userRouter,
  payment: paymentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
