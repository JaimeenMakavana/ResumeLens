"use client";

import { SourceType } from "@/types";

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  sourceType: SourceType;
  onSelect: (sourceType: SourceType) => void;
}

export function RoleCard({
  title,
  description,
  icon,
  sourceType,
  onSelect,
}: RoleCardProps) {
  return (
    <div
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
      onClick={() => onSelect(sourceType)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(sourceType);
        }
      }}
      aria-label={`Select ${title} role`}
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center justify-center mb-2">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

