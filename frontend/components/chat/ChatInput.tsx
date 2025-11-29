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

    window.addEventListener(
      "suggested-question-selected",
      handleQuestionSelected
    );
    return () => {
      window.removeEventListener(
        "suggested-question-selected",
        handleQuestionSelected
      );
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
    <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
      <div className="px-6 py-4">
        {/* Character Count (optional, show when near limit) */}
        {characterCount > maxLength * 0.8 && (
          <div className="mb-2 text-right">
            <span
              className={`text-xs transition-colors duration-200 ${
                characterCount > maxLength
                  ? "text-[var(--neutral-600)]"
                  : characterCount > maxLength * 0.9
                  ? "text-[var(--accent-amber-600)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              {characterCount} / {maxLength}
            </span>
          </div>
        )}

        {/* Input Container */}
        <div
          className={`flex items-end gap-3 p-3 rounded-xl border transition-all duration-200 ease-in-out ${
            isFocused
              ? "border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[var(--shadow-sm)]"
              : "border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
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
              className="w-full resize-none bg-transparent border-none outline-none 
                text-[var(--text-primary)] 
                placeholder:text-[var(--text-tertiary)] 
                text-base leading-relaxed 
                focus:outline-none
                disabled:text-[var(--text-disabled)]
                disabled:cursor-not-allowed"
              rows={1}
              maxLength={maxLength}
              aria-label="Chat input"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={!canSend}
              loading={isStreaming}
              className="rounded-lg"
              aria-label="Send message"
            >
              {isStreaming ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
