"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTRPC } from "@/src/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { LoadingSpinner } from "@repo/ui/components/loading-spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ReviewSuccessModal from "./review-success-modal";

// import { Modal } from "../ui/modal";
const Modal = dynamic(
  () => import("@repo/ui/components/modal").then((mod) => mod.Modal),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

interface ReviewModalProps {
  isWriteReviewOpen: boolean;
  setIsWriteReviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  expertName: string;
  expertId: string;
}

const reviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, { message: "Select rating is Mandatory" })
    .max(5),
  reviewText: z
    .string()
    .min(1, { message: "Review Text is Required" })
    .max(500),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const ReviewModal = ({
  isWriteReviewOpen,
  setIsWriteReviewOpen,
  expertId,
  expertName,
}: ReviewModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      reviewText: undefined,
    },
  });

  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSubmitReview = async (data: ReviewFormData) => {
    try {
      console.log("Form data:", data);
      await onSubmitForm({
        expertId,
        rating: data.rating,
        reviewText: data.reviewText,
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("There was a problem.", {
        duration: 3000,
        position: "bottom-center",
        closeButton: true,
        description:
          "Seems like there was an issue on our end. Please try again later.",
      });
    }
  };

  const { mutateAsync: onSubmitForm, isPending } = useMutation(
    trpc.user.writeReviewForExpert.mutationOptions({
      onSuccess: async (data) => {
        if (data?.success) {
          await queryClient.invalidateQueries(trpc.user.pathFilter());
          setShowSuccessModal(true);
        } else {
          toast.error("There was a problem.", {
            description:
              data?.message ??
              "Seems like there was an issue on our end. Please try again later.",
            duration: 3000,
            position: "bottom-center",
            closeButton: true,
          });
        }
      },
      onError: (error) => {
        console.log("Error:", error);
        toast.error("There was a problem.", {
          description:
            error?.message ??
            "Seems like there was an issue on our end. Please try again later.",
          duration: 3000,
          position: "bottom-center",
          closeButton: true,
        });
      },
    })
  );

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 10 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        delay: 0.1,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 10,
      transition: { duration: 0.2 },
    },
  };

  //   console.log("ERRORS", errors);
  //   console.log("FORM DATA", watch());

  return (
    <Modal
      className="max-w-md border border-none border-white/10 bg-[#12151c] p-8 text-white"
      showModal={isWriteReviewOpen}
      setShowModal={setIsWriteReviewOpen}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div>
          <h1 className="text-lg">Write a Review for {expertName}</h1>
          <p className="text-pretty text-sm text-gray-400">
            Share your experience with {expertName} to help others.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmitReview)}
          className="my-4 space-y-6"
        >
          <div className="rounded-lg border border-white/5 bg-[#222222]/70 p-4">
            <h3 className="mb-3 text-sm font-medium text-gray-300">Rating</h3>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer transition-all duration-200 ${
                    watch("rating") >= star
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-500 hover:text-gray-400"
                  }`}
                  onClick={() => setValue("rating", star)}
                />
              ))}
            </div>
            <p className="mt-2 text-center text-xs text-gray-400">
              {!watch("rating")
                ? "Select a rating"
                : watch("rating") === 5
                  ? "Excellent"
                  : watch("rating") === 4
                    ? "Very Good"
                    : watch("rating") === 3
                      ? "Good"
                      : watch("rating") === 2
                        ? "Fair"
                        : "Poor"}
            </p>
            {errors.rating && (
              <p className="mt-1 text-center text-xs text-red-400">
                {errors.rating.message}
              </p>
            )}
          </div>

          <div className="rounded-lg border border-white/5 bg-[#222222]/70 p-4">
            <h3 className="mb-3 text-sm font-medium text-gray-300">
              Your Review
            </h3>
            <textarea
              className="focus:ring-primary/50 min-h-24 w-full rounded-md border border-white/10 bg-[#1a1a1a] p-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
              placeholder="Share your experience..."
              {...register("reviewText", {
                maxLength: {
                  value: 500,
                  message: "Review cannot exceed 500 characters",
                },
                required: {
                  value: true,
                  message: "Review is required",
                },
              })}
            />
            <div className="mt-1 flex justify-between">
              {errors.reviewText && (
                <p className="text-xs text-red-400">
                  {errors.reviewText.message}
                </p>
              )}
              <p className="text-right text-xs text-gray-500">
                {watch("reviewText")?.length || 0}/500
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="cursor-pointer border-white/10 bg-[#221F26] text-gray-300"
              onClick={() => setIsWriteReviewOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer border border-white/10 bg-gradient-to-r from-[#403E43] to-[#221F26] text-white hover:opacity-90"
              disabled={isPending}
            >
              {isPending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2 h-4 w-4 rounded-full border-2 border-zinc-400 border-t-white"
                />
              ) : (
                "Submit Review"
              )}
            </Button>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {showSuccessModal && (
          <ReviewSuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            expertName={expertName}
            onCloseReviewModal={() => setIsWriteReviewOpen(false)}
          />
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default ReviewModal;
