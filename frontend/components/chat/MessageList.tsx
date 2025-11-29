"use client";

import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { useChatStore } from "@/stores/chatStore";
import { EmptyState } from "./EmptyState";
import { ScrollToBottomButton } from "./ScrollToBottomButton";
import { useDocumentStore } from "@/stores/documentStore";
import { useSessionStore } from "@/stores/sessionStore";

export function MessageList() {
  const messages = useChatStore((state) => state.messages);
  const endRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const sourceType = useSessionStore((state) => state.sourceType);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messages.length > 0) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Show scroll button when user scrolls up
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom && messages.length > 0);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [messages.length]);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectQuestion = (question: string) => {
    // Dispatch event that ChatInput can listen to
    const event = new CustomEvent("suggested-question-selected", {
      detail: { question },
    });
    window.dispatchEvent(event);
  };

  if (messages.length === 0) {
    return (
      <EmptyState
        sourceType={sourceType || "resume"}
        onSelectQuestion={handleSelectQuestion}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white"
      role="log"
      aria-label="Chat messages"
    >
      <div className="py-6">
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            showTimestamp={true}
            showActions={true}
          />
        ))}
        <div ref={endRef} className="h-4" aria-hidden="true" />
      </div>

      <ScrollToBottomButton
        onClick={scrollToBottom}
        isVisible={showScrollButton}
      />
    </div>
  );
}
