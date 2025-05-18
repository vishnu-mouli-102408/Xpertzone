"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { z } from "zod";

import { formatTimeRemaining, getTimeDiff } from "../../utils";
import PreCallDialog from "./pre-call-dialog";

interface RoomProps {
  roomId: string;
}

const EventTypeSchema = z.enum([
  "OFFER",
  "ANSWER",
  "ICE_CANDIDATE",
  "READY",
  "JOIN_ROOM",
  "PEER_DISCONNECTED",
  "ROLE",
  "INVALID_PAYLOAD",
  "ROOM_FULL",
  "USER_ALREADY_IN_ROOM",
  "SEND_OFFER",
]);

const SOCKET_SERVER_URL = "http://localhost:4001";

const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" },
  { urls: "stun:stun3.l.google.com:19302" },
  { urls: "stun:stun4.l.google.com:19302" },
  // Add TURN servers if you have them
];

const createPeerConnection = () => {
  return new RTCPeerConnection({
    iceServers: ICE_SERVERS,
    iceTransportPolicy: "all",
    bundlePolicy: "max-bundle",
    rtcpMuxPolicy: "require",
    iceCandidatePoolSize: 10,
  });
};

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

  const socketRef = useRef<Socket | null>(null);

  const [remoteVideoTrack, setRemoteVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const [remoteAudioTrack, setRemoteAudioTrack] =
    useState<MediaStreamTrack | null>(null);

  // const [remoteMediaStream, setRemoteMediaStream] =
  //   useState<MediaStream | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const timeDiff = useMemo(() => {
    if (!data?.data?.startedAt) return 0;
    return getTimeDiff(data.data.startedAt);
  }, [data?.data?.startedAt]);

  console.log("remoteVideoTrack", remoteVideoTrack);
  console.log("remoteAudioTrack", remoteAudioTrack);

  // Add cleanup refs
  const cleanupRef = useRef<(() => void) | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  // Initialize media stream
  const initializeMediaStream = useCallback(async () => {
    try {
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      mediaStreamRef.current = stream;
      setLocalAudioTrack(stream.getAudioTracks()[0] ?? null);
      setlocalVideoTrack(stream.getVideoTracks()[0] ?? null);
    } catch (error) {
      console.error("Failed to initialize media stream:", error);
      toast.error("Failed to access camera and microphone");
    }
  }, []);

  // Socket connection effect
  useEffect(() => {
    if (!roomId || !userData?.data?.id) return;
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    socketRef.current = socket;

    const handleSendOffer = async () => {
      console.log("SEND OFFER");
      try {
        console.log("INSIDE SEND OFFER");
        const pc = createPeerConnection();
        console.log("2 INSIDE SEND OFFER");
        peerConnectionRef.current = pc;

        // Set up track handling for the peer
        pc.ontrack = (event) => {
          console.log("Track received:", event.track.kind);
          if (event.track.kind === "video") {
            setRemoteVideoTrack(event.track);
            setIsConnected(true);
            if (remoteVideoRef.current) {
              const stream = new MediaStream();
              stream.addTrack(event.track);
              remoteVideoRef.current.srcObject = stream;
              void remoteVideoRef.current.play().catch(console.error);
            }
          } else if (event.track.kind === "audio") {
            setRemoteAudioTrack(event.track);
            setIsConnected(true);
          }
        };

        // Get local media stream
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        mediaStreamRef.current = stream;
        setLocalAudioTrack(stream.getAudioTracks()[0] ?? null);
        setlocalVideoTrack(stream.getVideoTracks()[0] ?? null);

        // Add tracks to peer connection
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        // Handle ICE candidates
        pc.onicecandidate = (e) => {
          console.log("ICE candidate:", e.candidate);
          if (e.candidate) {
            socket.emit(EventTypeSchema.Enum.ICE_CANDIDATE, {
              candidate: e.candidate,
            });
          }
        };

        // Monitor connection state
        pc.onconnectionstatechange = async () => {
          console.log("Connection state changed:", pc.connectionState);
          switch (pc.connectionState) {
            case "connected":
              setIsConnected(true);
              break;
            case "disconnected":
            case "failed":
              setIsConnected(false);
              // Attempt to reconnect
              if (pc.connectionState === "failed") {
                console.log("Connection failed, attempting to reconnect...");
                await handleReconnect();
              }
              break;
            case "closed":
              setIsConnected(false);
              break;
          }
        };

        // Monitor ICE connection state
        pc.oniceconnectionstatechange = async () => {
          console.log("ICE connection state:", pc.iceConnectionState);
          if (pc.iceConnectionState === "failed") {
            console.log("ICE connection failed, attempting to reconnect...");
            await handleReconnect();
          }
        };

        // Handle negotiation needed
        pc.onnegotiationneeded = async () => {
          try {
            const offer = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            });
            await pc.setLocalDescription(offer);
            console.log("Sending offer");
            socket.emit(EventTypeSchema.Enum.OFFER, { sdp: offer });
          } catch (error) {
            console.error("Error creating offer:", error);
            toast.error("Failed to create connection offer");
          }
        };

        // Create and send initial offer
        const offer = await pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        });
        await pc.setLocalDescription(offer);
        socket.emit(EventTypeSchema.Enum.OFFER, { sdp: offer });
      } catch (error) {
        console.error("Error setting up peer connection:", error);
        toast.error("Failed to establish connection");
      }
    };

    // Add reconnection logic
    const handleReconnect = async () => {
      try {
        if (peerConnectionRef.current) {
          peerConnectionRef.current.close();
          peerConnectionRef.current = null;
        }
        // Wait a bit before reconnecting
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await handleSendOffer();
      } catch (error) {
        console.error("Error during reconnection:", error);
      }
    };

    const handleConnect = () => {
      console.log("Socket.IO connected");
      setIsConnected(false);
      socket.emit(EventTypeSchema.Enum.JOIN_ROOM, {
        roomId,
        userId: userData?.data?.id,
      });
    };
    const handleDisconnect = () => {
      console.log("Socket.IO disconnected");
      setIsConnected(false);
      cleanup();
    };
    const handleConnectError = (err: Error) => {
      console.error("Socket.IO connection error", err);
      toast.error("Failed to connect to the server");
    };
    const handleOffer = async (offer: RTCSessionDescriptionInit) => {
      console.log("Received offer", offer);
      try {
        const pc = createPeerConnection();

        // Set up track handling
        pc.ontrack = (event) => {
          console.log("Track received:", event.track.kind);
          if (event.track.kind === "video") {
            setRemoteVideoTrack(event.track);
            setIsConnected(true);
            if (remoteVideoRef.current) {
              const stream = new MediaStream();
              stream.addTrack(event.track);
              remoteVideoRef.current.srcObject = stream;
              void remoteVideoRef.current.play().catch(console.error);
            }
          } else if (event.track.kind === "audio") {
            setRemoteAudioTrack(event.track);
            setIsConnected(true);
          }
        };

        // Add local tracks
        if (mediaStreamRef.current) {
          const stream = mediaStreamRef.current;
          stream.getTracks().forEach((track) => {
            pc.addTrack(track, stream);
          });
        }
        pc.onicecandidate = (e) => {
          if (e.candidate) {
            socket.emit(EventTypeSchema.Enum.ICE_CANDIDATE, {
              candidate: e.candidate,
            });
          }
        };

        // Monitor connection state
        pc.onconnectionstatechange = async () => {
          console.log("Connection state changed:", pc.connectionState);
          switch (pc.connectionState) {
            case "connected":
              setIsConnected(true);
              break;
            case "disconnected":
            case "failed":
              setIsConnected(false);
              if (pc.connectionState === "failed") {
                await handleReconnect();
              }
              break;
            case "closed":
              setIsConnected(false);
              break;
          }
        };

        // Monitor ICE connection state
        pc.oniceconnectionstatechange = async () => {
          console.log("ICE connection state:", pc.iceConnectionState);
          if (pc.iceConnectionState === "failed") {
            await handleReconnect();
          }
        };

        // Set remote description and create answer
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        });
        await pc.setLocalDescription(answer);

        peerConnectionRef.current = pc;
        socket.emit(EventTypeSchema.Enum.ANSWER, { sdp: answer });
      } catch (error) {
        console.error("Error handling offer:", error);
        toast.error("Failed to establish connection");
      }
    };
    const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
      console.log("received answer", answer);
      try {
        if (peerConnectionRef.current) {
          const pc = peerConnectionRef.current;
          // Check if we're in the right state to set the remote description
          if (pc.signalingState !== "have-local-offer") {
            console.warn(
              "Cannot set remote answer in current state:",
              pc.signalingState
            );
            return;
          }
          // Set the remote description
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
          console.log("Remote description set successfully");
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Error handling answer:", error);
        // If we get a state error, we might need to restart the connection
        if (error instanceof Error && error.name === "InvalidStateError") {
          console.log("Attempting to recover from invalid state...");
          // You might want to implement reconnection logic here
          toast.error("Connection error. Please try reconnecting.");
        } else {
          toast.error("Failed to establish connection");
        }
      }
    };
    const handleIceCandidate = async (data: {
      candidate: RTCIceCandidateInit;
    }) => {
      console.log("Adding ICE candidate:", data.candidate);
      try {
        const pc = peerConnectionRef.current;
        if (pc?.remoteDescription) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          console.log("ICE candidate added successfully");
        } else {
          console.warn("Cannot add ICE candidate - peer connection not ready");
        }
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    };
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);
    socket.on(EventTypeSchema.Enum.SEND_OFFER, handleSendOffer);
    socket.on(EventTypeSchema.Enum.OFFER, handleOffer);
    socket.on(EventTypeSchema.Enum.ANSWER, handleAnswer);
    socket.on(EventTypeSchema.Enum.ICE_CANDIDATE, handleIceCandidate);
    cleanupRef.current = () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.off(EventTypeSchema.Enum.SEND_OFFER, handleSendOffer);
      socket.off(EventTypeSchema.Enum.OFFER, handleOffer);
      socket.off(EventTypeSchema.Enum.ANSWER, handleAnswer);
      socket.off(EventTypeSchema.Enum.ICE_CANDIDATE, handleIceCandidate);
    };
    return () => {
      cleanup();
    };
  }, [roomId, userData?.data?.id, cleanup]);

  // Media stream initialization effect
  useEffect(() => {
    if (
      !data?.data?.startedAt ||
      timeDiff > 0 ||
      data?.data?.status === "COMPLETED" ||
      data?.data?.status === "CANCELED" ||
      (data?.data?.endedAt && data.data.endedAt < new Date())
    )
      return;

    void initializeMediaStream();

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
    };
  }, [timeDiff, data, initializeMediaStream]);

  useEffect(() => {
    if (localVideoRef.current && isCameraOn) {
      if (localVideoTrack) {
        localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
        void localVideoRef.current.play();
      }
    }
  }, [localVideoRef, localVideoTrack, isCameraOn]);

  useEffect(() => {
    if (!data?.data?.startedAt) return;
    setTimeRemaining(timeDiff);
    setTotalDuration(timeDiff);

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
  console.log("IS CONNECTED", isConnected);

  useEffect(() => {
    if (remoteVideoRef.current && remoteVideoTrack) {
      console.log("Setting up remote video in useEffect");
      const stream = new MediaStream();
      stream.addTrack(remoteVideoTrack);
      console.log("Stream tracks in useEffect:", stream.getTracks());
      remoteVideoRef.current.srcObject = stream;
      // Force play after a short delay to ensure everything is ready
      setTimeout(() => {
        if (remoteVideoRef.current) {
          void remoteVideoRef.current.play().catch((error) => {
            console.error("Error playing video in useEffect:", error);
          });
        }
      }, 1000);
    }
  }, [remoteVideoTrack]);

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

            {isConnected &&
              (remoteVideoTrack ? (
                <video
                  ref={remoteVideoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
              ) : (
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
              ))}

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
