"use client";

import { useEffect, useState } from "react";
import ResultsNotFound from "@/src/components/global/results-not-found";
import { useTRPC } from "@/src/trpc/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { useQuery } from "@tanstack/react-query";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  PhoneOff,
  ScreenShare,
  Settings,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface RoomProps {
  roomId: string;
}

const Room = ({ roomId }: RoomProps) => {
  console.log("ROOM ID", roomId);
  const trpc = useTRPC();

  const { data, isPending } = useQuery(
    trpc.calls.getCallById.queryOptions({
      roomId,
    })
  );

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate connection established after 2 seconds
    const timer = setTimeout(() => {
      setIsConnected(true);
      toast.info("Connected to the call");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMic = () => setIsMicOn((prev) => !prev);
  const toggleCamera = () => setIsCameraOn((prev) => !prev);

  console.log("DATA", data);
  console.log("IS PENDING", isPending);

  if (isPending) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (
    (data?.data?.endedAt && data.data.endedAt < new Date()) ||
    data?.data?.status === "COMPLETED" ||
    data?.data?.status === "CANCELED"
  ) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ResultsNotFound
          title="Call is over"
          description="The call has ended. You can no longer join the call."
          icon={
            <PhoneOff
              className="h-12 w-12 text-gray-400 dark:text-gray-300"
              strokeWidth={1.5}
            />
          }
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/10 p-4">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="transitio ml-2 cursor-pointer bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-xl font-semibold text-transparent duration-300 ease-in-out hover:scale-[1.04]"
        >
          Xpert Zone
        </motion.span>
        <div className="text-sm text-gray-400">Room: {roomId}</div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col gap-4 overflow-hidden p-4 md:flex-row">
        {/* Video containers */}
        <div className="flex flex-1 flex-col gap-4 md:flex-row">
          {/* Local video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex min-h-[240px] flex-1 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800"
          >
            {isCameraOn ? (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Placeholder for local video */}
                <div className="text-center">
                  <Avatar className="mx-auto mb-4 h-24 w-24 border-2 border-white/20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>YOU</AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-gray-400">You</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Avatar className="mx-auto mb-4 h-20 w-20 opacity-70">
                  <AvatarFallback>YOU</AvatarFallback>
                </Avatar>
                <p className="text-sm text-gray-400">Camera Off</p>
              </div>
            )}

            <div className="absolute bottom-4 left-4 rounded-md bg-black/40 px-2 py-1 text-sm">
              You (Local)
            </div>
          </motion.div>

          {/* Remote video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isConnected ? 1 : 0.5, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="relative flex min-h-[240px] flex-1 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800"
          >
            {!isConnected && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse text-center">
                  <p className="mb-2">Connecting...</p>
                  <p className="text-sm text-gray-400">
                    Waiting for expert to join
                  </p>
                </div>
              </div>
            )}

            {isConnected && (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Placeholder for remote video */}
                <div className="text-center">
                  <Avatar className="mx-auto mb-4 h-24 w-24 border-2 border-white/20">
                    <AvatarImage src="https://ui.shadcn.com/avatars/02.png" />
                    <AvatarFallback>EX</AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-gray-400">Expert</p>
                </div>
              </div>
            )}

            <div className="absolute bottom-4 left-4 rounded-md bg-black/40 px-2 py-1 text-sm">
              Expert (Remote)
            </div>
          </motion.div>
        </div>
      </main>

      {/* Controls */}
      <footer className="border-t border-white/10 p-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={toggleMic}
            variant={isMicOn ? "outline" : "secondary"}
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            {isMicOn ? <Mic /> : <MicOff />}
          </Button>

          <Button
            onClick={toggleCamera}
            variant={isCameraOn ? "outline" : "secondary"}
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            {isCameraOn ? <Camera /> : <CameraOff />}
          </Button>

          <Button
            variant="destructive"
            size="icon"
            className="h-14 w-14 cursor-pointer rounded-full bg-red-500 transition-all duration-300 ease-in-out hover:bg-red-500/90"
          >
            <PhoneOff />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            <ScreenShare />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            <Settings />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Room;
