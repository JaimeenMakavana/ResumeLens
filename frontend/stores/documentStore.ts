import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DocumentState, FileType, Chunk } from "@/types";

interface DocumentStore extends DocumentState {
  // Actions
  setFile: (file: File | null) => void;
  setStatus: (status: DocumentState["status"]) => void;
  setProgress: (progress: number) => void;
  setRawText: (text: string | null) => void;
  setChunks: (chunks: Chunk[] | null) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: DocumentState = {
  file: null,
  fileName: null,
  fileType: null,
  status: "idle",
  progress: 0,
  rawText: null,
  chunks: null,
  chunkCount: 0,
  uploadDate: null,
  processingTime: null,
  error: null,
};

export const useDocumentStore = create<DocumentStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setFile: (file) => {
        const fileType: FileType | null = file
          ? (file.type === "application/pdf"
              ? "pdf"
              : file.type.includes("wordprocessingml")
                ? "docx"
                : "text")
          : null;

        set({
          file,
          fileName: file?.name || null,
          fileType,
          uploadDate: file ? Date.now() : null,
        });
      },

      setStatus: (status) => {
        set({ status });
      },

      setProgress: (progress) => {
        set({ progress });
      },

      setRawText: (text) => {
        set({ rawText: text });
      },

      setChunks: (chunks) => {
        set({
          chunks,
          chunkCount: chunks?.length || 0,
        });
      },

      setError: (error) => {
        set({ error, status: "error" });
      },

      reset: () => {
        set(initialState);
      },
    }),
    { name: "DocumentStore" }
  )
);

