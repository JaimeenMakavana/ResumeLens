"use client";

import { LoadingSpinner } from "@/components/ui";
import { useDocumentStore } from "@/stores/documentStore";

export function ProcessingStatus() {
  const { status, progress, error } = useDocumentStore();

  if (status === "idle") {
    return null;
  }

  const statusMessages = {
    extracting: "Extracting text from document...",
    chunking: "Creating text chunks...",
    embedding: "Generating embeddings...",
    ready: "Document processed successfully!",
    error: error || "An error occurred",
  };

  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
      <div className="flex items-center gap-3">
        {status !== "ready" && status !== "error" && (
          <LoadingSpinner size="sm" />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700">
            {statusMessages[status]}
          </p>
          {status !== "ready" && status !== "error" && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

