"use client";

import { ChatContainer } from "@/components/chat";
import { useDocumentStore } from "@/stores/documentStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Job Seeker Chat Page - V2 Redesign
 *
 * Enhanced layout with better spacing, full-height container,
 * and improved responsive design.
 */
export default function JobSeekerChatPage() {
  const { status } = useDocumentStore();
  const router = useRouter();

  useEffect(() => {
    if (status !== "ready") {
      router.push("/job-seeker");
    }
  }, [status, router]);

  return (
    <div className="h-[calc(100vh-80px)] p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto h-full">
        <ChatContainer showHeader={true} />
      </div>
    </div>
  );
}
