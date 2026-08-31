import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export default function LoadingSpinner({
  size = "md",
  className,
  text = "Loading...",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className
      )}
      suppressHydrationWarning
    >
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800",
        className
      )}
    >
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <tr className="animate-pulse border-b border-gray-200 dark:border-gray-700">
      <td className="px-4 py-3">
        <div className="h-12 w-12 rounded bg-gray-300 dark:bg-gray-700"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-700"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
      </td>
    </tr>
  );
}

export function PageLoading({ text = "Loading..." }: { text?: string }) {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      suppressHydrationWarning
    >
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}
