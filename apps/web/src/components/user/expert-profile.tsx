"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/src/trpc/react";
import { Button } from "@repo/ui/components/button";
import { HoverButton } from "@repo/ui/components/hover-button";
import { LoadingSpinner } from "@repo/ui/components/loading-spinner";
import { Separator } from "@repo/ui/components/seperator";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  Clock,
  Headphones,
  MessageCircle,
  Phone,
  Share2,
  SquarePen,
  Star,
  Video,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  fadeInLeft,
  fadeInUp,
  modalVariants,
  staggerContainer,
} from "src/lib/framer-animations";

import AllReviewsModal from "./modals/read-reviews-modal";
import ReviewModal from "./modals/review-modal";
import ShareProfileModal from "./modals/share-profile-modal";

// import { Modal } from "../ui/modal";
const Modal = dynamic(
  () => import("@repo/ui/components/modal").then((mod) => mod.Modal),
  {
    ssr: false,
    loading: () => (
      <div>
        <LoadingSpinner />
      </div>
    ),
  }
);

interface ExpertProfileProps {
  expertId: string;
}

const ExpertProfile = ({ expertId }: ExpertProfileProps) => {
  const trpc = useTRPC();

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isOpenReadReviewsModal, setIsOpenReadReviewsModal] = useState(false);
  const [isOpenShareProfileModal, setIsOpenShareProfileModal] = useState(false);

  const router = useRouter();

  const { data } = useSuspenseQuery(
    trpc.user.getExpertById.queryOptions({
      expertId,
    })
  );

  console.log("expertId", expertId);
  console.log("data", data);

  if (!data) {
    return (
      <div className="container py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold">Expert not found</h1>
        <p className="text-muted-foreground">
          The expert you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Button
          className="mt-4 cursor-pointer"
          onClick={() => {
            router.push("/user");
          }}
        >
          Go Home
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="container py-8">
        <div className="mx-auto max-w-5xl">
          <div
            onClick={() => {
              router.back();
            }}
            className="mb-4 flex w-max cursor-pointer items-center gap-2 hover:text-slate-300"
          >
            <ArrowLeft className="transition-colors duration-100" />
            <div className="transition-colors duration-100">Back</div>
          </div>
          <motion.div
            className="flex flex-col gap-8 md:flex-row"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Left Column: Profile Info */}
            <motion.div
              className="w-full space-y-6 md:w-1/3"
              variants={fadeInLeft}
            >
              {/* Profile Image */}
              <motion.div
                className="relative cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#1A1F2C] to-[#0f0f13] shadow-xl"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute left-3 top-3 z-10">
                  <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                    <BadgeCheck className="h-3.5 w-3.5 text-[#5858e8]" />
                    Verified Expert
                  </span>
                </div>
                <motion.img
                  src={
                    data?.data?.expert?.profilePic ??
                    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                  }
                  alt={data?.data?.expert?.firstName ?? "Expert Logo"}
                  className="h-72 w-full object-cover"
                  initial={{ scale: 1.1, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center">
                    <div className="mr-2 flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(data?.data?.averageRating ?? 0)
                              ? "fill-current"
                              : "opacity-30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-300">
                      ({data?.data?.reviews?.length ?? 0}{" "}
                      {data?.data?.reviews?.length === 1 ? "review" : "reviews"}
                      )
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Call to Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <HoverButton
                  onClick={() => setIsScheduleOpen(true)}
                  className="flex w-full items-center justify-center rounded-xl text-lg"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>Schedule a Call</span>
                </HoverButton>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                className="grid grid-cols-3 gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button
                  variant="outline"
                  className="flex h-auto cursor-pointer flex-col gap-1 border-[#FFFFFF26] bg-[#221F26] py-3 text-gray-300 shadow-[inset_0px_0px_20px_0px_#FFFFFF33] transition-all duration-200 ease-in-out hover:scale-[1.005] hover:bg-[#403E43]/50 hover:text-white"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-xs">Message</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex h-auto cursor-pointer flex-col gap-1 border-[#FFFFFF26] bg-[#221F26] py-3 text-gray-300 shadow-[inset_0px_0px_20px_0px_#FFFFFF33] transition-all duration-200 ease-in-out hover:scale-[1.005] hover:bg-[#403E43]/50 hover:text-white"
                >
                  <Phone className="h-5 w-5" />
                  <span className="text-xs">Call</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex h-auto cursor-pointer flex-col gap-1 border-[#FFFFFF26] bg-[#221F26] py-3 text-gray-300 shadow-[inset_0px_0px_20px_0px_#FFFFFF33] transition-all duration-200 ease-in-out hover:scale-[1.005] hover:bg-[#403E43]/50 hover:text-white"
                >
                  <Video className="h-5 w-5" />
                  <span className="text-xs">Video</span>
                </Button>
              </motion.div>

              {/* Availability Card */}

              <motion.div
                className="cursor-pointer rounded-xl border border-[#FFFFFF36] bg-gradient-to-br from-[#222222] to-[#1A1F2C] p-4 transition-all duration-200 ease-in-out hover:shadow-[inset_0px_0px_30px_0px_#FFFFFF2D]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="mb-3 flex items-center font-medium text-gray-200">
                  <Clock className="text-primary mr-2 h-4 w-4" /> Availability
                </h3>
                <p className="mb-2 text-sm text-gray-400">
                  Available:{" "}
                  <span className="text-white">
                    {data?.data?.expert?.availability ?? "N/A"}
                  </span>
                </p>
                {/* <p className="text-gray-400 text-sm mb-3">
                  Response time:{" "}
                  <span className="text-white">Usually within 2 hours</span>
                </p> */}
                <div className="grid grid-cols-7 gap-1">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                    <div
                      key={i}
                      className={`rounded p-1.5 text-center text-xs ${
                        i < 5
                          ? "bg-[#403E43]/40 text-white"
                          : "bg-[#221F26]/50 text-gray-500"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Main Content */}
            <motion.div
              className="w-full space-y-8 md:w-2/3"
              variants={fadeInUp}
            >
              {/* Expert Header */}
              <div className="flex items-center justify-between">
                <div>
                  <motion.h1
                    className="mb-1 text-3xl font-bold text-white"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {data?.data?.expert?.firstName &&
                    data?.data?.expert?.lastName
                      ? `${data.data.expert.firstName} ${data.data.expert.lastName}`
                      : "N/A"}
                  </motion.h1>
                  <motion.p
                    className="text-xl text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {data?.data?.expert?.expertise ?? "N/A"}
                  </motion.p>
                </div>
                <Button
                  onClick={() => setIsOpenShareProfileModal(true)}
                  variant="outline"
                  className="flex h-auto cursor-pointer flex-row gap-2 border-[#FFFFFF26] bg-[#221F26] py-2 text-gray-300 shadow-[inset_0px_0px_20px_0px_#FFFFFF33] transition-all duration-200 ease-in-out hover:scale-[1.005] hover:bg-[#403E43]/50 hover:text-white"
                >
                  <Share2 className="h-5 w-5" />
                  <span className="text-xs">Share</span>
                </Button>
              </div>

              {/* Stats Cards */}
              <motion.div
                className="grid grid-cols-2 gap-4 md:grid-cols-3"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
              >
                <motion.div
                  className="cursor-pointer rounded-xl border border-[#FFFFFF16] bg-[#222222] p-4 shadow-md hover:shadow-[inset_0px_0px_20px_0px_#FFFFFF1D]"
                  variants={fadeInUp}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <h3 className="mb-1 text-sm text-gray-400">Hourly Rate</h3>
                  <p className="text-2xl font-semibold text-white">
                    ${data?.data?.expert?.hourlyRate ?? 0}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">USD per hour</p>
                </motion.div>
                <motion.div
                  className="cursor-pointer rounded-xl border border-[#FFFFFF16] bg-[#222222] p-4 shadow-md hover:shadow-[inset_0px_0px_20px_0px_#FFFFFF1D]"
                  variants={fadeInUp}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <h3 className="mb-1 text-sm text-gray-400">Experience</h3>
                  <p className="text-2xl font-semibold text-white">
                    {data?.data?.expert?.yearsOfExperience ?? 0} years
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Professional experience
                  </p>
                </motion.div>
                <motion.div
                  className="col-span-2 cursor-pointer rounded-xl border border-[#FFFFFF16] bg-[#222222] p-4 shadow-md hover:shadow-[inset_0px_0px_20px_0px_#FFFFFF1D] md:col-span-1"
                  variants={fadeInUp}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <h3 className="mb-1 text-sm text-gray-400">Expertise</h3>
                  <p className="text-lg font-semibold text-white">
                    {data?.data?.expert?.expertise ?? "N/A"}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {data?.data?.expert?.skills
                      .slice(0, 2)
                      .map((specialty, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-[#403E43]/40 px-2 py-0.5 text-xs text-gray-300"
                        >
                          {specialty}
                        </span>
                      ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="mb-3 flex items-center text-xl font-semibold text-white">
                  <BadgeCheck className="text-primary mr-2 h-5 w-5" /> About Me
                </h2>
                <div className="rounded-xl border border-white/5 bg-gradient-to-br from-[#222222] to-[#1A1F2C] p-5 shadow-lg">
                  <p className="leading-relaxed text-gray-300">
                    {data?.data?.expert?.bio ?? "No bio available."}
                  </p>
                </div>
              </motion.div>

              {/* Specialties Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="mb-3 text-xl font-semibold text-white">
                  Specialties
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {data?.data?.expert?.skills.map((specialty, i) => (
                    <motion.div
                      key={i}
                      className="flex cursor-pointer items-center rounded-lg border border-white/5 bg-[#222222] p-3 transition-all duration-100 ease-in-out"
                      whileHover={{
                        x: 2,
                        backgroundColor: "rgba(64, 62, 67, 0.3)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#403E43] to-[#221F26]">
                        <BadgeCheck className="h-4 w-4 text-gray-200" />
                      </div>
                      <span className="text-gray-200">{specialty}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Reviews Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <h2 className="mb-3 text-xl font-semibold text-white">
                    Reviews
                  </h2>
                  <Button
                    onClick={() => setIsWriteReviewOpen(true)}
                    variant={"secondary"}
                    className="mb-3 flex cursor-pointer items-center justify-center gap-2"
                  >
                    <SquarePen className="text-gray-200" />
                    <h2 className="text-md font-medium text-white">
                      Write a Review
                    </h2>
                  </Button>
                </div>
                <div className="rounded-xl border border-white/5 bg-gradient-to-br from-[#222222] to-[#1A1F2C] p-5 shadow-lg">
                  <div className="mb-5 flex items-start">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="text-4xl font-bold text-white">
                        {data?.data?.reviews?.length ?? 0}
                      </div>
                      <div className="mt-1 flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(data?.data?.averageRating ?? 0)
                                ? "fill-current"
                                : "opacity-30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="mt-1 text-xs text-gray-400">
                        {data?.data?.reviews?.length ?? 0}{" "}
                        {data?.data?.reviews?.length === 1
                          ? "review"
                          : "reviews"}
                      </span>
                    </div>
                    <Separator orientation="vertical" className="mx-4 h-20" />
                    <StarRatingDistribution reviews={data?.data?.reviews} />
                  </div>

                  <Button
                    onClick={() => setIsOpenReadReviewsModal(true)}
                    variant="outline"
                    className="w-full cursor-pointer border-white/10 bg-[#221F26] text-gray-300 transition-all duration-300 ease-in-out hover:bg-[#403E43]/50 hover:text-white"
                  >
                    Read all reviews
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Schedule Dialog */}
      <AnimatePresence>
        {isScheduleOpen && (
          <Modal
            className="max-w-md border border-none border-white/10 bg-[#12151c] p-8 text-white"
            showModal={isScheduleOpen}
            setShowModal={setIsScheduleOpen}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div>
                <h1 className="text-lg">
                  Schedule a Call with{" "}
                  {`${data?.data?.expert?.firstName} ${data?.data?.expert?.lastName}`}
                </h1>
                <p className="text-pretty text-sm text-gray-400">
                  Choose a date and time that works for you to connect with{" "}
                  {data?.data?.expert?.firstName}.
                </p>
              </div>

              <div className="my-4 space-y-6">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    className="cursor-pointer border-white/10 bg-[#222222]/80 transition-all duration-200 ease-in-out hover:bg-[#403E43]/50"
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    className="cursor-pointer border-white/10 bg-[#222222]/80 transition-all duration-200 ease-in-out hover:bg-[#403E43]/50"
                  >
                    Tomorrow
                  </Button>
                  <Button
                    variant="outline"
                    className="cursor-pointer border-white/10 bg-[#222222]/80 transition-all duration-200 ease-in-out hover:bg-[#403E43]/50"
                  >
                    Next Week
                  </Button>
                </div>

                <div className="rounded-lg border border-white/5 bg-[#222222]/70 p-4">
                  <h3 className="mb-3 text-sm font-medium text-gray-300">
                    Select Format
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="border-primary/50 flex h-auto cursor-pointer flex-col items-center bg-[#403E43]/40 py-3 text-white"
                    >
                      <Phone className="mb-1 h-5 w-5" />
                      <span className="text-xs">Phone</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex h-auto cursor-pointer flex-col items-center border-white/10 bg-[#221F26] py-3 text-gray-400"
                    >
                      <Video className="mb-1 h-5 w-5" />
                      <span className="text-xs">Video</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex h-auto cursor-pointer flex-col items-center border-white/10 bg-[#221F26] py-3 text-gray-400"
                    >
                      <Headphones className="mb-1 h-5 w-5" />
                      <span className="text-xs">Audio</span>
                    </Button>
                  </div>
                </div>

                <div className="cursor-pointer rounded-lg border border-white/5 bg-[#222222]/70 p-4">
                  <h3 className="mb-3 text-sm font-medium text-gray-300">
                    Duration & Rate
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-300">30 minutes</p>
                      <p className="text-xs text-gray-500">
                        Standard consultation
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        $
                        {data.data?.expert?.hourlyRate
                          ? Number(data?.data?.expert?.hourlyRate) / 2
                          : 0}
                      </p>
                      <p className="text-xs text-gray-500">USD total</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="cursor-pointer border-white/10 bg-[#221F26] text-gray-300"
                  onClick={() => setIsScheduleOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="cursor-pointer border border-white/10 bg-gradient-to-r from-[#403E43] to-[#221F26] text-white hover:opacity-90">
                  Confirm Booking
                </Button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Write Review Dialog */}
      <AnimatePresence>
        {isWriteReviewOpen && (
          <ReviewModal
            isWriteReviewOpen={isWriteReviewOpen}
            setIsWriteReviewOpen={setIsWriteReviewOpen}
            expertId={data?.data?.expert?.id ?? ""}
            expertName={`${data?.data?.expert?.firstName} ${data?.data?.expert?.lastName}`}
          />
        )}
      </AnimatePresence>

      {/* Read All Reviews Modal */}
      <AnimatePresence>
        {isOpenReadReviewsModal && (
          <AllReviewsModal
            isOpen={isOpenReadReviewsModal}
            onClose={() => setIsOpenReadReviewsModal(false)}
            reviews={data?.data?.reviews}
            expert={data?.data?.expert}
          />
        )}
      </AnimatePresence>

      {/* Share Profile Modal */}
      <AnimatePresence>
        {isOpenShareProfileModal && (
          <ShareProfileModal
            url={`${window.location.origin}/user/expert-profile/${data?.data?.expert?.id}`}
            isOpen={isOpenShareProfileModal}
            onClose={() => setIsOpenShareProfileModal(false)}
            expert={data?.data?.expert}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ExpertProfile;

const StarRatingDistribution = ({
  reviews = [],
}: {
  reviews:
    | {
        user: {
          firstName: string | null;
          lastName: string | null;
          profilePic: string | null;
        };
        id: string;
        createdAt: Date;
        userId: string;
        expertId: string;
        rating: number;
        comment: string | null;
      }[]
    | undefined;
}) => {
  // Calculate the count of each rating
  const ratingCounts: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  // Count occurrences of each rating
  if (reviews && Array.isArray(reviews)) {
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        const rating = review.rating;
        if (rating !== undefined && rating >= 1 && rating <= 5) {
          if (ratingCounts[rating] !== undefined) {
            ratingCounts[rating]++;
          }
        }
      }
    });
  }

  // Calculate percentages
  const totalReviews = reviews?.length || 0;
  const percentages: Record<number, number> = {};

  for (let rating = 1; rating <= 5; rating++) {
    percentages[rating] =
      totalReviews > 0
        ? Math.round(((ratingCounts[rating] ?? 0) / totalReviews) * 100)
        : 0;
  }

  return (
    <div className="flex-1">
      {[5, 4, 3, 2, 1].map((rating) => (
        <div key={rating} className="mb-1 flex items-center">
          <div className="flex w-10 justify-end">
            <span className="text-xs text-gray-400">{rating}</span>
          </div>
          <Star className="mx-1 h-3 w-3 fill-current text-amber-400" />
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className="h-full bg-amber-400"
              style={{ width: `${percentages[rating]}%` }}
            />
          </div>
          <span className="ml-2 w-8 text-xs text-gray-400">
            {percentages[rating]}%
          </span>
        </div>
      ))}
    </div>
  );
};
