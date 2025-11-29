"use client";

import { useState } from "react";

import { ChatContainer } from "@/components/chat";
import { DocumentPreview, DocumentUpload } from "@/components/document-upload";
import { Card } from "@/components/ui";
import { SessionStatus, ClearSessionButton } from "@/components/session";
import { useSession } from "@/hooks/useSession";
import { useDocumentStore } from "@/stores/documentStore";
import { useChatStore } from "@/stores/chatStore";
import { SourceType } from "@/types";

type ActiveRole = "recruiter" | "jobSeeker";

const roleToSourceType: Record<ActiveRole, SourceType> = {
  recruiter: "resume",
  jobSeeker: "jd",
};

const recruiterQuickSuggestions = [
  "Summarize this candidate",
  "What are the candidate's top 3 strengths?",
  "How well does this candidate fit a frontend role?",
];

const jobSeekerQuickSuggestions = [
  "Summarize this job description",
  "List the key required skills",
  "How well does my resume match this JD?",
];

const recruiterTiles = [
  {
    title: "Skill fit",
    description: "Ask about the candidate's skills and tech stack fit.",
    prompt: "Assess this candidate's skills and tech stack fit.",
  },
  {
    title: "Experience summary",
    description: "Get a quick overview of work history and impact.",
    prompt: "Summarize this candidate's experience and key achievements.",
  },
  {
    title: "Role alignment",
    description: "Check how well they match an open role.",
    prompt:
      "How well does this candidate align with a senior frontend engineer role?",
  },
  {
    title: "Risks & concerns",
    description: "Surface potential gaps or red flags.",
    prompt:
      "What potential risks or gaps should I consider for this candidate?",
  },
];

const jobSeekerTiles = [
  {
    title: "Requirements summary",
    description: "Understand what this role is really asking for.",
    prompt: "Summarize the key requirements for this role.",
  },
  {
    title: "Skills checklist",
    description: "Extract the must‑have and nice‑to‑have skills.",
    prompt:
      "List the must-have and nice-to-have skills from this job description.",
  },
  {
    title: "Resume match",
    description: "See how well your resume matches the JD.",
    prompt:
      "How well does my resume match this job description? Highlight strengths and gaps.",
  },
  {
    title: "Talking points",
    description: "Generate questions to ask in an interview.",
    prompt:
      "Suggest 5 thoughtful questions I could ask in an interview for this role.",
  },
];

function dispatchSuggestedQuestion(question: string): void {
  if (typeof window === "undefined") return;

  const event = new CustomEvent("suggested-question-selected", {
    detail: { question },
  });
  window.dispatchEvent(event);
}

export default function HomePage() {
  const [activeRole, setActiveRole] = useState<ActiveRole>("recruiter");

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

  const quickSuggestions =
    activeRole === "recruiter"
      ? recruiterQuickSuggestions
      : jobSeekerQuickSuggestions;

  const tiles = activeRole === "recruiter" ? recruiterTiles : jobSeekerTiles;

  return (
    <main className="min-h-screen relative overflow-hidden bg-linear-to-br from-blue-500 via-blue-400 to-indigo-500">
      {/* Background shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-blue-300/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-indigo-300/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-64 w-64 -translate-y-1/2 rounded-3xl bg-purple-300/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 md:px-6 lg:px-8 lg:py-10">
        {/* Top hero + session controls */}
        <header className="mb-6 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
            <SessionStatus />
            <span className="h-4 w-px bg-white/30" />
            <ClearSessionButton />
          </div>
        </header>

        {/* Main two-column layout */}
        <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2.5fr)]">
          {/* Left: Chat card */}
          <section className="flex flex-col">
            <div className="flex flex-1 flex-col rounded-3xl border border-white/40 bg-white/90 shadow-[0_22px_60px_rgba(15,23,42,0.28)] backdrop-blur-2xl">
              {/* Role toggle */}
              <div className="flex items-center justify-between border-b border-blue-100/70 px-6 py-4">
                <div className="inline-flex items-center rounded-full bg-blue-50 p-1">
                  <button
                    type="button"
                    onClick={() => handleRoleChange("recruiter")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                      activeRole === "recruiter"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    Recruiter
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange("jobSeeker")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                      activeRole === "jobSeeker"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    Job Seeker
                  </button>
                </div>

                <p className="hidden text-xs text-blue-900/70 md:block">
                  {activeRole === "recruiter"
                    ? "Upload a candidate resume, then ask tailored questions."
                    : "Paste a job description and explore fit and skills."}
                </p>
              </div>

              {/* Chat container */}
              <div className="flex flex-1 flex-col p-3 pb-0 sm:p-4">
                <div className="flex-1 overflow-hidden rounded-2xl border border-blue-50 bg-white">
                  <ChatContainer showHeader={true} />
                </div>

                {/* Quick suggestions row */}
                <div className="mt-3 mb-4 flex flex-wrap gap-2">
                  {quickSuggestions.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        ensureSessionForCurrentRole();
                        dispatchSuggestedQuestion(label);
                      }}
                      className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-100"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Right: Document upload + suggestion tiles */}
          <aside className="flex flex-col gap-4">
            {/* Document upload card */}
            <Card className="rounded-3xl border-white/70 bg-white/95 shadow-lg backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    {activeRole === "recruiter"
                      ? "Upload a resume"
                      : "Paste a job description"}
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Client-side extraction, in-memory RAG. Nothing is stored.
                  </p>
                </div>
              </div>

              <div
                onMouseEnter={ensureSessionForCurrentRole}
                className="space-y-4"
              >
                <DocumentUpload
                  sourceType={sourceType}
                  showTextPaste={activeRole === "jobSeeker"}
                />

                {hasDocument && <DocumentPreview />}
              </div>
            </Card>

            {/* Suggestion tiles */}
            <div className="grid grid-cols-2 gap-3">
              {tiles.map((tile) => (
                <Card
                  key={tile.title}
                  variant="interactive"
                  className="rounded-2xl border-blue-100/80 bg-white/95 text-left shadow-md hover:border-blue-300 hover:shadow-lg"
                  onClick={() => {
                    ensureSessionForCurrentRole();
                    dispatchSuggestedQuestion(tile.prompt);
                  }}
                >
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">
                    {tile.title}
                  </h3>
                  <p className="text-xs text-gray-600">{tile.description}</p>
                </Card>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
