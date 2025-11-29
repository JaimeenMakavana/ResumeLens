"use client";

import { useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { useChatStore } from "@/stores/chatStore";
import { EmptyState } from "./EmptyState";
import { useDocumentStore } from "@/stores/documentStore";
import { useSessionStore } from "@/stores/sessionStore";

export function MessageList() {
  const messages = useChatStore((state) => state.messages);
  const endRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceType = useSessionStore((state) => state.sourceType);

  const handleSelectQuestion = (question: string) => {
    // Dispatch event that ChatInput can listen to
    const event = new CustomEvent("suggested-question-selected", {
      detail: { question },
    });
    window.dispatchEvent(event);
  };

  const content =
    messages.length === 0 ? (
      <EmptyState
        sourceType={sourceType || "resume"}
        onSelectQuestion={handleSelectQuestion}
      />
    ) : (
      <>
        <div className="py-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              showTimestamp={true}
              showActions={true}
            />
          ))}
          <div ref={endRef} className="h-4" aria-hidden="true" />
        </div>
      </>
    );

  return (
    <div
      ref={containerRef}
      className="relative flex-1 h-full overflow-y-auto bg-linear-to-b from-gray-50 to-white"
      role="log"
      aria-label="Chat messages"
    >
      {content}
    </div>
  );
}
