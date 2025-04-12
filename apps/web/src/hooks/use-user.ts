"use client";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "../trpc/react";

export const useDbUser = () => {
  const trpc = useTRPC();
  return useQuery(trpc.auth.getUserDetails.queryOptions());
};
