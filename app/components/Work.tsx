"use client";

import Image from "next/image";
import React from "react";
import { m } from "framer-motion";
import { CircleArrowOutUpRight, ExternalLink, Github, Eye } from "lucide-react";
import { useProjects } from "@/hooks/useApi";
import { getTechIcon } from "@/lib/iconUtils";
import type { Project } from "@/types";

interface WorkProps {
  isDarkMode: boolean;
  data?: Project[];
  isLoading?: boolean;
}

export default function Work({
  isDarkMode,
  data: propData,
  isLoading: propIsLoading,
}: WorkProps) {
  const { data: queryData, isLoading: queryIsLoading } = useProjects();
  const projects = propData !== undefined ? propData : queryData;
  const isLoading =
    propIsLoading !== undefined ? propIsLoading : !propData && queryIsLoading;

  const visibleProjects = projects?.filter((project) => project.isVisible);

  if (isLoading) {
    return (
      <div className="w-full scroll-mt-20 px-[12%] py-6">
        <p className="text-center font-outfit text-[#6E6755] dark:text-[#A89F8B]">
          Loading projects...
        </p>
      </div>
    );
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="work"
      className="w-full scroll-mt-20 px-[8%] py-8 md:px-[12%]"
    >
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 text-center font-ovo text-lg text-[#783E30] dark:text-[#B39070]"
      >
        A Glimpse of My Journey
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center font-ovo text-5xl"
      >
        What I&apos;ve Built
      </m.h2>
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mx-auto mb-12 mt-5 max-w-3xl text-center font-outfit text-sm text-[#59493E] md:text-base dark:text-[#C5B8A5]"
      >
        A showcase of real-world projects built with modern web technologies -
        from Fullstack applications to scalable backend systems and RESTful
        APIs.
      </m.p>

      {visibleProjects && visibleProjects.length > 0 ? (
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="my-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProjects.map((project) => {
            const hasDemoLink =
              project.demoLink && project.demoLink.trim() !== "";
            const hasGithubLink =
              project.githubLink && project.githubLink.trim() !== "";

            return (
              <m.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                key={project._id}
                className="glass-card group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:border-[#783E30]/50 hover:shadow-xl dark:hover:border-[#B39070]/50"
              >
                {/* Ambient Top Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#B39070]/15 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                {/* Project Showcase Container */}
                <div className="flex flex-col border-b border-[#B39070]/15 bg-[#FAF6F0]/40 p-2 dark:border-[#B39070]/10 dark:bg-black/30">
                  {/* Top Space for Live Badge */}
                  <div className="mb-1 flex h-4 items-center justify-end px-1">
                    {hasDemoLink ? (
                      <span className="shadow-2xs inline-flex h-4 items-center gap-1 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-2 font-outfit text-[9px] font-medium leading-none text-emerald-700 backdrop-blur-md dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300">
                        <span className="relative flex h-1 w-1">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                          <span className="relative inline-flex h-1 w-1 rounded-full bg-emerald-500" />
                        </span>
                        Live
                      </span>
                    ) : (
                      <div className="h-4" aria-hidden="true" />
                    )}
                  </div>

                  {/* Project Image Container */}
                  <div className="shadow-2xs relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#B39070]/20 bg-[#FAF6F0]/80 dark:border-[#B39070]/15 dark:bg-[#190E0C]/60">
                    <Image
                      src={project.bgImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                      quality={100}
                    />

                    {/* Hover Actions (Desktop) */}
                    <div className="backdrop-blur-xs absolute inset-0 z-20 hidden items-center justify-center gap-3 bg-[#190E0C]/60 transition-all duration-300 md:flex md:opacity-0 md:group-hover:opacity-100">
                      {hasDemoLink && (
                        <m.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#783E30] px-4 py-2 font-outfit text-xs font-semibold text-[#FAF6F0] shadow-lg shadow-[#783E30]/30 transition-colors hover:bg-[#924D3D]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Live Demo
                        </m.a>
                      )}
                      {hasGithubLink && (
                        <m.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-outfit text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-3.5 w-3.5" />
                          Source Code
                        </m.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-5 font-outfit">
                  <div>
                    <h3 className="mb-2 font-outfit text-lg font-bold text-[#2B1810] transition-colors group-hover:text-[#783E30] dark:text-[#FAF6F0] dark:group-hover:text-[#D6BC9E]">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-justify font-outfit text-xs leading-relaxed text-[#59493E] sm:text-sm dark:text-[#C5B8A5]">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech, techIndex) => {
                            const isObject = typeof tech === "object";
                            const title = isObject ? tech.title : tech;
                            const icon = isObject
                              ? getTechIcon(tech, isDarkMode)
                              : null;

                            return (
                              <div
                                key={techIndex}
                                className="shadow-2xs inline-flex items-center gap-1.5 rounded-full border border-[#B39070]/25 bg-[#FAF6F0]/80 px-2.5 py-1 text-xs font-medium text-[#59493E] transition-colors hover:border-[#783E30]/50 dark:border-[#B39070]/20 dark:bg-[#2D1A17]/60 dark:text-[#C5B8A5] dark:hover:border-[#B39070]/50"
                                title={title}
                              >
                                {icon ? (
                                  <Image
                                    src={icon}
                                    alt={title}
                                    width={14}
                                    height={14}
                                    className="h-3.5 w-3.5 shrink-0 object-contain"
                                  />
                                ) : (
                                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-[#B39070]/20 text-[8px] font-bold text-[#59493E] dark:text-[#C5B8A5]">
                                    {title.substring(0, 2).toUpperCase()}
                                  </span>
                                )}
                                <span className="font-outfit text-[11px]">
                                  {title}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Buttons (Visible only on mobile/tablet) */}
                  {(hasDemoLink || hasGithubLink) && (
                    <div className="mt-auto flex items-center gap-2 border-t border-[#B39070]/15 pt-3 md:hidden dark:border-[#B39070]/10">
                      {hasDemoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#783E30]/30 bg-[#783E30]/10 px-3 py-2 text-xs font-semibold text-[#783E30] transition-all hover:bg-[#783E30] hover:text-[#FAF6F0] dark:bg-[#783E30]/20 dark:text-[#D6BC9E]"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Live Demo
                        </a>
                      )}
                      {hasGithubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#B39070]/30 bg-[#FAF6F0]/80 px-3 py-2 text-xs font-semibold text-[#2B1810] transition-all hover:bg-[#783E30] hover:text-white dark:border-[#B39070]/20 dark:bg-[#2D1A17]/60 dark:text-[#FAF6F0]"
                        >
                          <Github className="h-3.5 w-3.5" />
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </m.div>
            );
          })}
        </m.div>
      ) : (
        <p className="text-center text-[#6E6755]">No projects to display</p>
      )}

      <div className="mt-12 flex justify-center">
        <a
          href="https://github.com/irpanzy?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 rounded-full border border-[#B39070]/35 bg-[#FAF6F0]/85 px-5 py-2.5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#783E30] hover:shadow-md active:scale-95 dark:border-[#B39070]/25 dark:bg-[#2D1A17]/70 dark:hover:border-[#B39070]"
        >
          {/* Ambient Glow behind button on hover */}
          <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-r from-[#783E30]/25 to-[#B39070]/25 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

          {/* GitHub Icon Badge */}
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B39070]/15 text-[#2B1810] transition-colors duration-300 group-hover:text-[#783E30] dark:text-[#FAF6F0] dark:group-hover:text-[#B39070]">
            <Github className="h-3.5 w-3.5" />
          </span>

          {/* Text & Label */}
          <span className="font-outfit text-xs font-semibold tracking-wide text-[#2B1810] transition-colors duration-300 group-hover:text-[#783E30] sm:text-sm dark:text-[#FAF6F0] dark:group-hover:text-[#B39070]">
            Show More on GitHub
          </span>

          {/* Directional Icon with Micro-interaction */}
          <CircleArrowOutUpRight className="h-3.5 w-3.5 text-[#6E6755] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#783E30] dark:text-[#C5B8A5] dark:group-hover:text-[#B39070]" />
        </a>
      </div>
    </m.div>
  );
}
