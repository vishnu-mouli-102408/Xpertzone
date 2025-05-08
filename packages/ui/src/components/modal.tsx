"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { Drawer } from "vaul";

import { useMediaQuery } from "../hooks";
import { cn } from "../lib/utils";
import { Dialog, DialogContent, DialogTitle } from "./dialog";

interface ModalProps {
  children?: ReactNode;
  className?: string;
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  desktopOnly?: boolean;
  preventDefaultClose?: boolean;
}

export const Modal = ({
  children,
  className,
  desktopOnly,
  onClose,
  preventDefaultClose,
  setShowModal,
  showModal,
}: ModalProps) => {
  const closeModal = ({ dragged }: { dragged?: boolean }) => {
    if (preventDefaultClose && !dragged) {
      return;
    }

    if (onClose) {
      onClose();
    }

    if (setShowModal) {
      setShowModal(false);
    }
  };

  const { isMobile } = useMediaQuery();

  if (isMobile && !desktopOnly) {
    return (
      <Drawer.Root
        open={setShowModal ? showModal : true}
        onOpenChange={(open) => {
          if (!open) {
            closeModal({ dragged: true });
          }
        }}
      >
        <Drawer.Overlay className="bg-opacity-10 fixed inset-0 z-40 bg-transparent backdrop-blur" />
        <Drawer.Portal>
          <Drawer.Content
            className={cn(
              "fixed right-0 bottom-0 left-0 z-50 mt-24 !max-w-none rounded-t-4xl border-t border-gray-700 bg-black/80",
              className
            )}
          >
            <DialogTitle className="sr-only">Dialog</DialogTitle>
            <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
              <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
            </div>

            {children}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <Dialog
      open={setShowModal ? showModal : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal({ dragged: true });
        }
      }}
    >
      <DialogOverlay className="bg-opacity-10 fixed inset-0 z-40 bg-transparent backdrop-blur" />
      <DialogTitle className="sr-only">Dialog</DialogTitle>
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
};
