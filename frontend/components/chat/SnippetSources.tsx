"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui";
import { ChevronDown, ChevronUp, FileText, Link2 } from "@/components/ui/icons";
import { useDocumentStore } from "@/stores/documentStore";

interface SnippetSourcesProps {
  sources: string[];
  chunks?: any[]; // Chunk data with text preview
}

/**
 * Enhanced SnippetSources component with modern card design,
 * smooth expand/collapse animation, and better visual hierarchy.
 */
export function SnippetSources({ sources, chunks }: SnippetSourcesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const documentChunks = useDocumentStore((state) => state.chunks);

  if (!sources || sources.length === 0) {
    return null;
  }

  // Try to get chunk text from document store or provided chunks
  const getChunkText = (sourceId: string): string | null => {
    if (chunks) {
      const chunk = chunks.find((c) => c.id === sourceId);
      return chunk?.text || null;
    }
    if (documentChunks) {
      const chunk = documentChunks.find((c) => c.id === sourceId);
      return chunk?.text || null;
    }
    return null;
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between text-left group"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? "Hide" : "Show"} ${sources.length} source${
          sources.length > 1 ? "s" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
          <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
            {sources.length} source{sources.length > 1 ? "s" : ""} used
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-2 animate-fade-in">
          {sources.map((sourceId, index) => {
            const chunkText = getChunkText(sourceId);
            const displayText = chunkText
              ? chunkText.length > 200
                ? `${chunkText.substring(0, 200)}...`
                : chunkText
              : null;

            return (
              <Card
                key={sourceId}
                variant="outlined"
                className="p-3 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs font-medium text-gray-700">
                        Source {index + 1}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 font-mono">
                        {sourceId.substring(0, 8)}...
                      </span>
                    </div>
                    {displayText && (
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {displayText}
                      </p>
                    )}
                    {!displayText && (
                      <p className="text-xs text-gray-500 italic">
                        Preview not available
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
