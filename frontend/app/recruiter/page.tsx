"use client";

import { DocumentUpload, DocumentPreview } from "@/components/document-upload";
import { PageHeader } from "@/components/layout";
import { useSession } from "@/hooks/useSession";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDocumentStore } from "@/stores/documentStore";

export default function RecruiterUploadPage() {
  const { createSession, sessionId } = useSession();
  const { status, fileName, rawText } = useDocumentStore();
  const router = useRouter();
  const hasDocument = !!fileName || !!rawText;

  useEffect(() => {
    if (!sessionId) {
      createSession("resume");
    }
  }, [sessionId, createSession]);

  useEffect(() => {
    if (status === "ready") {
      router.push("/recruiter/chat");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        <PageHeader title="Recruiter Mode" />

        <div
          className={`grid gap-6 ${
            hasDocument ? "grid-cols-1 lg:grid-cols-[2fr,1fr]" : "grid-cols-1"
          }`}
        >
          {/* Left Panel - Upload Resume */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Upload Resume
            </h2>
            <DocumentUpload sourceType="resume" />
          </div>

          {/* Right Panel - Document Preview (only show when document exists) */}
          {hasDocument && (
            <div className="lg:sticky lg:top-6 lg:h-fit">
              <DocumentPreview />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
