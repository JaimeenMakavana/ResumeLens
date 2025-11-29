"use client";

import { SessionStatus } from "@/components/session/SessionStatus";
import { ClearSessionButton } from "@/components/session/ClearSessionButton";

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div className="flex items-center gap-4">
        <SessionStatus />
        <ClearSessionButton />
      </div>
    </div>
  );
}

