"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fadeInUp, staggerContainer } from "@/src/lib/framer-animations";
import { useChatActions } from "@/src/store";
import { useTRPC } from "@/src/trpc/react";
import { Button } from "@repo/ui/components/button";
import { useDebounce, useIsMobile } from "@repo/ui/hooks";
import { useQuery } from "@tanstack/react-query";
import { Filter, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { Controller, useForm } from "react-hook-form";

interface SearchModalProps {
  onClose: () => void;
}

// Form values interface
interface SearchFormValues {
  searchTerm: string;
  category: string;
  //   priceRange: [number, number];
}

// Categories
const categories = [
  "All",
  "Engineering",
  "Development",
  "Design",
  "Legal",
  "Finance",
  "Healthcare",
  "Marketing",
  "Education",
];

const SearchModal = ({ onClose }: SearchModalProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { setActiveChat } = useChatActions();

  const router = useRouter();
  const trpc = useTRPC();

  // React Hook Form setup
  const { control, watch } = useForm<SearchFormValues>({
    defaultValues: {
      searchTerm: "",
      category: "All",
      //   priceRange: [0, 300],
    },
  });

  // Watch form values
  const watchSearchTerm = watch("searchTerm");
  const watchCategory = watch("category");
  //   const watchPriceRange = watch("priceRange");

  const debouncedSearchText = useDebounce(watchSearchTerm, 500);
  //   const debouncedPriceRange = useDebounce(watchPriceRange, 500);

  const { data: searchResults, isPending } = useQuery(
    trpc.user.searchExperts.queryOptions({
      limit: 10,
      expertise: watchCategory,
      page: 1,
      //   maxRate: debouncedPriceRange[1],
      //   minRate: debouncedPriceRange[0],
      query: debouncedSearchText,
    })
  );

  console.log("SEARCH RESULTS", searchResults);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Close on ESC key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const modalVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-start justify-center bg-black/60 px-4 pt-10 backdrop-blur-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        ref={modalRef}
        className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#161616] to-[#161b25] shadow-2xl"
        variants={modalVariants}
      >
        <div className="border-b border-white/10 p-3 md:p-4">
          <div className="flex items-center">
            <Search className="mr-2 h-5 w-5 text-gray-400" />
            <Controller
              name="searchTerm"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  placeholder={
                    isMobile
                      ? "Search experts..."
                      : "Search for experts by name, skill, or specialty..."
                  }
                  className="flex-grow border-none bg-transparent text-white outline-none placeholder:text-gray-400"
                />
              )}
            />
            <Button
              variant="ghost"
              size="icon"
              className={`${showFilters ? "bg-white/10 text-white" : ""} ml-2 cursor-pointer rounded-full text-gray-400 transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 cursor-pointer rounded-full text-gray-400 transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {showFilters && (
            <motion.div
              className="mt-4 grid grid-cols-1 items-center gap-4 md:grid-cols-3"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="col-span-2">
                <p className="mb-2 text-sm text-gray-400">Category</p>
                <div className="flex flex-wrap gap-2">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <>
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant={
                              field.value === category ? "default" : "outline"
                            }
                            size="sm"
                            className={`cursor-pointer text-xs transition-all duration-300 ease-in-out ${
                              field.value === category
                                ? "bg-primary text-primary-foreground"
                                : "border-white/10 bg-[#221F26] text-gray-300 hover:bg-[#403E43]/50"
                            }`}
                            onClick={() => field.onChange(category)}
                          >
                            {category}
                          </Button>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>

              {/* <div className="pr-4 md:justify-self-end">
                <Controller
                  name="priceRange"
                  control={control}
                  render={({ field }) => (
                    <>
                      <p className="mb-2 text-sm text-gray-400">
                        Hourly Rate: ${field.value[0]} - ${field.value[1]}
                      </p>
                      <Slider
                        value={field.value}
                        max={500}
                        step={10}
                        onValueChange={(value) => {
                          if (
                            value[0] !== undefined &&
                            value[1] !== undefined
                          ) {
                            field.onChange([value[0], value[1]]);
                          }
                        }}
                        className="mb-2 cursor-pointer rounded-lg bg-gray-500"
                      />
                    </>
                  )}
                />
              </div> */}
            </motion.div>
          )}
        </div>

        <div
          className={`${
            showFilters
              ? isMobile
                ? "max-h-[40vh]"
                : "max-h-[50vh]"
              : isMobile
                ? "max-h-[50vh]"
                : "max-h-[60vh]"
          } overflow-y-auto`}
        >
          {isPending ? (
            <div className="flex h-max items-center justify-center py-12">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
              </div>
            </div>
          ) : searchResults?.data?.totalCount === 0 || !searchResults?.data ? (
            <div className="p-6 text-center text-gray-300">
              <p>No experts found matching your criteria.</p>
              <p className="mt-2 text-sm">Try adjusting your search filters.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-3 p-2 py-3 md:grid-cols-2"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {searchResults.data.experts.map((expert) => (
                <motion.div
                  key={expert.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/5 bg-[#FFFFFF02] p-3 shadow-[inset_0px_0px_55.5px_0px_#C5B9F626] backdrop-blur-[34px] hover:border-[#FFFFFF26] hover:bg-[#FFFFFF0D] hover:shadow-[inset_0px_0px_20px_0px_#FFFFFF33]"
                  variants={fadeInUp}
                  whileHover={{ y: -1, transition: { duration: 0.2 } }}
                  onClick={() => {
                    router.push(`/user/expert-profile/${expert.id}`);
                    onClose();
                  }}
                >
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={
                        expert.profilePic ??
                        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                      }
                      alt={expert.firstName ?? "Expert Name"}
                      className="h-full w-full object-cover"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-white">
                      {expert.firstName && expert.lastName
                        ? `${expert.firstName} ${expert.lastName}`
                        : "No Name"}
                    </h4>
                    <p className="text-xs text-gray-400">{expert.expertise}</p>
                    <div className="mt-1 flex items-center">
                      <div className="flex text-xs text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.floor(expert.averageRating)
                                ? "text-amber-400"
                                : "text-gray-600"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-500">
                        ({expert.reviewCount})
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (location.pathname !== "/user/chats") {
                          router.push("/user/chats");
                        }
                        setActiveChat({
                          bio: expert.bio,
                          firstName: expert.firstName,
                          id: expert.id,
                          lastName: expert.lastName,
                          profilePic: expert.profilePic,
                        });
                        onClose();
                      }}
                      className="text-primary-foreground bg-primary/80 rounded px-2 py-1 text-xs font-medium"
                    >
                      Chat
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 p-3 text-xs text-gray-500">
          <div>
            Press{" "}
            <kbd className="rounded bg-[#403E43] px-2 py-1 text-xs text-gray-300">
              ESC
            </kbd>{" "}
            to close
          </div>
          <div>{searchResults?.data?.experts?.length ?? 0} results</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchModal;
