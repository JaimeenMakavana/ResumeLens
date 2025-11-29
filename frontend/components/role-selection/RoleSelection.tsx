"use client";

import { useRouter } from "next/navigation";
import { RoleCard } from "./RoleCard";
import { SourceType } from "@/types";
import { routes } from "@/lib/constants";

export function RoleSelection() {
  const router = useRouter();

  const handleRoleSelect = (sourceType: SourceType) => {
    if (sourceType === "resume") {
      router.push(routes.recruiter.upload);
    } else {
      router.push(routes.jobSeeker.upload);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-2">ResumeLens</h1>
        <p className="text-center text-gray-600 mb-8">
          Ephemeral RAG-based conversational assistant
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RoleCard
            title="Recruiter"
            description="Upload candidate resumes and ask questions about candidates"
            icon="👔"
            sourceType="resume"
            onSelect={handleRoleSelect}
          />
          <RoleCard
            title="Job Seeker"
            description="Paste job descriptions and get insights and alignment"
            icon="🔍"
            sourceType="jd"
            onSelect={handleRoleSelect}
          />
        </div>
      </div>
    </div>
  );
}

