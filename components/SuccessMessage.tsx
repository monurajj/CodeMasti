"use client";

import React from "react";

export interface SuccessMessageProps {
  title: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
  autoDismiss?: boolean;
  autoDismissDelay?: number;
}

export default function SuccessMessage({
  title,
  message,
  onDismiss,
  className = "",
  autoDismiss = false,
  autoDismissDelay = 10000, // 10 seconds default
}: SuccessMessageProps) {
  React.useEffect(() => {
    if (autoDismiss && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, autoDismissDelay);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, autoDismissDelay, onDismiss]);

  return (
    <div
      className={`w-full p-4 bg-green-50 border-2 border-green-500 rounded-lg text-green-700 shadow-lg ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <span className="text-2xl" aria-hidden="true">
            ✓
          </span>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-lg mb-1">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-green-700 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 rounded p-1 transition-colors"
            aria-label="Dismiss success message"
          >
            <span className="text-xl">×</span>
          </button>
        )}
      </div>
    </div>
  );
}
