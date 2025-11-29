"use client";

import { useState } from "react";

import { ChatContainer } from "@/components/chat";
import { DocumentPreview, DocumentUpload } from "@/components/document-upload";
import { Card } from "@/components/ui";
import { SessionStatus, ClearSessionButton } from "@/components/session";
import { MessageSquare } from "@/components/ui/icons";
import { useSession } from "@/hooks/useSession";
import { useDocumentStore } from "@/stores/documentStore";
import { useChatStore } from "@/stores/chatStore";
import { SourceType } from "@/types";

type ActiveRole = "recruiter" | "jobSeeker";

const roleToSourceType: Record<ActiveRole, SourceType> = {
  recruiter: "resume",
  jobSeeker: "jd",
};

export default function HomePage() {
  const [activeRole, setActiveRole] = useState<ActiveRole>("recruiter");
  const [isSessionPanelOpen, setIsSessionPanelOpen] = useState(false);

  const { sessionId, createSession, clearSession } = useSession();
  const resetDocument = useDocumentStore((state) => state.reset);
  const resetChat = useChatStore((state) => state.reset);
  const hasDocument = useDocumentStore(
    (state) => !!state.fileName || !!state.rawText
  );

  const sourceType = roleToSourceType[activeRole];

  const handleRoleChange = async (role: ActiveRole) => {
    if (role === activeRole) return;

    // Clear existing session and in-memory state when switching roles
    if (sessionId) {
      clearSession();
    }
    resetDocument();
    resetChat();

    setActiveRole(role);
    await createSession(roleToSourceType[role]);
  };

  const ensureSessionForCurrentRole = async () => {
    if (!sessionId) {
      await createSession(sourceType);
    }
  };

  return (
    <main className="relative h-dvh overflow-hidden bg-[var(--bg-base)]">
      {/* Floating session management - compact icon that opens a small panel */}
      <div className="pointer-events-none fixed right-4 top-4 z-20 flex justify-end">
        <div className="pointer-events-auto relative">
          <button
            type="button"
            onClick={() => setIsSessionPanelOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full 
              border border-[var(--border-subtle)] 
              bg-[var(--bg-elevated)] 
              text-[var(--text-primary)] 
              shadow-[var(--shadow-sm)] 
              transition-all duration-200 ease-in-out
              hover:bg-[var(--neutral-50)] 
              hover:shadow-[var(--shadow-md)]
              focus:outline-none 
              focus:ring-2 
              focus:ring-[var(--border-default)] 
              focus:ring-offset-2"
            aria-label="Open session controls"
          >
            <span className="relative inline-flex">
              <MessageSquare className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
            </span>
          </button>

          {isSessionPanelOpen && (
            <div
              className="absolute right-0 mt-2 w-64 rounded-2xl 
              border border-[var(--border-subtle)] 
              bg-[var(--bg-elevated)] 
              p-4 
              text-xs 
              text-[var(--text-primary)] 
              shadow-[var(--shadow-lg)] 
              backdrop-blur-xl"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="font-medium tracking-wide text-[var(--text-primary)]">
                  Session
                </p>
              </div>
              <div className="mb-4 text-[11px] leading-snug text-[var(--text-secondary)]">
                <SessionStatus />
              </div>
              <div className="flex justify-end">
                <ClearSessionButton />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Background shapes - Soft, subtle */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[var(--neutral-200)]/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-[var(--neutral-300)]/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-64 w-64 -translate-y-1/2 rounded-3xl bg-[var(--accent-blue-100)]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col px-14 py-4">
        {/* Main two-column layout */}
        <div className="grid flex-1 min-h-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2.5fr)]">
          {/* Left: Chat card */}
          <section className="flex min-h-0 flex-col">
            <div
              className="flex flex-1 min-h-0 flex-col rounded-3xl 
              border border-[var(--border-subtle)] 
              bg-[var(--bg-elevated)] 
              shadow-[var(--shadow-md)] 
              backdrop-blur-xl"
            >
              {/* Role toggle */}
              <div
                className="flex items-center justify-between 
                border-b border-[var(--border-subtle)] 
                px-6 py-3"
              >
                <div className="inline-flex items-center rounded-full bg-[var(--neutral-100)] p-1">
                  <button
                    type="button"
                    onClick={() => handleRoleChange("recruiter")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap 
                      transition-all duration-200 ease-in-out ${
                        activeRole === "recruiter"
                          ? "bg-[var(--accent-blue-500)] text-white shadow-[var(--shadow-sm)]"
                          : "text-[var(--text-primary)] hover:bg-[var(--neutral-200)]"
                      }`}
                  >
                    Recruiter
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange("jobSeeker")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap 
                      transition-all duration-200 ease-in-out ${
                        activeRole === "jobSeeker"
                          ? "bg-[var(--accent-blue-500)] text-white shadow-[var(--shadow-sm)]"
                          : "text-[var(--text-primary)] hover:bg-[var(--neutral-200)]"
                      }`}
                  >
                    Job Seeker
                  </button>
                </div>

                <p className="hidden text-xs text-[var(--text-secondary)] md:block">
                  {activeRole === "recruiter"
                    ? "Upload a candidate resume, then ask tailored questions."
                    : "Paste a job description and explore fit and skills."}
                </p>
              </div>

              {/* Chat container */}
              <div className="flex flex-1 min-h-0 flex-col p-3 pb-0 sm:p-4">
                <div className="flex-1 min-h-0">
                  <ChatContainer />
                </div>
              </div>
            </div>
          </section>

          {/* Right: Document upload */}
          <aside className="flex min-h-0 flex-col gap-4 lg:pr-1">
            {/* Document upload card */}
            <Card
              className="flex flex-1 min-h-0 flex-col rounded-3xl 
              border-[var(--border-subtle)] 
              bg-[var(--bg-elevated)] 
              shadow-[var(--shadow-md)] 
              backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-[var(--text-primary)]">
                    {activeRole === "recruiter"
                      ? "Upload a resume"
                      : "Paste a job description"}
                  </h2>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Client-side extraction, in-memory RAG. Nothing is stored.
                  </p>
                </div>
              </div>

              <div
                onMouseEnter={ensureSessionForCurrentRole}
                className="flex-1 min-h-0 space-y-4 overflow-y-auto pr-1"
              >
                <DocumentUpload
                  sourceType={sourceType}
                  showTextPaste={activeRole === "jobSeeker"}
                />

                {hasDocument && <DocumentPreview />}
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
