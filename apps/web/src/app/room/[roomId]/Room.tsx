"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ResultsNotFound from "@/src/components/global/results-not-found";
import { useDbUser } from "@/src/hooks";
import { getSocket } from "@/src/hooks/use-socket";
import { useTRPC } from "@/src/trpc/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { Progress } from "@repo/ui/components/progress";
import { Spinner } from "@repo/ui/components/spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { z } from "zod";

import { formatTimeRemaining, getTimeDiff } from "../../utils";
import peer from "./peer";
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
  "NEGO_NEEDED",
  "NEGO_DONE",
  "CAMERA_STATE_CHANGE",
]);

const Room = ({ roomId }: RoomProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery(
    trpc.calls.getCallById.queryOptions(
      {
        roomId,
      },
      {
        refetchOnWindowFocus: false,
      }
    )
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
  const [isRemoteCameraOn, setIsRemoteCameraOn] = useState(true);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [localAudioTrack, setLocalAudioTrack] =
    useState<MediaStreamTrack | null>(null);
  const [localVideoTrack, setlocalVideoTrack] =
    useState<MediaStreamTrack | null>(null);

  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [remoteVideoTrack, setRemoteVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const [_remoteAudioTrack, setRemoteAudioTrack] =
    useState<MediaStreamTrack | null>(null);

  const timeDiff = useMemo(() => {
    if (!data?.data?.startedAt) return 0;
    return getTimeDiff(data.data.startedAt);
  }, [data?.data?.startedAt]);

  const mediaStreamRef = useRef<MediaStream | null>(null);

  const socket = useMemo(() => getSocket(), []);

  const { mutate: endCall, isPending: isUpdatingStatus } = useMutation(
    trpc.calls.updateStatus.mutationOptions({
      onSuccess: async (data) => {
        if (data?.success) {
          toast.success("Call ended successfully", {
            description: "You can now start a new call",
            duration: 5000,
            icon: <PhoneOff className="h-4 w-4" />,
            position: "bottom-center",
            closeButton: true,
          });
          await queryClient.invalidateQueries({
            queryKey: trpc.calls.getCallById.queryKey({ roomId }),
          });
          socket.disconnect();
        }
      },
      onError: (error) => {
        toast.error("Failed to end call", {
          description: error?.message,
          duration: 5000,
          icon: <PhoneOff className="h-4 w-4" />,
          position: "bottom-center",
          closeButton: true,
        });
      },
    })
  );

  const { mutate: startCall } = useMutation(
    trpc.calls.updateStatus.mutationOptions({})
  );

  useEffect(() => {
    if (callStarted && data?.data?.id) {
      startCall({
        callId: data?.data?.id,
        status: "ONGOING",
      });
    }
  }, [callStarted, data?.data?.id, startCall]);

  const handleEndCall = useCallback(() => {
    if (data?.data?.id) {
      endCall({
        callId: data?.data?.id,
        status: "COMPLETED",
      });
    }
  }, [data?.data?.id, endCall]);

  useEffect(() => {
    if (!roomId || !userData || !socket) return;
    socket.emit(EventTypeSchema.Enum.JOIN_ROOM, {
      roomId,
      userId: userData?.data?.id,
    });
  }, [roomId, socket, userData]);

  const handleSendOffer = useCallback(async () => {
    if (!socket || !callStarted) return;
    console.log("SEND OFFER");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      mediaStreamRef.current = stream;

      // Add tracks to peer connection
      const peerConnection = peer.getPeer();
      if (!peerConnection) return;

      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      setLocalAudioTrack(stream.getAudioTracks()[0] ?? null);
      setlocalVideoTrack(stream.getVideoTracks()[0] ?? null);

      const offer = await peer.getOffer();
      socket.emit(EventTypeSchema.Enum.OFFER, {
        sdp: offer,
      });
    } catch (error) {
      console.error("Error sending offer:", error);
      toast.error("Failed to start call");
    }
  }, [socket, callStarted]);

  const handleOffer = useCallback(
    async (offer: RTCSessionDescriptionInit) => {
      if (!socket || !callStarted) return;
      console.log("OFFER", offer);
      setIsConnected(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        mediaStreamRef.current = stream;

        // Add tracks to peer connection
        const peerConnection = peer.getPeer();
        if (!peerConnection) return;

        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, stream);
        });

        setLocalAudioTrack(stream.getAudioTracks()[0] ?? null);
        setlocalVideoTrack(stream.getVideoTracks()[0] ?? null);

        await peer.setRemoteDescription(offer);
        const answer = await peer.getAnswer(offer);
        socket.emit(EventTypeSchema.Enum.ANSWER, { sdp: answer });
      } catch (error) {
        console.error("Error handling offer:", error);
        toast.error("Failed to handle incoming call");
      }
    },
    [socket, callStarted]
  );

  const handleAnswer = useCallback(
    async (answer: RTCSessionDescriptionInit) => {
      console.log("ANSWER", answer);
      try {
        const peerConnection = peer.getPeer();
        if (!peerConnection) return;

        // Check if we're in the correct state to set remote answer
        if (peerConnection.signalingState !== "have-local-offer") {
          console.log(
            "Cannot set remote answer in current state:",
            peerConnection.signalingState
          );
          return;
        }

        setIsConnected(true);
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      } catch (error) {
        console.error("Error handling answer:", error);
        toast.error("Failed to establish connection");
      }
    },
    []
  );

  const handleNegoNeeded = useCallback(async () => {
    if (!socket) return;
    try {
      const peerConnection = peer.getPeer();
      if (!peerConnection) return;

      // Check if we're the offerer
      const isOfferer = peerConnection.signalingState === "stable";

      if (isOfferer) {
        // Create and send offer
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit(EventTypeSchema.Enum.NEGO_NEEDED, { sdp: offer });
      }
    } catch (error) {
      console.error("Negotiation needed error:", error);
    }
  }, [socket]);

  useEffect(() => {
    const peerConnection = peer.getPeer();
    console.log("PEER");
    if (!peerConnection) return;
    console.log("PEER CONNECTION", peerConnection);

    const handleNegotiationNeeded = () => {
      console.log("NEGO NEEDED");
      handleNegoNeeded().catch((error) => {
        console.error("Negotiation needed error:", error);
      });
    };

    peerConnection.addEventListener(
      "negotiationneeded",
      handleNegotiationNeeded
    );
    return () => {
      peerConnection.removeEventListener(
        "negotiationneeded",
        handleNegotiationNeeded
      );
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async (offer: RTCSessionDescriptionInit) => {
      if (!socket) return;
      console.log("NEGO NEED INCOMMING", offer);
      try {
        const peerConnection = peer.getPeer();
        if (!peerConnection) return;

        // Set the remote description first
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );

        // Create and send answer
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit(EventTypeSchema.Enum.NEGO_DONE, { sdp: answer });
      } catch (error) {
        console.error("Error handling incoming negotiation:", error);
      }
    },
    [socket]
  );

  const handleNegoDoneFinal = useCallback(
    async (answer: RTCSessionDescriptionInit) => {
      console.log("NEGO DONE FINAL", answer);
      try {
        const peerConnection = peer.getPeer();
        if (!peerConnection) return;

        // Check if we're in the correct state to set remote answer
        if (peerConnection.signalingState !== "have-local-offer") {
          console.log(
            "Cannot set remote answer in current state:",
            peerConnection.signalingState
          );
          return;
        }

        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      } catch (error) {
        console.error("Error handling negotiation done:", error);
      }
    },
    []
  );

  useEffect(() => {
    const peerConnection = peer.getPeer();
    if (!peerConnection || !socket) return;

    const handleIceCandidateNeeded = (event: RTCPeerConnectionIceEvent) => {
      console.log("ICE CANDIDATE NEEDED", event.candidate);
      if (!event.candidate) return;

      // Send the complete ICE candidate object
      socket.emit(EventTypeSchema.Enum.ICE_CANDIDATE, {
        candidate: event.candidate,
      });
    };

    peerConnection.addEventListener("icecandidate", handleIceCandidateNeeded);
    return () => {
      peerConnection.removeEventListener(
        "icecandidate",
        handleIceCandidateNeeded
      );
    };
  }, [socket]);

  const handleAddIceCandidate = useCallback(
    async (payload: { candidate: RTCIceCandidateInit }) => {
      console.log("ADD ICE CANDIDATE", payload.candidate);
      try {
        const peerConnection = peer.getPeer();
        if (!peerConnection) return;
        await peerConnection.addIceCandidate(
          new RTCIceCandidate(payload.candidate)
        );
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    },
    []
  );

  useEffect(() => {
    const peerConnection = peer.getPeer();
    if (!peerConnection) return;

    const handleTrackChange = (event: RTCTrackEvent) => {
      console.log("TRACK CHANGE", event);
      if (event.streams?.[0]) {
        const stream = event.streams[0];
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
          void remoteVideoRef.current.play();
        }

        // Set remote tracks
        const videoTrack = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];

        if (videoTrack) {
          setRemoteVideoTrack(videoTrack);
          // Set initial camera state based on track enabled status
          setIsRemoteCameraOn(videoTrack.enabled);
        }
        if (audioTrack) {
          setRemoteAudioTrack(audioTrack);
        }
      }
    };

    peerConnection.addEventListener("track", handleTrackChange);
    return () => {
      peerConnection.removeEventListener("track", handleTrackChange);
    };
  }, []);

  // Update remote video handling
  useEffect(() => {
    if (remoteVideoRef.current && remoteVideoTrack) {
      console.log(
        "Setting remote video stream, isRemoteCameraOn:",
        isRemoteCameraOn
      );
      if (isRemoteCameraOn) {
        console.log("REMOTE VIDEO TRACK IS ON");
        const stream = new MediaStream([remoteVideoTrack]);
        remoteVideoRef.current.srcObject = stream;
        void remoteVideoRef.current.play().catch((error) => {
          console.error("Error playing remote video:", error);
        });
      } else {
        console.log("REMOTE VIDEO TRACK IS OFF");
        remoteVideoRef.current.srcObject = null;
      }
    }
  }, [remoteVideoRef, remoteVideoTrack, isRemoteCameraOn]);

  const handleCameraStateChange = useCallback(
    (payload: { isCameraOn: boolean }) => {
      console.log("CAMERA STATE CHANGE", payload);
      setIsRemoteCameraOn(payload.isCameraOn);
    },
    []
  );

  const handlePeerDisconnected = useCallback(() => {
    console.log("PEER DISCONNECTED");
    setIsConnected(false);
    toast.warning("Peer disconnected", {
      description: `${userData?.data?.firstName} has disconnected from the call`,
      duration: 5000,
      icon: <PhoneOff className="h-4 w-4" />,
      position: "bottom-center",
      closeButton: true,
    });
  }, [userData?.data?.firstName]);

  useEffect(() => {
    if (!socket) return;
    socket.on(EventTypeSchema.Enum.SEND_OFFER, handleSendOffer);
    socket.on(EventTypeSchema.Enum.OFFER, handleOffer);
    socket.on(EventTypeSchema.Enum.ANSWER, handleAnswer);
    socket.on(EventTypeSchema.Enum.NEGO_NEEDED, handleNegoNeedIncomming);
    socket.on(EventTypeSchema.Enum.NEGO_DONE, handleNegoDoneFinal);
    socket.on(EventTypeSchema.Enum.ICE_CANDIDATE, handleAddIceCandidate);
    socket.on(
      EventTypeSchema.Enum.CAMERA_STATE_CHANGE,
      handleCameraStateChange
    );
    socket.on(EventTypeSchema.Enum.PEER_DISCONNECTED, handlePeerDisconnected);
    return () => {
      socket.off(EventTypeSchema.Enum.SEND_OFFER, handleSendOffer);
      socket.off(EventTypeSchema.Enum.OFFER, handleOffer);
      socket.off(EventTypeSchema.Enum.ANSWER, handleAnswer);
      socket.off(EventTypeSchema.Enum.NEGO_NEEDED, handleNegoNeedIncomming);
      socket.off(EventTypeSchema.Enum.NEGO_DONE, handleNegoDoneFinal);
      socket.off(EventTypeSchema.Enum.ICE_CANDIDATE, handleAddIceCandidate);
      socket.off(
        EventTypeSchema.Enum.CAMERA_STATE_CHANGE,
        handleCameraStateChange
      );
      socket.off(
        EventTypeSchema.Enum.PEER_DISCONNECTED,
        handlePeerDisconnected
      );
    };
  }, [
    handleAnswer,
    handleNegoDoneFinal,
    handleNegoNeedIncomming,
    handleOffer,
    handleSendOffer,
    socket,
    handleAddIceCandidate,
    handleCameraStateChange,
    handlePeerDisconnected,
  ]);

  console.log("LOCAL VIDEO TRACK", localVideoTrack);
  console.log("REMOTE VIDEO TRACK", remoteVideoTrack);

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

  const toggleMic = useCallback(() => {
    try {
      if (localAudioTrack) {
        localAudioTrack.enabled = !isMicOn;
        setIsMicOn((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling mic:", error);
      toast.error("Failed to toggle mic");
    }
  }, [localAudioTrack, isMicOn]);

  const toggleCamera = useCallback(() => {
    try {
      console.log("toggleCamera", isCameraOn);
      if (localVideoTrack) {
        localVideoTrack.enabled = !isCameraOn;
        setIsCameraOn((prev) => !prev);
        if (socket) {
          socket.emit(EventTypeSchema.Enum.CAMERA_STATE_CHANGE, {
            isCameraOn: !isCameraOn,
          });
        }
      }
    } catch (error) {
      console.error("Error toggling camera:", error);
      toast.error("Failed to toggle camera");
    }
  }, [localVideoTrack, isCameraOn, socket]);

  console.log("TIME REMAINING", timeRemaining);
  console.log("CALL STARTED", callStarted);
  console.log("IS CONNECTED", isConnected);
  console.log("IS REMOTE CAMERA ON", isRemoteCameraOn);

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
              (remoteVideoTrack && isRemoteCameraOn ? (
                <video
                  ref={remoteVideoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
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
                      {!isRemoteCameraOn
                        ? "Camera Off"
                        : userData?.data?.role === "USER"
                          ? "Expert"
                          : "User"}
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
            onClick={handleEndCall}
            size="icon"
            className="h-14 w-14 cursor-pointer rounded-full bg-red-500 transition-all duration-300 ease-in-out hover:bg-red-500/90"
          >
            {isUpdatingStatus ? <Spinner variant="circle" /> : <PhoneOff />}
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
