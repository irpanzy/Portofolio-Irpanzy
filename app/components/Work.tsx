"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  CircleArrowOutUpRight,
  Layers,
} from "lucide-react";
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

  const visibleProjects =
    projects?.filter((project) => project.isVisible) || [];
  const projectCount = visibleProjects.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);

  const sliderSectionRef = useRef<HTMLDivElement>(null);

  // Paginate handler with circular loop
  const paginate = useCallback(
    (newDirection: number) => {
      if (projectCount <= 1) return;
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        let next = prevIndex + newDirection;
        if (next < 0) next = projectCount - 1;
        if (next >= projectCount) next = 0;
        return next;
      });
    },
    [projectCount]
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex || projectCount <= 1) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex, projectCount]
  );

  // Keyboard navigation when section is in view / focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only navigate if user isn't typing in an input
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      if (e.key === "ArrowLeft") {
        paginate(-1);
      } else if (e.key === "ArrowRight") {
        paginate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  if (isLoading) {
    return (
      <div className="w-full scroll-mt-20 px-[8%] py-12 md:px-[12%]">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center rounded-3xl border border-[#B39070]/20 bg-[#FAF6F0]/40 p-12 backdrop-blur-md dark:border-[#B39070]/10 dark:bg-black/20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#783E30] border-t-transparent dark:border-[#B39070]" />
          <p className="mt-4 font-outfit text-sm text-[#6E6755] dark:text-[#A89F8B]">
            Loading interactive project showcase...
          </p>
        </div>
      </div>
    );
  }

  const currentProject = visibleProjects[currentIndex];
  const hasDemoLink = Boolean(
    currentProject?.demoLink && currentProject.demoLink.trim() !== ""
  );
  const hasGithubLink = Boolean(
    currentProject?.githubLink && currentProject.githubLink.trim() !== ""
  );

  // Framer motion variants for smooth slide transitions
  const slideVariants = {
    enter: (slideDirection: number) => ({
      x: slideDirection > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      },
    },
    exit: (slideDirection: number) => ({
      x: slideDirection > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    }),
  };

  const textVariants = {
    enter: (slideDirection: number) => ({
      y: slideDirection > 0 ? 15 : -15,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (slideDirection: number) => ({
      y: slideDirection > 0 ? -15 : 15,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    }),
  };

  return (
    <m.div
      ref={sliderSectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      id="work"
      className="w-full scroll-mt-20 px-[6%] py-12 sm:px-[8%] md:px-[10%] lg:px-[12%]"
    >
      {/* Section Header */}
      <div className="text-center">
        <m.p
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-2 font-ovo text-base text-[#783E30] sm:text-lg dark:text-[#B39070]"
        >
          A Glimpse of My Journey
        </m.p>
        <m.h2
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-ovo text-4xl text-[#2B1810] sm:text-5xl lg:text-6xl dark:text-[#FAF6F0]"
        >
          What I&apos;ve Built
        </m.h2>
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 mt-4 max-w-2xl font-outfit text-sm text-[#59493E] sm:text-base dark:text-[#C5B8A5]"
        >
          Interactive showcase of real-world fullstack web apps, scalable APIs,
          and robust digital solutions. Slide, click, or swipe to explore each
          project.
        </m.p>
      </div>

      {visibleProjects && visibleProjects.length > 0 && currentProject ? (
        <div className="mx-auto max-w-6xl">
          {/* Main Showcase Stage */}
          <div className="glass-card relative overflow-hidden rounded-3xl border border-[#B39070]/30 bg-[#FAF6F0]/85 p-4 shadow-2xl transition-all duration-300 sm:p-6 lg:p-8 dark:border-[#B39070]/20 dark:bg-[#1C1210]/80">
            {/* Ambient Background Warm Glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#783E30]/10 blur-3xl transition-all duration-700 dark:bg-[#B39070]/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#B39070]/15 blur-3xl transition-all duration-700 dark:bg-[#783E30]/15" />

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
              {/* LEFT COLUMN: Project Dossier & Details (Col 6) - Order 2 on mobile, Order 1 on Desktop */}
              <div className="order-2 flex flex-col justify-between lg:order-1 lg:col-span-6">
                <div>
                  {/* Dynamic Content Area (Animated Title & Description) */}
                  <div className="min-h-[120px] sm:min-h-[160px]">
                    <AnimatePresence mode="wait" custom={direction}>
                      <m.div
                        key={currentProject._id}
                        custom={direction}
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        <h3 className="font-ovo text-2xl font-bold tracking-tight text-[#2B1810] sm:text-3xl dark:text-[#FAF6F0]">
                          {currentProject.title}
                        </h3>

                        <p className="mt-3 font-outfit text-sm leading-relaxed text-[#59493E] sm:text-base dark:text-[#C5B8A5]">
                          {currentProject.description}
                        </p>
                      </m.div>
                    </AnimatePresence>
                  </div>

                  {/* Tech Stack Pills */}
                  {currentProject.techStack &&
                    currentProject.techStack.length > 0 && (
                      <div className="mt-4 border-t border-[#B39070]/15 pt-3.5 sm:mt-5 sm:pt-4 dark:border-[#B39070]/10">
                        <p className="mb-2 font-outfit text-xs font-semibold uppercase tracking-wider text-[#783E30] dark:text-[#B39070]">
                          Technologies Used
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {currentProject.techStack.map((tech, techIndex) => {
                            const isObject = typeof tech === "object";
                            const title = isObject ? tech.title : tech;
                            const icon = isObject
                              ? getTechIcon(tech, isDarkMode)
                              : null;

                            return (
                              <div
                                key={techIndex}
                                className="shadow-xs inline-flex items-center gap-1.5 rounded-full border border-[#B39070]/30 bg-[#FAF6F0]/90 px-2.5 py-1 font-outfit text-xs font-medium text-[#2B1810] backdrop-blur-md transition-all hover:border-[#783E30] hover:bg-[#783E30]/10 dark:border-[#B39070]/25 dark:bg-[#2D1A17]/70 dark:text-[#FAF6F0] dark:hover:border-[#B39070] dark:hover:bg-[#B39070]/15"
                                title={title}
                              >
                                {icon ? (
                                  <Image
                                    src={icon}
                                    alt={title}
                                    width={15}
                                    height={15}
                                    className="h-3.5 w-3.5 shrink-0 object-contain"
                                  />
                                ) : (
                                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-[#B39070]/20 text-[9px] font-bold text-[#783E30] dark:text-[#B39070]">
                                    {title.substring(0, 2).toUpperCase()}
                                  </span>
                                )}
                                <span>{title}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                </div>

                {/* CTAs & Controls Bar */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3.5 border-t border-[#B39070]/20 pt-4 dark:border-[#B39070]/15">
                  {/* Action Link Buttons - Side by Side, responsive flex on mobile */}
                  <div className="flex w-full shrink-0 flex-row flex-nowrap items-center gap-2 sm:w-auto">
                    {hasDemoLink && (
                      <m.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={currentProject.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#783E30] px-4 py-2 font-outfit text-xs font-semibold text-[#FAF6F0] shadow-sm shadow-[#783E30]/20 transition-colors hover:bg-[#924D3D] sm:flex-initial"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Live Demo</span>
                      </m.a>
                    )}

                    {hasGithubLink && (
                      <m.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={currentProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shadow-xs inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#B39070]/35 bg-[#FAF6F0]/90 px-4 py-2 font-outfit text-xs font-semibold text-[#2B1810] backdrop-blur-md transition-all hover:border-[#783E30] hover:text-[#783E30] sm:flex-initial dark:border-[#B39070]/30 dark:bg-[#2D1A17]/80 dark:text-[#FAF6F0] dark:hover:border-[#B39070] dark:hover:text-[#B39070]"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>Source Code</span>
                      </m.a>
                    )}
                  </div>

                  {/* Navigation Arrows & Bullet Indicators - full-width spread on mobile */}
                  <div className="flex w-full items-center justify-between gap-2.5 sm:w-auto sm:justify-end">
                    <div className="flex items-center gap-1">
                      {visibleProjects.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => goToSlide(dotIdx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            dotIdx === currentIndex
                              ? "w-4 bg-[#783E30] dark:bg-[#B39070]"
                              : "w-1.5 bg-[#B39070]/35 hover:bg-[#783E30]/60 dark:bg-[#B39070]/30 dark:hover:bg-[#B39070]/60"
                          }`}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => paginate(-1)}
                        className="shadow-xs group flex h-8 w-8 items-center justify-center rounded-full border border-[#B39070]/35 bg-[#FAF6F0]/90 text-[#2B1810] backdrop-blur-md transition-all duration-200 hover:-translate-x-0.5 hover:border-[#783E30] hover:bg-[#783E30] hover:text-white active:scale-95 dark:border-[#B39070]/30 dark:bg-[#2D1A17]/80 dark:text-[#FAF6F0] dark:hover:border-[#B39070] dark:hover:bg-[#B39070] dark:hover:text-[#190E0C]"
                        aria-label="Previous Project"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => paginate(1)}
                        className="shadow-xs group flex h-8 w-8 items-center justify-center rounded-full border border-[#B39070]/35 bg-[#FAF6F0]/90 text-[#2B1810] backdrop-blur-md transition-all duration-200 hover:translate-x-0.5 hover:border-[#783E30] hover:bg-[#783E30] hover:text-white active:scale-95 dark:border-[#B39070]/30 dark:bg-[#2D1A17]/80 dark:text-[#FAF6F0] dark:hover:border-[#B39070] dark:hover:bg-[#B39070] dark:hover:text-[#190E0C]"
                        aria-label="Next Project"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Image Stage (Col 6) - Order 1 on mobile, Order 2 on Desktop */}
              <div className="order-1 flex flex-col lg:order-2 lg:col-span-6">
                {/* Badges placed ABOVE the image card on the right */}
                <div className="mb-2.5 flex items-center justify-end gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B39070]/35 bg-[#FAF6F0]/90 px-3 py-1 font-mono text-xs font-semibold text-[#783E30] dark:border-[#B39070]/30 dark:bg-[#2D1A17]/80 dark:text-[#D6BC9E]">
                    <Layers className="h-3 w-3" />
                    <span>
                      {String(currentIndex + 1).padStart(2, "0")} /{" "}
                      {String(projectCount).padStart(2, "0")}
                    </span>
                  </span>

                  {hasDemoLink && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-2.5 py-1 font-outfit text-xs font-medium text-emerald-700 backdrop-blur-md dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      Live Demo
                    </span>
                  )}
                </div>

                <div className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl border border-[#B39070]/30 bg-[#FAF6F0]/90 shadow-xl backdrop-blur-md sm:rounded-3xl dark:border-[#B39070]/20 dark:bg-[#140B0A]">
                  <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="popLayout"
                  >
                    <m.div
                      key={currentProject._id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.25}
                      onDragEnd={(_e, { offset, velocity }) => {
                        const swipe = offset.x;
                        if (swipe < -50 || velocity.x < -400) {
                          paginate(1);
                        } else if (swipe > 50 || velocity.x > 400) {
                          paginate(-1);
                        }
                      }}
                      className="relative h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
                      style={{ touchAction: "pan-y" }}
                    >
                      <Image
                        src={currentProject.bgImage}
                        alt={currentProject.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 650px"
                        priority
                        className="hover:scale-103 object-cover object-top transition-transform duration-700 ease-out"
                        quality={95}
                      />

                      {/* Subtle Top & Bottom Gradient Shadows */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                    </m.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-[#6E6755]">No projects to display</p>
      )}

      {/* GitHub External Repositories CTA */}
      <div className="mt-12 flex justify-center">
        <a
          href="https://github.com/irpanzy?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 rounded-full border border-[#B39070]/35 bg-[#FAF6F0]/85 px-5 py-2.5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#783E30] hover:shadow-md active:scale-95 dark:border-[#B39070]/25 dark:bg-[#2D1A17]/70 dark:hover:border-[#B39070]"
        >
          <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-r from-[#783E30]/25 to-[#B39070]/25 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B39070]/15 text-[#2B1810] transition-colors duration-300 group-hover:text-[#783E30] dark:text-[#FAF6F0] dark:group-hover:text-[#B39070]">
            <Github className="h-3.5 w-3.5" />
          </span>

          <span className="font-outfit text-xs font-semibold tracking-wide text-[#2B1810] transition-colors duration-300 group-hover:text-[#783E30] sm:text-sm dark:text-[#FAF6F0] dark:group-hover:text-[#B39070]">
            Show More on GitHub
          </span>

          <CircleArrowOutUpRight className="h-3.5 w-3.5 text-[#6E6755] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#783E30] dark:text-[#C5B8A5] dark:group-hover:text-[#B39070]" />
        </a>
      </div>
    </m.div>
  );
}
