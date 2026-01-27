"use client";

import React from "react";

export interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 shadow-2xl border-2 border-yellow-400"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title" className="text-2xl font-bold text-black mb-4">
          {title}
        </h2>
        <p id="dialog-description" className="text-gray-700 mb-6">
          {message}
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Cancel form submission"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 rounded-lg font-semibold text-black bg-yellow-400 hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-lg"
            aria-label="Confirm form submission"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
