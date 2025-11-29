export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  chunksUsed?: string[]; // Chunk IDs referenced
  confidence?: number;
}

export interface ChatState {
  messages: Message[];
  isStreaming: boolean;
  currentQuery: string;
  error: string | null;
  retrievedChunks: any[] | null; // Will be typed properly later
  confidence: number | null;
  inputDisabled: boolean;
}

export interface RAGResponse {
  answer: string;
  sources: string[]; // Chunk IDs
  confidence: number;
}

