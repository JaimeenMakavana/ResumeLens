"use client";

import { Card } from "@/components/ui";
import { useDocumentStore } from "@/stores/documentStore";

export function DocumentPreview() {
  const { fileName, fileType, rawText } = useDocumentStore();

  if (!fileName && !rawText) {
    return null;
  }

  return (
    <Card variant="outlined" className="mt-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">
        Document Preview
      </h3>
      {fileName && (
        <p className="text-xs text-gray-500 mb-2">
          {fileName} ({fileType?.toUpperCase()})
        </p>
      )}
      {rawText && (
        <div className="max-h-48 overflow-y-auto p-3 bg-gray-50 rounded text-sm text-gray-700">
          <pre className="whitespace-pre-wrap font-sans">
            {rawText.substring(0, 500)}
            {rawText.length > 500 ? "..." : ""}
          </pre>
        </div>
      )}
    </Card>
  );
}

