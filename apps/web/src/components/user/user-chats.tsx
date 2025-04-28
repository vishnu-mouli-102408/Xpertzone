"use client";

import { useState } from "react";
import { useDbUser } from "@/src/hooks";
import {
  containerVariants,
  itemVariants,
  slideRightVariants,
} from "@/src/lib/framer-animations";
import { useActiveChat, useChatActions } from "@/src/store";
import { useTRPC } from "@/src/trpc/react";
import type { AppRouter } from "@repo/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { useIsMobile } from "@repo/ui/hooks";
import { cn } from "@repo/ui/lib/utils";
import {
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import type { inferRouterOutputs } from "@trpc/server";
import { format } from "date-fns";
import {
  MessageSquarePlus,
  MoreHorizontal,
  Search,
  Send,
  Smile,
  User,
} from "lucide-react";
import { motion } from "motion/react";

import { FrownIcon } from "../animations/flown";
import ResultsNotFound from "../global/results-not-found";

// Message mock data
const initialMessages = [
  { id: "1", sender: "2", text: "Hey there!", time: "10:00 AM", read: true },
  {
    id: "2",
    sender: "1",
    text: "Hi! How are you doing?",
    time: "10:01 AM",
    read: true,
  },
  {
    id: "3",
    sender: "2",
    text: "I'm good, thanks! Just finishing up some work. How about you?",
    time: "10:05 AM",
    read: true,
  },
  {
    id: "4",
    sender: "1",
    text: "Pretty good! I wanted to ask if you'd be free for a meeting tomorrow?",
    time: "10:08 AM",
    read: true,
  },
  {
    id: "5",
    sender: "2",
    text: "Sure, what time works best for you?",
    time: "10:15 AM",
    read: true,
  },
  {
    id: "6",
    sender: "1",
    text: "How about 2 PM?",
    time: "10:20 AM",
    read: true,
  },
];

const UserChats = () => {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  //   const [showMobileChat, setShowMobileChat] = useState(false);

  const { data: userData } = useDbUser();

  type RouterOutput = inferRouterOutputs<AppRouter>;
  type ChatData = NonNullable<RouterOutput["user"]["getChatsById"]["data"]>;
  type ChatMessage = ChatData["chats"][number];

  const { setActiveChat } = useChatActions();

  const activeChat = useActiveChat();

  console.log("ACTIVE CHAT", activeChat);

  const trpc = useTRPC();

  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      trpc.user.getAllChats.infiniteQueryOptions(
        {
          limit: 10,
        },
        {
          getNextPageParam: (lastPage) => {
            return (
              (lastPage.data?.nextCursor as string | undefined) ?? undefined
            );
          },
        }
      )
    );

  const {
    data: chatsData,
    status: chatsStatus,
    isFetching,
    error: chatsError,
    isFetchingNextPage: isFetcingMoreChats,
  } = useInfiniteQuery(
    trpc.user.getChatsById.infiniteQueryOptions(
      {
        receiverId: activeChat?.id ?? "",
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) => {
          return (lastPage.data?.nextCursor as string | undefined) ?? undefined;
        },
        enabled: !!activeChat?.id,
      }
    )
  );

  console.log("CHATS DATA", chatsData);

  console.log("DATA", data);
  console.log("STATUS", status);
  console.log("ERROR", error);
  console.log("IS FETCHING NEXT PAGE", isFetchingNextPage);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: String(messages.length + 1),
      sender: "1", // Current user's ID
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="glass-morphism h-[calc(100vh-64px)] overflow-hidden shadow-lg">
      <div className="flex h-full">
        <motion.div
          className="flex h-full w-full flex-col border-r border-white/20 bg-black/30 backdrop-blur-lg md:w-1/4 lg:w-1/3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <h2 className="text-gradient text-xl font-semibold">Messages</h2>
            <div className="flex space-x-2">
              <motion.button
                className="rounded-full p-2 hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MessageSquarePlus
                  size={18}
                  className="cursor-pointer text-white/70"
                />
              </motion.button>
            </div>
          </div>

          {/* Search */}
          <div className="border-b border-white/10 p-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-white/40"
                size={16}
              />
              <input
                type="text"
                placeholder="Search Experts"
                className="w-full rounded-lg bg-white/5 py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="scrollbar-none flex-1 overflow-y-auto">
            <motion.div
              className="h-full space-y-1 p-2"
              variants={containerVariants}
            >
              {status === "error" ||
              data.pages.length === 0 ||
              data.pages[0]?.data?.chats.length === 0 ? (
                <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2">
                  <FrownIcon />
                  <h1 className="text-lg font-semibold">No Chats To Found</h1>
                  <p className="text-center text-sm text-white/50">
                    You don&apos;t have any chats yet. Start a conversation!
                  </p>
                </div>
              ) : (
                data.pages
                  .flatMap((page) => page.data?.chats ?? [])
                  .filter(Boolean)
                  ?.map((chat) => (
                    <motion.div
                      key={chat.id}
                      variants={itemVariants}
                      whileHover={{ x: 4 }}
                      className={cn(
                        "cursor-pointer rounded-lg p-3",
                        activeChat?.id === chat.receiverId
                          ? "bg-white/10"
                          : "hover:bg-white/5"
                      )}
                      onClick={() => {
                        setActiveChat({
                          bio: chat.receiver.bio,
                          firstName: chat.receiver.firstName,
                          id: chat.receiver.id,
                          lastName: chat.receiver.lastName,
                          profilePic: chat.receiver.profilePic,
                        });
                        if (isMobile) {
                          //   setShowMobileChat(true);
                        }
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#27272A]">
                            <User size={18} className="text-white" />
                            <Avatar className="h-12 w-12 rounded-full">
                              <AvatarImage
                                src={
                                  chat.receiver.profilePic ??
                                  "https://github.com/shadcn.png"
                                }
                                alt={chat.receiver.firstName ?? "User Name"}
                                className="rounded-full object-cover"
                              />
                              <AvatarFallback>
                                {chat.receiver.firstName?.slice(0, 1)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          {/* {chat.online && (
                          <motion.div
                            className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black bg-green-500"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )} */}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between">
                            <p className="truncate text-sm font-medium text-white">
                              {chat.receiver.firstName} {chat.receiver.lastName}
                            </p>
                            <p className="text-xs text-white/50">
                              {format(chat.sentAt, "hh:mm a")}
                            </p>
                          </div>
                          <div className="mt-1 flex justify-between">
                            <p className="truncate text-xs text-white/70">
                              {chat.content}
                            </p>
                            {/* {chat.unread > 0 && (
                            <motion.div
                              className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#1D4ED8]"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 20,
                              }}
                            >
                              <span className="text-xs font-medium text-white">
                                {contact.unread}
                              </span>
                            </motion.div>
                          )} */}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
              )}
              {data.pages.length > 1 && (
                <div className="flex items-center justify-center py-2">
                  {isFetchingNextPage ? (
                    <Spinner variant="ring" />
                  ) : (
                    <Button
                      onClick={() => {
                        void fetchNextPage();
                      }}
                      size={"sm"}
                      className="cursor-pointer"
                    >
                      Load More
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Desktop Chat Area */}
        {!isMobile &&
          (isFetching && !isFetcingMoreChats ? (
            <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2">
              <Spinner variant="circle-filled" />
              <p className="text-center text-sm text-white/50">
                Loading messages...
              </p>
            </div>
          ) : //   !chatsData ||
          //     chatsData?.pages.length === 0 ||
          //     chatsData?.pages[0]?.data?.chats.length === 0 ||
          !activeChat ? (
            <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2">
              <h1 className="text-lg font-semibold">Chats are Empty</h1>
              <p className="text-center text-sm text-white/50">
                Select a contact or start a new conversation to chat with them.
              </p>
            </div>
          ) : status === "error" || chatsStatus === "error" ? (
            <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2">
              <ResultsNotFound
                description={error?.message ?? chatsError?.message}
                title="Oops! Something went wrong"
              />
            </div>
          ) : (
            <motion.div
              className="flex flex-1 flex-col bg-black/20"
              variants={slideRightVariants}
              initial="hidden"
              animate="show"
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#27272A]">
                      {/* <User size={16} className="text-white" /> */}
                      <Avatar className="h-10 w-10 rounded-full">
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
                    {/* {activeChat?.online && (
                      <motion.div
                        className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-black bg-green-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        layoutId="onlineIndicator"
                      />
                    )} */}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      {activeChat?.firstName} {activeChat?.lastName}
                    </h3>
                    {/* <p className="text-xs text-white/50">
                      {activeChat?.online ? "Online" : "Offline"}
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
                {isFetcingMoreChats && (
                  <div className="flex w-full items-center justify-center pb-2">
                    <Spinner variant="ring" />
                  </div>
                )}
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {chatsData &&
                    chatsData?.pages?.length > 0 &&
                    chatsData.pages
                      .flatMap((page): ChatMessage[] => {
                        if (page.data?.chats) {
                          return page.data.chats;
                        }
                        return [];
                      })
                      .filter(Boolean)
                      .map((message, index) => {
                        const isCurrentUser =
                          message.senderId === userData?.data?.id;
                        const showAvatar =
                          index === 0 ||
                          chatsData.pages[index - 1]?.data?.chats[0]
                            ?.senderId !== message.senderId;

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
                                "flex max-w-[75%] items-end gap-2",
                                isCurrentUser && "flex-row-reverse"
                              )}
                            >
                              {!isCurrentUser && showAvatar && (
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#27272A]">
                                  {/* <User size={14} className="text-white" /> */}
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
          ))}

        {/* Mobile Chat View */}
        {/* <AnimatePresence>
          {isMobile && showMobileChat && (
            <MobileMessageView
              contact={activeContact}
              messages={messages}
              onBack={() => setShowMobileChat(false)}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              handleKeyDown={handleKeyDown}
            />
          )}
        </AnimatePresence> */}
      </div>
    </div>
  );
};

export default UserChats;
