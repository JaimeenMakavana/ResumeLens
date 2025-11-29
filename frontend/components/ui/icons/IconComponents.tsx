/**
 * Simple icon components as placeholders
 * TODO: Install lucide-react and replace these with proper icons
 * 
 * Run: npm install lucide-react
 */

import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export function MessageSquare({ className = "w-5 h-5", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

export function User({ className = "w-4 h-4", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

export function Bot({ className = "w-4 h-4", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

export function Send({ className = "w-4 h-4", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  );
}

export function Paperclip({ className = "w-5 h-5", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
      />
    </svg>
  );
}

export function Copy({ className = "w-4 h-4", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}

export function RotateCw({ className = "w-4 h-4", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

export function ThumbsUp({ className = "w-4 h-4", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
      />
    </svg>
  );
}

export function ThumbsDown({ className = "w-4 h-4", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
      />
    </svg>
  );
}

export function MoreVertical({ className = "w-4 h-4", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      />
    </svg>
  );
}

export function ChevronDown({ className = "w-4 h-4", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export function ChevronUp({ className = "w-4 h-4", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  );
}

export function FileText({ className = "w-5 h-5", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

export function Briefcase({ className = "w-5 h-5", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

export function Sparkles({ className = "w-4 h-4", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}

export function Search({ className = "w-4 h-4", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

export function Link2({ className = "w-4 h-4", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  );
}

// Custom 3D Briefcase icon with split blue/purple colors
export function Briefcase3D({ className = "w-24 h-24", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Briefcase body - left half - vibrant light blue */}
      <rect
        x="20"
        y="40"
        width="50"
        height="40"
        rx="4"
        fill="#60A5FA"
        stroke="#3B82F6"
        strokeWidth="2"
      />
      {/* Briefcase body - right half - rich purple */}
      <rect
        x="50"
        y="40"
        width="50"
        height="40"
        rx="4"
        fill="#A78BFA"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
      {/* White clasp in the middle */}
      <rect
        x="48"
        y="38"
        width="4"
        height="44"
        fill="#FFFFFF"
        stroke="#E5E7EB"
        strokeWidth="1"
        rx="1"
      />
      {/* Top handle - white */}
      <path
        d="M45 40 Q60 28 75 40"
        fill="white"
        stroke="#E5E7EB"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Inner handle arc */}
      <path
        d="M48 42 Q60 32 72 42"
        fill="none"
        stroke="#F3F4F6"
        strokeWidth="1.5"
      />
      {/* 3D perspective - left side shadow */}
      <polygon
        points="20,40 25,35 25,75 20,80"
        fill="#3B82F6"
        opacity="0.25"
      />
      {/* 3D perspective - top highlight */}
      <line
        x1="20"
        y1="40"
        x2="100"
        y2="40"
        stroke="#E0E7FF"
        strokeWidth="2"
        opacity="0.6"
      />
    </svg>
  );
}

// Custom Magnifying glass with data visualization elements
export function SearchWithData({ className = "w-24 h-24", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg
      className={sizeClass}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Magnifying glass circle - light grey lens */}
      <circle
        cx="50"
        cy="50"
        r="28"
        fill="#F3F4F6"
        stroke="#9CA3AF"
        strokeWidth="2.5"
      />
      {/* Lens inner highlight */}
      <circle
        cx="48"
        cy="48"
        r="12"
        fill="#E5E7EB"
        opacity="0.6"
      />
      {/* Magnifying glass handle - grey */}
      <line
        x1="72"
        y1="72"
        x2="88"
        y2="88"
        stroke="#6B7280"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Data visualization elements - purple dot connected to grey dot */}
      <circle
        cx="82"
        cy="28"
        r="7"
        fill="#A78BFA"
      />
      <line
        x1="82"
        y1="28"
        x2="93"
        y2="38"
        stroke="#6B7280"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx="93"
        cy="38"
        r="5"
        fill="#9CA3AF"
      />
      {/* Horizontal grey lines below */}
      <line
        x1="75"
        y1="52"
        x2="102"
        y2="52"
        stroke="#9CA3AF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="78"
        y1="60"
        x2="100"
        y2="60"
        stroke="#9CA3AF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

