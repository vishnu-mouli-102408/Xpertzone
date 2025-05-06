import type { Message } from "@repo/db";
import { create } from "zustand";

export type ChatUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  profilePic: string | null;
};

interface ChatStoreState {
  allChats: Message[];
  showMobileChat: boolean;
  activeChat: ChatUser | null;
  actions: {
    setActiveChat: (user: ChatUser) => void;
    setAllChats: (messages: Message[]) => void;
    setShowMobileChat: (show: boolean) => void;
  };
}

const useChatStore = create<ChatStoreState>((set) => ({
  allChats: [],
  showMobileChat: false,
  activeChat: null,
  actions: {
    setActiveChat: (user: ChatUser) => set({ activeChat: user }),
    setAllChats: (messages: Message[]) => set({ allChats: messages }),
    setShowMobileChat: (show: boolean) => set({ showMobileChat: show }),
  },
}));

export const useAllChats = () => useChatStore((state) => state.allChats);
export const useActiveChat = () => useChatStore((state) => state.activeChat);
export const useShowMobileChat = () =>
  useChatStore((state) => state.showMobileChat);

export const useChatActions = () => useChatStore((state) => state.actions);
