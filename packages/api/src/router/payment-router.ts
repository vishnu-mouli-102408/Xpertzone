import { createCheckoutSession, getStripe } from "@repo/common";
import z from "zod";

import { protectedProcedure } from "../trpc";

export const paymentRouter = {
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        plan: z.enum(["PRO", "ENTERPRISE"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { plan } = input;
      const { user } = ctx;
      const stripe = getStripe();

      const existingCustomerData = await stripe.customers.list({
        email: user.email,
        limit: 1,
      });

      let customerId =
        existingCustomerData?.data?.length > 0
          ? existingCustomerData?.data?.[0]?.id
          : null;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: {
            userId: user.id,
            plan: plan,
          },
        });
        customerId = customer.id;
      }

      const session = await createCheckoutSession({
        customerId: customerId,
        userId: user.id,
        plan: plan,
      });

      return {
        url: session.url,
      };
    }),
};
