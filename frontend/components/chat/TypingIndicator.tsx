"use client";

import React from "react";
import { Bot } from "@/components/ui/icons";

/**
 * Enhanced TypingIndicator component with sophisticated animation
 * and better visual design to indicate the AI is processing.
 */ 
export function TypingIndicator() {
  return (
    <div className="flex justify-start px-4 py-2">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
          <Bot className="w-4 h-4" />
        </div>

        {/* Typing Bubble */}
        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-gray-600 mr-2">Thinking</span>
            <div className="flex gap-1">
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms", animationDuration: "1.4s" }}
              />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms", animationDuration: "1.4s" }}
              />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms", animationDuration: "1.4s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
