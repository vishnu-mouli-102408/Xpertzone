import { useQuery } from "@tanstack/react-query";

import { trpc } from "../trpc/server";

export const useDbUser = () => {
  return useQuery(trpc.auth.getUserDetails.queryOptions());
};
