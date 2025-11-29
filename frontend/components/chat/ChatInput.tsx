"use client";

import { useState, KeyboardEvent, useEffect, useRef } from "react";
import { Button } from "@/components/ui";
import { useChat } from "@/hooks/useChat";
import { Send, Paperclip } from "@/components/ui/icons";

/**
 * Enhanced ChatInput component with auto-resizing textarea,
 * better visual styling, and improved UX patterns.
 */
export function ChatInput() {
  const { sendMessage, isStreaming } = useChat();
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 120); // Max 120px
      textarea.style.height = `${newHeight}px`;
    }
  }, [input]);

  // Listen for suggested question selection
  useEffect(() => {
    const handleQuestionSelected = (event: Event) => {
      const customEvent = event as CustomEvent<{ question: string }>;
      setInput(customEvent.detail.question);
      textareaRef.current?.focus();
    };

    window.addEventListener("suggested-question-selected", handleQuestionSelected);
    return () => {
      window.removeEventListener("suggested-question-selected", handleQuestionSelected);
    };
  }, []);

  const handleSend = () => {
    if (input.trim() && !isStreaming) {
      sendMessage(input);
      setInput("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = input.trim().length > 0 && !isStreaming;
  const characterCount = input.length;
  const maxLength = 2000;

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="px-6 py-4">
        {/* Character Count (optional, show when near limit) */}
        {characterCount > maxLength * 0.8 && (
          <div className="mb-2 text-right">
            <span
              className={`text-xs ${
                characterCount > maxLength
                  ? "text-red-600"
                  : characterCount > maxLength * 0.9
                  ? "text-amber-600"
                  : "text-gray-500"
              }`}
            >
              {characterCount} / {maxLength}
            </span>
          </div>
        )}

        {/* Input Container */}
        <div
          className={`flex items-end gap-3 p-3 rounded-xl border-2 transition-all duration-200 ${
            isFocused
              ? "border-blue-500 bg-blue-50/50 shadow-sm"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          {/* Textarea */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue.length <= maxLength) {
                  setInput(newValue);
                }
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isStreaming}
              placeholder="Ask a question..."
              className="w-full resize-none bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-base leading-relaxed focus:outline-none"
              rows={1}
              maxLength={maxLength}
              aria-label="Chat input"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Attach Button (Future) */}
            <button
              type="button"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isStreaming}
              aria-label="Attach file"
              title="Attach file (coming soon)"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={!canSend}
              loading={isStreaming}
              className="rounded-lg px-4 py-2 min-w-[80px]"
              aria-label="Send message"
            >
              {isStreaming ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-1.5" />
                  Send
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Keyboard Shortcut Hint */}
        <div className="mt-2 text-xs text-gray-500 text-center">
          Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">Enter</kbd> to send,{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">Shift + Enter</kbd> for new line
        </div>
      </div>
    </div>
  );
}
