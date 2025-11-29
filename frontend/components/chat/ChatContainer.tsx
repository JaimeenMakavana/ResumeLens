"use client";

import React from "react";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { ChatHeader } from "./ChatHeader";
import { useChatStore } from "@/stores/chatStore";
import { useSessionStore } from "@/stores/sessionStore";
import { FileText, Briefcase } from "@/components/ui/icons";

interface ChatContainerProps {
  title?: string;
  showHeader?: boolean;
}

/**
 * Enhanced ChatContainer component with integrated header,
 * improved layout structure, and better visual hierarchy.
 */
export function ChatContainer({
  title,
  showHeader = true,
}: ChatContainerProps) {
  const isStreaming = useChatStore((state) => state.isStreaming);
  const sourceType = useSessionStore((state) => state.sourceType);

  // Determine default title based on source type
  const defaultTitle =
    title ||
    (sourceType === "resume"
      ? "Chat with Resume"
      : "Chat about Job Description");

  const headerIcon =
    sourceType === "resume" ? (
      <FileText className="w-5 h-5" />
    ) : (
      <Briefcase className="w-5 h-5" />
    );

  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
      {/* Integrated Header */}
      {showHeader && (
        <ChatHeader
          title={defaultTitle}
          icon={headerIcon}
          sourceType={sourceType || undefined}
        />
      )}

      {/* Message Area */}
      <div className="flex-1 overflow-hidden relative">
        <MessageList />
        {isStreaming && (
          <div className="absolute bottom-0 left-0 right-0">
            <TypingIndicator />
          </div>
        )}
      </div>

      {/* Input Area */}
      <ChatInput />
    </div>
  );
}
