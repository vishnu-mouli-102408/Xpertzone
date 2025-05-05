import { Suspense } from "react";
import type { Metadata } from "next";
import { ExpertChats } from "@/src/components";
import { HydrateClient, prefetch, trpc } from "@/src/trpc/server";
import { Spinner } from "@repo/ui/components/spinner";

export const metadata: Metadata = {
  title: "Expert Chats",
  description: "This is the layout for the expert chats page.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

export const dynamic = "force-dynamic";

const Page = () => {
  prefetch(trpc.user.getAllChats.infiniteQueryOptions({ limit: 10 }));
  return (
    <HydrateClient>
      <div className="mx-auto min-h-[calc(100vh-64px)] w-full bg-black/50">
        <Suspense
          fallback={
            <div className="flex h-[calc(100vh-115px)] w-full flex-col items-center justify-center">
              <Spinner variant="ring" />
            </div>
          }
        >
          <ExpertChats />
        </Suspense>
      </div>
    </HydrateClient>
  );
};

export default Page;
