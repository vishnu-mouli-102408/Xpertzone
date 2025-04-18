import { Suspense } from "react";
import type { Metadata } from "next";
import { ExpertProfile } from "@/src/components";
import ExpertProfileSkeleton from "@/src/components/global/expert-profile-skeleton";
import { HydrateClient, prefetch, trpc } from "@/src/trpc/server";

export const metadata: Metadata = {
  title: "Expert Profile",
  description: "This is the layout for the expert profile page.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: Promise<{ expertId: string }> }) => {
  const { expertId } = await params;
  prefetch(trpc.user.getExpertById.queryOptions({ expertId }));
  return (
    <HydrateClient>
      <div className="mx-auto min-h-[calc(100vh-64px)] w-full bg-black/50 p-6">
        <Suspense fallback={<ExpertProfileSkeleton />}>
          <ExpertProfile expertId={expertId} />
        </Suspense>
      </div>
    </HydrateClient>
  );
};

export default Page;
