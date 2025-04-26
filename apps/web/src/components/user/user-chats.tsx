"use client";

import { useState } from "react";
import {
  containerVariants,
  itemVariants,
  slideRightVariants,
} from "@/src/lib/framer-animations";
import { useTRPC } from "@/src/trpc/react";
import { Spinner } from "@repo/ui/components/spinner";
import { useIsMobile } from "@repo/ui/hooks";
import { cn } from "@repo/ui/lib/utils";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
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

// Mock data - replace with actual data from your API
const contacts = [
  {
    id: "1",
    name: "Sarah Wilson",
    lastMessage: "Hey, how are you doing?",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    lastMessage: "Can we meet tomorrow?",
    time: "9:15 AM",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Emily Johnson",
    lastMessage: "The project is ready for review",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Daniel Brown",
    lastMessage: "Thanks for your help!",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "Alex Rodriguez",
    lastMessage: "Did you see the latest update?",
    time: "Sunday",
    unread: 3,
    online: false,
  },
];

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
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  //   const [showMobileChat, setShowMobileChat] = useState(false);

  const trpc = useTRPC();

  const { data, status, error, isFetchingNextPage } = useSuspenseInfiniteQuery(
    trpc.user.getAllChats.infiniteQueryOptions(
      {
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) => {
          return (lastPage.data?.nextCursor as string | undefined) ?? undefined;
        },
      }
    )
  );

  console.log("DATA", data);
  console.log("STATUS", status);
  console.log("ERROR", error);
  console.log("IS FETCHING NEXT PAGE", isFetchingNextPage);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContactClick = (contact: any) => {
    setActiveContact(contact);
    if (isMobile) {
      //   setShowMobileChat(true);
    }
  };

  if (isFetchingNextPage) {
    return (
      <div className="flex h-[calc(100vh-115px)] w-full flex-col items-center justify-center">
        <Spinner variant="ellipsis" className="size-14" />
      </div>
    );
  }

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
                filteredContacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className={cn(
                      "cursor-pointer rounded-lg p-3",
                      activeContact?.id === contact.id
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    )}
                    onClick={() => handleContactClick(contact)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#27272A]">
                          <User size={18} className="text-white" />
                        </div>
                        {contact.online && (
                          <motion.div
                            className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black bg-green-500"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between">
                          <p className="truncate text-sm font-medium text-white">
                            {contact.name}
                          </p>
                          <p className="text-xs text-white/50">
                            {contact.time}
                          </p>
                        </div>
                        <div className="mt-1 flex justify-between">
                          <p className="truncate text-xs text-white/70">
                            {contact.lastMessage}
                          </p>
                          {contact.unread > 0 && (
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
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </motion.div>
        {/* Desktop Chat Area */}
        {!isMobile &&
          (status === "error" ||
          data.pages.length === 0 ||
          data.pages[0]?.data?.chats.length === 0 ? (
            <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2">
              <h1 className="text-lg font-semibold">Chats are Empty</h1>
              <p className="text-center text-sm text-white/50">
                Select a contact or start a new conversation to chat with them.
              </p>
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
                      <User size={16} className="text-white" />
                    </div>
                    {activeContact?.online && (
                      <motion.div
                        className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-black bg-green-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        layoutId="onlineIndicator"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      {activeContact?.name}
                    </h3>
                    <p className="text-xs text-white/50">
                      {activeContact?.online ? "Online" : "Offline"}
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
              <div className="scrollbar-none flex-1 overflow-y-auto p-4">
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {messages.map((message, index) => {
                    const isCurrentUser = message.sender === "1";
                    const showAvatar =
                      index === 0 ||
                      messages[index - 1]?.sender !== message.sender;

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
                              <User size={14} className="text-white" />
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
                            <p className="text-sm">{message.text}</p>
                            <div
                              className={cn(
                                "mt-1 flex items-center gap-1 text-[10px]",
                                isCurrentUser
                                  ? "justify-end text-white/70"
                                  : "text-white/50"
                              )}
                            >
                              {message.time}
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
