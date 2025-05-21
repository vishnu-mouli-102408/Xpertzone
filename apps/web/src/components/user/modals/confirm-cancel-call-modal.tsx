"use client";

import { modalVariants } from "@/src/lib/framer-animations";
import { Button } from "@repo/ui/components/button";
import { Modal } from "@repo/ui/components/modal";
import { LoaderCircle } from "lucide-react";
import { motion } from "motion/react";

interface ConfirmCancelCallModalProps {
  isConfirmCancelCallModalOpen: boolean;
  setIsConfirmCancelCallModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isLoading: boolean;
  onConfirm: () => void;
}

const ConfirmCancelCallModal = ({
  isConfirmCancelCallModalOpen,
  setIsConfirmCancelCallModalOpen,
  isLoading,
  onConfirm,
}: ConfirmCancelCallModalProps) => {
  return (
    <Modal
      className="max-w-md border border-none border-white/10 bg-[#12151c] p-6 text-white"
      showModal={isConfirmCancelCallModalOpen}
      setShowModal={setIsConfirmCancelCallModalOpen}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-lg font-bold">Confirm Cancel Call</h1>
          <p className="text-sm text-zinc-400">
            You&apos;re about to cancel the call. This action cannot be undone.
            Are you sure you want to cancel the call?
          </p>
        </div>
        <div className="mt-6 flex w-full items-center justify-end gap-3">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsConfirmCancelCallModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="cursor-pointer bg-red-500/70 text-white hover:bg-red-500/80 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoaderCircle className="h-3 w-3 animate-spin" />
                Cancelling Call
              </>
            ) : (
              "Cancel Call"
            )}
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ConfirmCancelCallModal;
