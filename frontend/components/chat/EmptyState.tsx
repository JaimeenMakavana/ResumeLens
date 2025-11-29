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
    <div className="flex items-center justify-center h-full px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100">
            <MessageSquare className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>

        {/* Suggested Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.map((question) => (
            <Card
              key={question.id}
              variant="interactive"
              className="text-left cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300"
              onClick={() => handleQuestionClick(question.text)}
            >
              <div className="flex items-start gap-3">
                {question.icon && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 mt-0.5">
                    {question.icon}
                  </div>
                )}
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  {question.text}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Hint */}
        <p className="text-xs text-gray-500 mt-6">
          Click a question above or type your own to get started
        </p>
      </div>
    </div>
  );
}
