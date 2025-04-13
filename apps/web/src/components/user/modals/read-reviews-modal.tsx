/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { useClickOutside } from "@repo/ui/hooks";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Quote, Star, X } from "lucide-react";
import { motion } from "motion/react";

interface AllReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  expert: any;
  reviews?: any[];
}

const AllReviewsModal = ({
  isOpen,
  onClose,
  expert,
  reviews = [],
}: AllReviewsModalProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500); // Wait for exit animation to complete
  };

  // Get current page reviews
  const currentReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  // Go to next/previous page
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
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
      y: 20,
      transition: { duration: 0.3 },
    },
  };

  const reviewCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + index * 0.1,
        duration: 0.5,
      },
    }),
  };

  // Helper function to render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`}
          />
        ))}
      </div>
    );
  };

  const mobileMenuRef = useClickOutside(() => {
    setTimeout(() => {
      if (isOpen) onClose();
    }, 0);
  });

  if (!isOpen && !isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-black/70 p-4 backdrop-blur-sm"
      variants={backdropVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "exit"}
      exit="exit"
    >
      <motion.div
        ref={(el) => {
          if (el) mobileMenuRef.current = el;
        }}
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl border border-white/10 bg-gradient-to-b from-[#1c1c24] to-[#12151c] shadow-xl"
        variants={modalVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "exit"}
        exit="exit"
      >
        {/* Decorative backdrop elements */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-700/10 blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-700/10 blur-2xl"></div>

        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-black/20 p-1 text-gray-400 transition-colors hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex h-full flex-col overflow-hidden p-8">
          <div className="mb-6 flex flex-shrink-0 items-center space-x-4">
            <div className="flex-shrink-0">
              <Avatar className="h-14 w-14 border-2 border-white/10">
                <AvatarImage
                  src={expert?.profileImage}
                  alt={expert?.firstName}
                />
                <AvatarFallback className="bg-gradient-to-br from-[#403E43] to-[#221F26] text-white">
                  {expert?.firstName?.[0]}
                  {expert?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {expert?.firstName} {expert?.lastName}
              </h2>
              <div className="mt-1 flex items-center space-x-2">
                <div className="flex">
                  {renderStars(
                    reviews.length > 0
                      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        reviews.reduce((acc, rev) => acc + rev.rating, 0) /
                          reviews.length
                      : 0
                  )}
                </div>
                <span className="text-sm text-gray-300">
                  ({reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"})
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-grow flex-col overflow-hidden">
            <h3 className="mb-4 flex flex-shrink-0 items-center text-lg font-medium text-white">
              <Quote
                size={18}
                className="mr-2 text-purple-400"
                strokeWidth={2.5}
              />
              Client Reviews
            </h3>

            {reviews.length === 0 ? (
              <div className="py-8 text-center text-gray-400">
                No reviews yet. Be the first to leave a review!
              </div>
            ) : (
              <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                {currentReviews.map((review, idx) => (
                  <motion.div
                    key={review.id}
                    className="rounded-lg border border-white/5 bg-[#222222]/70 p-4"
                    variants={reviewCardVariants}
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={review.user?.profileImage} />
                          <AvatarFallback className="bg-[#403E43]/60 text-xs text-white">
                            {review.user?.firstName?.[0] ?? "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {review.user?.firstName} {review.user?.lastName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {review.createdAt
                              ? format(
                                  new Date(review.createdAt),
                                  "MMM dd, yyyy"
                                )
                              : "Recent"}
                          </p>
                        </div>
                      </div>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-sm text-gray-300">{review?.comment}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination controls */}
          {reviews.length > reviewsPerPage && (
            <div className="mt-4 flex flex-shrink-0 items-center justify-between">
              <div className="text-sm text-gray-400">
                Page {currentPage + 1} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`border-white/10 bg-[#222222]/80 ${currentPage === 0 ? "cursor-not-allowed opacity-50" : "hover:bg-[#403E43]/50"}`}
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={currentPage >= totalPages - 1}
                  className={`border-white/10 bg-[#222222]/80 ${currentPage >= totalPages - 1 ? "cursor-not-allowed opacity-50" : "hover:bg-[#403E43]/50"}`}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AllReviewsModal;
