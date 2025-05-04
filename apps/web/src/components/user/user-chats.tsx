"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useDbUser, useInfiniteScroll, useWebSocket } from "@/src/hooks";
import {
  containerVariants,
  itemVariants,
  slideRightVariants,
} from "@/src/lib/framer-animations";
import { useActiveChat, useChatActions } from "@/src/store";
import { useTRPC } from "@/src/trpc/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Spinner } from "@repo/ui/components/spinner";
import { useIsMobile } from "@repo/ui/hooks";
import { cn } from "@repo/ui/lib/utils";
import {
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
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
import SearchModal from "../search/search-modal";

type MessageType = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  sentAt: Date;
  contentType: "TEXT" | "IMAGE" | "FILE";
};

interface ChatOrderType {
  chatId: string;
  lastMessage: string | null;
  lastMessageTimestamp: Date;
  firstName?: string;
  lastName?: string;
  profilePic?: string;
  bio?: string;
}

const UserChats = () => {
  //   type RouterOutput = inferRouterOutputs<AppRouter>;
  //   type ChatData = NonNullable<RouterOutput["user"]["getChatsById"]["data"]>;
  //   type ChatMessage = ChatData["chats"][number];

  const isMobile = useIsMobile();
  const [liveMessagesMap, setLiveMessagesMap] = useState<
    Record<string, MessageType[]>
  >({});

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const chatRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const bottomRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState("");
  //   const [showMobileChat, setShowMobileChat] = useState(false);

  const { data: userData } = useDbUser();

  const { setActiveChat } = useChatActions();

  const activeChat = useActiveChat();

  console.log("ACTIVE CHAT", activeChat);

  const trpc = useTRPC();

  // Chat List
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
          refetchOnWindowFocus: false,
          enabled: !!userData?.data?.id,
        }
      )
    );

  useEffect(() => {
    if (!data?.pages) return;
    if (status === "success") {
      const chats = data?.pages
        .flatMap((page) => page.data?.chats ?? [])
        .map((chat) => ({
          chatId: chat?.receiverId ?? "",
          lastMessage: chat?.content ?? "",
          lastMessageTimestamp: chat?.sentAt ?? new Date(),
        }));

      setChatOrder(chats);
    }
  }, [data, status]);

  const chatsLoaderRef = useInfiniteScroll({
    callbackAction: () => {
      void fetchNextPage();
    },
    hasMore: !!data.pages[data.pages.length - 1]?.data?.nextCursor,
    isLoading: isFetchingNextPage,
  });

  const [chatOrder, setChatOrder] = useState<ChatOrderType[]>(
    data.pages
      .flatMap((page) => page.data?.chats ?? [])
      .map((chat) => ({
        chatId: chat?.receiverId ?? "",
        lastMessage: chat?.content ?? "",
        lastMessageTimestamp: chat?.sentAt ?? new Date(),
      }))
  );

  const chatQueryInput = useMemo(() => {
    return {
      receiverId: activeChat?.id ?? "",
      limit: 10,
    };
  }, [activeChat?.id]);

  const {
    data: chatsData,
    status: chatsStatus,
    isFetching,
    error: chatsError,
    isFetchingNextPage: isFetcingMoreChats,
  } = useInfiniteQuery(
    trpc.user.getChatsById.infiniteQueryOptions(chatQueryInput, {
      getNextPageParam: (lastPage) => {
        return (lastPage.data?.nextCursor as string | undefined) ?? undefined;
      },
      enabled: !!activeChat?.id,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    })
  );

  useEffect(() => {
    if (activeChat?.id && chatRefs.current[activeChat.id]) {
      chatRefs.current[activeChat.id]?.scrollIntoView({
        behavior: "smooth",
        block: "center", // or "nearest" or "start"
      });
    }
  }, [activeChat]);

  const { on, sendMessage } = useWebSocket("ws://localhost:4000", {
    reconnectOnUnmount: false,
    userId: userData?.data?.id ?? "",
  });

  useEffect(() => {
    const off = on("MESSAGE", (data) => {
      if (typeof data === "object" && data) {
        console.log("LIVE MESSAGE", data);
        // setLiveMessages((prev) => [...prev, data as MessageType]);
      }
    });

    return off;
  }, [on]);

  const allMessages = useMemo(() => {
    const pagedMessages =
      chatsData?.pages.flatMap((page) => page.data?.chats ?? []) ?? [];

    const live = liveMessagesMap[activeChat?.id ?? ""] ?? [];

    return [...pagedMessages.reverse(), ...live];
  }, [chatsData, liveMessagesMap, activeChat?.id]);

  useEffect(() => {
    if (!activeChat?.id) return;
    if (isFetching) {
      console.log("Pending");

      setLiveMessagesMap((prev) => ({
        ...prev,
        [activeChat?.id]: [],
      }));
    }
  }, [activeChat?.id, isFetching]);

  console.log("ALL MESSAGES", allMessages);
  console.log("LIVE MESSAGES MAP", liveMessagesMap);
  console.log("CHAT ORDER", chatOrder);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages?.length, chatsData, liveMessagesMap]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [liveMessagesMap]);

  console.log("CHATS DATA", chatsData);

  console.log("DATA", data);
  console.log("STATUS", status);
  console.log("ERROR", error);
  console.log("IS FETCHING NEXT PAGE", isFetchingNextPage);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const msg: MessageType = {
      id: crypto.randomUUID(),
      content: newMessage,
      senderId: userData?.data?.id ?? "",
      receiverId: activeChat?.id ?? "",
      sentAt: new Date(),
      contentType: "TEXT",
    };

    // Clear input box
    setNewMessage("");

    // 1. Optimistically show message in UI
    setLiveMessagesMap((prev) => {
      const existing = prev[activeChat?.id ?? ""] ?? [];
      return {
        ...prev,
        [activeChat?.id ?? ""]: [...existing, msg],
      };
    });

    setChatOrder((prev) => {
      const existingIndex = prev.findIndex(
        (chat) => chat.chatId === activeChat?.id
      );
      const updatedList = [...prev];

      if (existingIndex !== -1) {
        updatedList[existingIndex] = {
          ...updatedList[existingIndex],
          chatId: msg.receiverId,
          lastMessage: msg.content,
          lastMessageTimestamp: msg.sentAt,
        };
      } else {
        updatedList.push({
          chatId: msg.receiverId,
          lastMessage: msg.content,
          lastMessageTimestamp: msg.sentAt,
          bio: activeChat?.bio ?? "",
          firstName: activeChat?.firstName ?? "",
          lastName: activeChat?.lastName ?? "",
          profilePic: activeChat?.profilePic ?? "",
        });
      }

      updatedList.sort((a, b) => {
        const aTime = new Date(a.lastMessageTimestamp || 0).getTime();
        const bTime = new Date(b.lastMessageTimestamp || 0).getTime();
        return bTime - aTime;
      });

      return updatedList;
    });

    // 2. Send over WebSocket
    const sent = sendMessage("MESSAGE", {
      senderId: userData?.data?.id ?? "",
      receiverId: activeChat?.id ?? "",
      content: newMessage,
      contentType: "TEXT",
      timestamp: new Date().toISOString(),
    });

    if (!sent) {
      console.warn("Message not sent. WebSocket not connected.");
      // Optional: Retry or show toast to user
    }
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
                onClick={() => setIsSearchModalOpen(true)}
              >
                <MessageSquarePlus
                  size={18}
                  className="cursor-pointer text-white/70"
                />
              </motion.button>
            </div>
          </div>

          {/* Search */}
          <div
            className="border-b border-white/10 p-4"
            onClick={() => setIsSearchModalOpen(true)}
          >
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-white/40"
                size={16}
              />
              <input
                type="text"
                placeholder="Search Experts"
                readOnly
                className="w-full rounded-lg bg-white/5 py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20"
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="scrollbar-none mb-1 flex-1 overflow-y-auto">
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
                chatOrder?.map((chatData) => {
                  const chat = data?.pages
                    ?.flatMap((page) => page?.data?.chats ?? [])
                    .filter(Boolean)
                    ?.find((chat) => chat?.receiverId === chatData?.chatId);

                  return (
                    <motion.div
                      key={chat?.id}
                      ref={(el) => {
                        if (chat?.receiverId) {
                          chatRefs.current[chat.receiverId] = el;
                        } else if (chatData?.chatId) {
                          chatRefs.current[chatData.chatId] = el;
                        }
                      }}
                      variants={itemVariants}
                      whileHover={{ x: 4 }}
                      className={cn(
                        "cursor-pointer rounded-lg p-3",
                        activeChat?.id ===
                          (chat?.receiverId ?? chatData?.chatId)
                          ? "bg-white/10"
                          : "hover:bg-white/5"
                      )}
                      onClick={() => {
                        setActiveChat({
                          bio: chat?.receiver.bio ?? chatData?.bio ?? "",
                          firstName:
                            chat?.receiver.firstName ??
                            chatData?.firstName ??
                            "",
                          id: chat?.receiver.id ?? chatData?.chatId ?? "",
                          lastName:
                            chat?.receiver.lastName ?? chatData?.lastName ?? "",
                          profilePic:
                            chat?.receiver.profilePic ??
                            chatData?.profilePic ??
                            "",
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
                                  chat?.receiver.profilePic ??
                                  chatData?.profilePic ??
                                  "https://github.com/shadcn.png"
                                }
                                alt={
                                  chat?.receiver.firstName ??
                                  chatData?.firstName ??
                                  "User Name"
                                }
                                className="rounded-full object-cover"
                              />
                              <AvatarFallback>
                                {chat?.receiver.firstName?.slice(0, 1) ??
                                  chatData?.firstName?.slice(0, 1)}
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
                              {chat?.receiver.firstName ?? chatData?.firstName}{" "}
                              {chat?.receiver.lastName ?? chatData?.lastName}
                            </p>
                            <p className="text-xs text-white/50">
                              {format(
                                chatData?.lastMessageTimestamp ??
                                  chat?.sentAt ??
                                  new Date(),
                                "hh:mm a"
                              )}
                            </p>
                          </div>
                          <div className="mt-1 flex justify-between">
                            <p className="truncate text-xs text-white/70">
                              {chatData?.lastMessage ?? chat?.content}
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
                  );
                })
              )}
              {!!data.pages[data.pages.length - 1]?.data?.nextCursor && (
                <div
                  ref={chatsLoaderRef}
                  className="flex h-6 w-full items-center justify-center"
                >
                  {isFetchingNextPage && <Spinner variant="ellipsis" />}
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
          ) : !activeChat ? (
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
                  {allMessages?.map((message, index) => {
                    const isCurrentUser =
                      message.senderId === userData?.data?.id;
                    const showAvatar =
                      index === 0 ||
                      allMessages[index - 1]?.senderId !== message.senderId;
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

              {/* Message Input */}
              <div className="border-t border-white/10 p-4">
                <div className="flex items-center gap-2">
                  <motion.button
                    className="cursor-pointer rounded-full p-2 hover:bg-white/10"
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
          ))}

        {/* Search Modal */}
        {isSearchModalOpen && (
          <SearchModal onClose={() => setIsSearchModalOpen(false)} />
        )}

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
