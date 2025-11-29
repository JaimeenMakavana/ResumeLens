"use client";

import { useState } from "react";
import { useChatStore } from "@/stores/chatStore";
import { chatService } from "@/services";
import { useSession } from "./useSession";
import { Message } from "@/types";

export function useChat() {
  const {
    messages,
    isStreaming,
    error,
    addMessage,
    setStreaming,
    setError,
    clearMessages,
  } = useChatStore();
  const { sessionId } = useSession();
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async (content: string) => {
    if (!sessionId || !content.trim() || isSending) {
      return;
    }

    setIsSending(true);
    setStreaming(true);
    setError(null);

    // Add user message optimistically
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
    };
    addMessage(userMessage);

    try {
      const response = await chatService.sendMessage({
        sessionId,
        query: content.trim(),
      });

      // Add assistant message
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.answer,
        timestamp: Date.now(),
        chunksUsed: response.sources,
        confidence: response.confidence,
      };
      addMessage(assistantMessage);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to send message";
      setError(errorMessage);
      // Remove user message on error
      useChatStore.setState((state) => ({
        messages: state.messages.filter((m) => m.id !== userMessage.id),
      }));
    } finally {
      setIsSending(false);
      setStreaming(false);
    }
  };

  return {
    messages,
    isStreaming,
    error,
    sendMessage,
    clearMessages,
  };
}

