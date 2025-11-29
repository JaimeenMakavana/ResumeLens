import { Session } from "@/types";

/**
 * Validates session data and expiration.
 */
export function isSessionExpired(session: Session | null): boolean {
  if (!session || !session.expiresAt) return true;
  return Date.now() > session.expiresAt;
}

export function isSessionActive(session: Session | null): boolean {
  return !isSessionExpired(session);
}

export function getTimeRemaining(session: Session | null): number {
  if (!session || !session.expiresAt) return 0;
  const remaining = session.expiresAt - Date.now();
  return Math.max(0, remaining);
}

