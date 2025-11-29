import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label?: string;
  errorMessage?: string;
}

export function Input({
  error = false,
  label,
  errorMessage,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputBase =
    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";

  const inputVariants = {
    default: `${inputBase} bg-white border-gray-300`,
    error: `${inputBase} border-red-500 focus:ring-red-500`,
    disabled: `${inputBase} bg-gray-100 cursor-not-allowed opacity-60`,
  };

  const inputClass = error
    ? inputVariants.error
    : props.disabled
      ? inputVariants.disabled
      : inputVariants.default;

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${inputClass} ${className}`}
        {...props}
      />
      {error && errorMessage && (
        <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}

