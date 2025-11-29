"use client";

import { useState } from "react";
import { useDocumentStore } from "@/stores/documentStore";
import { useDocumentProcessor } from "./useDocumentProcessor";
import { documentService } from "@/services";
import { useSession } from "./useSession";
import { SourceType } from "@/types";

export function useDocumentUpload(sourceType: SourceType) {
  const {
    file,
    status,
    progress,
    setFile,
    setStatus,
    setProgress,
    setRawText,
    setError,
    reset,
  } = useDocumentStore();

  const { processFile, processText, isProcessing, error: processorError } =
    useDocumentProcessor();
  const { sessionId, createSession } = useSession();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    try {
      setFile(selectedFile);
      setStatus("extracting");
      setProgress(0);

      // Extract text
      const text = await processFile(selectedFile);
      setRawText(text);
      setProgress(50);

      // Ensure session exists - use the sourceType from props
      let currentSessionId = sessionId;
      if (!currentSessionId) {
        currentSessionId = await createSession(sourceType);
      }

      if (!currentSessionId) {
        throw new Error("Session is required for document upload");
      }

      // Upload to server
      setStatus("chunking");
      setProgress(75);

      const response = await documentService.uploadDocument({
        sessionId: currentSessionId,
        text,
        sourceType: sourceType,
      });

      // Note: Chunks are stored server-side in the session
      // We just track the count here
      setProgress(100);

      setStatus("ready");
      setProgress(100);
      setUploadError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload document";
      setError(errorMessage);
      setUploadError(errorMessage);
    }
  };

  const handleTextPaste = async (text: string, pasteSourceType: SourceType) => {
    try {
      setStatus("extracting");
      setProgress(0);

      const cleanedText = processText(text);
      setRawText(cleanedText);
      setProgress(50);

      // Ensure session exists
      let currentSessionId = sessionId;
      if (!currentSessionId) {
        currentSessionId = await createSession(pasteSourceType);
      }

      if (!currentSessionId) {
        throw new Error("Session is required for document upload");
      }

      // Upload to server
      setStatus("chunking");
      setProgress(75);

      const response = await documentService.uploadDocument({
        sessionId: currentSessionId,
        text: cleanedText,
        sourceType: pasteSourceType,
      });

      // Note: Chunks are stored server-side in the session
      // We just track the count here
      setProgress(100);

      setStatus("ready");
      setProgress(100);
      setUploadError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to process text";
      setError(errorMessage);
      setUploadError(errorMessage);
    }
  };

  return {
    file,
    status,
    progress,
    isProcessing,
    error: uploadError || processorError,
    handleFileSelect,
    handleTextPaste,
    reset,
  };
}

