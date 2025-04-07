import { HomeIcon, Search } from "lucide-react";
import * as motion from "motion/react-client";

import { cn } from "../lib/utils";
import { Button } from "./button";

interface ResultsNotFoundProps {
  className?: string;
  description?: string;
  title?: string;
  redirectFunction: () => void;
}

export default function ResultsNotFound({
  className,
  description,
  title,
  redirectFunction,
}: ResultsNotFoundProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full max-w-md rounded-2xl border border-white/20 bg-black/80 p-8 text-center shadow-xl backdrop-blur-sm",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-800/50"
      >
        <motion.div
          animate={{
            y: [-4, 4, -4],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10"
        >
          <Search
            className="h-12 w-12 text-gray-400 dark:text-gray-300"
            strokeWidth={1.5}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r dark:from-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-3 text-2xl font-bold text-gray-900 dark:text-white"
      >
        {title ?? "No Results Found"}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8 text-gray-600 dark:text-gray-300"
      >
        {description ?? "We couldn't find any results matching your query."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="default"
          className="group relative cursor-pointer overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 text-white transition-all duration-200 ease-in-out hover:from-gray-800 hover:to-gray-600 dark:from-gray-800 dark:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-600"
          onClick={() => redirectFunction()}
        >
          <span className="flex items-center gap-2">
            <HomeIcon className="h-4 w-4" />
            Go Home
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
