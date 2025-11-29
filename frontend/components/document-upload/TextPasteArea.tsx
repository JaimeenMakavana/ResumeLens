"use client";

import { useState } from "react";
import { Input } from "@/components/ui";

interface TextPasteAreaProps {
  onTextSubmit: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function TextPasteArea({
  onTextSubmit,
  disabled = false,
  placeholder = "Paste job description here...",
}: TextPasteAreaProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim() && !disabled) {
      onTextSubmit(text.trim());
      setText("");
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            handleSubmit();
          }
        }}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors min-h-[200px] resize-y"
        rows={10}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !text.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Process Text
      </button>
    </div>
  );
}

