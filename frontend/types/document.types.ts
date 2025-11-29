import { SourceType } from "./session.types";

export type FileType = "pdf" | "docx" | "text";

export type DocumentStatus =
  | "idle"
  | "extracting"
  | "chunking"
  | "embedding"
  | "ready"
  | "error";

export interface Chunk {
  id: string;
  text: string;
  index: number;
  metadata: {
    section?: string;
    pageNumber?: number;
    sourceType: SourceType;
  };
}

export interface DocumentState {
  file: File | null;
  fileName: string | null;
  fileType: FileType | null;
  status: DocumentStatus;
  progress: number; // 0-100
  rawText: string | null;
  chunks: Chunk[] | null;
  chunkCount: number;
  uploadDate: number | null;
  processingTime: number | null; // milliseconds
  error: string | null;
}

