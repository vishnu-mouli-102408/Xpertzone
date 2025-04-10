"use client";

import { useEffect } from "react";
import { Home, RefreshCcw, TriangleAlert } from "lucide-react";
import { motion } from "motion/react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black">
      <div className="relative">
        <div className="relative rounded-lg bg-black bg-opacity-90 px-8 py-10 shadow-2xl backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <motion.div
              //   animate={{
              //     rotate: [0, 360],
              //   }}
              //   transition={{
              //     duration: 10,
              //     repeat: Infinity,
              //     ease: "linear",
              //   }}
              className="text-red-500"
            >
              <TriangleAlert size={64} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white"
            >
              Oops! Something Went Wrong.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-md text-gray-400"
            >
              {error.message ||
                "We apologize for the inconvenience. Seems like there's an issue on our end. Please try again in a moment."}
            </motion.p>

            <div className="mt-2 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={reset}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <RefreshCcw size={20} />
                Try Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (location.href = "/")}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <Home size={20} />
                Go Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
