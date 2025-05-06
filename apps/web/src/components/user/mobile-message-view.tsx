"use client";

import { useDbUser } from "@/src/hooks";
import type { ChatUser } from "@/src/store";
import type { AppRouter } from "@repo/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { cn } from "@repo/ui/lib/utils";
import type { inferRouterOutputs } from "@trpc/server";
import { format } from "date-fns";
import { ArrowLeft, MoreHorizontal, Send, Smile } from "lucide-react";
import { motion } from "motion/react";

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
  onBack: () => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

const MobileMessageView: React.FC<Props> = ({
  activeChat,
  messages,
  onBack,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyDown,
}) => {
  const { data: userData } = useDbUser();
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
          onClick={onBack}
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
            {/* {contact.online && (
              <motion.div
                className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-black bg-green-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )} */}
          </div>
          <div>
            <h3 className="font-medium text-white">{`${activeChat?.firstName} ${activeChat?.lastName}`}</h3>
            {/* <p className="text-xs text-white/50">
              {contact.online ? "Online" : "Offline"}
            </p> */}
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
      <div className="scrollbar-none flex-1 overflow-y-auto p-4">
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
                        ? "bg-sidebar-primary rounded-br-sm text-white"
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
        </motion.div>
      </div>

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
              "flex items-center justify-center rounded-full p-3",
              newMessage.trim()
                ? "bg-sidebar-primary text-white"
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
