import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { SourceType, SessionState } from "@/types";

interface SessionStore extends SessionState {
  // Actions
  createSession: (sourceType: SourceType) => Promise<string>;
  clearSession: () => void;
  updateSession: (session: Partial<SessionState>) => void;
  isExpired: () => boolean;
}

export const useSessionStore = create<SessionStore>()(
  devtools(
    (set, get) => ({
      sessionId: null,
      expiresAt: null,
      sourceType: null,
      createdAt: null,
      isActive: false,
      timeRemaining: 0,

      createSession: async (sourceType: SourceType) => {
        try {
          const response = await fetch("/api/session/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sourceType }),
          });

          if (!response.ok) {
            // Try to get error message from response
            let errorMessage = "Failed to create session";
            try {
              const errorData = await response.json();
              errorMessage = errorData.error || errorData.detail || errorMessage;
            } catch {
              // If response is not JSON, use status text
              errorMessage = `${errorMessage}: ${response.status} ${response.statusText}`;
            }
            
            // Enhance error message for network/connection issues
            if (
              errorMessage.includes("connect") ||
              errorMessage.includes("Python service") ||
              errorMessage.includes("ECONNREFUSED")
            ) {
              errorMessage = `${errorMessage}\n\nTo fix this:\n1. Navigate to the python-service directory\n2. Activate the virtual environment\n3. Run: uvicorn app.main:app --reload`;
            }
            
            throw new Error(errorMessage);
          }

          const data = await response.json();
          const sessionId = data.sessionId;
          const expiresAt = new Date(data.expiresAt).getTime();
          const createdAt = new Date(data.createdAt).getTime();

          set({
            sessionId,
            expiresAt,
            sourceType,
            createdAt,
            isActive: true,
            timeRemaining: expiresAt - Date.now(),
          });

          return sessionId;
        } catch (error) {
          console.error("Failed to create session:", error);
          
          // Re-throw with enhanced context for network errors
          if (error instanceof Error) {
            // Check if it's a fetch/network error
            if (
              error.message.includes("fetch") ||
              error.message.includes("Failed to fetch") ||
              error.message.includes("network")
            ) {
              throw new Error(
                `Cannot connect to Python service. Please ensure it's running on port 8000.\n\nError: ${error.message}`
              );
            }
          }
          
          throw error;
        }
      },

      clearSession: () => {
        const { sessionId } = get();
        if (sessionId) {
          // Call delete API
          fetch(`/api/session/${sessionId}`, { method: "DELETE" }).catch(
            console.error
          );
        }
        set({
          sessionId: null,
          expiresAt: null,
          sourceType: null,
          createdAt: null,
          isActive: false,
          timeRemaining: 0,
        });
      },

      updateSession: (session: Partial<SessionState>) => {
        set((state) => ({
          ...state,
          ...session,
          isActive:
            session.expiresAt !== undefined
              ? Date.now() < session.expiresAt
              : state.isActive,
          timeRemaining:
            session.expiresAt !== undefined
              ? Math.max(0, session.expiresAt - Date.now())
              : state.timeRemaining,
        }));
      },

      isExpired: () => {
        const { expiresAt } = get();
        return expiresAt ? Date.now() > expiresAt : true;
      },
    }),
    { name: "SessionStore" }
  )
);

