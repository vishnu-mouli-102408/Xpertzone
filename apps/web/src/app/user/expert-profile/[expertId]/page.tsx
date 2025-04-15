import { Suspense } from "react";
import type { Metadata } from "next";
import { ExpertProfile } from "@/src/components";
import { HydrateClient, prefetch, trpc } from "@/src/trpc/server";
import { db } from "@repo/db";
import { Skeleton } from "@repo/ui/components/skeleton";

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
        <Suspense
          fallback={
            <div className="container py-8">
              <div className="mx-auto max-w-5xl">
                <div className="flex flex-col gap-8 md:flex-row">
                  {/* Left column skeleton */}
                  <div className="w-full md:w-1/3">
                    <Skeleton className="mb-4 h-72 w-full rounded-xl" />
                    <Skeleton className="mb-3 h-12 w-full rounded-lg" />
                    <div className="mb-4 grid grid-cols-3 gap-2">
                      <Skeleton className="h-10 rounded-md" />
                      <Skeleton className="h-10 rounded-md" />
                      <Skeleton className="h-10 rounded-md" />
                    </div>
                    <Skeleton className="h-24 w-full rounded-lg" />
                  </div>

                  {/* Right column skeleton */}
                  <div className="w-full md:w-2/3">
                    <Skeleton className="mb-2 h-10 w-48 rounded-md" />
                    <Skeleton className="mb-6 h-6 w-36 rounded-md" />

                    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-24 rounded-lg" />
                      ))}
                    </div>

                    <Skeleton className="mb-3 h-8 w-32 rounded-md" />
                    <Skeleton className="mb-6 h-24 w-full rounded-lg" />

                    <Skeleton className="mb-3 h-8 w-32 rounded-md" />
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-12 rounded-lg" />
                      ))}
                    </div>

                    <Skeleton className="mb-3 h-8 w-32 rounded-md" />
                    <Skeleton className="h-36 w-full rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <ExpertProfile expertId={expertId} />
        </Suspense>
      </div>
    </HydrateClient>
  );
};

export default Page;
