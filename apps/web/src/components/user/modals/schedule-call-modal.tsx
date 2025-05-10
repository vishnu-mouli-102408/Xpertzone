"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { modalVariants } from "@/src/lib/framer-animations";
import { useTRPC } from "@/src/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CallType } from "@repo/db";
import { Button } from "@repo/ui/components/button";
import { Calendar } from "@repo/ui/components/calendar";
import { Modal } from "@repo/ui/components/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { useClickOutside } from "@repo/ui/hooks";
import { cn } from "@repo/ui/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Clock, Headphones, Video } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ScheduleCallSuccessModal from "./schedule-call-success-modal";

interface ScheduleCallModalProps {
  isScheduleOpen: boolean;
  setIsScheduleOpen: Dispatch<SetStateAction<boolean>>;
  firstName: string;
  lastName: string;
  expertId: string;
}

// Generate time slots from 9 AM to 9 PM
const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i === 0 ? 12 : i;
  return {
    value: `${hour.toString().padStart(2, "0")}:00`,
    label: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? "PM" : "AM"}`,
  };
});

export const scheduleCallFormSchema = z.object({
  callType: z.nativeEnum(CallType),
  scheduledAt: z.date(),
  timeSlot: z.string(),
});

type ScheduleCallForm = z.infer<typeof scheduleCallFormSchema>;

const ScheduleCallModal = ({
  isScheduleOpen,
  setIsScheduleOpen,
  firstName,
  lastName,
  expertId,
}: ScheduleCallModalProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const trpc = useTRPC();

  const clickOutsideRef = useClickOutside(() => {
    setTimeout(() => {
      if (showCalendar) setShowCalendar(false);
    }, 0);
  });

  const { handleSubmit, setValue, watch } = useForm<ScheduleCallForm>({
    resolver: zodResolver(scheduleCallFormSchema),
    defaultValues: {
      callType: CallType.AUDIO,
      scheduledAt: new Date(),
    },
  });

  const selectedDate = watch("scheduledAt");
  const selectedTime = watch("timeSlot");
  const selectedCallType = watch("callType");

  const onSubmit = async (data: ScheduleCallForm) => {
    try {
      // Combine date and time
      const [hours, minutes] = data.timeSlot.split(":");
      const scheduledDate = new Date(data.scheduledAt);
      scheduledDate.setHours(
        parseInt(hours ?? "0"),
        parseInt(minutes ?? "0"),
        0,
        0
      );

      console.log({
        ...data,
        scheduledAt: scheduledDate,
      });

      await onSubmitForm({
        callType: data.callType,
        scheduledAt: scheduledDate,
        expertId: expertId,
      });
    } catch (error) {
      console.error("ERROR", error);
      toast.error("There was a problem.", {
        description:
          "Seems like there was an issue on our end. Please try again later.",
        duration: 3000,
        position: "bottom-center",
        closeButton: true,
      });
    }
  };

  const { mutateAsync: onSubmitForm, isPending } = useMutation(
    trpc.calls.scheduleCall.mutationOptions({
      onSuccess: () => {
        console.log("SUCCESS");
        setShowSuccessModal(true);
      },
      onError: (error) => {
        toast.error("There was a problem.", {
          description:
            error.message ||
            "Seems like there was an issue on our end. Please try again later.",
          duration: 3000,
          position: "bottom-center",
          closeButton: true,
        });
      },
    })
  );

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="grid grid-cols-2 gap-4">
              {/* Date Picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Select Date
                </label>
                <div className="relative">
                  <Button
                    size={"lg"}
                    variant="outline"
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className={cn(
                      "w-full cursor-pointer justify-start border-white/10 bg-[#222222]/80 text-left font-normal",
                      !selectedDate && "text-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span className="text-white">Pick a date</span>
                    )}
                  </Button>
                  {showCalendar && (
                    <motion.div
                      ref={clickOutsideRef}
                      className="absolute -left-4 top-full z-50 mt-2"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="rounded-md border border-white/10 bg-[#000000] p-2">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            if (date) {
                              setValue("scheduledAt", date);
                              setShowCalendar(false);
                            }
                          }}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                          classNames={{
                            day_selected: "bg-[#403E43] text-white",
                          }}
                          initialFocus
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Time Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Select Time
                </label>
                <Select
                  onValueChange={(value) => {
                    setValue("timeSlot", value);
                  }}
                  value={selectedTime}
                >
                  <SelectTrigger className="w-full cursor-pointer border-white/10 bg-[#222222]/80">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent
                    className="z-[100] max-h-[200px] overflow-y-auto border-white/10 bg-[#222222]"
                    position="popper"
                    sideOffset={4}
                  >
                    {timeSlots.map((slot, i) => (
                      <SelectItem
                        disabled={(() => {
                          if (!slot.value || !selectedDate) return true;
                          const [hours] = slot.value.split(":") ?? ["0"];
                          const selectedDateTime = new Date(selectedDate);
                          selectedDateTime.setHours(
                            parseInt(hours ?? "0"),
                            0,
                            0,
                            0
                          );
                          return selectedDateTime < new Date();
                        })()}
                        key={`${slot.value}-${i}`}
                        value={slot.value}
                        className="cursor-pointer hover:bg-[#403E43]"
                      >
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Call Type Selection */}
            <div className="mt-6 rounded-lg border border-white/5 bg-[#222222]/70 p-4">
              <h3 className="mb-3 text-sm font-medium text-gray-300">
                Select Format
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "flex h-auto cursor-pointer flex-col items-center py-3",
                    selectedCallType === CallType.VIDEO
                      ? "border-primary/50 bg-[#403E43]/40 text-white"
                      : "border-white/10 bg-[#221F26] text-gray-400"
                  )}
                  onClick={() => setValue("callType", CallType.VIDEO)}
                >
                  <Video className="mb-1 h-5 w-5" />
                  <span className="text-xs">Video</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "flex h-auto cursor-pointer flex-col items-center py-3",
                    selectedCallType === CallType.AUDIO
                      ? "border-primary/50 bg-[#403E43]/40 text-white"
                      : "border-white/10 bg-[#221F26] text-gray-400"
                  )}
                  onClick={() => setValue("callType", CallType.AUDIO)}
                >
                  <Headphones className="mb-1 h-5 w-5" />
                  <span className="text-xs">Audio</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-white/10 bg-[#222222]/40 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-[#403E43]/40 p-1.5">
                  <Clock className="h-4 w-4 text-gray-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-300">
                    Call Duration
                  </p>
                  <p className="text-sm text-gray-400">
                    Each scheduled call has a maximum duration of one hour.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer border-white/10 bg-[#221F26] text-gray-300"
                onClick={() => setIsScheduleOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                onClick={() => {
                  if (!selectedTime) {
                    toast.warning("Please select a time slot", {
                      description:
                        "You need to select a time slot to schedule a call",
                      duration: 3000,
                      position: "bottom-center",
                      closeButton: true,
                    });
                  }
                  return;
                }}
                className="cursor-pointer border border-white/10 bg-gradient-to-r from-[#403E43] to-[#221F26] text-white hover:opacity-90"
              >
                {isPending ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mr-2 h-4 w-4 rounded-full border-2 border-zinc-400 border-t-white"
                  />
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {showSuccessModal && (
          <ScheduleCallSuccessModal
            onClose={() => setShowSuccessModal(false)}
            isOpen={showSuccessModal}
            expertName={`${firstName} ${lastName}`}
            onCloseScheduleCallModal={() => setIsScheduleOpen(false)}
          />
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default ScheduleCallModal;
