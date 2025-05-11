import { Suspense } from "react";
import type { Metadata } from "next";
import { CallsSkeleton, ExpertCallsOverview } from "@/src/components";
import { fadeInUp } from "@/src/lib/framer-animations";
import { HydrateClient, prefetch, trpc } from "@/src/trpc/server";
import { Skeleton } from "@repo/ui/components/skeleton";
import * as motion from "motion/react-client";

export const metadata: Metadata = {
  title: "Calls",
  description: "This is the layout for the calls pages.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

export const dynamic = "force-dynamic";

const Page = async () => {
  await Promise.all([
    prefetch(
      trpc.calls.getAllExpertCalls.infiniteQueryOptions({
        status: "UPCOMING",
        limit: 10,
      })
    ),
    prefetch(
      trpc.calls.getAllExpertCalls.infiniteQueryOptions({
        status: "COMPLETED",
        limit: 10,
      })
    ),
  ]);
  return (
    <HydrateClient>
      <div className="mx-auto min-h-[calc(100vh-64px)] w-full bg-black/50 p-6">
        <Suspense
          fallback={
            <motion.div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-2"
              >
                <Skeleton className="w-md max-w-1/2 h-6 bg-white/10" />
                <Skeleton className="w-sm max-w-1/2 h-6 bg-white/10" />
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2"
              >
                {[...Array(6)].map((_, index) => (
                  <CallsSkeleton key={index} />
                ))}
              </motion.div>
            </motion.div>
          }
        >
          <ExpertCallsOverview />
        </Suspense>
      </div>
    </HydrateClient>
  );
};

export default Page;
