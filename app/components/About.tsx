"use client";

import { useAbout } from "@/hooks/useApi";
import React from "react";
import { m } from "framer-motion";
import type { About as AboutType } from "@/types";

interface AboutProps {
  isDarkMode: boolean;
  data?: AboutType | null;
  isLoading?: boolean;
}

export default function About({
  data: propData,
  isLoading: propIsLoading,
}: AboutProps) {
  const { data: queryData, isLoading: queryIsLoading } = useAbout();
  const about = propData !== undefined ? propData : queryData;
  const isLoadingAbout =
    propIsLoading !== undefined ? propIsLoading : !propData && queryIsLoading;

  return (
    <m.div
      id="about"
      className="w-full scroll-mt-20 px-4 py-8 md:px-12 lg:px-[12%]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-2 text-center font-ovo text-lg"
      >
        Introduction
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center font-ovo text-5xl"
      >
        About Me
      </m.h2>

      {/* Bio / Editorial Card */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mx-auto my-10 max-w-4xl"
      >
        {isLoadingAbout ? (
          <div className="rounded-3xl border border-black/10 bg-white/60 p-8 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <div className="animate-pulse space-y-4">
              <div className="h-6 w-1/3 rounded-md bg-gray-200 dark:bg-gray-800" />
              <div className="space-y-2 pt-2">
                <div className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-3xl border border-black/[0.08] bg-white/75 p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] backdrop-blur-xl sm:p-10 md:p-12 dark:border-white/[0.1] dark:bg-[#120022]/75 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            {/* Tagline / Headline */}
            {about?.summary && (
              <h3 className="mb-6 font-ovo text-2xl font-normal leading-snug tracking-tight text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                {about.summary}
              </h3>
            )}

            {/* Bio Paragraphs */}
            {about?.bio && (
              <div className="space-y-4 text-justify font-outfit text-base leading-relaxed text-gray-700 sm:text-lg sm:leading-relaxed dark:text-gray-300">
                {about.bio.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Architectural Focus Pillars */}
            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-black/[0.08] pt-8 sm:grid-cols-3 dark:border-white/10">
              <div className="space-y-1">
                <p className="font-ovo text-xs font-semibold uppercase tracking-widest text-primary">
                  Fullstack Craft
                </p>
                <p className="font-outfit text-sm text-gray-600 dark:text-gray-400">
                  Building responsive, accessible, and delightful web &amp;
                  mobile interfaces.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-ovo text-xs font-semibold uppercase tracking-widest text-primary">
                  Architecture &amp; APIs
                </p>
                <p className="font-outfit text-sm text-gray-600 dark:text-gray-400">
                  Designing robust, maintainable backends, RESTful APIs, and
                  database schemas.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-ovo text-xs font-semibold uppercase tracking-widest text-primary">
                  Performance &amp; Scale
                </p>
                <p className="font-outfit text-sm text-gray-600 dark:text-gray-400">
                  Optimized for fast load times, core web vitals, and scalable
                  deployments.
                </p>
              </div>
            </div>
          </div>
        )}
      </m.div>
    </m.div>
  );
}
