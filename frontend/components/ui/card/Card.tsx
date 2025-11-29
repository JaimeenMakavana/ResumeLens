import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "interactive";
  children: React.ReactNode;
}

export function Card({
  variant = "default",
  children,
  className = "",
  ...props
}: CardProps) {
  const baseStyles = "bg-white rounded-lg border border-gray-200 p-6";

  const variants = {
    default: baseStyles,
    elevated: "bg-white rounded-lg shadow-md border border-gray-200 p-6",
    outlined: "bg-white rounded-lg border-2 border-gray-300 p-6",
    interactive: `${baseStyles} hover:shadow-md transition-shadow cursor-pointer`,
  };

  return (
    <div className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

