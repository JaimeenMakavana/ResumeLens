"use client";

import { useRouter } from "next/navigation";
import { RoleCard } from "./RoleCard";
import { SourceType } from "@/types";
import { routes } from "@/lib/constants";
import { Briefcase3D, SearchWithData } from "@/components/ui/icons";

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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Gradient background with geometric shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 -z-10">
        {/* Subtle geometric shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-100 rounded-full opacity-15 blur-2xl"></div>
        {/* Abstract geometric shapes */}
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800"
        >
          <polygon points="0,100 200,50 300,150 100,200" fill="#60A5FA" />
          <polygon
            points="1200,300 1400,250 1440,350 1240,400"
            fill="#A78BFA"
          />
          <circle cx="400" cy="600" r="80" fill="#93C5FD" />
          <circle cx="1000" cy="100" r="60" fill="#C4B5FD" />
          <rect
            x="600"
            y="500"
            width="120"
            height="120"
            rx="20"
            fill="#818CF8"
            transform="rotate(45 660 560)"
          />
        </svg>
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
            onSelect={handleRoleSelect}
          />
          <RoleCard
            title="Job Seeker"
            description="Paste job descriptions and get insights and alignment"
            icon={<SearchWithData />}
            sourceType="jd"
            onSelect={handleRoleSelect}
          />
        </div>
      </div>
    </div>
  );
}
