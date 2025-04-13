import type { Metadata } from "next";
import { Billing } from "@/src/components";

export const metadata: Metadata = {
  title: "Billing",
  description: "This is the billing page for user.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

const BillingPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col bg-gradient-to-b from-zinc-900 to-black">
      <Billing />
    </div>
  );
};

export default BillingPage;
