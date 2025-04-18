import { Suspense } from "react";
import type { Metadata } from "next";
import { UserOverview } from "@/src/components";
import OverviewSkeleton from "@/src/components/user/overview-skeleton";
import { HydrateClient, prefetch, trpc } from "@/src/trpc/server";

export const metadata: Metadata = {
  title: {
    default: "User Layout",
    template: "%s | User",
  },
  description: "Tjis is the layout for the user pages.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

export const dynamic = "force-dynamic";

function Page() {
  prefetch(trpc.user.getUserAnalytics.queryOptions({}));

  return (
    <HydrateClient>
      <div className="mx-auto min-h-[calc(100vh-64px)] bg-black/50 p-6">
        <Suspense fallback={<OverviewSkeleton />}>
          <UserOverview />
        </Suspense>
      </div>
    </HydrateClient>
  );
}

export default Page;
