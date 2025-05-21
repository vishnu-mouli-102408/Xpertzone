"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import env from "@/src/env";
import { staggerContainer } from "@/src/lib/framer-animations";
import { useTRPC } from "@/src/trpc/react";
import type { AppRouter } from "@repo/api";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import { Spinner } from "@repo/ui/components/spinner";
import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import type { inferRouterOutputs } from "@trpc/server";
import { format } from "date-fns";
import { Calendar, Clock, Copy, Video, VideoOff } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

import ResultsNotFound from "../global/results-not-found";
import ConfirmCancelCallModal from "./modals/confirm-cancel-call-modal";

const UpcomingCalls = () => {
  const trpc = useTRPC();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  type RouterOutput = inferRouterOutputs<AppRouter>;
  type CallData = NonNullable<RouterOutput["calls"]["getAllUserCalls"]["data"]>;
  type Call = CallData["calls"][number];

  const [isConfirmCancelCallModalOpen, setIsConfirmCancelCallModalOpen] =
    useState(false);
  const [callId, setCallId] = useState<string | null>(null);

  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      trpc.calls.getAllUserCalls.infiniteQueryOptions(
        {
          limit: 10,
          status: "UPCOMING",
        },
        {
          getNextPageParam: (lastPage) => {
            return (
              (lastPage.data?.nextCursor as string | undefined) ?? undefined
            );
          },
          refetchOnWindowFocus: false,
        }
      )
    );

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;

      if (scrolled >= scrollableHeight - 10 && !isFetchingNextPage) {
        console.log("User reached the bottom of the page!");
        void fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, isFetchingNextPage]);

  const { mutate: updateStatus, isPending } = useMutation(
    trpc.calls.updateStatus.mutationOptions({
      onSuccess: async (data) => {
        if (data?.success) {
          await queryClient.invalidateQueries({
            queryKey: trpc.calls.getAllUserCalls.queryKey({
              status: "UPCOMING",
            }),
          });
          setIsConfirmCancelCallModalOpen(false);
          toast.success("Call cancelled successfully", {
            icon: "🔗",
            description: "Call has been cancelled",
            duration: 2000,
            position: "bottom-center",
            closeButton: true,
          });
        }
      },
      onError: (error) => {
        toast.error("Failed to cancel call", {
          icon: "🔗",
          description: error?.message ?? "Call has been cancelled",
          duration: 2000,
          position: "bottom-center",
        });
      },
    })
  );

  const handleCancelCall = () => {
    if (callId) {
      updateStatus({ callId, status: "CANCELED" });
    }
  };

  console.log("DATA", data);
  console.log("STATUS", status);
  console.log("ERROR", error);
  console.log("IS FETCHING NEXT PAGE", isFetchingNextPage);

  const copyLink = async (link: string) => {
    await navigator.clipboard.writeText(link);
    toast.info("Link copied to clipboard", {
      icon: "🔗",
      description: "Call link has been copied to clipboard",
      duration: 2000,
      position: "bottom-center",
      closeButton: true,
    });
  };

  const joinCall = (link: string) => {
    window.open(link, "_blank");
  };

  if (status === "error") {
    return (
      <div className="flex h-[calc(100vh-115px)] w-full flex-col items-center justify-center">
        <ResultsNotFound
          description={"Oops! You don't have any upcoming calls scheduled."}
          title="No Upcoming Calls Found"
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {data?.pages?.length === 0 ||
      data.pages[0]?.data?.calls.length === 0 ||
      !data?.pages?.[0]?.success ? (
        <Card className="col-span-1 border border-white/10 bg-black text-white sm:col-span-2">
          <CardContent className="flex flex-col gap-2 p-6 text-center">
            <h1 className="text-2xl font-bold">No upcoming calls scheduled</h1>
            <p className="text-sm text-gray-400">
              You don&apos;t have any upcoming calls scheduled.{" "}
              <Link className="text-blue-500" href="/user/explore-experts">
                Navigate to the Experts page to schedule a call
              </Link>
            </p>
          </CardContent>
        </Card>
      ) : (
        data?.pages
          ?.flatMap((page): Call[] => page.data?.calls ?? [])
          ?.map((call, index) => (
            <motion.div
              key={call.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden border border-white/10 bg-black py-0 text-white transition-all duration-300 hover:border-white/20">
                <CardContent className="p-4">
                  <div className="flex h-full flex-col gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-medium">{`${call.expert.firstName} ${call.expert.lastName}`}</h3>
                        <Badge
                          variant="outline"
                          className="border-white/20 bg-white/5 text-white"
                        >
                          {call.callType}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>
                            {format(
                              call.startedAt ?? new Date(),
                              "MMM d, yyyy"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>
                            {format(call.startedAt ?? new Date(), "h:mm a")} -{" "}
                            {format(call.endedAt ?? new Date(), "h:mm a")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 cursor-pointer border-white/20 text-white hover:bg-white/10"
                        onClick={() =>
                          copyLink(
                            `${env.NEXT_PUBLIC_APP_URL}/room/${call.roomId}`
                          )
                        }
                      >
                        <Copy size={14} className="mr-1" />
                        Copy Link
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 cursor-pointer border-none bg-white/10 text-white hover:bg-white/20"
                        onClick={() =>
                          joinCall(
                            `${env.NEXT_PUBLIC_APP_URL}/room/${call.roomId}`
                          )
                        }
                      >
                        <Video size={14} className="mr-1" />
                        Join Call
                      </Button>
                      <Button
                        size="sm"
                        variant={"destructive"}
                        className="flex-1 cursor-pointer border-none bg-red-500/70 text-white hover:bg-red-500/90"
                        onClick={() => {
                          setIsConfirmCancelCallModalOpen(true);
                          setCallId(call.id);
                        }}
                      >
                        <VideoOff size={14} className="mr-1" />
                        Cancel Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
      )}
      <div id="infinite-paginate" ref={bottomRef}>
        {isFetchingNextPage && (
          <div className="flex w-full items-center justify-center py-4">
            <Spinner className="size-6" variant="bars" />
          </div>
        )}
      </div>

      {isConfirmCancelCallModalOpen && (
        <ConfirmCancelCallModal
          isConfirmCancelCallModalOpen={isConfirmCancelCallModalOpen}
          setIsConfirmCancelCallModalOpen={setIsConfirmCancelCallModalOpen}
          onConfirm={handleCancelCall}
          isLoading={isPending}
        />
      )}
    </motion.div>
  );
};

export default UpcomingCalls;
