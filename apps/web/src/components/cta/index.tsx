"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import AnimationContainer from "@repo/ui/components/animation-container";
import { HoverButton } from "@repo/ui/components/hover-button";
import MaxWidthWrapper from "@repo/ui/components/max-width-wrapper";
import Particles from "@repo/ui/components/particles";
import { motion } from "motion/react";

const CTA = () => {
  const { user } = useUser();
  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-gradient-to-r from-[#00000070] to-[#000000] py-20">
      <MaxWidthWrapper>
        <AnimationContainer
          animation="fadeUp"
          className="mx-auto py-8 md:py-20"
        >
          <div className="bg-background/20 border-foreground/20 relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border px-0 py-8 text-center shadow-[inset_0px_0px_55.5px_0px_#C5B9F626] md:py-20 lg:rounded-3xl">
            <Particles
              refresh
              ease={80}
              quantity={80}
              color="#d4d4d4"
              className="absolute inset-0 z-0 hidden md:block"
            />
            <Particles
              refresh
              ease={80}
              quantity={35}
              color="#d4d4d4"
              className="absolute inset-0 z-0 block md:hidden"
            />

            <motion.div
              className="-bottom-1/8 absolute left-1/3 -z-10 h-32 w-44 -translate-x-1/2 rounded-full blur-[5rem] lg:h-52 lg:w-1/3 lg:blur-[10rem]"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, #a855f7 0deg, #3b82f6 180deg, #06b6d4 360deg)",
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewport={{ amount: 0.5 }}
              className="font-heading text-3xl font-medium !leading-snug md:text-5xl lg:text-6xl"
            >
              Get Expert Advice <br />{" "}
              <span className="font-subheading italic">Anytime, Anywhere</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewport={{ amount: 0.5 }}
              className="text-accent-foreground/80 mx-auto mt-4 max-w-2xl text-center text-sm md:text-lg"
            >
              Connect with top professionals for real-time consultations. Book
              sessions, chat instantly, and get expert guidance on-demand{" "}
              <span className="hidden lg:inline">
                — all from one seamless platform.
              </span>
            </motion.p>

            <Link
              href={user?.publicMetadata.role === "user" ? "/user" : "/expert"}
              className="mt-8"
            >
              <HoverButton className="rounded-lg">
                Let&apos;s get started
              </HoverButton>
            </Link>
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>
    </div>
  );
};

export default CTA;
