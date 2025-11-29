import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ChatState, Message } from "@/types";

interface ChatStore extends ChatState {
  // Actions
  addMessage: (message: Message) => void;
  setStreaming: (isStreaming: boolean) => void;
  setCurrentQuery: (query: string) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
  reset: () => void;
}

const initialState: ChatState = {
  messages: [],
  isStreaming: false,
  currentQuery: "",
  error: null,
  retrievedChunks: null,
  confidence: null,
  inputDisabled: false,
};

export const useChatStore = create<ChatStore>()(
  devtools(
    (set) => ({
      ...initialState,

      addMessage: (message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      },

      setStreaming: (isStreaming) => {
        set({ isStreaming, inputDisabled: isStreaming });
      },

      setCurrentQuery: (query) => {
        set({ currentQuery: query });
      },

      setError: (error) => {
        set({ error });
      },

      clearMessages: () => {
        set({ messages: [] });
      },

      reset: () => {
        set(initialState);
      },
    }),
    { name: "ChatStore" }
  )
);

