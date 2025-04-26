import type { Message } from "@repo/db";
import { create } from "zustand";

type ChatUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  profilePic: string | null;
};

interface ChatStoreState {
  allChats: Message[];
  activeChat: ChatUser | null;
  actions: {
    setActiveChat: (user: ChatUser) => void;
    setAllChats: (messages: Message[]) => void;
  };
}

const useChatStore = create<ChatStoreState>((set) => ({
  allChats: [],
  activeChat: null,
  actions: {
    setActiveChat: (user: ChatUser) => set({ activeChat: user }),
    setAllChats: (messages: Message[]) => set({ allChats: messages }),
  },
}));

export const useAllChats = () => useChatStore((state) => state.allChats);
export const useActiveChat = () => useChatStore((state) => state.activeChat);

export const useChatActions = () => useChatStore((state) => state.actions);
