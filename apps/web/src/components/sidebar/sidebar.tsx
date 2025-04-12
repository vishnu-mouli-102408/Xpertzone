"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { useIsMobile } from "@repo/ui/hooks";
import { cn } from "@repo/ui/lib/utils";
import { ChevronLeft, Menu, X } from "lucide-react";
import { motion } from "motion/react";

import { useSidebar } from "./sidebar-context";

interface SidebarProps {
  className?: string;
  navItems: {
    icon: React.JSX.Element;
    label: string;
    href: string;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ className, navItems }) => {
  const { user } = useUser();
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const [activeItemIndex, setActiveItemIndex] = React.useState(
    `/${user?.publicMetadata.role === "user" ? "user" : "expert"}`
  );

  const pathname = usePathname();
  //   console.log("pathname", pathname);

  useEffect(() => {
    setActiveItemIndex(pathname);
  }, [pathname]);

  return (
    <>
      {/* Main Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isMobile ? (isOpen ? "70%" : "0") : isOpen ? "240px" : "66px",
          x: isMobile && !isOpen ? "-100%" : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className={cn(
          "fixed left-0 top-0 z-[999] h-screen overflow-hidden border-r border-white/10 bg-black",
          isMobile && !isOpen ? "w-0" : "",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
            <div className="flex items-center gap-2">
              {isOpen && (
                <motion.div className="flex items-center justify-center gap-2">
                  <Link href={"/"}>
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="transitio ml-2 cursor-pointer bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-lg font-semibold text-transparent duration-300 ease-in-out hover:scale-[1.04]"
                    >
                      Xpert Zone
                    </motion.span>
                  </Link>
                </motion.div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
              title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isMobile ? (
                <motion.span
                  key={isOpen ? "close-mobile" : "open-mobile"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={16} /> : <Menu size={16} />}
                </motion.span>
              ) : (
                <motion.span
                  key={isOpen ? "collapse-desktop" : "expand-desktop"}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronLeft
                    size={16}
                    className={!isOpen ? "rotate-180 cursor-pointer" : ""}
                  />
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Navigation */}
          <div className="scrollbar-none flex-1 overflow-y-auto px-3 py-4">
            <nav className="space-y-2 transition-all duration-300 ease-in-out">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className={!isOpen ? "flex justify-center" : ""}
                >
                  <Link href={item.href}>
                    <motion.div
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-md",
                        isOpen ? "px-3 py-2" : "h-10 w-10 justify-center",
                        activeItemIndex === item.href
                          ? "bg-white/20 text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      )}
                      whileHover={{ scale: isOpen ? 1.02 : 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveItemIndex(item.href);
                        if (isMobile) {
                          closeSidebar();
                        }
                      }}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center",
                          isOpen ? "h-5 w-5" : "",
                          activeItemIndex === item.href
                            ? "text-white"
                            : "text-white/70"
                        )}
                      >
                        {item.icon}
                      </div>
                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* User section */}
          <div className="border-t border-white/10 p-4">
            {isOpen ? (
              <div className="flex items-center gap-2 text-sm text-white/70">
                <UserButton />
                <span>{user?.fullName ?? "User"}</span>
              </div>
            ) : (
              <UserButton />
            )}
          </div>
        </div>
      </motion.aside>

      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-black"
        />
      )}
    </>
  );
};

export default Sidebar;
