import type { Metadata } from "next";
import { Billing } from "@/src/components";

export const metadata: Metadata = {
  title: "Billing",
  description: "This is the billing page for user.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

const BillingPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const resolvedSearchParams = await searchParams;

  // Access searchParams after resolving the promise
  const success = resolvedSearchParams?.success === "true";
  const canceled = resolvedSearchParams?.canceled === "true";

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col bg-gradient-to-b from-zinc-900 to-black">
      <Billing canceledParam={canceled} successParam={success} />
    </div>
  );
};

export default BillingPage;
