"use client";

import React, { useEffect, useState, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Laptop,
  Heart,
  Layers,
  CheckCircle2,
} from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
  isDarkMode?: boolean;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [characterMood, setCharacterMood] = useState<
    "coding" | "happy" | "waving"
  >("coding");
  const [heartPops, setHeartPops] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const steps = useMemo(
    () => [
      {
        threshold: 0,
        icon: Laptop,
        label: "Initializing environment...",
        sub: "Setting up preferences & runtime",
      },
      {
        threshold: 28,
        icon: Code2,
        label: "Loading portfolio assets...",
        sub: "Projects, experience & skills",
      },
      {
        threshold: 62,
        icon: Layers,
        label: "Assembling interface...",
        sub: "Rendering components & layouts",
      },
      {
        threshold: 90,
        icon: CheckCircle2,
        label: "Ready to explore...",
        sub: "Welcome to Irfan Muria's portfolio",
      },
    ],
    []
  );

  const currentStep = useMemo(() => {
    let active = steps[0];
    for (const step of steps) {
      if (progress >= step.threshold) {
        active = step;
      }
    }
    return active;
  }, [progress, steps]);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawProgress);

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete]);

  const handleCharacterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setHeartPops((prev) => [...prev.slice(-4), newHeart]);

    setCharacterMood((prev) => (prev === "coding" ? "happy" : "coding"));
  };

  const StepIcon = currentStep.icon;

  return (
    <m.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        filter: "blur(6px)",
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[100] flex select-none flex-col items-center justify-between overflow-hidden bg-[#FAF6F0] p-6 text-[#2B1810] dark:bg-[#140B0A] dark:text-[#FAF6F0]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <m.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#783E30]/25 blur-3xl dark:bg-[#783E30]/35"
        />
        <m.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#B39070]/30 blur-3xl dark:bg-[#B39070]/25"
        />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] dark:invert"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #783E30 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <header className="relative z-10 flex w-full max-w-xl items-center justify-end pt-2">
        <button
          onClick={onComplete}
          type="button"
          aria-label="Skip intro"
          className="group inline-flex items-center gap-1.5 rounded-full border border-[#B39070]/30 bg-[#FAF6F0]/70 px-3.5 py-1 text-xs font-medium text-[#59493E] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-[#783E30] hover:bg-[#783E30]/10 hover:text-[#783E30] active:scale-95 dark:border-[#B39070]/25 dark:bg-[#2D1714]/70 dark:text-[#C5B8A5] dark:hover:border-[#B39070] dark:hover:bg-[#B39070]/15 dark:hover:text-[#FAF6F0]"
        >
          <span>Skip</span>
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          <span className="ml-0.5 hidden text-[10px] opacity-60 sm:inline">
            Esc
          </span>
        </button>
      </header>

      <main className="relative z-10 my-auto flex w-full max-w-md flex-col items-center justify-center text-center">
        <div
          onClick={handleCharacterClick}
          className="group relative mb-5 cursor-pointer"
          title="Click me! (◕‿◕)"
        >
          <AnimatePresence>
            {heartPops.map((heart) => (
              <m.div
                key={heart.id}
                initial={{ opacity: 1, scale: 0.6, y: 0 }}
                animate={{ opacity: 0, scale: 1.5, y: -45 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="pointer-events-none absolute z-20 text-[#783E30] dark:text-[#D6BC9E]"
                style={{ left: heart.x, top: heart.y }}
              >
                <Heart className="h-5 w-5 fill-current" />
              </m.div>
            ))}
          </AnimatePresence>

          <div className="absolute inset-0 -m-3 animate-pulse rounded-full bg-gradient-to-tr from-[#783E30]/20 via-[#B39070]/25 to-[#783E30]/10 blur-xl" />

          <m.div
            animate={
              characterMood === "happy"
                ? { y: [0, -6, 0], scale: [1, 1.04, 1] }
                : { y: [0, -4, 0], scale: 1 }
            }
            transition={{
              duration: characterMood === "happy" ? 1.0 : 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileTap={{ scale: 0.94 }}
            className="relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-[#B39070]/30 bg-gradient-to-b from-[#FAF6F0]/90 to-[#EFE7DC]/90 p-4 shadow-xl backdrop-blur-md sm:h-40 sm:w-40 dark:border-[#B39070]/20 dark:from-[#2D1714]/80 dark:to-[#1F100D]/90"
          >
            <svg
              viewBox="0 0 160 160"
              className="h-full w-full select-none drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <m.circle
                cx="30"
                cy="35"
                r="3"
                fill="#B39070"
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <m.circle
                cx="135"
                cy="45"
                r="2.5"
                fill="#783E30"
                animate={{ scale: [1.4, 1, 1.4], opacity: [0.8, 0.3, 0.8] }}
                transition={{ duration: 2.1, repeat: Infinity }}
              />

              <path
                d="M40 70 C40 38, 120 38, 120 70"
                stroke="#783E30"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />

              <rect
                x="33"
                y="62"
                width="10"
                height="22"
                rx="5"
                fill="#B39070"
              />
              <rect
                x="117"
                y="62"
                width="10"
                height="22"
                rx="5"
                fill="#B39070"
              />

              <circle cx="80" cy="74" r="38" fill="#F8E5D3" />

              <path
                d="M44 68 C44 48, 62 42, 80 42 C98 42, 116 48, 116 68 C110 56, 100 52, 92 58 C84 50, 74 50, 68 58 C60 52, 50 56, 44 68 Z"
                fill="#2B1810"
              />

              <ellipse
                cx="58"
                cy="84"
                rx="5"
                ry="3.5"
                fill="#E88873"
                opacity="0.7"
              />
              <ellipse
                cx="102"
                cy="84"
                rx="5"
                ry="3.5"
                fill="#E88873"
                opacity="0.7"
              />

              {characterMood === "happy" ? (
                <>
                  <path
                    d="M62 76 C65 72, 71 72, 74 76"
                    stroke="#2B1810"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M86 76 C89 72, 95 72, 98 76"
                    stroke="#2B1810"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </>
              ) : (
                <>
                  <g className="animate-[pulse_3s_ease-in-out_infinite]">
                    <circle cx="68" cy="74" r="5" fill="#2B1810" />
                    <circle cx="66.5" cy="72.5" r="1.8" fill="#FFFFFF" />
                  </g>
                  <g className="animate-[pulse_3s_ease-in-out_infinite]">
                    <circle cx="92" cy="74" r="5" fill="#2B1810" />
                    <circle cx="90.5" cy="72.5" r="1.8" fill="#FFFFFF" />
                  </g>
                </>
              )}

              {characterMood === "happy" ? (
                <path
                  d="M74 85 Q80 93 86 85 Z"
                  fill="#783E30"
                  stroke="#783E30"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M75 83 Q80 87 85 83"
                  stroke="#2B1810"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />
              )}

              <path
                d="M52 110 C52 100, 108 100, 108 110 L115 138 L45 138 Z"
                fill="#783E30"
              />
              <path
                d="M72 102 L80 114 L88 102"
                stroke="#B39070"
                strokeWidth="2.5"
                fill="none"
              />

              <rect
                x="54"
                y="118"
                width="52"
                height="30"
                rx="3"
                fill="#3E211E"
              />
              <rect
                x="57"
                y="121"
                width="46"
                height="23"
                rx="2"
                fill="#FAF6F0"
                opacity="0.95"
              />

              <line
                x1="62"
                y1="126"
                x2="74"
                y2="126"
                stroke="#783E30"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="62"
                y1="131"
                x2="88"
                y2="131"
                stroke="#B39070"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="62"
                y1="136"
                x2="79"
                y2="136"
                stroke="#2B1810"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <m.circle
                cx="58"
                cy="142"
                r="4.5"
                fill="#F8E5D3"
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <m.circle
                cx="102"
                cy="142"
                r="4.5"
                fill="#F8E5D3"
                animate={{ y: [-3, 0, -3] }}
                transition={{
                  duration: 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <rect
                x="120"
                y="128"
                width="10"
                height="12"
                rx="2.5"
                fill="#B39070"
              />
              <path
                d="M130 131 C133 131, 133 136, 130 136"
                stroke="#B39070"
                strokeWidth="1.8"
                fill="none"
              />
              <m.path
                d="M123 124 Q125 120 123 116"
                stroke="#B39070"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
                animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </svg>

            <span className="absolute -bottom-2 rounded-full border border-[#B39070]/30 bg-[#FAF6F0] px-2 py-0.5 font-mono text-[9px] text-[#783E30] opacity-80 shadow-sm transition-all group-hover:scale-105 group-hover:opacity-100 dark:bg-[#2D1714] dark:text-[#D6BC9E]">
              {characterMood === "happy" ? "Yay! >⩊<" : "Click me 𑣲⋆"}
            </span>
          </m.div>
        </div>

        <div className="mb-5 animate-hero-fade space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#B39070]/30 bg-[#B39070]/10 px-3 py-1 text-xs font-medium text-[#783E30] dark:text-[#D6BC9E]">
            <Code2 className="h-3.5 w-3.5 text-[#783E30] dark:text-[#B39070]" />
            <span>Fullstack Web Developer</span>
          </div>
          <h1 className="font-ovo text-2xl font-medium tracking-tight text-[#2B1810] sm:text-3xl dark:text-[#FAF6F0]">
            Irfan Muria
          </h1>
          <p className="font-outfit text-xs text-[#59493E] sm:text-sm dark:text-[#C5B8A5]">
            Crafting digital experiences with modern web technologies
          </p>
        </div>

        <div className="w-full rounded-2xl border border-[#B39070]/30 bg-[#FAF6F0]/90 p-4 shadow-lg backdrop-blur-md dark:border-[#B39070]/25 dark:bg-[#251310]/90">
          <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-left">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#783E30]/15 text-[#783E30] dark:bg-[#B39070]/20 dark:text-[#D6BC9E]">
                <StepIcon className="animate-spin-slow h-4 w-4" />
              </div>
              <div>
                <p className="line-clamp-1 text-xs font-semibold text-[#2B1810] sm:text-sm dark:text-[#FAF6F0]">
                  {currentStep.label}
                </p>
                <p className="text-[10px] text-[#59493E] sm:text-xs dark:text-[#C5B8A5]">
                  {currentStep.sub}
                </p>
              </div>
            </div>

            <span className="font-mono text-sm font-bold text-[#783E30] sm:text-base dark:text-[#D6BC9E]">
              {progress}%
            </span>
          </div>

          <div className="mt-3">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#B39070]/20 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-[#783E30] transition-all duration-75 ease-out dark:bg-[#B39070]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px] text-[#59493E] dark:text-[#C5B8A5]">
          <span className="rounded-full border border-[#B39070]/25 bg-[#B39070]/10 px-2.5 py-0.5 dark:bg-[#3E211E]/40">
            Next.js 15
          </span>
          <span className="rounded-full border border-[#B39070]/25 bg-[#B39070]/10 px-2.5 py-0.5 dark:bg-[#3E211E]/40">
            React 19
          </span>
          <span className="rounded-full border border-[#B39070]/25 bg-[#B39070]/10 px-2.5 py-0.5 dark:bg-[#3E211E]/40">
            TypeScript
          </span>
          <span className="rounded-full border border-[#B39070]/25 bg-[#B39070]/10 px-2.5 py-0.5 dark:bg-[#3E211E]/40">
            Tailwind CSS
          </span>
          <span className="rounded-full border border-[#B39070]/25 bg-[#B39070]/10 px-2.5 py-0.5 dark:bg-[#3E211E]/40">
            Express API
          </span>
        </div>
      </main>

      <footer className="relative z-10 pb-2 text-center">
        <p className="font-outfit text-[11px] text-[#59493E]/80 dark:text-[#C5B8A5]/80">
          Press{" "}
          <kbd className="rounded border border-[#B39070]/40 bg-[#FAF6F0]/80 px-1 py-0.5 font-mono text-[10px] text-[#783E30] dark:bg-[#2D1714] dark:text-[#D6BC9E]">
            Esc
          </kbd>{" "}
          or click{" "}
          <strong className="font-semibold text-[#783E30] dark:text-[#D6BC9E]">
            Skip
          </strong>{" "}
          to enter immediately
        </p>
      </footer>
    </m.div>
  );
}
