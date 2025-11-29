"use client";

import { LoadingSpinner } from "@/components/ui";
import { useDocumentStore } from "@/stores/documentStore";

export function ProcessingStatus() {
  const { status, progress, error, fileName, fileType } = useDocumentStore();

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
    <div className="mt-4 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200">
      <p className="text-sm font-medium text-gray-900 mb-3">
        {statusMessages[status]}
      </p>
      {status !== "ready" && status !== "error" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
              {progress}%
            </span>
          </div>
          {fileName && (
            <p className="text-sm text-gray-700">
              Processing {fileName} ({fileType?.toUpperCase()})
            </p>
          )}
        </div>
      )}
    </div>
  );
}

