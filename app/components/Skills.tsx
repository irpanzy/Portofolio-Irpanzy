"use client";

import React from "react";
import { m } from "framer-motion";
import {
  Code2,
  Layout,
  Server,
  Smartphone,
  Database,
  Cloud,
  Wrench,
  ChevronDown,
  ChevronUp,
  Star,
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

const categoryConfigs: {
  key: TechCategory;
  label: string;
  icon: LucideIcon;
  iconColor: string;
}[] = [
  {
    key: "languages",
    label: "Languages",
    icon: Code2,
    iconColor:
      "text-[#783E30] bg-[#783E30]/10 dark:text-[#D6BC9E] dark:bg-[#783E30]/20",
  },
  {
    key: "frontend",
    label: "Frontend",
    icon: Layout,
    iconColor:
      "text-[#B39070] bg-[#B39070]/15 dark:text-[#FAF6F0] dark:bg-[#B39070]/25",
  },
  {
    key: "backend",
    label: "Backend",
    icon: Server,
    iconColor:
      "text-[#6E6755] bg-[#6E6755]/15 dark:text-[#C5B8A5] dark:bg-[#6E6755]/25",
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: Smartphone,
    iconColor:
      "text-[#783E30] bg-[#783E30]/10 dark:text-[#D6BC9E] dark:bg-[#783E30]/20",
  },
  {
    key: "database",
    label: "Database",
    icon: Database,
    iconColor:
      "text-[#B39070] bg-[#B39070]/15 dark:text-[#FAF6F0] dark:bg-[#B39070]/25",
  },
  {
    key: "devops_cloud",
    label: "DevOps & Cloud",
    icon: Cloud,
    iconColor:
      "text-[#6E6755] bg-[#6E6755]/15 dark:text-[#C5B8A5] dark:bg-[#6E6755]/25",
  },
  {
    key: "tools",
    label: "Tools",
    icon: Wrench,
    iconColor:
      "text-[#B39070] bg-[#B39070]/15 dark:text-[#FAF6F0] dark:bg-[#B39070]/25",
  },
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

  const [isMobile, setIsMobile] = React.useState(false);
  const [expandedCategories, setExpandedCategories] = React.useState<
    Record<string, boolean>
  >({});

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleCategory = (key: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Group tech stacks by category (supports multi-category items)
  const groupedTech = React.useMemo(() => {
    if (!techStack || techStack.length === 0) return {};
    return techStack.reduce(
      (acc, item) => {
        const cats =
          Array.isArray(item.categories) && item.categories.length > 0
            ? item.categories
            : item.category
              ? [item.category]
              : ["tools"];

        cats.forEach((cat) => {
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(item);
        });
        return acc;
      },
      {} as Record<string, TechStack[]>
    );
  }, [techStack]);

  const hasCategorizedData = Object.keys(groupedTech).length > 0;

  return (
    <m.div
      id="skills"
      className="w-full scroll-mt-20 px-4 py-8 md:px-12 lg:px-[12%]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Section Header */}
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 text-center font-ovo text-lg text-[#783E30] dark:text-[#B39070]"
      >
        What I Use
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center font-ovo text-5xl"
      >
        Skills &amp; Technologies
      </m.h2>
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mx-auto mb-12 mt-5 max-w-3xl text-center font-outfit text-sm text-[#59493E] md:text-base dark:text-[#C5B8A5]"
      >
        A categorized look at the languages, frameworks, databases, and tools I
        use to craft modern digital solutions.
      </m.p>

      {/* Bento Grid Content */}
      {isLoadingTechStack ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-3xl border border-[#B39070]/20 bg-[#FAF6F0]/60 p-5 backdrop-blur-md dark:border-[#B39070]/15 dark:bg-[#2D1A17]/60"
            />
          ))}
        </div>
      ) : hasCategorizedData ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {categoryConfigs.map(
            ({ key, label, icon: IconComponent, iconColor }) => {
              const items = groupedTech[key];
              if (!items || items.length === 0) return null;

              const limit = isMobile ? 6 : 8;
              const isExpanded = !!expandedCategories[key];
              const displayedItems = isExpanded ? items : items.slice(0, limit);
              const hasMore = items.length > limit;

              return (
                <m.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:border-[#783E30]/40 dark:hover:border-[#B39070]/40"
                >
                  {/* Ambient Glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#B39070]/15 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    {/* Category Header */}
                    <div className="mb-4 flex items-center justify-between border-b border-[#B39070]/15 pb-3 dark:border-[#B39070]/10">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl ${iconColor}`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <h3 className="font-outfit text-base font-bold text-[#2B1810] dark:text-[#FAF6F0]">
                          {label}
                        </h3>
                      </div>
                      <span className="shadow-2xs inline-flex items-center rounded-full border border-[#B39070]/25 bg-[#FAF6F0]/80 px-2.5 py-0.5 font-outfit text-xs font-semibold text-[#59493E] dark:border-[#B39070]/20 dark:bg-[#2D1A17]/60 dark:text-[#C5B8A5]">
                        {items.length} {items.length === 1 ? "Skill" : "Skills"}
                      </span>
                    </div>

                    {/* Skill Badges Grid */}
                    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                      {displayedItems.map((tool) => {
                        const iconSrc = getTechIcon(tool, isDarkMode);

                        return (
                          <m.div
                            key={`${key}-${tool._id}`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="shadow-2xs hover:shadow-xs flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-[#B39070]/20 bg-[#FAF6F0]/70 p-2.5 text-center transition-all duration-200 hover:border-[#783E30] hover:bg-[#783E30]/5 dark:border-[#B39070]/15 dark:bg-[#2D1A17]/60 dark:hover:border-[#B39070] dark:hover:bg-[#B39070]/10"
                          >
                            <div className="relative flex h-9 w-9 items-center justify-center">
                              {iconSrc ? (
                                <Image
                                  src={iconSrc}
                                  alt={tool.title}
                                  className="h-full w-full object-contain p-0.5"
                                  width={36}
                                  height={36}
                                  loading="lazy"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#B39070]/15 text-[10px] font-bold text-[#59493E] dark:bg-[#B39070]/20 dark:text-[#C5B8A5]">
                                  {tool.title.substring(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>

                            <span className="w-full truncate font-outfit text-xs font-semibold text-[#2B1810] dark:text-[#FAF6F0]">
                              {tool.title}
                            </span>

                            {tool.proficiencyLevel &&
                            tool.proficiencyLevel > 0 ? (
                              <div
                                className="flex items-center gap-0.5"
                                title={`Proficiency: ${tool.proficiencyLevel}/5`}
                              >
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-2.5 w-2.5 ${
                                      i < (tool.proficiencyLevel || 0)
                                        ? "fill-[#B39070] text-[#B39070]"
                                        : "text-[#B39070]/30 dark:text-[#B39070]/20"
                                    }`}
                                  />
                                ))}
                              </div>
                            ) : (
                              <div className="h-2.5" />
                            )}
                          </m.div>
                        );
                      })}
                    </div>

                    {/* Show More / Show Less Button */}
                    {hasMore && (
                      <div className="mt-3.5 flex justify-center border-t border-[#B39070]/15 pt-2.5 dark:border-[#B39070]/10">
                        <button
                          type="button"
                          onClick={() => toggleCategory(key)}
                          className="shadow-2xs inline-flex items-center gap-1.5 rounded-full border border-[#B39070]/30 bg-[#FAF6F0]/80 px-3 py-1 font-outfit text-xs font-semibold text-[#59493E] transition-all duration-200 hover:border-[#783E30] hover:bg-[#783E30]/10 hover:text-[#783E30] dark:border-[#B39070]/20 dark:bg-[#2D1A17]/60 dark:text-[#C5B8A5] dark:hover:border-[#B39070] dark:hover:text-[#FAF6F0]"
                        >
                          {isExpanded ? (
                            <>
                              <span>Show Less</span>
                              <ChevronUp className="h-3.5 w-3.5" />
                            </>
                          ) : (
                            <>
                              <span>Show All ({items.length})</span>
                              <ChevronDown className="h-3.5 w-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </m.div>
              );
            }
          )}
        </div>
      ) : (
        <p className="text-center text-[#6E6755]">No tech stack to display</p>
      )}
    </m.div>
  );
}
