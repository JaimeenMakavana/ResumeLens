"use client";

import { Briefcase3D, SearchWithData } from "@/components/ui/icons";
import { RoleCard } from "./RoleCard";

/**
 * Legacy role-selection style hero.
 * Currently unused in routing but kept as a design reference
 * for future iterations of the landing page.
 */
export function RoleSelection() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Gradient background with geometric shapes */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-blue-100 to-indigo-50 -z-10">
        {/* Subtle geometric shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-100 rounded-full opacity-15 blur-2xl" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-2 text-gray-900">
          ResumeLens
        </h1>
        <p className="text-center text-gray-600 mb-12 text-base md:text-lg">
          Ephemeral RAG-based conversational assistant
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RoleCard
            title="Recruiter"
            description="Upload candidate resumes and ask questions about candidates"
            icon={<Briefcase3D />}
            sourceType="resume"
          />
          <RoleCard
            title="Job Seeker"
            description="Paste job descriptions and get insights and alignment"
            icon={<SearchWithData />}
            sourceType="jd"
          />
        </div>
      </div>
    </div>
  );
}
