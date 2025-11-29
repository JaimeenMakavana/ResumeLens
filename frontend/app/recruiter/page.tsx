"use client";

import { DocumentUpload } from "@/components/document-upload";
import { useSession } from "@/hooks/useSession";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDocumentStore } from "@/stores/documentStore";

export default function RecruiterUploadPage() {
  const { createSession, sessionId } = useSession();
  const { status } = useDocumentStore();
  const router = useRouter();

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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Upload Resume</h2>
      <DocumentUpload sourceType="resume" />
    </div>
  );
}

