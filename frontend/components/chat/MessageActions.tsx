"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Copy,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
} from "@/components/ui/icons";
import { Button } from "@/components/ui";

interface MessageActionsProps {
  messageId: string;
  content: string;
  onCopy?: () => void;
  onRegenerate?: () => void;
  onFeedback?: (feedback: "positive" | "negative") => void;
  position?: "left" | "right";
}

/**
 * MessageActions component provides a dropdown menu with actions for individual messages.
 * Actions include copy, regenerate (future), and feedback (future).
 */
export function MessageActions({
  messageId,
  content,
  onCopy,
  onRegenerate,
  onFeedback,
  position = "right",
}: MessageActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      if (onCopy) onCopy();
      setTimeout(() => setCopied(false), 2000);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate();
      setIsOpen(false);
    }
  };

  const handleFeedback = (feedback: "positive" | "negative") => {
    if (onFeedback) {
      onFeedback(feedback);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Message actions"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${
            position === "right" ? "right-0" : "left-0"
          } top-8 z-20 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1`}
          role="menu"
        >
          {/* Copy Action */}
          <button
            onClick={handleCopy}
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
            role="menuitem"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy message"}
          </button>

          {/* Regenerate Action (Future) */}
          {onRegenerate && (
            <button
              onClick={handleRegenerate}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
              role="menuitem"
            >
              <RotateCw className="w-4 h-4" />
              Regenerate
            </button>
          )}

          {/* Feedback Actions (Future) */}
          {onFeedback && (
            <>
              <div className="border-t border-gray-200 my-1" />
              <button
                onClick={() => handleFeedback("positive")}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                role="menuitem"
              >
                <ThumbsUp className="w-4 h-4" />
                Helpful
              </button>
              <button
                onClick={() => handleFeedback("negative")}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                role="menuitem"
              >
                <ThumbsDown className="w-4 h-4" />
                Not helpful
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
