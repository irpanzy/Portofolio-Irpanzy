"use client";

import Image from "next/image";
import React from "react";
import { m } from "framer-motion";
import { CircleArrowOutUpRight, ExternalLink, Github, Eye } from "lucide-react";
import { useProjects } from "@/hooks/useApi";

interface WorkProps {
  isDarkMode: boolean;
}

export default function Work({ isDarkMode }: WorkProps) {
  const { data: projects, isLoading } = useProjects();

  const visibleProjects = projects?.filter((project) => project.isVisible);

  if (isLoading) {
    return (
      <div className="w-full scroll-mt-20 px-[12%] py-6">
        <p className="text-center">Loading projects...</p>
      </div>
    );
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="work"
      className="w-full scroll-mt-20 px-[12%] py-6"
    >
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 text-center font-ovo text-lg"
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
        className="mx-auto mb-12 mt-5 max-w-2xl text-center font-ovo"
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
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white/70 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#77BEF0]/60 hover:shadow-xl hover:shadow-[#77BEF0]/10 dark:border-white/10 dark:bg-[#18002c]/70 dark:hover:border-[#77BEF0]/50 dark:hover:shadow-purple-500/10"
              >
                {/* Ambient Top Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#77BEF0]/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                {/* Project Showcase Container */}
                <div className="flex flex-col border-b border-gray-100 bg-gray-100/80 p-2 dark:border-white/10 dark:bg-black/50">
                  {/* Top Space for Live Badge (Fixed height for uniform alignment) */}
                  <div className="mb-1 flex h-4 items-center justify-end px-1">
                    {hasDemoLink ? (
                      <span className="inline-flex h-4 items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-50 px-2 font-outfit text-[9px] font-medium leading-none text-emerald-700 shadow-sm backdrop-blur-md dark:bg-emerald-950/80 dark:text-emerald-300">
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
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-gray-200/70 bg-white shadow-sm dark:border-transparent dark:bg-gray-900/30">
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
                    <div className="absolute inset-0 z-20 hidden items-center justify-center gap-3 bg-black/60 backdrop-blur-sm transition-all duration-300 md:flex md:opacity-0 md:group-hover:opacity-100">
                      {hasDemoLink && (
                        <m.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#77BEF0] px-4 py-2 font-outfit text-xs font-semibold text-gray-950 shadow-lg shadow-[#77BEF0]/30 transition-colors hover:bg-[#5dafe8]"
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
                    <h3 className="mb-2 font-outfit text-lg font-bold text-gray-900 transition-colors group-hover:text-[#388dc8] dark:text-white dark:group-hover:text-[#77BEF0]">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-justify font-outfit text-xs leading-relaxed text-gray-600 sm:text-sm dark:text-gray-300">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech, techIndex) => {
                            const isObject = typeof tech === "object";
                            const title = isObject ? tech.title : tech;
                            const icon = isObject ? tech.icon : null;

                            return (
                              <div
                                key={techIndex}
                                className="inline-flex items-center gap-1.5 rounded-md border border-gray-200/80 bg-gray-50/90 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-[#77BEF0]/50 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-[#77BEF0]/40"
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
                                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-gray-200 text-[8px] font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
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
                    <div className="mt-auto flex items-center gap-2 border-t border-gray-100 pt-3 md:hidden dark:border-white/10">
                      {hasDemoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#77BEF0]/40 bg-[#77BEF0]/10 px-3 py-2 text-xs font-semibold text-[#297bb6] transition-all hover:bg-[#77BEF0] hover:text-white dark:bg-[#77BEF0]/15 dark:text-[#90cdf4] dark:hover:bg-[#77BEF0] dark:hover:text-gray-950"
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
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-800 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white dark:hover:text-gray-950"
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
        <p className="text-center text-gray-500">No projects to display</p>
      )}

      <m.a
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="https://github.com/irpanzy?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="group mx-auto mt-10 flex w-max items-center justify-center gap-2 rounded-full border-[0.5px] border-gray-700 px-10 py-3 transition duration-300 ease-in-out hover:bg-lightHover hover:shadow-lg dark:border-white dark:text-white dark:hover:bg-darkHover"
      >
        Show More
        <m.div
          initial={false}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <CircleArrowOutUpRight className="w-4 group-hover:animate-pulse" />
        </m.div>
      </m.a>
    </m.div>
  );
}
