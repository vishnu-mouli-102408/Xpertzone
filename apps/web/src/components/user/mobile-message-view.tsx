"use client";

import { useEffect, useRef, type SetStateAction } from "react";
import { useDbUser } from "@/src/hooks";
import { useChatActions, type ChatUser } from "@/src/store";
import type { AppRouter } from "@repo/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Spinner } from "@repo/ui/components/spinner";
import { cn } from "@repo/ui/lib/utils";
import type { inferRouterOutputs } from "@trpc/server";
import { format } from "date-fns";
import { ArrowLeft, MoreHorizontal, Send, Smile } from "lucide-react";
import { motion } from "motion/react";

import ResultsNotFound from "../global/results-not-found";

const containerVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.07,
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

type RouterOutput = inferRouterOutputs<AppRouter>;
type ChatData = NonNullable<RouterOutput["user"]["getChatsById"]["data"]>;
type ChatMessage = ChatData["chats"][number];

type MessageType = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  sentAt: Date;
  contentType: "TEXT" | "IMAGE" | "FILE";
  firstName?: string;
  lastName?: string;
  profilePic?: string;
};

interface Props {
  activeChat: ChatUser;
  messages: (ChatMessage | MessageType)[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  isFetchingMoreChats: boolean;
  isFetching: boolean;
  chatsStatus: "pending" | "error" | "success";
  hasMore: boolean;
  fetchNextPageChats: () => void;
  scrollMode: ScrollMode;
  setScrollMode: (value: SetStateAction<ScrollMode>) => void;
  onlineStatusMap: Record<string, boolean>;
}

type ScrollMode = "append" | "prepend";

const MobileMessageView: React.FC<Props> = ({
  activeChat,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyDown,
  chatsStatus,
  isFetching,
  isFetchingMoreChats,
  fetchNextPageChats,
  hasMore,
  scrollMode,
  setScrollMode,
  onlineStatusMap,
}) => {
  const { data: userData } = useDbUser();

  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const { setShowMobileChat } = useChatActions();

  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;

    // Append mode = scroll to bottom (new live message or chat switch)
    if (scrollMode === "append") {
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        // console.log("Scrolled to bottom (new message or chat)");
      });
    }
  }, [messages.length, scrollMode]);

  const handleScroll = () => {
    const container = messagesRef.current;
    if (!container) return;

    if (container.scrollTop === 0 && hasMore && !isFetchingMoreChats) {
      //   console.log("Reached top. Loading older messages...");
      setScrollMode("prepend");
      void fetchNextPageChats();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Chat Header */}
      <div className="flex items-center border-b border-white/10 p-4">
        <motion.button
          className="mr-2 rounded-full p-2 hover:bg-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setShowMobileChat(false);
          }}
        >
          <ArrowLeft size={18} className="text-white" />
        </motion.button>

        <div className="flex flex-1 items-center">
          <div className="relative mr-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#27272A]">
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarImage
                  src={activeChat.profilePic ?? "https://github.com/shadcn.png"}
                  alt={activeChat.firstName ?? "User Name"}
                  className="rounded-full object-cover"
                />
                <AvatarFallback>
                  {activeChat.firstName?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            </div>
            {onlineStatusMap[activeChat?.id ?? ""] && (
              <motion.div
                className="absolute -right-1 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-black bg-green-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                layoutId="onlineIndicator"
              />
            )}
          </div>
          <div>
            <h3 className="font-medium text-white">{`${activeChat?.firstName} ${activeChat?.lastName}`}</h3>
            <p className="text-xs text-white/50">
              {onlineStatusMap[activeChat?.id ?? ""] ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <motion.button
          className="rounded-full p-2 hover:bg-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MoreHorizontal size={18} className="text-white/70" />
        </motion.button>
      </div>

      {/* Messages */}
      {isFetching && !isFetchingMoreChats ? (
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
          <Spinner variant="circle-filled" />
          <p className="text-center text-sm text-white/50">
            Loading messages...
          </p>
        </div>
      ) : chatsStatus === "error" && !isFetchingMoreChats ? (
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
          <ResultsNotFound
            description={"Unable to load messages. Please try again."}
            title="Oops! Something went wrong"
          />
        </div>
      ) : (
        <div
          ref={messagesRef}
          onScroll={handleScroll}
          className="scrollbar-none flex-1 overflow-y-auto p-4"
        >
          {isFetchingMoreChats && (
            <div className="flex w-full flex-1 items-center justify-center gap-2 pb-2">
              <p className="text-center text-sm text-white/50">
                Loading older messages
              </p>
              <Spinner variant="ellipsis" />
            </div>
          )}
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {messages.map((message) => {
              const isCurrentUser = userData?.data?.id === message.senderId;
              const showAvatar = message?.receiverId === userData?.data?.id;

              return (
                <motion.div
                  key={message.id}
                  className={cn(
                    "flex",
                    isCurrentUser ? "justify-end" : "justify-start"
                  )}
                  variants={itemVariants}
                  layout
                >
                  <div
                    className={cn(
                      "flex max-w-[80%] items-end gap-2",
                      isCurrentUser && "flex-row-reverse"
                    )}
                  >
                    {!isCurrentUser && showAvatar && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#27272A]">
                        <Avatar className="h-8 w-8 rounded-full">
                          <AvatarImage
                            src={
                              activeChat.profilePic ??
                              "https://github.com/shadcn.png"
                            }
                            alt={activeChat.firstName ?? "User Name"}
                            className="rounded-full object-cover"
                          />
                          <AvatarFallback>
                            {activeChat.firstName?.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2",
                        isCurrentUser
                          ? "rounded-br-sm bg-[#1D4ED8] text-white"
                          : "rounded-bl-sm bg-white/10 text-white"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div
                        className={cn(
                          "mt-1 flex items-center gap-1 text-[10px]",
                          isCurrentUser
                            ? "justify-end text-white/70"
                            : "text-white/50"
                        )}
                      >
                        {format(message.sentAt, "hh:mm a")}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <div ref={bottomRef} />
          </motion.div>
        </div>
      )}

      {/* Message Input */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-2">
          <motion.button
            className="rounded-full p-2 hover:bg-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Smile size={20} className="text-white/70" />
          </motion.button>
          <div className="relative flex-1">
            <textarea
              className="scrollbar-none h-12 max-h-32 w-full resize-none overflow-y-auto rounded-lg bg-white/5 px-4 py-3 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
          </div>
          <motion.button
            className={cn(
              "flex cursor-pointer items-center justify-center rounded-full p-3",
              newMessage.trim()
                ? "bg-[#1D4ED8] text-white"
                : "bg-white/5 text-white/40"
            )}
            whileHover={newMessage.trim() ? { scale: 1.05 } : {}}
            whileTap={newMessage.trim() ? { scale: 0.95 } : {}}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMessageView;
