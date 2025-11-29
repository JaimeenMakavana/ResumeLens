import { config } from "@/lib/constants";

const API_BASE = config.pythonServiceUrl;
const NEXT_API_BASE = config.apiUrl;

export const endpoints = {
  // Next.js API Routes
  session: {
    create: `${NEXT_API_BASE}/api/session/create`,
    upload: `${NEXT_API_BASE}/api/session/upload`,
    embed: `${NEXT_API_BASE}/api/session/embed`,
    chat: `${NEXT_API_BASE}/api/session/chat`,
    delete: (sessionId: string) =>
      `${NEXT_API_BASE}/api/session/${sessionId}`,
  },
  // Python Service Direct (if needed)
  python: {
    chunk: `${API_BASE}/api/chunk`,
    embed: `${API_BASE}/api/embed`,
    search: `${API_BASE}/api/search`,
    rag: `${API_BASE}/api/rag/chat`,
  },
} as const;

