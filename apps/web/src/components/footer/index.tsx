import Link from "next/link";
import { HOME_ITEMS, PRODUCT_ITEMS } from "@/src/constants";
import AnimationContainer from "@repo/ui/components/animation-container";
import { GradientText } from "@repo/ui/components/gradient-text";
import { HoverButton } from "@repo/ui/components/hover-button";
import Icons from "@repo/ui/components/icons";
import MaxWidthWrapper from "@repo/ui/components/max-width-wrapper";
import * as motion from "motion/react-client";

import SocialButton from "./social-button";

const words = [
  { text: "Empower", className: "text-[#40ffaa]" },
  { text: "Your", className: "text-[#4079ff]" },
  { text: "Expertise", className: "text-[#40ffaa]" },
  { text: ".", className: "text-[#4079ff]" },
  { text: "Connect", className: "text-[#40ffaa]" },
  { text: "Seamlessly", className: "text-[#4079ff]" },
  { text: ".", className: "text-[#40ffaa]" },
];

const Footer = () => {
  return (
    <footer
      id="footer"
      className="border-border relative flex w-full flex-col items-center justify-center overflow-clip border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-2 py-6 md:px-16 md:py-10"
    >
      <div className="absolute top-0 z-[-2] h-full w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <MaxWidthWrapper className="lg:px-14">
        <div className="bg-foreground absolute left-1/2 right-1/2 top-0 h-1 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
        <AnimationContainer animation="scaleUp">
          <div className="mb-8 rounded-2xl border border-[#C5B9F633] bg-[#FFFFFF0D] p-6 shadow-[inset_0px_0px_55.5px_0px_#C5B9F626] backdrop-blur-[34px] md:p-10">
            <div className="mb-6 flex w-full flex-col items-center justify-between gap-6 rounded-xl border border-[#FFFFFF1A] bg-[#FFFFFF0A] p-3 py-6 md:flex-row md:p-6">
              <AnimationContainer
                className="flex flex-row items-center gap-2 transition-all duration-500 ease-in-out hover:scale-[1.02]"
                animation="fadeRight"
                delay={0.1}
              >
                <div className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-lg">
                  <Link href="/">
                    <Icons.logo className="h-10 w-max" />
                  </Link>
                </div>
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={3}
                  className="w-max bg-transparent text-2xl font-semibold"
                >
                  Xpert Zone
                </GradientText>
              </AnimationContainer>
              <Link
                href="#"
                className="flex w-full justify-center md:justify-end"
              >
                <HoverButton className="shadow-[0_1px_1px_rgba(0,0,0,0.05), 0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-lg py-2">
                  Get Started
                </HoverButton>
              </Link>
            </div>
            <div className="mb-10 flex flex-col items-center justify-between md:mb-16 md:flex-row">
              <div className="mb-8 flex max-w-full flex-col gap-2 md:mb-0 md:max-w-[40%]">
                <motion.h1
                  className="text-center text-lg font-semibold text-[#F1F0E9] md:text-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  viewport={{ amount: 0.5 }}
                >
                  Empower Your Expertise. Connect Seamlessly.
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  viewport={{ amount: 0.5 }}
                  className="text-center text-base text-[#FFFFFF66] md:text-start"
                >
                  Expert advice, anytime. Connect with professionals via video,
                  audio, and chat. Seamless bookings, secure payments, and
                  real-time support—all in one place.
                </motion.h1>
              </div>
              <div className="flex flex-row gap-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  viewport={{ amount: 0.5 }}
                  className="flex flex-col gap-2 transition-all duration-500 ease-in-out"
                >
                  {HOME_ITEMS?.map((item, index) => {
                    return (
                      <AnimationContainer
                        key={item?.name}
                        animation="fadeRight"
                        delay={0.8 + index * 0.1}
                      >
                        <Link
                          href={item?.link}
                          className={`flex transition-all duration-200 ease-in-out hover:scale-[1.1] ${index === 0 ? "text-base font-semibold text-white hover:text-[#d9e0e5]" : "text-[14px] text-[#d3c3c3] hover:text-[#7F8487]"} flex-col gap-2`}
                        >
                          {item?.name}
                        </Link>
                      </AnimationContainer>
                    );
                  })}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  viewport={{ amount: 0.5 }}
                  className="flex flex-col gap-2 transition-all duration-500 ease-in-out"
                >
                  {PRODUCT_ITEMS?.map((item, index) => {
                    return (
                      <AnimationContainer
                        key={item?.name}
                        animation="fadeRight"
                        delay={0.8 + index * 0.1}
                        className={`flex transition-all duration-200 ease-in-out hover:scale-[1.1] ${index === 0 ? "text-base font-semibold text-white hover:text-[#d9e0e5]" : "text-[14px] text-[#d3c3c3] hover:text-[#7F8487]"} flex-col gap-2`}
                      >
                        <Link href={item?.link} className="flex flex-col gap-2">
                          {item?.name}
                        </Link>
                      </AnimationContainer>
                    );
                  })}
                </motion.div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-3 md:flex-row md:gap-6">
              <motion.h1
                className="text-2xl font-semibold text-[#F1F0E9]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                viewport={{ amount: 0.5 }}
              >
                Get latest updates here
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                viewport={{ amount: 0.5 }}
                className="flex-1 border-[0.5px] border-t border-[#FFFFFF]/20"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                viewport={{ amount: 0.5 }}
                className="flex flex-row gap-4"
              >
                <SocialButton
                  icon={<Icons.linkedin />}
                  buttonClassName="group flex cursor-pointer justify-center p-2 rounded-md drop-shadow-xl bg-[#0077b5] from-gray-800 text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413] relative"
                  name="LinkedIn"
                  href="https://www.linkedin.com/in/ganivada-mouli/"
                />
                <SocialButton
                  icon={<Icons.discord />}
                  buttonClassName="group flex justify-center cursor-pointer p-2 rounded-md drop-shadow-xl bg-[#7289da] from-gray-800 text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                  name="Discord"
                />
                <SocialButton
                  icon={<Icons.github />}
                  buttonClassName="group flex justify-center cursor-pointer p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                  name="Github"
                  href="https://github.com/vishnu-mouli-102408"
                />
                <SocialButton
                  icon={<Icons.youtube />}
                  buttonClassName="group flex justify-center cursor-pointer p-2 rounded-md drop-shadow-xl bg-[#CD201F] from-gray-800 text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                  name="Youtube"
                  href="https://www.youtube.com/"
                />
                <SocialButton
                  icon={<Icons.x />}
                  name="X"
                  href="https://x.com/iamVishnuMouli"
                  buttonClassName="group flex justify-center cursor-pointer p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                />
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewport={{ amount: 0.5 }}
              className="text-base font-normal text-[#7f7f7d]"
            >
              Made by Vishnu Mouli
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewport={{ amount: 0.5 }}
              className="text-base font-normal text-[#7f7f7d]"
            >
              {new Date().getFullYear()} © Xpert Zone. All rights reserved.
            </motion.h1>
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
