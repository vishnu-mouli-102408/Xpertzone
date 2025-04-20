import type { Plan } from "@repo/db";
import Stripe from "stripe";

import { logger } from "./logger";

let stripe: Stripe | null = null;

export const getStripe = () => {
  if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
    logger.error(
      "[Stripe] STRIPE_SECRET_KEY is not set. Please set it in your environment variables."
    );
    throw new Error("STRIPE_SECRET_KEY not set");
  }

  stripe ??= new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
    apiVersion: "2025-03-31.basil",
  });

  return stripe;
};

export const createCheckoutSession = async ({
  userId,
  plan,
  customerId,
}: {
  userId: string;
  plan: Plan;
  customerId: string;
}) => {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price:
          plan === "PRO"
            ? process.env.NEXT_PUBLIC_PRO_PLAN_PRICE_ID
            : plan === "ENTERPRISE"
              ? process.env.NEXT_PUBLIC_ENTERPRISE_PLAN_PRICE_ID
              : "",
        quantity: 1,
      },
    ],
    mode: "subscription",
    customer_update: {
      name: "auto",
      address: "auto",
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/user/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/user/billing?canceled=true`,
    metadata: {
      userId,
    },
  });

  return session;
};

export { Stripe };
