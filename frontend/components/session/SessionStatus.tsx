"use client";

import { useSession } from "@/hooks/useSession";

export function SessionStatus() {
  const { isActive, timeRemaining, sessionId } = useSession();

  if (!sessionId) {
    return (
      <div className="text-sm text-gray-500">
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          No active session
        </span>
      </div>
    );
  }

  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return (
    <div className="text-sm">
      <span
        className={`inline-flex items-center gap-1 ${
          isActive ? "text-green-600 font-medium" : "text-red-600"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isActive ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        {isActive
          ? `Active • ${minutes}m ${formattedSeconds}s remaining`
          : "Expired"}
      </span>
    </div>
  );
}

