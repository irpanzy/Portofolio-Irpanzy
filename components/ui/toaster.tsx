"use client";

import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Toaster() {
  const { toasts, dismiss } = useToast();
  const activeToasts = toasts.filter((toast) => toast.open !== false);

  return (
    <div
      aria-label="Notifications"
      data-toast-container="true"
      className="pointer-events-none fixed left-1/2 top-4 z-[100] flex max-h-screen w-full -translate-x-1/2 flex-col items-center gap-2.5 p-4 sm:max-w-[420px]"
    >
      <AnimatePresence mode="popLayout">
        {activeToasts.map(function ({
          id,
          title,
          description,
          action,
          variant,
        }) {
          const isSuccess = variant === "success";
          const isDestructive = variant === "destructive";

          return (
            <motion.div
              key={id}
              data-toast="true"
              layout
              initial={{ opacity: 0, y: -24, scale: 0.92, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                y: -16,
                scale: 0.94,
                filter: "blur(4px)",
                transition: { duration: 0.2 },
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 28,
                mass: 0.8,
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.8, bottom: 0.2 }}
              onDragEnd={(_, info) => {
                if (info.offset.y < -40 || info.velocity.y < -300) {
                  dismiss(id);
                }
              }}
              className={`group pointer-events-auto relative flex w-full select-none items-start justify-between space-x-3 overflow-hidden rounded-2xl border p-4 pr-9 font-outfit shadow-xl backdrop-blur-xl transition-colors duration-200 ${
                isSuccess
                  ? "border-emerald-500/30 bg-emerald-50/95 text-emerald-950 shadow-emerald-500/10 dark:border-emerald-500/25 dark:bg-[#072418]/95 dark:text-emerald-100 dark:shadow-emerald-950/40"
                  : isDestructive
                    ? "border-rose-500/30 bg-rose-50/95 text-rose-950 shadow-rose-500/10 dark:border-rose-500/25 dark:bg-[#2b0c10]/95 dark:text-rose-100 dark:shadow-rose-950/40"
                    : "border-gray-200/80 bg-white/95 text-gray-900 shadow-black/5 dark:border-white/10 dark:bg-gray-900/95 dark:text-gray-100 dark:shadow-black/40"
              }`}
            >
              <div className="flex items-start gap-3">
                {isSuccess && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                      delay: 0.05,
                    }}
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </motion.div>
                )}
                {isDestructive && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                      delay: 0.05,
                    }}
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
                  >
                    <AlertCircle className="h-4 w-4" />
                  </motion.div>
                )}
                {!isSuccess && !isDestructive && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                      delay: 0.05,
                    }}
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                  >
                    <Info className="h-4 w-4" />
                  </motion.div>
                )}
                <div className="grid gap-1">
                  {title && (
                    <div className="text-sm font-semibold">{title}</div>
                  )}
                  {description && (
                    <div className="text-sm opacity-90">{description}</div>
                  )}
                </div>
              </div>

              {action}

              <button
                type="button"
                onClick={() => dismiss(id)}
                className="absolute right-2 top-2 rounded-lg p-1.5 text-gray-500 opacity-60 transition-opacity hover:opacity-100 focus:outline-none dark:text-gray-400"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
