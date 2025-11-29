export type SourceType = "resume" | "jd";

export interface Session {
  sessionId: string;
  expiresAt: number; // Unix timestamp
  sourceType: SourceType | null;
  createdAt: number; // Unix timestamp
}

export interface SessionState {
  sessionId: string | null;
  expiresAt: number | null;
  sourceType: SourceType | null;
  createdAt: number | null;
  isActive: boolean;
  timeRemaining: number; // milliseconds
}

