"use client";

import { FileDropzone } from "./FileDropzone";
import { TextPasteArea } from "./TextPasteArea";
import { DocumentPreview } from "./DocumentPreview";
import { ProcessingStatus } from "../document-processing/ProcessingStatus";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import { useDocumentStore } from "@/stores/documentStore";
import { SourceType } from "@/types";

interface DocumentUploadProps {
  sourceType: SourceType;
  showTextPaste?: boolean;
}

export function DocumentUpload({
  sourceType,
  showTextPaste = false,
}: DocumentUploadProps) {
  const { handleFileSelect, handleTextPaste, isProcessing, error } =
    useDocumentUpload(sourceType);
  const { status } = useDocumentStore();

  return (
    <div className="space-y-4">
      {!showTextPaste ? (
        <FileDropzone
          onFileSelect={handleFileSelect}
          disabled={isProcessing || status !== "idle"}
        />
      ) : (
        <TextPasteArea
          onTextSubmit={(text) => handleTextPaste(text, sourceType)}
          disabled={isProcessing || status !== "idle"}
        />
      )}

      <ProcessingStatus />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <DocumentPreview />
    </div>
  );
}

