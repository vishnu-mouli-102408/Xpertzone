"use client";

import { modalVariants } from "@/src/lib/framer-animations";
import { Button } from "@repo/ui/components/button";
import { Modal } from "@repo/ui/components/modal";
import { LoaderCircle } from "lucide-react";
import { motion } from "motion/react";

interface ConfirmBillingModalProps {
  isConfirmBillingModalOpen: boolean;
  setIsConfirmBillingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  onConfirm: () => void;
}

const ConfirmBillingModal = ({
  isConfirmBillingModalOpen,
  setIsConfirmBillingModalOpen,
  isLoading,
  onConfirm,
}: ConfirmBillingModalProps) => {
  return (
    <Modal
      className="max-w-md border border-none border-white/10 bg-[#12151c] p-6 text-white"
      showModal={isConfirmBillingModalOpen}
      setShowModal={setIsConfirmBillingModalOpen}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-lg font-bold">Confirm Plan Upgrade</h1>
          <p className="text-sm text-zinc-400">
            You&apos;re about to upgrade to the Pro plan. You will be charged
            $20 for the first month.
          </p>
        </div>
        <div className="mt-6 flex w-full items-center justify-end gap-3">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsConfirmBillingModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoaderCircle className="h-3 w-3 animate-spin" />
                Processing
              </>
            ) : (
              "Confirm Upgrade"
            )}
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ConfirmBillingModal;
