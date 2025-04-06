"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setRole } from "@/src/lib/user";
import type { Roles } from "@/src/types/global";
import { useUser } from "@clerk/nextjs";
import AnimationContainer from "@repo/ui/components/animation-container";
import MaxWidthWrapper from "@repo/ui/components/max-width-wrapper";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function OnboardingComponent() {
  const { user } = useUser();
  const router = useRouter();

  console.info("USER", user);

  const [selectedRole, setSelectedRole] = useState<"USER" | "EXPERT" | null>(
    null
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    router.push("/sign-in");
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = setRole(
        user?.id || "",
        (selectedRole?.toLowerCase() as Roles) || "user"
      );
      const response = await res;
      console.info("RESPONSE", response);
      if (response?.success) {
        await user?.reload();
        toast.success("User Setup Done Successfully.", {
          duration: 3000,
          position: "bottom-center",
          closeButton: true,
        });
        if (user?.publicMetadata?.role === "user") {
          router.push("/user");
        }
        if (user?.publicMetadata?.role === "expert") {
          router.push("/expert");
        }
      } else {
        toast.error("Error Setting Up User", {
          duration: 3000,
          position: "bottom-center",
          description: "Please try again later.",
          closeButton: true,
        });
      }
    } catch (error) {
      console.info("ERROR", error);
      toast.error("Error Setting Up User", {
        duration: 3000,
        position: "bottom-center",
        description: "Please try again later.",
        closeButton: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ amount: 0.5 }}
      className="bg-gradient-to-r from-black/70 to-gray-950"
    >
      <MaxWidthWrapper className="flex h-screen w-screen items-center justify-center">
        <AnimationContainer className="flex flex-col space-y-6">
          <h1 className="bg-gradient-to-r from-[#b3abd4] to-[#7c77a2] bg-clip-text text-center text-5xl font-semibold text-transparent">
            Welcome! Select Role
          </h1>

          <p className="bg-gradient-to-r from-[#d9d8dd] to-[#b5b3c6] bg-clip-text text-center text-xl font-normal text-transparent">
            Choose the option that best describes you
          </p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row">
            <button
              onClick={() => setSelectedRole("USER")}
              className={`w-full cursor-pointer rounded-xl p-2 py-8 text-2xl font-semibold transition-all duration-300 ease-in-out hover:scale-[1.02] ${selectedRole === "USER" ? "border border-[#FFFFFF66] bg-[#FFFFFF1A] shadow-[inset_0px_0px_30px_0px_#FFFFFF4D]" : "border border-[#FFFFFF26] bg-[#FFFFFF0D] shadow-[inset_0px_0px_20px_0px_#FFFFFF33]"}`}
            >
              User
            </button>
            <button
              onClick={() => setSelectedRole("EXPERT")}
              className={`w-full cursor-pointer rounded-xl p-2 py-8 text-2xl font-semibold transition-all duration-300 ease-in-out hover:scale-[1.02] ${selectedRole === "EXPERT" ? "border border-[#FFFFFF66] bg-[#FFFFFF1A] shadow-[inset_0px_0px_30px_0px_#FFFFFF4D]" : "border border-[#FFFFFF26] bg-[#FFFFFF0D] shadow-[inset_0px_0px_20px_0px_#FFFFFF33]"}`}
            >
              Expert
            </button>
          </div>

          <div className="flex w-full items-center justify-center">
            <button
              onClick={() => {
                if (!selectedRole) {
                  toast.error("Please select a role", {
                    duration: 3000,
                    position: "bottom-center",
                    closeButton: true,
                  });
                  return;
                }
                handleSubmit();
              }}
              className="group relative mt-6 h-12 w-max cursor-pointer overflow-hidden rounded-lg px-8 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#654358] via-[#17092A] to-[#2F0D64] p-[2px]">
                <div className="absolute inset-0 rounded-lg bg-[#170928] opacity-90"></div>
              </div>
              <div className="absolute inset-[2px] rounded-lg bg-[#170928] opacity-95"></div>
              <div className="absolute inset-[2px] rounded-lg bg-gradient-to-r from-[#170928] via-[#1d0d33] to-[#170928] opacity-90"></div>
              <div className="absolute inset-[2px] rounded-lg bg-gradient-to-b from-[#654358]/40 via-[#1d0d33] to-[#2F0D64]/30 opacity-80"></div>
              <div className="absolute inset-[2px] rounded-lg bg-gradient-to-br from-[#C787F6]/10 via-[#1d0d33] to-[#2A1736]/50"></div>
              <div className="absolute inset-[2px] rounded-lg shadow-[inset_0_0_15px_rgba(199,135,246,0.15)]"></div>
              <div className="relative flex items-center justify-center gap-2">
                <span className="bg-gradient-to-b from-[#D69DDE] to-[#B873F8] bg-clip-text text-lg font-normal tracking-tighter text-transparent drop-shadow-[0_0_12px_rgba(199,135,246,0.4)]">
                  {isSubmitting ? "Please wait..." : "Continue"}
                </span>
              </div>
              <div className="absolute inset-[2px] rounded-lg bg-gradient-to-r from-[#2A1736]/20 via-[#C787F6]/10 to-[#2A1736]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </button>
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>
    </motion.div>
  );
}
