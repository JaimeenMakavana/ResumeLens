"use client";

import React from "react";
import { SessionStatus, ClearSessionButton } from "@/components/session";
import { Button } from "@/components/ui";
import { MessageSquare } from "@/components/ui/icons";

interface ChatHeaderProps {
  title: string;
  icon?: React.ReactNode;
  showSessionStatus?: boolean;
  sourceType?: "resume" | "jd";
}

/**
 * ChatHeader component provides an integrated header within the chat container
 * with session status, title, and action buttons.
 */
export function ChatHeader({
  title,
  icon,
  showSessionStatus = true,
  sourceType,
}: ChatHeaderProps) {
  const defaultIcon = icon || <MessageSquare className="w-5 h-5" />;

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left: Title and Icon */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600">
            {defaultIcon}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {sourceType && (
              <p className="text-xs text-gray-500 capitalize">
                {sourceType === "resume"
                  ? "Resume Analysis"
                  : "Job Description"}
              </p>
            )}
          </div>
        </div>

        {/* Right: Session Status and Actions */}
        <div className="flex items-center gap-4">
          {showSessionStatus && (
            <>
              <SessionStatus />
              <ClearSessionButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
