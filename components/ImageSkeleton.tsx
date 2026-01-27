"use client";

import React from "react";

interface ImageSkeletonProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageSkeleton({ width, height, className = "" }: ImageSkeletonProps) {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
      }}
      aria-label="Loading image"
    />
  );
}
