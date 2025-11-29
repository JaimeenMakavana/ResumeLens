"use client";

import { useState } from "react";
import {
  extractTextFromPDF,
  extractTextFromDOCX,
  cleanText,
} from "@/lib/document-processors";
import { FileType } from "@/types";

export function useDocumentProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = async (file: File): Promise<string> => {
    setIsProcessing(true);
    setError(null);

    try {
      let text = "";
      const fileType = file.type;

      if (fileType === "application/pdf") {
        text = await extractTextFromPDF(file);
      } else if (
        fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        text = await extractTextFromDOCX(file);
      } else if (fileType === "text/plain") {
        text = await file.text();
      } else {
        throw new Error("Unsupported file type");
      }

      // Clean the extracted text
      const cleanedText = cleanText(text);
      return cleanedText;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to process document";
      setError(errorMessage);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  const processText = (text: string): string => {
    return cleanText(text);
  };

  return {
    processFile,
    processText,
    isProcessing,
    error,
  };
}

