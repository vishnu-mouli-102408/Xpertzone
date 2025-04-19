"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import env from "@/src/env";
import { useDbUser } from "@/src/hooks";
import { useTRPC } from "@/src/trpc/react";
import AnimationContainer from "@repo/ui/components/animation-container";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

import { CircleProgress } from "../global/circular-progress";
import ConfirmBillingModal from "./confirm-billing-modal";
import PaymentCancelModal from "./payment-cancel-modal";
import PaymentSuccessModal from "./payment-success-modal";

interface BillingProps {
  successParam?: boolean;
  canceledParam?: boolean;
}

const Billing = ({
  canceledParam = false,
  successParam = false,
}: BillingProps) => {
  const [isConfirmBillingModalOpen, setIsConfirmBillingModalOpen] =
    useState(false);
  const [isUpgradeLoading, setIsUpgradeLoading] = useState(false);
  const [isOpenPaymentSuccessModal, setIsOpenPaymentSuccessModal] =
    useState(false);

  const [isOpenPaymentCanceledModal, setIsOpenPaymentCanceledModal] =
    useState(false);

  const queryClient = useQueryClient();

  const router = useRouter();

  const trpc = useTRPC();

  const { data, isPending: isUserDataFetching } = useDbUser();

  //   console.log("SUCCESS PARAM", successParam);
  //   console.log("CANCELED PARAM", canceledParam);

  const { data: UserQuota } = useQuery(trpc.user.getUserQuota.queryOptions());

  useEffect(() => {
    if (successParam) {
      setIsOpenPaymentSuccessModal(true);
    }
  }, [successParam]);

  useEffect(() => {
    if (canceledParam) {
      setIsOpenPaymentCanceledModal(true);
    }
  }, [canceledParam]);

  const handleUpgradePlan = () => {
    setIsUpgradeLoading(true);
    try {
      handleCheckout({ plan: "PRO" });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to initiate plan change process. Please try again later."
      );
    }
  };

  const { mutate: handleCheckout, isPending } = useMutation(
    trpc.payment.createCheckoutSession.mutationOptions({
      onSuccess: ({ url }) => {
        setIsUpgradeLoading(false);
        if (url) router.push(url);
      },
      onError: (error) => {
        setIsUpgradeLoading(false);
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to initiate plan change process. Please try again later."
        );
      },
    })
  );

  const handleManageSubscription = () => {
    const url = env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL ?? "";
    if (url) {
      router.push(`${url}?prefilled_email=${data?.data?.email}`);
    } else {
      toast.error("Failed to redirect to Stripe customer portal.", {
        duration: 3000,
        description: "Please try again later.",
        position: "bottom-center",
      });
    }
  };

  if (isUserDataFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner variant="bars" />
      </div>
    );
  }

  return (
    <div className="px-6 py-12 sm:px-8 md:px-12">
      <AnimationContainer className="mx-auto max-w-4xl">
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-2 flex items-center gap-3"
          >
            <div className="h-1.5 w-12 rounded-full bg-white/30" />
            <span className="text-sm font-medium uppercase tracking-wider text-zinc-400">
              Payments
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="mb-3 text-4xl font-bold text-white"
          >
            Billing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="max-w-xl text-zinc-400"
          >
            Manage your billing settings and preferences
          </motion.p>
        </header>

        <main className="neo-blur mb-8 rounded-2xl">
          <div className="flex flex-col items-start justify-between gap-8 p-6 md:flex-row">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-white">
                  {data?.data?.plan}
                </h3>
                <span className="bg-muted/80 text-accent-foreground rounded-sm border px-2 py-0.5 text-xs shadow-inner">
                  Current plan
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-300/80">
                {data?.data?.plan === "FREE"
                  ? "Perfect for trying out"
                  : "For professional developers"}
              </p>
            </div>
            <div className="flex flex-col items-end justify-between space-y-3">
              <div className="flex w-full items-center justify-between gap-6">
                <div className="flex items-center">
                  <div className="mr-2 w-5">
                    <CircleProgress
                      progress={
                        (UserQuota?.data?.count ?? 0) /
                        (data?.data?.quotaLimit ?? 50)
                      }
                    />
                  </div>
                  <div className="text-foreground text-sm">Monthly Usage</div>
                </div>
                <div className="text-sm tabular-nums">
                  {UserQuota?.data?.count ?? 0} /{data?.data?.quotaLimit ?? 50}
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-6">
                <div className="flex items-center">
                  <div className="mr-2 flex w-5 items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center p-1">
                      <span className="text-[22px] leading-none">∞</span>
                    </div>
                  </div>
                  <div className="text-foreground text-sm">
                    Chat with Experts
                  </div>
                </div>
                <span className="bg-muted/80 text-accent-foreground rounded-sm border px-2 py-0.5 text-xs shadow-inner">
                  unlimited
                </span>
              </div>
              <div className="flex w-full items-center justify-between gap-6">
                <div className="flex items-center">
                  <div className="mr-2 flex w-5 items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center p-1">
                      <span className="text-[22px] leading-none">∞</span>
                    </div>
                  </div>
                  <div className="text-foreground text-sm">
                    Analytics & Insights
                  </div>
                </div>
                <span className="bg-muted/80 text-accent-foreground rounded-sm border px-2 py-0.5 text-xs shadow-inner">
                  unlimited
                </span>
              </div>
            </div>
          </div>
          {data?.data?.plan === "PRO" && (
            <div className="flex justify-end rounded-b-lg border-t border-t-white/10 bg-[#18181B] p-4">
              <Button
                onClick={handleManageSubscription}
                className="cursor-pointer"
              >
                Manage Subscription
              </Button>
            </div>
          )}
        </main>

        {/* Upgrade Plan Section */}
        {data?.data?.plan === "FREE" && (
          <>
            <h1 className="mb-2 font-semibold"> Upgrade to Pro</h1>
            <main className="neo-blur rounded-2xl">
              <div className="flex flex-col items-start justify-between gap-8 p-6 md:flex-row">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h4 className="text-md font-medium text-white">
                      $20 per month
                    </h4>
                  </div>
                  <p className="mt-2 text-xs text-gray-300/80">
                    For professional developers
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-sm">
                      <strong>150 </strong> Calls per month
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-sm">
                      Unlimited <strong>Chat</strong> with Experts
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-sm">Priority Booking</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end rounded-b-lg border-t border-t-white/10 bg-[#18181B] p-4">
                <Button
                  onClick={() => {
                    setIsConfirmBillingModalOpen(true);
                  }}
                  disabled={isUpgradeLoading || isPending}
                  className="cursor-pointer"
                >
                  {isUpgradeLoading || isPending ? (
                    <>
                      <LoaderCircle className="h-3 w-3 animate-spin" />
                      Processing
                    </>
                  ) : (
                    "Upgrade Plan"
                  )}
                </Button>
              </div>
            </main>
          </>
        )}
      </AnimationContainer>

      <AnimatePresence>
        {isConfirmBillingModalOpen && (
          <ConfirmBillingModal
            onConfirm={() => {
              setIsConfirmBillingModalOpen(false);
              handleUpgradePlan();
            }}
            isLoading={isUpgradeLoading}
            isConfirmBillingModalOpen={isConfirmBillingModalOpen}
            setIsConfirmBillingModalOpen={setIsConfirmBillingModalOpen}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenPaymentSuccessModal && (
          <PaymentSuccessModal
            isOpen={isOpenPaymentSuccessModal}
            onClose={() => setIsOpenPaymentSuccessModal(false)}
            onClosePaymentSuccessModal={async () => {
              const url = new URL(window.location.href);
              url.searchParams.delete("success");
              window.history.replaceState({}, "", url);
              await queryClient.invalidateQueries(
                trpc.auth.getUserDetails.pathFilter()
              );
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenPaymentCanceledModal && (
          <PaymentCancelModal
            isOpen={isOpenPaymentCanceledModal}
            onClose={() => setIsOpenPaymentCanceledModal(false)}
            onClosePaymentCancelModal={() => {
              const url = new URL(window.location.href);
              url.searchParams.delete("canceled");
              window.history.replaceState({}, "", url);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Billing;
