"use client";

import { Card } from "@/components/ui";
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
    <Card
      variant="interactive"
      className="text-center"
      onClick={() => onSelect(sourceType)}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Card>
  );
}

