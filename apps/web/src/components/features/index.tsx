"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ButtonCta } from "@repo/ui/components/button-shiny";
import SectionBadge from "@repo/ui/components/section-badge";
import {
  Award,
  Calendar,
  MessageSquare,
  Mic,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { motion, useAnimation, useInView } from "motion/react";

const features = [
  {
    icon: <Video className="h-10 w-10 text-[#9b87f5]" />,
    title: "HD Video Calls",
    description:
      "Connect face-to-face with industry experts in crystal clear video quality.",
    delay: 0.1,
  },
  {
    icon: <Mic className="h-10 w-10 text-[#9b87f5]" />,
    title: "Audio Consultations",
    description:
      "Have in-depth discussions with flexible audio-only options when you're on the go.",
    delay: 0.2,
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-[#9b87f5]" />,
    title: "Instant Messaging",
    description:
      "Chat directly with experts, share files, and keep a record of your discussions.",
    delay: 0.3,
  },
  {
    icon: <Users className="h-10 w-10 text-[#9b87f5]" />,
    title: "Expert Network",
    description:
      "Access our carefully curated network of verified professionals across industries.",
    delay: 0.4,
  },
  {
    icon: <Calendar className="h-10 w-10 text-[#9b87f5]" />,
    title: "Flexible Scheduling",
    description:
      "Book sessions at your convenience with our smart scheduling system.",
    delay: 0.5,
  },
  {
    icon: <Award className="h-10 w-10 text-[#9b87f5]" />,
    title: "Verified Experts",
    description:
      "Every expert is thoroughly vetted to ensure quality consultations.",
    delay: 0.6,
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: feature.delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className="bg-gradient-card group relative flex h-full transform cursor-pointer flex-col overflow-hidden rounded-2xl border-[#C5B9F666] bg-opacity-30 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-2"
    >
      {/* Thinner border with hover animation - removed default glow */}
      <div className="absolute inset-0 rounded-2xl border border-[#9b87f5]/10 transition-colors duration-500 group-hover:border-[#9b87f5]/60"></div>

      {/* Moving border effect on hover only */}
      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="group-hover:animate-border-scan absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#9b87f5]/40 to-transparent bg-[length:200%_100%]"></div>
      </div>

      {/* Moving gradient background - reduced opacity and slowed down animation */}
      <div className="from-dark-100/30 to-dark-100/30 group-hover:animate-move-gradient absolute inset-0 rounded-2xl bg-gradient-to-br via-[#9b87f5]/5 bg-[length:200%_200%] opacity-0 transition-opacity duration-700 group-hover:opacity-50"></div>

      <div className="bg-dark-100/80 z-10 mb-5 w-fit rounded-xl border border-[#9b87f5]/20 p-3 backdrop-blur-sm transition-colors duration-500 group-hover:border-[#9b87f5]/50">
        {feature.icon}
      </div>
      <h3 className="relative z-10 mb-2 text-xl font-semibold text-white">
        {feature.title}
      </h3>
      <p className="relative z-10 flex-grow text-gray-300">
        {feature.description}
      </p>
    </motion.div>
  );
};

const FloatingElement = ({
  children,
  delay,
  duration,
  yOffset,
}: {
  children: React.ReactNode;
  delay: number;
  duration: number;
  yOffset: number;
}) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: yOffset }}
    transition={{
      repeat: Infinity,
      repeatType: "reverse",
      duration,
      delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

const FeaturesSection = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const heroControls = useAnimation();

  const { user } = useUser();

  useEffect(() => {
    if (isHeroInView) {
      heroControls.start("visible");
    }
  }, [isHeroInView, heroControls]);

  const connectRef = useRef(null);
  const isConnectInView = useInView(connectRef, { once: true, amount: 0.3 });
  const connectControls = useAnimation();

  useEffect(() => {
    if (isConnectInView) {
      connectControls.start("visible");
    }
  }, [isConnectInView, connectControls]);

  return (
    <div
      id="features"
      className="relative min-h-screen overflow-hidden bg-gray-900"
    >
      {/* Darker radial background gradients */}
      <div className="bg-gradient-radial absolute inset-0 from-gray-700 to-gray-950 opacity-80"></div>
      <div className="bg-gradient-radial absolute left-1/4 top-1/4 h-1/2 w-1/2 from-[#9b87f5]/10 to-transparent blur-3xl"></div>
      <div className="bg-gradient-radial absolute bottom-0 right-1/4 h-1/2 w-1/2 from-[#9b87f5]/5 to-transparent blur-3xl"></div>

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')]"></div>

      {/* Hero Section */}
      <section className="container relative z-10 mx-auto px-6 pb-16 pt-28">
        <div
          ref={heroRef}
          className="relative z-10 mx-auto max-w-5xl text-center"
        >
          <motion.div
            initial="hidden"
            animate={heroControls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <div className="mb-6 flex w-full justify-center">
              <div className="w-max">
                <SectionBadge title="Expert Knowledge on Demand" />
              </div>
            </div>
            {/* <span className="bg-gradient-dark-purple text-[#9b87f5] font-medium py-1 px-3 rounded-full text-sm mb-6 inline-block border border-[#9b87f5]/30">

            </span> */}
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl">
              Connect with <span className="text-[#9b87f5]">Experts</span> in
              Real-Time
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-300">
              Get personalized consultation from verified professionals through
              high-quality video calls, audio sessions, and instant messaging.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={
                  user?.publicMetadata?.role === "user" ? "/user" : "/expert"
                }
              >
                <ButtonCta
                  label="Find an Expert"
                  className="w-fit cursor-pointer rounded-xl px-8 py-3 text-sm font-bold shadow-lg shadow-[#9b87f5]/30 hover:scale-[1.05]"
                />
              </Link>
              <Link href={"#faq"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="hover-shadow-[box-shadow:inset_0px_0px_30px_0px_#FFFFFF4D] cursor-pointer rounded-xl border border-gray-700 bg-[#FFFFFF0D] px-8 py-3 font-medium text-white shadow-sm hover:border-[#FFFFFF26] hover:bg-[#FFFFFF1A]"
                >
                  How It Works
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute right-10 top-20 opacity-60">
          <FloatingElement delay={0} duration={3} yOffset={15}>
            <div className="h-16 w-16 rounded-full bg-[#9b87f5]/20 backdrop-blur-md"></div>
          </FloatingElement>
        </div>
        <div className="absolute bottom-10 left-10 opacity-60">
          <FloatingElement delay={1} duration={4} yOffset={20}>
            <div className="h-20 w-20 rounded-full bg-[#9b87f5]/30 backdrop-blur-md"></div>
          </FloatingElement>
        </div>
        <div className="absolute left-20 top-40 opacity-40">
          <FloatingElement delay={0.5} duration={5} yOffset={10}>
            <div className="h-14 w-14 rounded-full bg-[#9b87f5]/10 backdrop-blur-md"></div>
          </FloatingElement>
        </div>
      </section>

      {/* Features Section */}
      <section className="container relative z-10 mx-auto px-6 py-16">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="mb-6 flex w-full justify-center">
              <div className="w-max">
                <SectionBadge title="Platform Features" />
              </div>
            </div>

            <h2 className="mb-4 bg-gradient-to-r from-[#a89ed7] to-[#6f62c6] bg-clip-text text-4xl font-bold text-transparent">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Our platform provides all the tools necessary for meaningful and
              productive consultations.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </section>

      {/* Connection Showcase Section */}
      <section
        id="connect"
        className="container relative z-10 mx-auto px-6 py-16"
      >
        <div
          ref={connectRef}
          className="bg-gradient-dark relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#C5B9F666] p-12 shadow-[inset_0px_0px_55.5px_0px_#C5B9F626,inset_0px_0px_14px_0px_#FFFFFF33] backdrop-blur-[34px]"
        >
          <motion.div
            className="relative z-10"
            initial="hidden"
            animate={connectControls}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  duration: 0.8,
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6 },
                    },
                  }}
                >
                  <span className="bg-dark-100 mb-4 inline-block rounded-full border border-[#9b87f5]/30 px-3 py-1 text-sm font-medium text-[#9b87f5]">
                    Seamless Communication
                  </span>
                  <h2 className="mb-6 bg-gradient-to-r from-[#b3abd4] to-[#605895] bg-clip-text text-4xl font-bold text-transparent">
                    Connect Your Way
                  </h2>
                  <p className="mb-8 text-lg text-gray-300">
                    Whether you prefer video for face-to-face interaction, audio
                    for on-the-go consultations, or text for quick questions,
                    our platform adapts to your communication style.
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        icon: <Video className="h-5 w-5" />,
                        text: "Crystal clear HD video calls",
                      },
                      {
                        icon: <Mic className="h-5 w-5" />,
                        text: "Premium audio quality",
                      },
                      {
                        icon: <MessageSquare className="h-5 w-5" />,
                        text: "Persistent chat history",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: {
                              delay: 0.3 + i * 0.1,
                              duration: 0.5,
                            },
                          },
                        }}
                        className="flex items-center space-x-3"
                      >
                        <div className="rounded-full bg-[#9b87f5] p-2 text-white">
                          {item.icon}
                        </div>
                        <span className="text-gray-300">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: 0.2,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="relative"
              >
                <div className="bg-dark-100/80 relative z-10 rounded-2xl border border-[#9b87f5]/20 p-6 shadow-xl">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-dark-200 flex h-12 w-12 items-center justify-center rounded-full border border-[#9b87f5]/30">
                        <Users className="h-6 w-6 text-[#9b87f5]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">
                          Dr. Sarah Johnson
                        </h4>
                        <p className="text-sm text-gray-400">
                          Financial Advisor
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-dark-200 rounded-full border border-[#9b87f5]/30 p-2">
                        <Mic className="h-5 w-5 text-[#9b87f5]" />
                      </button>
                      <button className="bg-dark-200 rounded-full border border-[#9b87f5]/30 p-2">
                        <Video className="h-5 w-5 text-[#9b87f5]" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-6 space-y-4">
                    <div className="bg-dark-200 max-w-[80%] rounded-2xl rounded-tl-none border border-[#9b87f5]/10 p-3">
                      <p className="text-gray-300">
                        Hi there! I've reviewed your financial portfolio and
                        have some recommendations.
                      </p>
                    </div>
                    <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-none border border-[#9b87f5]/20 bg-[#9b87f5]/20 p-3">
                      <p className="text-gray-300">
                        That's great! I'd love to hear your thoughts on
                        diversifying my investments.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="bg-dark-200 w-full rounded-xl border border-[#9b87f5]/20 px-4 py-3 pr-12 text-white focus:border-[#9b87f5]/50 focus:outline-none"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-lg bg-[#9b87f5] p-2">
                      <Sparkles className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 h-64 w-64 rounded-full bg-[#9b87f5]/10 blur-3xl"></div>
                <div className="absolute -left-6 -top-6 h-64 w-64 rounded-full bg-[#9b87f5]/5 blur-3xl"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Background decorations */}
          <div className="absolute right-0 top-0 h-72 w-72 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-[#9b87f5]/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/2 translate-y-1/2 transform rounded-full bg-[#9b87f5]/5 blur-3xl"></div>
        </div>
      </section>

      {/* Call-to-action Section */}
      <section className="container relative z-10 mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mb-6 bg-gradient-to-r from-[#a89ed7] to-[#6f62c6] bg-clip-text text-4xl font-bold text-transparent">
            Ready to Connect with Experts?
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-300">
            Join thousands of professionals who are leveraging expert knowledge
            to solve problems and drive growth.
          </p>

          <Link
            href={user?.publicMetadata?.role === "user" ? "/user" : "/expert"}
          >
            <ButtonCta
              label="Get Started Today"
              className="w-fit cursor-pointer rounded-xl px-10 py-4 text-lg font-bold shadow-lg shadow-[#9b87f5]/30 hover:scale-[1.05]"
            />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default FeaturesSection;
