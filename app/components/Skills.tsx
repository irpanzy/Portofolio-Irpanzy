"use client";

import { useTechStack } from "@/hooks/useApi";
import Image from "next/image";
import React from "react";
import { m } from "framer-motion";
import {
  Star,
  Code2,
  Layout,
  Server,
  Smartphone,
  Database,
  Cloud,
  Wrench,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from "lucide-react";
import type { TechCategory, TechStack } from "@/types";
import { getTechIcon } from "@/lib/iconUtils";

interface SkillsProps {
  isDarkMode: boolean;
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
    iconColor: "text-amber-500 bg-amber-50 dark:bg-amber-950/40",
  },
  {
    key: "frontend",
    label: "Frontend",
    icon: Layout,
    iconColor: "text-blue-500 bg-blue-50 dark:bg-blue-950/40",
  },
  {
    key: "backend",
    label: "Backend",
    icon: Server,
    iconColor: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: Smartphone,
    iconColor: "text-purple-500 bg-purple-50 dark:bg-purple-950/40",
  },
  {
    key: "database",
    label: "Database",
    icon: Database,
    iconColor: "text-rose-500 bg-rose-50 dark:bg-rose-950/40",
  },
  {
    key: "devops_cloud",
    label: "DevOps & Cloud",
    icon: Cloud,
    iconColor: "text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40",
  },
  {
    key: "tools",
    label: "Tools",
    icon: Wrench,
    iconColor: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40",
  },
];

export default function Skills({ isDarkMode }: SkillsProps) {
  const { data: techStack, isLoading: isLoadingTechStack } = useTechStack();

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
        className="mb-2 text-center font-ovo text-lg"
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
        className="mx-auto mb-12 mt-5 max-w-3xl text-center font-ovo text-sm text-gray-600 md:text-base dark:text-gray-300"
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
              className="h-44 animate-pulse rounded-2xl border border-gray-200/60 bg-gray-100/60 p-5 dark:border-white/5 dark:bg-white/5"
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
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#77BEF0]/50 hover:shadow-lg dark:border-white/10 dark:bg-[#1a0033]/60 dark:hover:border-[#77BEF0]/40"
                >
                  {/* Ambient Glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#77BEF0]/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    {/* Category Header */}
                    <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-white/5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconColor}`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <h4 className="font-outfit text-base font-bold text-gray-900 dark:text-white">
                          {label}
                        </h4>
                      </div>
                      <span className="inline-flex items-center rounded-full border border-gray-200/80 bg-gray-50 px-2.5 py-0.5 font-outfit text-xs font-semibold text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
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
                            whileHover={{ scale: 1.04, y: -2 }}
                            className="shadow-xs flex flex-col items-center justify-center gap-1.5 rounded-xl border border-gray-200/70 bg-white/90 p-2.5 text-center transition-all duration-200 hover:border-[#77BEF0] hover:bg-[#77BEF0]/5 hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:hover:border-[#77BEF0]/60 dark:hover:bg-[#77BEF0]/10"
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
                                <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-100 text-[10px] font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                  {tool.title.substring(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>

                            <span className="w-full truncate font-outfit text-xs font-semibold text-gray-800 dark:text-gray-200">
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
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-gray-300 dark:text-gray-600"
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
                      <div className="mt-3.5 flex justify-center border-t border-gray-100/80 pt-2.5 dark:border-white/5">
                        <button
                          type="button"
                          onClick={() => toggleCategory(key)}
                          className="shadow-2xs inline-flex items-center gap-1.5 rounded-full border border-gray-200/80 bg-gray-50/80 px-3 py-1 font-outfit text-xs font-semibold text-gray-700 transition-all duration-200 hover:border-[#77BEF0] hover:bg-[#77BEF0]/10 hover:text-[#2573ab] dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-[#77BEF0] dark:hover:text-[#90cdf4]"
                        >
                          {isExpanded ? (
                            <>
                              <span>Show Less</span>
                              <ChevronUp className="h-3.5 w-3.5" />
                            </>
                          ) : (
                            <>
                              <span>Show More (+{items.length - limit})</span>
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
        <div className="py-8 text-center text-sm text-gray-500">
          No tech stack items found.
        </div>
      )}
    </m.div>
  );
}
