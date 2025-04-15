import { Suspense } from "react";
import type { Metadata } from "next";
import { ExpertProfile } from "@/src/components";
import { HydrateClient, prefetch, trpc } from "@/src/trpc/server";
import { db } from "@repo/db";
import { Spinner } from "@repo/ui/components/spinner";

export const metadata: Metadata = {
  title: "Expert Profile",
  description: "This is the layout for the expert profile page.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

export const revalidate = 43200;

export async function generateStaticParams() {
  const response = await db.user.findMany({
    where: {
      role: "EXPERT",
    },
  });
  const paths = response.map((expert) => ({
    expertId: expert.id,
  }));
  return paths;
}

const Page = async ({ params }: { params: Promise<{ expertId: string }> }) => {
  const { expertId } = await params;
  prefetch(trpc.user.getExpertById.queryOptions({ expertId }));
  return (
    <HydrateClient>
      <div className="mx-auto min-h-[calc(100vh-64px)] w-full bg-black/50 p-6">
        <Suspense fallback={<Spinner variant="circle" />}>
          <ExpertProfile expertId={expertId} />
        </Suspense>
      </div>
    </HydrateClient>
  );
};

export default Page;
