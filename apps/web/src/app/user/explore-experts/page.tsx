import { Suspense } from "react";
import type { Metadata } from "next";
import { ExploreExperts } from "@/src/components";
import SkeletonExpertCard from "@/src/components/user/expert-card-skeleton";
import { fadeInUp } from "@/src/lib/framer-animations";
import { HydrateClient, prefetch, trpc } from "@/src/trpc/server";
import * as motion from "motion/react-client";

export const metadata: Metadata = {
  title: "Explore Experts",
  description: "This is the layout for the explore experts pages.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

export const dynamic = "force-dynamic";

const Page = () => {
  prefetch(trpc.user.getAllExperts.infiniteQueryOptions());
  return (
    <HydrateClient>
      <div className="mx-auto min-h-[calc(100vh-64px)] w-full bg-black/50 p-6">
        <Suspense
          fallback={
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {[...Array(6)].map((_, index) => (
                <SkeletonExpertCard key={index} />
              ))}
            </motion.div>
          }
        >
          <ExploreExperts />
        </Suspense>
      </div>
    </HydrateClient>
  );
};

export default Page;
