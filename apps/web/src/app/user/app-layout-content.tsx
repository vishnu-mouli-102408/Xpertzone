"use client";

import { useEffect, useState, type FC, type ReactNode } from "react";
import { SearchModal } from "@/src/components";
import Sidebar from "@/src/components/sidebar/sidebar";
import { useSidebar } from "@/src/components/sidebar/sidebar-context";
import { NotificationPopover } from "@/src/components/ui/notification-popover";
import { useDbUser } from "@/src/hooks";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { useIsMobile } from "@repo/ui/hooks";
import {
  BarChart3,
  Bell,
  Command,
  CreditCard,
  Mail,
  Menu,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

export interface AppLayoutProps {
  children: ReactNode;
}

// The main layout that includes the sidebar and content
export const AppLayoutContent: FC<AppLayoutProps> = ({ children }) => {
  const { isOpen, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const { data: userData, isPending } = useDbUser();

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Handle CMD+K shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      href: "/user",
    },
    {
      icon: <Users size={18} />,
      label: "Explore Experts",
      href: "/user/explore-experts",
    },
    { icon: <Users size={18} />, label: "Users", href: "/" },
    { icon: <Mail size={18} />, label: "Messages", href: "/" },
    { icon: <Search size={18} />, label: "Search", href: "/" },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      href: "/user/settings",
    },
    {
      icon: <CreditCard size={18} />,
      label: "Billing",
      href: "/user/billing",
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

            <div
              className="flex cursor-pointer items-center rounded-lg border border-white/10 bg-[#222222] px-4 py-2"
              onClick={() => setIsSearchModalOpen(true)}
            >
              <Search className="mr-2 h-4 w-4 text-gray-400" />
              <span className="hidden text-sm text-gray-400 sm:inline">
                Search for experts...
              </span>
              <div className="ml-2 flex items-center gap-1 rounded bg-[#403E43] px-2 py-1 text-xs text-gray-300 sm:ml-4">
                <Command className="h-3 w-3" />
                <span>K</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative cursor-pointer text-gray-400 transition-all duration-300 ease-in-out hover:scale-[1.05] hover:text-white"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
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
              <div
                className="flex cursor-pointer items-center rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-2"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <Search className="mr-2 h-4 w-4 text-gray-400" />
                <span className="mr-10 hidden text-sm text-gray-400 sm:inline">
                  Search for experts
                </span>
                <div className="ml-2 flex items-center gap-1 rounded bg-[#403E43] px-2 py-1 text-xs text-gray-300 sm:ml-4">
                  <Command className="h-3 w-3" />
                  <span>K</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-400 cursor-pointer hover:scale-[1.05] transition-all duration-300 ease-in-out hover:text-white"
              >
                <Bell className="h-5 w-5 " />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button> */}
              <NotificationPopover />
              <div className="flex items-center space-x-3">
                {/* <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden"> */}
                <UserButton />
                {/* </div> */}
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

      {/* Search Modal */}
      {isSearchModalOpen && (
        <SearchModal onClose={() => setIsSearchModalOpen(false)} />
      )}
    </div>
  );
};
