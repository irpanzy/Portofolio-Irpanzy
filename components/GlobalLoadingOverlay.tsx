"use client";

import { useGlobalLoading } from "@/hooks/useGlobalLoading";
import LoadingSpinner from "./LoadingSpinner";

export default function GlobalLoadingOverlay() {
  const { isLoading, message } = useGlobalLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-900">
        <LoadingSpinner size="lg" text={message} />
      </div>
    </div>
  );
}
