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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Progress } from "@repo/ui/components/progress";
import { Spinner } from "@repo/ui/components/spinner";
import { useQuery } from "@tanstack/react-query";
import {
  Camera,
  CameraOff,
  Clock,
  Mic,
  MicOff,
  PhoneOff,
  ScreenShare,
  Settings,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

import { formatTimeRemaining } from "../../utils";

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

  const [callStarted, setCallStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [showPreCallDialog, setShowPreCallDialog] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (data?.data?.startedAt) {
      const now = new Date();
      const timeDiff = Math.max(
        0,
        Math.floor((data.data.startedAt.getTime() - now.getTime()) / 1000)
      );
      setTimeRemaining(timeDiff);
      setTotalDuration(timeDiff);
    }
  }, [data]);

  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCallStarted(true);
          setShowPreCallDialog(false);

          setTimeout(() => {
            setIsConnected(true);
            toast("Connected to the call");
          }, 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const calculateProgress = () => {
    if (!data?.data?.startedAt || totalDuration === 0) return 0;

    const elapsed = totalDuration - timeRemaining;
    return (elapsed / totalDuration) * 100;
  };

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
      <main
        className={`flex flex-1 flex-col gap-4 overflow-hidden p-4 md:flex-row ${!callStarted ? "relative" : ""}`}
      >
        {!callStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900/90 to-black/95"
          >
            <div className="mx-auto max-w-md space-y-6 p-6 text-center">
              <h2 className="text-gradient text-2xl font-bold">
                Call Starting Soon
              </h2>

              <div className="flex flex-col items-center gap-2">
                <div className="text-5xl font-bold">
                  {formatTimeRemaining(timeRemaining)}
                </div>
                <p className="text-gray-400">
                  remaining until your call begins
                </p>
              </div>

              <Progress
                value={calculateProgress()}
                className="mx-auto h-2 max-w-xs"
              />

              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-16 w-16 border-2 border-white/20">
                  <AvatarImage
                    src={
                      data?.data?.expert?.profilePic ??
                      "https://ui.shadcn.com/avatars/02.png"
                    }
                  />
                  <AvatarFallback>
                    {data?.data?.expert?.firstName?.[0] ?? "EX"}
                  </AvatarFallback>
                </Avatar>
                <p className="text-gray-300">
                  Expert will join when the call begins
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-sm">
                  You can test your audio and video settings while you wait
                </p>
              </div>
            </div>
          </motion.div>
        )}

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
                    <AvatarImage
                      src={
                        data?.data?.user?.profilePic ??
                        "https://ui.shadcn.com/avatars/02.png"
                      }
                    />
                    <AvatarFallback>
                      {data?.data?.user?.firstName?.[0] ?? "YOU"}
                    </AvatarFallback>
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
                    <AvatarImage
                      src={
                        data?.data?.expert?.profilePic ??
                        "https://ui.shadcn.com/avatars/02.png"
                      }
                    />
                    <AvatarFallback>
                      {data?.data?.expert?.firstName?.[0] ?? "EX"}
                    </AvatarFallback>
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
            disabled={!callStarted}
            onClick={toggleMic}
            variant={isMicOn ? "outline" : "secondary"}
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            {isMicOn ? <Mic /> : <MicOff />}
          </Button>

          <Button
            disabled={!callStarted}
            onClick={toggleCamera}
            variant={isCameraOn ? "outline" : "secondary"}
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            {isCameraOn ? <Camera /> : <CameraOff />}
          </Button>

          <Button
            disabled={!callStarted}
            variant="destructive"
            size="icon"
            className="h-14 w-14 cursor-pointer rounded-full bg-red-500 transition-all duration-300 ease-in-out hover:bg-red-500/90"
          >
            <PhoneOff />
          </Button>

          <Button
            disabled={!callStarted}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            <ScreenShare />
          </Button>

          <Button
            disabled={!callStarted}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            <Settings />
          </Button>
        </div>
      </footer>
      <Dialog
        open={showPreCallDialog && !callStarted}
        onOpenChange={setShowPreCallDialog}
      >
        <DialogContent className="max-w-md border-white/10 bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              Call Starts Soon
            </DialogTitle>
            <DialogDescription className="text-center text-gray-300">
              Your session with the expert will begin shortly
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <div className="flex items-center justify-center gap-3">
              <Clock className="h-10 w-10 text-blue-400" />
              <div className="text-4xl font-bold text-white">
                {formatTimeRemaining(timeRemaining)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Waiting</span>
                <span>Call Starts</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>

            <div className="rounded-lg bg-black/30 p-4 text-center">
              <p className="text-gray-300">
                Please ensure your camera and microphone are ready before the
                call starts.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Room;
