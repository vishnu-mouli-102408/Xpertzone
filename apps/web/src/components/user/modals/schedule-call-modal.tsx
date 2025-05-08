"use client";

import type { Dispatch, SetStateAction } from "react";
import { modalVariants } from "@/src/lib/framer-animations";
import { Button } from "@repo/ui/components/button";
import { Modal } from "@repo/ui/components/modal";
import { Headphones, Phone, Video } from "lucide-react";
import { motion } from "motion/react";

interface ScheduleCallModalProps {
  isScheduleOpen: boolean;
  setIsScheduleOpen: Dispatch<SetStateAction<boolean>>;
  firstName: string;
  lastName: string;
}

const ScheduleCallModal = ({
  isScheduleOpen,
  setIsScheduleOpen,
  firstName,
  lastName,
}: ScheduleCallModalProps) => {
  return (
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
            Schedule a Call with {`${firstName} ${lastName}`}
          </h1>
          <p className="text-pretty text-sm text-gray-400">
            Choose a date and time that works for you to connect with{" "}
            {firstName}.
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
                <p className="text-xs text-gray-500">Standard consultation</p>
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
  );
};

export default ScheduleCallModal;
