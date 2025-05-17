"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ResultsNotFound from "@/src/components/global/results-not-found";
import { useDbUser } from "@/src/hooks";
import { useTRPC } from "@/src/trpc/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { Progress } from "@repo/ui/components/progress";
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

import { formatTimeRemaining, getTimeDiff } from "../../utils";
import PreCallDialog from "./pre-call-dialog";

interface RoomProps {
  roomId: string;
}

// const SOCKET_SERVER_URL = "http://localhost:4001";

const Room = ({ roomId }: RoomProps) => {
  const trpc = useTRPC();

  const { data, isPending } = useQuery(
    trpc.calls.getCallById.queryOptions({
      roomId,
    })
  );

  console.log("DATA", data);

  const { data: userData } = useDbUser();

  const [callStarted, setCallStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [showPreCallDialog, setShowPreCallDialog] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [localAudioTrack, setLocalAudioTrack] =
    useState<MediaStreamTrack | null>(null);
  const [localVideoTrack, setlocalVideoTrack] =
    useState<MediaStreamTrack | null>(null);

  //   const socketRef = useRef<Socket | null>(null);
  //   const [sendingPc, setSendingPc] = useState<null | RTCPeerConnection>(null);
  //   const [receivingPc, setReceivingPc] = useState<null | RTCPeerConnection>(
  //     null
  //   );

  //   const [remoteVideoTrack, setRemoteVideoTrack] =
  //     useState<MediaStreamTrack | null>(null);
  //   const [remoteAudioTrack, setRemoteAudioTrack] =
  //     useState<MediaStreamTrack | null>(null);

  //   const [remoteMediaStream, setRemoteMediaStream] =
  //     useState<MediaStream | null>(null);
  //   const remoteVideoRef = useRef<HTMLVideoElement>(null);

  //   useEffect(() => {
  //     if (!roomId) return;
  //     const socket = io(SOCKET_SERVER_URL, {
  //       transports: ["websocket"],
  //       autoConnect: true,
  //     });
  //     socketRef.current = socket;

  //     socket.on("connect", () => {
  //       console.log("Socket.IO connected");
  //       setIsConnected(true);
  //       socket.emit("join-room", { roomId });
  //     });

  //     socket.on("disconnect", () => {
  //       console.log("Socket.IO disconnected");
  //       setIsConnected(false);
  //     });

  //     socket.on("connect_error", (err) => {
  //       console.error("Socket.IO connection error", err);
  //     });

  //     socket.on("role", (data: { isInitiator: boolean }) => {
  //       if (data.isInitiator) {
  //         const pc = new RTCPeerConnection();
  //         setSendingPc(pc);
  //         setIsConnected(false);

  //         if (localVideoTrack) {
  //           console.error("added tack");
  //           console.log(localVideoTrack);
  //           pc.addTrack(localVideoTrack);
  //         }
  //         if (localAudioTrack) {
  //           console.error("added tack");
  //           console.log(localAudioTrack);
  //           pc.addTrack(localAudioTrack);
  //         }
  //         pc.onicecandidate = (e) => {
  //           console.log("receiving ice candidate locally");
  //           if (e.candidate) {
  //             socket.emit("ICE-CANDIDATE", {
  //               candidate: e.candidate,
  //               type: "sender",
  //               roomId,
  //             });
  //           }
  //         };
  //         pc.onnegotiationneeded = async () => {
  //           console.log("on negotiation neeeded, sending offer");
  //           const sdp = await pc.createOffer();
  //           void pc.setLocalDescription(sdp);
  //           socket.emit("offer", {
  //             sdp,
  //             roomId,
  //           });
  //         };
  //       }
  //     });

  //     socket.on("offer", async (offer: RTCSessionDescriptionInit) => {
  //       if (!sendingPc) return;
  //       await sendingPc.setRemoteDescription(offer);
  //       const answer = await sendingPc.createAnswer();
  //       await sendingPc.setLocalDescription(answer);
  //       const stream = new MediaStream();
  //       if (remoteVideoRef.current) {
  //         remoteVideoRef.current.srcObject = stream;
  //       }
  //       setRemoteMediaStream(stream);
  //       socket.emit("answer", {
  //         sdp: answer,
  //         roomId,
  //       });
  //     });
  //   }, [localAudioTrack, localVideoTrack, roomId, sendingPc]);

  useEffect(() => {
    if (localVideoRef.current && isCameraOn) {
      if (localVideoTrack) {
        localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
        void localVideoRef.current.play();
      }
    }
  }, [localVideoRef, localVideoTrack, isCameraOn]);

  const timeDiff = useMemo(() => {
    if (!data?.data?.startedAt) return 0;
    return getTimeDiff(data.data.startedAt);
  }, [data?.data?.startedAt]);

  useEffect(() => {
    if (!data?.data?.startedAt || timeDiff > 0) return;

    const initializeMediaStream = async () => {
      try {
        const stream = await window.navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setLocalAudioTrack(stream.getAudioTracks()[0] ?? null);
        setlocalVideoTrack(stream.getVideoTracks()[0] ?? null);
      } catch (error) {
        console.error("Failed to initialize media stream:", error);
        toast.error("Failed to access camera and microphone");
      }
    };

    void initializeMediaStream();
  }, [timeDiff, data?.data?.startedAt]);

  useEffect(() => {
    if (!data?.data?.startedAt) return;

    setTimeRemaining(timeDiff);
    setTotalDuration(timeDiff);
  }, [timeDiff, data?.data?.startedAt]);

  useEffect(() => {
    if (!data?.data?.startedAt) return;

    if (timeDiff <= 0) {
      setCallStarted(true);
      setShowPreCallDialog(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCallStarted(true);
          setShowPreCallDialog(false);
          setIsConnected(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeDiff, data?.data?.startedAt]);

  const calculateProgress = () => {
    if (!data?.data?.startedAt || totalDuration === 0) return 0;

    const elapsed = totalDuration - timeRemaining;
    return (elapsed / totalDuration) * 100;
  };

  const toggleMic = () => {
    try {
      if (localAudioTrack) {
        localAudioTrack.enabled = !isMicOn;
        setIsMicOn((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling mic:", error);
      toast.error("Failed to toggle mic");
    }
  };

  const toggleCamera = () => {
    try {
      console.log("toggleCamera", isCameraOn);
      if (localVideoTrack) {
        localVideoTrack.enabled = !isCameraOn;
        setIsCameraOn((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling camera:", error);
      toast.error("Failed to toggle camera");
    }
  };

  console.log("TIME REMAINING", timeRemaining);
  console.log("CALL STARTED", callStarted);

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
                      userData?.data?.role === "USER"
                        ? (data?.data?.expert?.profilePic ??
                          "https://ui.shadcn.com/avatars/02.png")
                        : (userData?.data?.profilePic ??
                          "https://ui.shadcn.com/avatars/02.png")
                    }
                  />
                  <AvatarFallback>
                    {userData?.data?.role === "USER"
                      ? (data?.data?.expert?.firstName?.[0] ?? "EX")
                      : (userData?.data?.firstName?.[0] ?? "YOU")}
                  </AvatarFallback>
                </Avatar>
                <p className="text-gray-300">
                  {userData?.data?.role === "USER"
                    ? "Expert will join when the call begins"
                    : "User will join when the call begins"}
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
            {localVideoTrack && isCameraOn ? (
              <video
                ref={localVideoRef}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                playsInline
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Avatar className="mx-auto mb-4 h-24 w-24 border-2 border-white/20">
                    <AvatarImage
                      src={
                        userData?.data?.role === "USER"
                          ? (data?.data?.user?.profilePic ??
                            "https://ui.shadcn.com/avatars/02.png")
                          : (data?.data?.expert?.profilePic ??
                            "https://ui.shadcn.com/avatars/02.png")
                      }
                    />
                    <AvatarFallback>
                      {userData?.data?.role === "USER"
                        ? (data?.data?.user?.firstName?.[0] ?? "YOU")
                        : (data?.data?.expert?.firstName?.[0] ?? "EX")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-gray-400">
                    {isCameraOn ? "You" : "Camera Off"}
                  </p>
                </div>
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
                    Waiting for{" "}
                    {userData?.data?.role === "USER" ? "expert" : "user"} to
                    join
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
                        userData?.data?.role === "USER"
                          ? (data?.data?.expert?.profilePic ??
                            "https://ui.shadcn.com/avatars/02.png")
                          : (data?.data?.user?.profilePic ??
                            "https://ui.shadcn.com/avatars/02.png")
                      }
                    />
                    <AvatarFallback>
                      {userData?.data?.role === "USER"
                        ? (data?.data?.expert?.firstName?.[0] ?? "EX")
                        : (data?.data?.user?.firstName?.[0] ?? "YOU")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-gray-400">
                    {userData?.data?.role === "USER" ? "Expert" : "User"}
                  </p>
                </div>
              </div>
            )}

            <div className="absolute bottom-4 left-4 rounded-md bg-black/40 px-2 py-1 text-sm">
              {userData?.data?.role === "USER" ? "Expert" : "User"} (Remote)
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
            variant={isMicOn && localAudioTrack ? "outline" : "secondary"}
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            {isMicOn ? <Mic /> : <MicOff />}
          </Button>

          <Button
            disabled={!callStarted}
            onClick={toggleCamera}
            variant={isCameraOn && localVideoTrack ? "outline" : "secondary"}
            size="icon"
            className="h-12 w-12 cursor-pointer rounded-full"
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
      {/* Pre-call dialog */}
      <PreCallDialog
        open={showPreCallDialog}
        onClose={() => setShowPreCallDialog(false)}
        progress={calculateProgress()}
        timeRemaining={timeRemaining}
        callStarted={callStarted}
      />
    </div>
  );
};

export default Room;
