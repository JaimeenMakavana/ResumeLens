import { useEffect } from "react";
import { useSessionStore } from "@/stores/sessionStore";
import { sessionStorage } from "@/lib/session";
import { SourceType } from "@/types";

export function useSession() {
  const {
    sessionId,
    expiresAt,
    sourceType,
    isActive,
    timeRemaining,
    createSession,
    clearSession,
    isExpired,
  } = useSessionStore();

  // Check session expiration on mount
  useEffect(() => {
    if (sessionId && isExpired()) {
      clearSession();
    }
  }, [sessionId, isExpired, clearSession]);

  // Update time remaining periodically
  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const remaining = expiresAt - Date.now();
      if (remaining <= 0) {
        clearSession();
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [expiresAt, clearSession]);

  // Load session from storage on mount
  useEffect(() => {
    const storedSessionId = sessionStorage.getSessionId();
    if (storedSessionId && !sessionId) {
      // Session ID exists in storage but not in store
      // This could happen on page refresh
      // We'll need to validate it with the server
    }
  }, [sessionId]);

  const handleCreateSession = async (sourceType: SourceType) => {
    const newSessionId = await createSession(sourceType);
    sessionStorage.setSessionId(newSessionId);
    return newSessionId;
  };

  const handleClearSession = () => {
    clearSession();
    sessionStorage.clearSessionId();
  };

  return {
    sessionId,
    sourceType,
    isActive,
    timeRemaining,
    createSession: handleCreateSession,
    clearSession: handleClearSession,
  };
}

