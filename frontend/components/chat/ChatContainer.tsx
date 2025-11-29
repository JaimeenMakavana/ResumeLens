"use client";

import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { useChatStore } from "@/stores/chatStore";

export function ChatContainer() {
  const isStreaming = useChatStore((state) => state.isStreaming);

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden 
      rounded-[1.5rem] 
      border border-[var(--border-subtle)] 
      bg-[var(--bg-base)] 
      shadow-[var(--shadow-sm)]"
    >
      {/* Message Area */}
      <div className="flex-1 min-h-0 flex flex-col">
        <MessageList />
        {isStreaming && (
          <div
            className="border-t border-[var(--border-subtle)] 
            bg-[var(--bg-elevated)] 
            px-4 py-3"
          >
            <TypingIndicator />
          </div>
        )}
      </div>

      {/* Input Area */}
      <ChatInput />
    </div>
  );
}
