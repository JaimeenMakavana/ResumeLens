"use client";

import React from "react";
import { SessionStatus, ClearSessionButton } from "@/components/session";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Job Seeker Mode</h1>
          <div className="flex items-center gap-4">
            <SessionStatus />
            <ClearSessionButton />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

