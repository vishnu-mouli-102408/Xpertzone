"use client";

import { type FC, type ReactNode } from "react";
import Sidebar from "@/src/components/sidebar/sidebar";
import { useSidebar } from "@/src/components/sidebar/sidebar-context";
import { useDbUser } from "@/src/hooks";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { useIsMobile } from "@repo/ui/hooks";
import { BarChart3, Menu, MessageSquare, Settings, Video } from "lucide-react";
import { motion } from "motion/react";

export interface AppLayoutProps {
  children: ReactNode;
}

// The main layout that includes the sidebar and content
export const AppLayoutContent: FC<AppLayoutProps> = ({ children }) => {
  const { isOpen, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const { data: userData, isPending } = useDbUser();

  const contentVariants = {
    open: {
      marginLeft: "240px",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      marginLeft: "66px",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    mobile: {
      marginLeft: "0px",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const navItems = [
    {
      icon: <BarChart3 size={18} />,
      label: "Overview",
      href: "/expert",
    },
    {
      icon: <MessageSquare size={18} />,
      label: "Messages",
      href: "/expert/chats",
    },
    { icon: <Video size={18} />, label: "Calls", href: "/expert/calls" },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      href: "/expert/settings",
    },
  ];

  return (
    <div className="bg-background dark flex min-h-screen">
      <Sidebar navItems={navItems} />

      <motion.div
        initial={false}
        animate="main"
        variants={contentVariants}
        className="w-full"
      >
        {/* Mobile header */}
        <div className="sticky top-0 z-[100] flex h-16 items-center justify-between border-b border-b-gray-500/30 bg-transparent bg-opacity-80 px-5 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] backdrop-blur-lg md:hidden">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar}
              className="hover:bg-secondary rounded-lg border border-white/10 bg-[#222222] p-2"
            >
              <Menu size={22} />
            </motion.button>
          </div>
          <div className="flex items-center gap-4">
            <UserButton />
          </div>
        </div>

        <motion.header
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={isMobile ? undefined : contentVariants}
          className="sticky top-0 z-[100] hidden h-16 items-center justify-between border-b border-white/10 bg-black px-4 shadow-sm md:flex"
        >
          <div className="flex h-14 w-full items-center justify-between px-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="mr-4 p-1 text-gray-400 hover:text-white md:hidden"
                onClick={() => toggleSidebar()}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <UserButton />
                {isPending ? (
                  <span className="hidden text-sm font-medium text-white md:inline">
                    <Spinner variant="ring" />
                  </span>
                ) : (
                  <span className="hidden cursor-pointer text-sm font-medium text-white md:inline">
                    {`${userData?.data?.firstName} ${userData?.data?.lastName}`}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main content */}
        <motion.main
          variants={isMobile ? undefined : contentVariants}
          animate={isOpen ? "open" : "closed"}
          className="flex-1"
        >
          {children}
        </motion.main>
      </motion.div>
    </div>
  );
};
