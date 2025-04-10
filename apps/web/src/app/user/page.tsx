"use client";

import { useTRPC } from "@/src/trpc/react";
import { Button } from "@repo/ui/components/button";
import { useSuspenseQuery } from "@tanstack/react-query";

const Page = () => {
  const trpc = useTRPC();

  const { data, error } = useSuspenseQuery(trpc.post.health.queryOptions());

  console.log("data", data);
  console.log("error", error);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
};

export default Page;
