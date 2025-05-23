"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fadeInUp, staggerContainer } from "@/src/lib/framer-animations";
import { useTRPC } from "@/src/trpc/react";
import type { User } from "@repo/db";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Share2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import ResultsNotFound from "../global/results-not-found";
import ExpertCard from "./expert-card";
import ShareProfileModal from "./modals/share-profile-modal";

const ExploreExperts = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isOpenShareProfileModal, setIsOpenShareProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<User | null>(null);

  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      trpc.user.getAllExperts.infiniteQueryOptions(
        {
          limit: 10,
        },
        {
          getNextPageParam: (lastPage) => {
            return (
              (lastPage.data?.nextCursor as string | undefined) ?? undefined
            );
          },
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

  console.log("DATA", data);
  console.log("STATUS", status);
  console.log("ERROR", error);
  console.log("IS FETCHING NEXT PAGE", isFetchingNextPage);

  if (
    status === "error" ||
    data.pages.length === 0 ||
    data.pages[0]?.data?.experts.length === 0
  ) {
    return (
      <div className="flex h-[calc(100vh-115px)] w-full flex-col items-center justify-center">
        <ResultsNotFound
          description={"Oops! No experts found. Please try again later."}
          title="No Experts Found"
        />
      </div>
    );
  } else {
    return (
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <motion.h1
            variants={fadeInUp}
            className="text-2xl font-bold text-white"
          >
            Explore Experts
          </motion.h1>
        </div>

        {/* Expert Cards Grid */}

        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {data.pages
            .flatMap((page) => page.data?.experts ?? [])
            .filter(Boolean)
            ?.map((expert) => {
              return (
                <ExpertCard
                  key={expert?.id}
                  expert={{
                    availability: expert?.availability ?? "N/A",
                    category: expert?.expertise ?? "N/A",
                    hourlyRate: Number(expert?.hourlyRate) || 0,
                    imageUrl:
                      expert?.profilePic ??
                      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
                    name: `${expert?.firstName} ${expert?.lastName}`,
                    rating: expert?.avgRating ?? 0,
                    id: expert?.id ?? "N/A",
                    reviews: expert?.totalReviews ?? 0,
                    specialties: expert?.skills ?? [],
                    title: expert?.expertise ?? "N/A",
                    bio: expert?.bio ?? "N/A",
                    firstName: expert?.firstName ?? "N/A",
                    lastName: expert?.lastName ?? "N/A",
                    profilePic: expert?.profilePic ?? "N/A",
                  }}
                  ShareButton={
                    <Button
                      onClick={() => {
                        setSelectedProfile(expert);
                        setIsOpenShareProfileModal(true);
                      }}
                      variant="outline"
                      className="flex h-auto cursor-pointer flex-row gap-2 border-[#FFFFFF26] bg-[#221F26] py-2 text-gray-300 shadow-[inset_0px_0px_20px_0px_#FFFFFF33] transition-all duration-200 ease-in-out hover:scale-[1.005] hover:bg-[#403E43]/50 hover:text-white"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  }
                />
              );
            })}
        </motion.div>

        <AnimatePresence>
          {isOpenShareProfileModal && selectedProfile && (
            <ShareProfileModal
              url={`${window.location.origin}/user/expert-profile/${selectedProfile.id}`}
              isOpen={isOpenShareProfileModal}
              onClose={() => setIsOpenShareProfileModal(false)}
              expert={selectedProfile}
            />
          )}
        </AnimatePresence>

        <div id="infinite-paginate" ref={bottomRef}>
          {isFetchingNextPage && (
            <div className="flex w-full items-center justify-center py-4">
              <Spinner className="size-8" variant="bars" />
            </div>
          )}
        </div>

        {data.pages.length === 0 && (
          <motion.div variants={fadeInUp} className="py-12 text-center">
            <p className="text-xl text-gray-300">
              There are no experts available at the moment. Please Stay tuned!
            </p>
            <Button
              className="mt-4 cursor-pointer"
              onClick={() => {
                router.push("/user");
              }}
            >
              Go Home
            </Button>
          </motion.div>
        )}
      </motion.div>
    );
  }
};

export default ExploreExperts;
