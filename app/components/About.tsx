"use client";

import { useAbout } from "@/hooks/useApi";
import React from "react";
import { m } from "framer-motion";
import { Code2, Server, Cloud } from "lucide-react";

interface AboutProps {
  isDarkMode: boolean;
}

export default function About({ isDarkMode }: AboutProps) {
  const { data: about, isLoading: isLoadingAbout } = useAbout();

  return (
    <m.div
      id="about"
      className="w-full scroll-mt-20 px-4 py-8 md:px-12 lg:px-[12%]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 text-center font-ovo text-lg"
      >
        Introduction
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center font-ovo text-5xl"
      >
        About Me
      </m.h2>

      {/* Bio / Description Card */}
      <m.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mx-auto my-10 max-w-4xl"
      >
        {isLoadingAbout ? (
          <div className="rounded-3xl border border-gray-200 bg-white/60 p-8 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/40">
            <div className="animate-pulse space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-700" />
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-700" />
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-700" />
                <div className="ml-2 h-4 w-32 rounded bg-gray-300 dark:bg-gray-700" />
              </div>
              <div className="h-5 w-48 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="space-y-2 pt-2">
                <div className="h-4 rounded bg-gray-300 dark:bg-gray-700" />
                <div className="h-4 rounded bg-gray-300 dark:bg-gray-700" />
                <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        ) : (
          <div className="group relative rounded-3xl bg-gradient-to-b from-[#77BEF0]/20 via-purple-500/10 to-transparent p-[1px] shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="relative overflow-hidden rounded-[23px] border border-gray-200/80 bg-white/80 p-6 backdrop-blur-xl sm:p-8 md:p-10 dark:border-white/10 dark:bg-[#1a0033]/70">
              {/* Ambient Glows */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#77BEF0]/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />

              {/* Card Top Bar */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200/60 pb-4 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="ml-2 font-outfit text-xs font-medium text-gray-500 dark:text-gray-400">
                    profile ~ bio.md
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/80 px-3 py-1 font-outfit text-xs font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Open to Opportunities
                </div>
              </div>

              {/* Headline / Summary */}
              {about?.summary && (
                <div className="mb-4">
                  <span className="inline-block rounded-lg bg-[#77BEF0]/15 px-3.5 py-1 font-outfit text-xs font-semibold uppercase tracking-wider text-[#388dc8] sm:text-sm dark:bg-[#77BEF0]/20 dark:text-[#90cdf4]">
                    {about.summary}
                  </span>
                </div>
              )}

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-justify font-outfit text-base leading-relaxed text-gray-700 sm:text-lg sm:leading-loose dark:text-gray-200">
                {(
                  about?.bio ||
                  "I'm a passionate fullstack developer with experience in building modern web and mobile applications. I love learning new technologies, crafting scalable architectures, and solving complex real-world problems through clean code."
                )
                  .split("\n\n")
                  .map((paragraph, idx) => (
                    <p key={idx} className="tracking-wide">
                      {paragraph}
                    </p>
                  ))}
              </div>

              {/* Key Highlight Badges / Quick Stats */}
              <div className="mt-8 grid grid-cols-1 gap-3 border-t border-gray-200/60 pt-6 sm:grid-cols-2 lg:grid-cols-3 dark:border-white/10">
                <div className="flex items-center gap-3 rounded-xl border border-gray-200/60 bg-gray-50/70 p-3 transition-colors hover:border-[#77BEF0] dark:border-white/5 dark:bg-white/5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400">
                    <Code2 className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-outfit text-xs text-gray-500 dark:text-gray-400">
                      Core Focus
                    </p>
                    <p className="truncate font-outfit text-xs font-semibold text-gray-800 dark:text-gray-200">
                      Backend &amp; Full-Stack
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-gray-200/60 bg-gray-50/70 p-3 transition-colors hover:border-purple-400 dark:border-white/5 dark:bg-white/5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400">
                    <Server className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-outfit text-xs text-gray-500 dark:text-gray-400">
                      Architecture
                    </p>
                    <p className="truncate font-outfit text-xs font-semibold text-gray-800 dark:text-gray-200">
                      Scalable RESTful APIs
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-gray-200/60 bg-gray-50/70 p-3 transition-colors hover:border-emerald-400 sm:col-span-2 lg:col-span-1 dark:border-white/5 dark:bg-white/5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400">
                    <Cloud className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-outfit text-xs text-gray-500 dark:text-gray-400">
                      Deployment
                    </p>
                    <p className="truncate font-outfit text-xs font-semibold text-gray-800 dark:text-gray-200">
                      Docker &amp; Cloud (AWS)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </m.div>
    </m.div>
  );
}
