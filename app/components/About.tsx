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
  const { data: queryData, isLoading: queryIsLoading } = useAbout({
    enabled: propData === undefined,
  });
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
    >
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-2 text-center font-ovo text-lg text-[#783E30] dark:text-[#B39070]"
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
        className="mx-auto my-10 max-w-4xl"
      >
        {isLoadingAbout ? (
          <div className="rounded-3xl border border-[#B39070]/20 bg-[#FAF6F0]/60 p-8 backdrop-blur-md dark:border-[#B39070]/15 dark:bg-[#2D1A17]/50">
            <div className="animate-pulse space-y-4">
              <div className="h-6 w-1/3 rounded-md bg-[#B39070]/20" />
              <div className="space-y-2 pt-2">
                <div className="h-4 rounded bg-[#B39070]/20" />
                <div className="h-4 rounded bg-[#B39070]/20" />
                <div className="h-4 w-5/6 rounded bg-[#B39070]/20" />
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card relative overflow-hidden rounded-3xl p-7 transition-all duration-300 sm:p-10 md:p-12">
            {/* Tagline / Headline */}
            {about?.summary && (
              <h3 className="mb-6 font-ovo text-2xl font-normal leading-snug tracking-tight text-[#2B1810] sm:text-3xl md:text-4xl dark:text-[#FAF6F0]">
                {about.summary}
              </h3>
            )}

            {/* Bio Paragraphs */}
            {about?.bio && (
              <div className="space-y-4 text-justify font-outfit text-base leading-relaxed text-[#59493E] sm:text-lg sm:leading-relaxed dark:text-[#D6BC9E]">
                {about.bio.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Architectural Focus Pillars */}
            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-[#B39070]/20 pt-8 sm:grid-cols-3">
              <m.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="backdrop-blur-xs group rounded-2xl border border-[#B39070]/15 bg-[#FAF6F0]/40 p-4 transition-all duration-200 hover:border-[#783E30]/40 dark:border-[#B39070]/10 dark:bg-[#3E211E]/30 dark:hover:border-[#B39070]/40"
              >
                <p className="mb-1 font-ovo text-xs font-semibold uppercase tracking-widest text-[#783E30] dark:text-[#B39070]">
                  Fullstack Craft
                </p>
                <p className="font-outfit text-sm text-[#6E6755] dark:text-[#A89F8B]">
                  Building responsive, accessible, and delightful web &amp;
                  mobile interfaces.
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="backdrop-blur-xs group rounded-2xl border border-[#B39070]/15 bg-[#FAF6F0]/40 p-4 transition-all duration-200 hover:border-[#783E30]/40 dark:border-[#B39070]/10 dark:bg-[#3E211E]/30 dark:hover:border-[#B39070]/40"
              >
                <p className="mb-1 font-ovo text-xs font-semibold uppercase tracking-widest text-[#783E30] dark:text-[#B39070]">
                  Architecture &amp; APIs
                </p>
                <p className="font-outfit text-sm text-[#6E6755] dark:text-[#A89F8B]">
                  Designing robust, maintainable backends, RESTful APIs, and
                  database schemas.
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="backdrop-blur-xs group rounded-2xl border border-[#B39070]/15 bg-[#FAF6F0]/40 p-4 transition-all duration-200 hover:border-[#783E30]/40 dark:border-[#B39070]/10 dark:bg-[#3E211E]/30 dark:hover:border-[#B39070]/40"
              >
                <p className="mb-1 font-ovo text-xs font-semibold uppercase tracking-widest text-[#783E30] dark:text-[#B39070]">
                  Performance &amp; Scale
                </p>
                <p className="font-outfit text-sm text-[#6E6755] dark:text-[#A89F8B]">
                  Optimized for fast load times, core web vitals, and scalable
                  deployments.
                </p>
              </m.div>
            </div>
          </div>
        )}
      </m.div>
    </m.div>
  );
}
