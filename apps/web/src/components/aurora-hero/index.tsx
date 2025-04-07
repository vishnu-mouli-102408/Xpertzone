"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import AnimationContainer from "@repo/ui/components/animation-container";
import { GridBeam } from "@repo/ui/components/grid-beam";
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  const { user } = useUser();

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen overflow-hidden bg-gray-950 px-4 py-14 text-gray-200 md:py-24"
    >
      <GridBeam className="place-content-center">
        <div className="relative z-10 flex flex-col items-center">
          <AnimationContainer className="mb-6 md:mb-3" delay={0.0}>
            <div className="border-foreground/10 hover:border-foreground/15 mx-auto flex w-max cursor-pointer select-none items-center gap-2.5 rounded-full border py-1 pl-2 pr-1 backdrop-blur-lg">
              <div className="bg-primary/40 relative flex h-3.5 w-3.5 items-center justify-center rounded-full">
                <div className="bg-primary/60 flex h-2.5 w-2.5 animate-ping items-center justify-center rounded-full">
                  <div className="bg-primary/60 flex h-2.5 w-2.5 animate-ping items-center justify-center rounded-full"></div>
                </div>
                <div className="bg-primary absolute left-1/2 top-1/2 flex h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"></div>
              </div>
              <span className="animate-text-gradient animate-background-shine inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-sm text-transparent">
                Expert Knowledge on Demand
                <span className="text-secondary-foreground from-foreground/20 to-foreground/10 flex items-center justify-center rounded-full bg-gradient-to-b px-1.5 py-0.5 text-xs">
                  What&apos;s new
                  <ArrowRightIcon className="text-foreground/50 ml-1 h-3.5 w-3.5" />
                </span>
              </span>
            </div>
          </AnimationContainer>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ amount: 0.5 }}
            className="max-w-3xl bg-gradient-to-br from-gray-200 to-gray-500 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight"
          >
            Instant Expert Calls for Smarter Decisions!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ amount: 0.5 }}
            className="my-10 max-w-xl text-center text-base leading-relaxed md:my-6 md:text-lg md:leading-relaxed"
          >
            Skip the hassle of endless searching—find the right expert, schedule
            a call, and get personalized, real-time solutions through seamless
            consultations.
          </motion.p>
          <Link
            href={user?.publicMetadata.role === "user" ? "/user" : "/expert"}
          >
            <motion.button
              style={{
                border,
                boxShadow,
              }}
              whileHover={{
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.985,
              }}
              className="group relative flex w-fit cursor-pointer items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
            >
              Get Started
              <ArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
            </motion.button>
          </Link>
        </div>
      </GridBeam>
    </motion.section>
  );
};
