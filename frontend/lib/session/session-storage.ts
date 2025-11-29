/**
 * Session storage utilities using localStorage.
 * Only stores sessionId, not sensitive data.
 */

const SESSION_STORAGE_KEY = "resumelens_session_id";

export const sessionStorage = {
  getSessionId(): string | null {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(SESSION_STORAGE_KEY);
    } catch {
      return null;
    }
  },

  setSessionId(sessionId: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    } catch {
      // Ignore storage errors
    }
  },

  clearSessionId(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  },
};

