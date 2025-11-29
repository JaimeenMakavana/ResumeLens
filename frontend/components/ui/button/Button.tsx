import React from "react";
import { LoadingSpinner } from "../loading";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:opacity-60 disabled:cursor-not-allowed",
    outline:
      "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 disabled:opacity-60 disabled:cursor-not-allowed",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:opacity-60 disabled:cursor-not-allowed",
    ghost:
      "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 disabled:opacity-60 disabled:cursor-not-allowed",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        loading ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <LoadingSpinner size="sm" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}

