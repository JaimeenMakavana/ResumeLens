"use client";

import React from "react";
import {
  Sparkles,
  FileText,
  Briefcase,
  Search,
  MessageSquare,
} from "@/components/ui/icons";
import { Card } from "@/components/ui";

interface SuggestedQuestion {
  id: string;
  text: string;
  icon?: React.ReactNode;
}

interface EmptyStateProps {
  sourceType?: "resume" | "jd";
  onSelectQuestion?: (question: string) => void;
}

/**
 * EmptyState component displays an engaging empty state with suggested questions
 * to guide users on how to interact with the chat interface.
 */
export function EmptyState({
  sourceType = "resume",
  onSelectQuestion,
}: EmptyStateProps) {
  const recruiterQuestions: SuggestedQuestion[] = [
    {
      id: "1",
      text: "What are the candidate's key skills and experience?",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: "2",
      text: "Does the candidate have experience with React?",
      icon: <Search className="w-4 h-4" />,
    },
    {
      id: "3",
      text: "What is the candidate's educational background?",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "4",
      text: "Summarize the candidate's work history",
      icon: <Sparkles className="w-4 h-4" />,
    },
  ];

  const jobSeekerQuestions: SuggestedQuestion[] = [
    {
      id: "1",
      text: "What are the key required skills for this role?",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: "2",
      text: "What is the expected experience level?",
      icon: <Search className="w-4 h-4" />,
    },
    {
      id: "3",
      text: "What are the main responsibilities?",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "4",
      text: "Summarize the job requirements",
      icon: <Sparkles className="w-4 h-4" />,
    },
  ];

  const questions =
    sourceType === "resume" ? recruiterQuestions : jobSeekerQuestions;
  const title =
    sourceType === "resume"
      ? "Start analyzing the resume"
      : "Start analyzing the job description";
  const description =
    sourceType === "resume"
      ? "Ask questions about the candidate's qualifications, experience, and skills."
      : "Ask questions about the job requirements, skills needed, and responsibilities.";

  const handleQuestionClick = (question: string) => {
    if (onSelectQuestion) {
      onSelectQuestion(question);
    }
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-2xl w-full mx-auto text-center">
        <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
        {/* Suggested Questions */}
        <div className="grid grid-cols-1 gap-3">
          {questions.map((question) => (
            <button
              key={question.id}
              type="button"
              className="w-full text-left 
                rounded-lg 
                border border-[var(--border-subtle)] 
                bg-[var(--neutral-100)] 
                p-4 
                text-[var(--text-secondary)]
                hover:shadow-[var(--shadow-sm)]
                hover:border-[var(--border-default)]
                hover:bg-[var(--neutral-50)]
                transition-all duration-200 ease-in-out
                focus:outline-none 
                focus:ring-2 
                focus:ring-[var(--border-default)]
                focus:ring-offset-2"
              onClick={() => handleQuestionClick(question.text)}
            >
              <div className="flex items-start gap-3">
                {question.icon && (
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg 
                    bg-[var(--neutral-200)] 
                    flex items-center justify-center 
                    text-[var(--text-secondary)] 
                    mt-0.5"
                  >
                    {question.icon}
                  </div>
                )}
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                  {question.text}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
