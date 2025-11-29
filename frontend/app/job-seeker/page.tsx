"use client";

import { DocumentUpload } from "@/components/document-upload";
import { useSession } from "@/hooks/useSession";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDocumentStore } from "@/stores/documentStore";

export default function JobSeekerUploadPage() {
  const { createSession, sessionId } = useSession();
  const { status } = useDocumentStore();
  const router = useRouter();

  useEffect(() => {
    if (!sessionId) {
      createSession("jd");
    }
  }, [sessionId, createSession]);

  useEffect(() => {
    if (status === "ready") {
      router.push("/job-seeker/chat");
    }
  }, [status, router]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Paste Job Description</h2>
      <DocumentUpload sourceType="jd" showTextPaste={true} />
    </div>
  );
}

