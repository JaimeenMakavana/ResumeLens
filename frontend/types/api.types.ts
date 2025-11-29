import { SourceType } from "./session.types";
import { Chunk } from "./document.types";

export interface CreateSessionRequest {
  sourceType: SourceType;
}

export interface CreateSessionResponse {
  sessionId: string;
  expiresAt: number;
}

export interface UploadDocumentRequest {
  sessionId: string;
  text: string;
  sourceType: SourceType;
}

export interface UploadDocumentResponse {
  success: boolean;
  chunkCount: number;
}

export interface EmbedRequest {
  sessionId: string;
  chunks: Chunk[];
}

export interface EmbedResponse {
  success: boolean;
  embeddingCount: number;
}

export interface ChatRequest {
  sessionId: string;
  query: string;
  topK?: number;
}

export interface ChatResponse {
  answer: string;
  sources: string[];
  confidence: number;
}

export interface ErrorResponse {
  error: string;
  detail?: string;
  code?: string;
}

