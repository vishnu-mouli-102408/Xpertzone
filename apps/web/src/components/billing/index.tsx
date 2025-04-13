import AnimationContainer from "@repo/ui/components/animation-container";
import { Button } from "@repo/ui/components/button";
import { Check } from "lucide-react";
import * as motion from "motion/react-client";

import { CircleProgress } from "../global/circular-progress";

const Billing = () => {
  //   const user = await currentUser();

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

        <main className="neo-blur mb-8 rounded-2xl p-6">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-white">Free</h3>
                <span className="bg-muted/80 text-accent-foreground rounded-sm border px-2 py-0.5 text-xs shadow-inner">
                  Current plan
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-300/80">
                Perfect for trying out
              </p>
            </div>
            <div className="flex flex-col items-end justify-between space-y-3">
              <div className="flex w-full items-center justify-between gap-6">
                <div className="flex items-center">
                  <div className="mr-2 w-5">
                    <CircleProgress progress={2 / 5} />
                  </div>
                  <div className="text-foreground text-sm">Monthly Usage</div>
                </div>
                <div className="text-sm tabular-nums">2 / 5</div>
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
        </main>
        <h1 className="mb-2 font-semibold"> Upgrade to Pro</h1>
        <main className="neo-blur rounded-2xl">
          <div className="flex flex-col items-start justify-between gap-8 p-6 md:flex-row">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h4 className="text-md font-medium text-white">
                  $10 per month
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
                  <strong>15 </strong> Calls per month
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
            <Button className="cursor-pointer" disabled={false}>
              Upgrade plan
            </Button>
          </div>
        </main>
      </AnimationContainer>
    </div>
  );
};

export default Billing;
