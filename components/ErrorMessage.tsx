"use client";

import React from "react";

export interface ErrorMessageProps {
  title: string;
  message: string;
  suggestion?: string;
  onDismiss?: () => void;
  className?: string;
}

export default function ErrorMessage({
  title,
  message,
  suggestion,
  onDismiss,
  className = "",
}: ErrorMessageProps) {
  return (
    <div
      className={`w-full p-4 bg-red-50 border-2 border-red-500 rounded-lg text-red-700 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <span className="text-2xl" aria-hidden="true">
            ✗
          </span>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-lg mb-1">{title}</p>
          <p className="text-sm mb-2">{message}</p>
          {suggestion && (
            <p className="text-sm text-red-600 italic">{suggestion}</p>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-red-700 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
            aria-label="Dismiss error message"
          >
            <span className="text-xl">×</span>
          </button>
        )}
      </div>
    </div>
  );
}
