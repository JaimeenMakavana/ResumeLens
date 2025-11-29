"use client";

import React from "react";
import { Message } from "@/types";
import { SnippetSources } from "./SnippetSources";
import { MessageActions } from "./MessageActions";
import { User, Bot } from "@/components/ui/icons";
import { formatTimestamp } from "@/utils/format";

interface ChatMessageProps {
  message: Message;
  showTimestamp?: boolean;
  showActions?: boolean;
}

/**
 * Enhanced ChatMessage component with improved styling, timestamps,
 * message actions, and better visual hierarchy.
 */
export function ChatMessage({
  message,
  showTimestamp = true,
  showActions = true,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`group flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-6 px-4 animate-fade-in`}
    >
      <div
        className={`flex items-start gap-3 max-w-[85%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          aria-label={isUser ? "User" : "Assistant"}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Message Content */}
        <div
          className={`flex flex-col ${
            isUser ? "items-end" : "items-start"
          } gap-1`}
        >
          {/* Message Bubble */}
          <div
            className={`relative rounded-2xl px-4 py-3 shadow-sm ${
              isUser
                ? "bg-blue-600 text-white rounded-tr-sm"
                : "bg-white text-gray-900 border border-gray-200 rounded-tl-sm"
            }`}
          >
            {/* Content */}
            <div className="prose prose-sm max-w-none">
              <p className="text-base leading-relaxed whitespace-pre-wrap break-words m-0">
                {message.content}
              </p>
            </div>

            {/* Snippet Sources (for assistant messages) */}
            {!isUser && message.chunksUsed && message.chunksUsed.length > 0 && (
              <div className="mt-3 -mb-1">
                <SnippetSources sources={message.chunksUsed} />
              </div>
            )}

            {/* Message Actions */}
            {showActions && (
              <div
                className={`absolute top-2 ${isUser ? "left-2" : "right-2"}`}
              >
                <MessageActions
                  messageId={message.id}
                  content={message.content}
                  position={isUser ? "left" : "right"}
                />
              </div>
            )}

            {/* Confidence Indicator (for assistant messages) */}
            {!isUser && message.confidence !== undefined && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        message.confidence > 0.7
                          ? "bg-green-500"
                          : message.confidence > 0.4
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${message.confidence * 100}%` }}
                      aria-label={`Confidence: ${Math.round(
                        message.confidence * 100
                      )}%`}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {Math.round(message.confidence * 100)}% confidence
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Timestamp and Metadata */}
          {showTimestamp && (
            <div
              className={`flex items-center gap-2 px-1 ${
                isUser ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <span className="text-xs text-gray-500">
                {formatTimestamp(message.timestamp || Date.now())}
              </span>
              {!isUser &&
                message.chunksUsed &&
                message.chunksUsed.length > 0 && (
                  <span className="text-xs text-gray-400">•</span>
                )}
              {!isUser &&
                message.chunksUsed &&
                message.chunksUsed.length > 0 && (
                  <span className="text-xs text-gray-500">
                    {message.chunksUsed.length} source
                    {message.chunksUsed.length > 1 ? "s" : ""}
                  </span>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
