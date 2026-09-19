"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Layout,
  Server,
  Smartphone,
  Database,
  Cloud,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useTechStack } from "@/hooks/useApi";
import { getTechIcon } from "@/lib/iconUtils";
import type { TechCategory, TechStack } from "@/types";

interface SkillsProps {
  isDarkMode: boolean;
  data?: TechStack[];
  isLoading?: boolean;
}

const CATEGORIES: {
  key: TechCategory;
  label: string;
  icon: LucideIcon;
}[] = [
  { key: "languages", label: "Languages", icon: Code2 },
  { key: "frontend", label: "Frontend", icon: Layout },
  { key: "backend", label: "Backend", icon: Server },
  { key: "mobile", label: "Mobile", icon: Smartphone },
  { key: "database", label: "Database", icon: Database },
  { key: "devops_cloud", label: "DevOps & Cloud", icon: Cloud },
  { key: "tools", label: "Tools", icon: Wrench },
];

export default function Skills({
  isDarkMode,
  data: propData,
  isLoading: propIsLoading,
}: SkillsProps) {
  const { data: queryData, isLoading: queryIsLoading } = useTechStack();
  const techStack = propData !== undefined ? propData : queryData;
  const isLoadingTechStack =
    propIsLoading !== undefined ? propIsLoading : !propData && queryIsLoading;

  const [selectedCategory, setSelectedCategory] =
    useState<TechCategory>("languages");

  // Scroll hint state for mobile tab bar
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const checkTabScroll = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;

    const onScroll = () => {
      checkTabScroll();
      if (!hasScrolled && el.scrollLeft > 10) setHasScrolled(true);
    };

    checkTabScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(checkTabScroll);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [checkTabScroll, hasScrolled]);

  // Filter and deduplicate skills
  const allSkills = useMemo(() => {
    if (!techStack || techStack.length === 0) return [];
    return [...techStack].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [techStack]);

  // Counts for each category
  const countPerCategory = useMemo(() => {
    const counts: Record<string, number> = {};

    allSkills.forEach((item) => {
      const cats =
        Array.isArray(item.categories) && item.categories.length > 0
          ? item.categories
          : item.category
            ? [item.category]
            : ["tools"];

      cats.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });

    return counts;
  }, [allSkills]);

  // Skills filtered by selected category
  const filteredSkills = useMemo(() => {
    return allSkills.filter((item) => {
      if (Array.isArray(item.categories) && item.categories.length > 0) {
        return item.categories.includes(selectedCategory);
      }
      return item.category === selectedCategory;
    });
  }, [allSkills, selectedCategory]);

  return (
    <m.div
      id="skills"
      className="relative w-full scroll-mt-20 overflow-hidden px-4 py-16 md:px-12 lg:px-[10%]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Decorative Ambient Blur */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B39070]/10 blur-3xl dark:bg-[#783E30]/15" />

      {/* Section Header */}
      <div className="relative z-10 text-center">
        <m.p
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2 font-ovo text-lg text-[#783E30] dark:text-[#B39070]"
        >
          What I Use
        </m.p>
        <m.h2
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-ovo text-4xl sm:text-5xl"
        >
          Skills &amp; Technologies
        </m.h2>
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mb-10 mt-4 max-w-2xl font-outfit text-sm text-[#59493E] md:text-base dark:text-[#C5B8A5]"
        >
          An interactive collection of modern languages, frameworks, databases,
          and developer tools I leverage to build resilient digital products.
        </m.p>
      </div>

      {/* Interactive Category Tabs Bar */}
      <div className="relative z-10 mx-auto mb-8 w-full px-2 md:mb-12">
        <div className="relative mx-auto flex justify-center">
          {/* Left fade mask — mobile only */}
          <m.div
            animate={{ opacity: canScrollLeft ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute left-0 top-0 z-20 h-full w-8 rounded-l-full bg-gradient-to-r from-[#FAF6F0] to-transparent md:hidden dark:from-[#2D1A17]"
          />

          <div
            ref={tabsRef}
            className="no-scrollbar flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-[#B39070]/25 bg-[#FAF6F0]/80 p-1.5 shadow-sm backdrop-blur-xl md:flex-wrap md:justify-center md:overflow-visible dark:border-[#B39070]/20 dark:bg-[#2D1A17]/70"
          >
            {CATEGORIES.map(({ key, label, icon: IconComponent }) => {
              const isSelected = selectedCategory === key;
              const count = countPerCategory[key] || 0;
              if (count === 0) return null;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedCategory(key)}
                  className={`relative flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 font-outfit text-xs font-semibold transition-colors duration-300 md:gap-2 md:px-4 md:text-sm ${
                    isSelected
                      ? "text-[#FAF6F0] dark:text-[#1C0F0D]"
                      : "text-[#59493E] hover:text-[#783E30] dark:text-[#C5B8A5] dark:hover:text-[#FAF6F0]"
                  }`}
                >
                  {/* Active Pill Indicator via Framer Motion */}
                  {isSelected && (
                    <m.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 rounded-full bg-[#783E30] shadow-md shadow-[#783E30]/20 dark:bg-[#B39070] dark:shadow-black/30"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 0.8,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1 md:gap-1.5">
                    <IconComponent className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    <span className="whitespace-nowrap">{label}</span>
                    <span
                      className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        isSelected
                          ? "bg-white/20 text-white dark:bg-black/20 dark:text-[#1C0F0D]"
                          : "bg-[#B39070]/20 text-[#59493E] dark:bg-[#B39070]/20 dark:text-[#C5B8A5]"
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right fade mask — mobile only */}
          <m.div
            animate={{ opacity: canScrollRight ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute right-0 top-0 z-20 h-full w-8 rounded-r-full bg-gradient-to-l from-[#FAF6F0] to-transparent md:hidden dark:from-[#2D1A17]"
          />
        </div>

        {/* Swipe hint — mobile only, disappears after user scrolls */}
        <AnimatePresence>
          {!hasScrolled && canScrollRight && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-3 flex items-center justify-center gap-1 md:hidden"
            >
              <m.span
                animate={{ x: [0, -3, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronLeft className="h-3 w-3 text-[#B39070]/40 dark:text-[#B39070]/30" />
              </m.span>
              <span className="font-outfit text-[11px] font-medium text-[#B39070]/50 dark:text-[#B39070]/35">
                Swipe for more categories
              </span>
              <m.span
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronRight className="h-3 w-3 text-[#B39070]/40 dark:text-[#B39070]/30" />
              </m.span>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Capsule Cloud Canvas */}
      <div className="relative z-10 mx-auto min-h-[220px] max-w-5xl md:min-h-[260px]">
        {isLoadingTechStack ? (
          <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 lg:gap-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-28 animate-pulse rounded-full border border-[#B39070]/20 bg-[#FAF6F0]/60 md:h-12 md:w-36 dark:border-[#B39070]/15 dark:bg-[#2D1A17]/50"
              />
            ))}
          </div>
        ) : filteredSkills.length > 0 ? (
          <div className="flex justify-center">
            <AnimatePresence mode="popLayout">
              <m.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3.5 lg:gap-4"
              >
                {filteredSkills.map((tool, index) => {
                  const iconSrc = getTechIcon(tool, isDarkMode);

                  return (
                    <m.div
                      key={`${selectedCategory}-${tool._id}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min(index * 0.04, 0.35),
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative flex cursor-default items-center gap-2 rounded-full border border-[#B39070]/25 bg-[#FAF6F0]/85 py-1.5 pl-2 pr-3 shadow-sm backdrop-blur-md transition-[border-color,box-shadow] duration-200 hover:border-[#783E30] hover:shadow-[0_8px_20px_rgba(120,62,48,0.12)] md:gap-3 md:py-2 md:pl-2.5 md:pr-4 dark:border-[#B39070]/20 dark:bg-[#2D1A17]/75 dark:hover:border-[#B39070] dark:hover:shadow-[0_8px_20px_rgba(179,144,112,0.15)]"
                    >
                      {/* Subtle Ambient Glow on Hover */}
                      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#783E30]/10 via-[#B39070]/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:from-[#B39070]/15 dark:to-transparent" />

                      {/* Tech Logo Pill */}
                      <div className="shadow-2xs relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#B39070]/20 bg-[#FAF6F0] p-1.5 transition-transform duration-200 will-change-transform group-hover:scale-110 md:h-8 md:w-8 dark:border-[#B39070]/20 dark:bg-[#1C0F0D]">
                        {iconSrc ? (
                          <Image
                            src={iconSrc}
                            alt={tool.title}
                            width={24}
                            height={24}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-[10px] font-bold text-[#783E30] md:text-[11px] dark:text-[#B39070]">
                            {tool.title.substring(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* Tech Name */}
                      <span className="relative z-10 font-outfit text-xs font-semibold tracking-tight text-[#2B1810] transition-colors group-hover:text-[#783E30] md:text-sm dark:text-[#FAF6F0] dark:group-hover:text-[#D6BC9E]">
                        {tool.title}
                      </span>

                      {/* Minimalist Proficiency Level Dots */}
                      {tool.proficiencyLevel && tool.proficiencyLevel > 0 ? (
                        <div
                          className="relative z-10 flex items-center gap-0.5 border-l border-[#B39070]/20 pl-1.5 md:pl-2 dark:border-[#B39070]/20"
                          title={`Proficiency: ${tool.proficiencyLevel}/5`}
                        >
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <span
                              key={idx}
                              className={`h-1 w-1 rounded-full md:h-1.5 md:w-1.5 ${
                                idx < (tool.proficiencyLevel || 0)
                                  ? "bg-[#783E30] dark:bg-[#B39070]"
                                  : "bg-[#B39070]/25 dark:bg-[#B39070]/20"
                              }`}
                            />
                          ))}
                        </div>
                      ) : null}
                    </m.div>
                  );
                })}
              </m.div>
            </AnimatePresence>
          </div>
        ) : (
          <p className="py-12 text-center font-outfit text-sm text-[#6E6755] dark:text-[#C5B8A5]">
            No skills found in this category.
          </p>
        )}
      </div>
    </m.div>
  );
}
