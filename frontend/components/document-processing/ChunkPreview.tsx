"use client";

import { Card } from "@/components/ui";
import { useDocumentStore } from "@/stores/documentStore";

export function ChunkPreview() {
  const { chunks } = useDocumentStore();

  if (!chunks || chunks.length === 0) {
    return null;
  }

  return (
    <Card variant="outlined" className="mt-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">
        Chunks ({chunks.length})
      </h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {chunks.slice(0, 5).map((chunk, index) => (
          <div key={chunk.id} className="p-2 bg-gray-50 rounded text-xs">
            <div className="font-medium mb-1">Chunk {index + 1}</div>
            <div className="text-gray-600 truncate">{chunk.text}</div>
          </div>
        ))}
        {chunks.length > 5 && (
          <p className="text-xs text-gray-500">
            ... and {chunks.length - 5} more chunks
          </p>
        )}
      </div>
    </Card>
  );
}

