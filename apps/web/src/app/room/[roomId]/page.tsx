import { Suspense } from "react";
import type { Metadata } from "next";
import { HydrateClient } from "@/src/trpc/server";
import { Spinner } from "@repo/ui/components/spinner";

import Room from "./Room";

export const metadata: Metadata = {
  title: "Calls | Room",
  description: "This is the layout for the room page.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { roomId } = await params;

  return (
    <HydrateClient>
      <div className="min-h-screen w-full bg-black/50">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <Room roomId={roomId} />
        </Suspense>
      </div>
    </HydrateClient>
  );
};

export default Page;
