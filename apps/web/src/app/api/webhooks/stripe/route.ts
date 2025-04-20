import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import env from "@/src/env";
import { getStripe, type Stripe } from "@repo/common";
import { db } from "@repo/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") ?? "";

  let event: Stripe.Event;

  const stripe = getStripe();

  try {
    console.log("Attempting to construct webhook event");
    event = stripe.webhooks.constructEvent(
      body,
      signature ?? "",
      env.STRIPE_WEBHOOK_SECRET ?? ""
    );
    console.log("Webhook event constructed successfully:", event.type);
  } catch (error) {
    console.error("Webhook construction failed:", error);
    return new Response(`Webhook Error: ${(error as Error).message}`, {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object;
      const metadata = session.metadata;
      const customerId = session.customer;

      if (!customerId) {
        console.error("No customer ID found in session metadata");
        return new Response("No customer ID found", { status: 400 });
      }

      //   const customer = await stripe.customers.retrieve(customerId as string);

      const userId = metadata?.userId;

      if (!userId) {
        console.error("No user ID found in session metadata");
        return new Response("No user ID found", { status: 400 });
      }

      const updatedUser = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          customerId: customerId as string,
          plan: "PRO",
          quotaLimit: 150,
        },
      });

      if (!updatedUser) {
        console.error("Failed to update user in database");
        return new Response("Failed to update user in database", {
          status: 500,
        });
      }
      revalidatePath("/user/billing", "layout");
      console.log("Checkout session completed:", session.id);
    } catch (error) {
      console.error("Error handling checkout.session.completed event:", error);
      return new Response(`Webhook Error: ${(error as Error).message}`, {
        status: 400,
      });
    }
  } else if (event.type === "customer.subscription.deleted") {
    const session = event.data.object;
    const customerId = session.customer;

    if (!customerId) {
      console.error("No customer ID found in session metadata");
      return new Response("No customer ID found", { status: 400 });
    }

    if (session.cancel_at_period_end) {
      const updatedUser = await db.user.update({
        where: {
          customerId: customerId as string,
        },
        data: {
          plan: "FREE",
        },
      });

      if (!updatedUser) {
        console.error("Failed to update user in database");
        return new Response("Failed to update user in database", {
          status: 500,
        });
      }
    } else {
      console.log(
        "Subscription not cancelled: cancel_at_period_end is false",
        session.id
      );

      return new Response("Subscription not cancelled", {
        status: 400,
      });
    }

    console.log("Subscription deleted:", session.id);
  } else if (event.type === "invoice.payment_failed") {
    const session = event.data.object;
    const customerId = session.customer;

    if (!customerId) {
      console.error("No customer ID found in session metadata");
      return new Response("No customer ID found", { status: 400 });
    }

    const updatedUser = await db.user.update({
      where: {
        customerId: customerId as string,
      },
      data: {
        plan: "FREE",
        quotaLimit: 50,
      },
    });

    if (!updatedUser) {
      console.error("Failed to update user in database");
      return new Response("Failed to update user in database", {
        status: 500,
      });
    }

    console.log("Invoice payment failed:", session.id);
  }

  return new Response("Webhook handled successfully", {
    status: 200,
  });
}
