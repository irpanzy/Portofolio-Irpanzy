import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatMessage } from "@/types";

interface ChatStore {
  messages: ChatMessage[];
  sessionId: string | null;
  isOpen: boolean;

  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  setSessionId: (sessionId: string) => void;
  clearChat: () => void;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      sessionId: null,
      isOpen: false,

      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

      setMessages: (messages) =>
        set(() => ({
          messages,
        })),

      setSessionId: (sessionId) =>
        set(() => ({
          sessionId,
        })),

      clearChat: () =>
        set(() => ({
          messages: [],
          sessionId: null,
        })),

      toggleChat: () =>
        set((state) => ({
          isOpen: !state.isOpen,
        })),

      openChat: () =>
        set(() => ({
          isOpen: true,
        })),

      closeChat: () =>
        set(() => ({
          isOpen: false,
        })),
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        messages: state.messages,
        sessionId: state.sessionId,
      }),
    }
  )
);
