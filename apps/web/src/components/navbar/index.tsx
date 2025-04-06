"use client";

import { useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/src/constants";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import AnimatedHamburgerButton from "@repo/ui/components/animated-hamburger-button";
import AnimationContainer from "@repo/ui/components/animation-container";
import { Button } from "@repo/ui/components/button";
import { HoverButton } from "@repo/ui/components/hover-button";
import Icons from "@repo/ui/components/icons";
import MaxWidthWrapper from "@repo/ui/components/max-width-wrapper";
import { useClickOutside } from "@repo/ui/hooks/index";
import { cn } from "@repo/ui/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

const Navbar = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();

  console.info("Pathname:", pathname);

  const { user, isSignedIn } = useUser();

  console.info("User:", user, isSignedIn);

  const { signOut } = useClerk();

  const mobileMenuRef = useClickOutside(() => {
    setTimeout(() => {
      if (open) setOpen(false);
    }, 0);
  });

  const { scrollY } = useScroll({
    target: ref as RefObject<HTMLDivElement>,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ redirectUrl: "/" });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      {/* Desktop */}
      <motion.div
        animate={{
          width: visible ? "60%" : "100%",
          y: visible ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 40,
        }}
        style={{
          minWidth: "800px",
        }}
        className={cn(
          "relative z-[50] mx-auto hidden w-full items-center justify-between self-start rounded-xl bg-transparent py-4 backdrop-blur-[10px] lg:flex",
          visible &&
            "bg-background/60 border-t-foreground/20 border-b-foreground/10 border-x-foreground/15 w-full border py-2"
        )}
      >
        <MaxWidthWrapper className="flex items-center justify-between lg:px-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-[50px] w-max items-center justify-center gap-1 rounded-lg">
              {/* <Link href="/">
                <Icons.logo className="w-max h-8" />
              </Link> */}
              <Link href="/">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="transitio ml-2 cursor-pointer bg-gradient-to-r from-[#ffffff] via-[#ffffff]/80 to-[#ffffff] bg-clip-text font-sans text-2xl font-extrabold text-transparent duration-300 ease-in-out hover:scale-[1.04]"
                >
                  Xpert Zone
                </motion.span>
              </Link>
            </div>
          </motion.div>

          <div className="text-muted-foreground absolute inset-0 mx-auto hidden w-max flex-1 flex-row items-center justify-center gap-x-2 text-sm font-medium lg:flex">
            <AnimatePresence>
              {NAV_LINKS.map((link, index) => (
                <AnimationContainer
                  key={index}
                  animation="fadeDown"
                  delay={0.1 * index}
                >
                  <div className="relative">
                    <Link
                      href={link.link}
                      className="hover:text-foreground hover:bg-accent rounded-md px-4 py-2 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    >
                      <Button className="cursor-pointer bg-transparent py-2 text-[#FFFFFF] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105 hover:border hover:border-[#FFFFFF26] hover:bg-[#FFFFFF0D] hover:shadow-[0px_0px_20px_0px_#FFFFFF33_inset]">
                        {link.name}
                      </Button>
                    </Link>
                  </div>
                </AnimationContainer>
              ))}
            </AnimatePresence>
          </div>

          <AnimationContainer animation="fadeLeft" delay={0.1}>
            <div className="flex items-center gap-x-4">
              {isSignedIn ? (
                <div className="flex flex-row gap-4">
                  <Link
                    href={
                      user?.publicMetadata?.role === "user"
                        ? "/user"
                        : "/expert"
                    }
                    className="flex w-full justify-center"
                  >
                    <HoverButton className="shadow-[0_1px_1px_rgba(0,0,0,0.05), 0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-lg py-2">
                      Explore
                    </HoverButton>
                  </Link>
                  <UserButton
                    appearance={{
                      elements: {
                        footer: {
                          display: "none",
                        },
                      },
                      layout: {
                        unsafe_disableDevelopmentModeWarnings: true,
                      },
                    }}
                    userProfileMode="navigation"
                    userProfileUrl="/profile"
                  />
                </div>
              ) : (
                <Link
                  href={pathname === "/sign-in" ? "/sign-up" : "/sign-in"}
                  className="flex w-full justify-center"
                >
                  <HoverButton className="shadow-[0_1px_1px_rgba(0,0,0,0.05), 0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-lg py-2">
                    {pathname === "/sign-in" ? "Sign Up" : "Login"}
                  </HoverButton>
                </Link>
              )}
            </div>
          </AnimationContainer>
        </MaxWidthWrapper>
      </motion.div>

      {/* Mobile */}
      <motion.div
        animate={{
          y: visible ? 20 : 0,
          borderTopLeftRadius: open ? "0.75rem" : "1rem",
          borderTopRightRadius: open ? "0.75rem" : "1rem",
          borderBottomLeftRadius: open ? "0rem" : "1rem",
          borderBottomRightRadius: open ? "0rem" : "1rem",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        className={cn(
          "relative z-50 mx-auto flex w-full flex-col items-center justify-between py-4 lg:hidden",
          visible && "w-11/12 border bg-neutral-950",
          open && "border-transparent",
          visible &&
            !open &&
            "bg-transparent bg-[radial-gradient(38.55%_36.76%_at_65.67%_53.56%,rgba(255,255,255,0.02)_0%,rgba(38,216,255,0.02)_48.65%,rgba(14,3,28,0)_100%)] shadow-[inset_0px_0px_10px_0px_#ffffff0d] backdrop-blur-[30px]"
        )}
      >
        <MaxWidthWrapper className="flex items-center justify-between lg:px-4">
          <div className="flex w-full items-center justify-between gap-x-4">
            <AnimationContainer animation="fadeRight" delay={0.1}>
              <div className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-white/15 shadow-[0_10px_20px_rgba(0,_11,_88,_0.7)]">
                <Link href="/">
                  <Icons.logo className="h-8 w-max" />
                </Link>
              </div>
            </AnimationContainer>

            <AnimationContainer animation="fadeLeft" delay={0.1}>
              <div className="flex items-center justify-center gap-x-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <AnimatedHamburgerButton active={open} setActive={setOpen} />
              </div>
            </AnimationContainer>
          </div>
        </MaxWidthWrapper>

        <AnimatePresence>
          {open && (
            <motion.div
              ref={(el) => {
                if (el) mobileMenuRef.current = el;
              }}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
              className="absolute inset-x-0 top-[82px] z-50 mx-auto flex w-full flex-col items-start justify-start gap-2 rounded-b-xl bg-neutral-950 px-4 py-8 shadow-xl shadow-neutral-950"
            >
              <AnimationContainer
                animation="fadeUp"
                delay={0.5}
                className="w-full"
              >
                {isSignedIn ? (
                  <div className="flex flex-col gap-4 md:flex-row">
                    <Link
                      href={
                        user?.publicMetadata?.role === "user"
                          ? "/user"
                          : "/expert"
                      }
                      className="w-full"
                    >
                      <HoverButton className="block w-full rounded-lg lg:hidden">
                        Explore
                      </HoverButton>
                    </Link>
                    <Link href="/sign-up" className="w-full">
                      <HoverButton
                        onClick={handleSignOut}
                        className="block w-full rounded-lg lg:hidden"
                      >
                        {isSigningOut ? "Signing Out..." : "Sign Out"}
                      </HoverButton>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 md:flex-row">
                    <Link href="/sign-in" className="w-full">
                      <HoverButton
                        onClick={() => setOpen(false)}
                        className="block w-full rounded-lg lg:hidden"
                      >
                        Login
                      </HoverButton>
                    </Link>
                    <Link href="/sign-up" className="w-full">
                      <HoverButton
                        onClick={() => setOpen(false)}
                        className="block w-full rounded-lg lg:hidden"
                      >
                        Sign Up
                      </HoverButton>
                    </Link>
                  </div>
                )}
              </AnimationContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Navbar;
