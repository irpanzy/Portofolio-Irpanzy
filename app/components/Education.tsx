"use client";

import React, { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  Eye,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useEducations } from "@/hooks/useApi";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EducationAttachment } from "@/types";

interface EducationProps {
  isDarkMode: boolean;
}

const typeConfig: Record<
  string,
  { label: string; color: string; darkColor: string }
> = {
  formal: {
    label: "Formal",
    color: "bg-blue-100 text-blue-700",
    darkColor: "dark:bg-blue-900/40 dark:text-blue-300",
  },
  bootcamp: {
    label: "Bootcamp",
    color: "bg-orange-100 text-orange-700",
    darkColor: "dark:bg-orange-900/40 dark:text-orange-300",
  },
  certification: {
    label: "Certification",
    color: "bg-green-100 text-green-700",
    darkColor: "dark:bg-green-900/40 dark:text-green-300",
  },
  course: {
    label: "Course",
    color: "bg-purple-100 text-purple-700",
    darkColor: "dark:bg-purple-900/40 dark:text-purple-300",
  },
};

export default function Education({ isDarkMode }: EducationProps) {
  const { data: educations, isLoading } = useEducations();
  const [selectedAttachment, setSelectedAttachment] = useState<{
    attachment: EducationAttachment;
    list: EducationAttachment[];
    index: number;
  } | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getPeriod = (edu: {
    startDate: string;
    endDate?: string;
    current: boolean;
  }) => {
    const start = formatDate(edu.startDate);
    const end = edu.current
      ? "Present"
      : edu.endDate
        ? formatDate(edu.endDate)
        : "Present";
    return `${start} - ${end}`;
  };

  const normalizeAttachments = (
    rawAttachments?: any
  ): EducationAttachment[] => {
    if (!rawAttachments) return [];
    let list = rawAttachments;
    if (typeof rawAttachments === "string") {
      try {
        list = JSON.parse(rawAttachments);
      } catch {
        return [{ title: "Certificate / Document", url: rawAttachments }];
      }
    }
    if (!Array.isArray(list)) return [];
    return list
      .map((item: any, idx: number) => {
        if (!item) return null;
        if (typeof item === "string") {
          return { title: `Certificate ${idx + 1}`, url: item };
        }
        if (typeof item === "object" && item.url) {
          return {
            title: item.title || `Certificate ${idx + 1}`,
            url: item.url,
            fileId: item.fileId,
          };
        }
        return null;
      })
      .filter(Boolean) as EducationAttachment[];
  };

  const handleNavigateAttachment = (direction: "prev" | "next") => {
    if (!selectedAttachment) return;
    const { list, index } = selectedAttachment;
    if (list.length <= 1) return;

    let newIndex = direction === "next" ? index + 1 : index - 1;
    if (newIndex < 0) newIndex = list.length - 1;
    if (newIndex >= list.length) newIndex = 0;

    setSelectedAttachment({
      attachment: list[newIndex],
      list,
      index: newIndex,
    });
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="education"
      className="w-full scroll-mt-20 px-4 py-8 md:px-12"
    >
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 text-center font-ovo text-lg"
      >
        Academic Background
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center font-ovo text-5xl md:text-5xl"
      >
        Education
      </m.h2>
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mx-auto mb-12 mt-5 max-w-3xl text-center font-ovo text-sm text-gray-600 md:text-base dark:text-gray-300"
      >
        Formal education, bootcamps, and certifications that shaped my skills
        and expertise in software development.
      </m.p>

      {isLoading ? (
        <div className="mx-auto max-w-5xl space-y-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg bg-gray-200 p-8 dark:bg-gray-800"
            >
              <div className="mb-4 h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="mb-2 h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
          ))}
        </div>
      ) : (
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mx-auto max-w-5xl space-y-8"
        >
          {educations?.map((edu, index) => {
            const badge = typeConfig[edu.type] || typeConfig.formal;
            const attachments = normalizeAttachments(edu.attachments);

            return (
              <m.div
                key={edu._id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                className="relative border-l-2 border-gray-300 pb-12 pl-8 last:pb-0 dark:border-gray-600"
              >
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full border-4 border-white bg-[#77BEF0] dark:border-darkTheme"></div>

                <m.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-lg border border-gray-200 bg-white p-6 font-outfit shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-600 dark:bg-darkHover/30"
                >
                  <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4">
                      {edu.logo && (
                        <m.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.1 }}
                          className="flex-shrink-0"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 shadow-sm md:h-14 md:w-14 dark:border-gray-600 dark:bg-gray-800">
                            <Image
                              src={edu.logo}
                              alt={`${edu.institution} logo`}
                              width={48}
                              height={48}
                              className="object-contain"
                              loading="lazy"
                              style={{ width: "100%", height: "100%" }}
                            />
                          </div>
                        </m.div>
                      )}

                      <div className="flex-grow">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <h3 className="font-outfit text-xl font-semibold text-gray-800 dark:text-white">
                            {edu.degree}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.color} ${badge.darkColor}`}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <div
                          className="mt-1 flex items-center gap-2 font-medium text-[#77BEF0]"
                          title={edu.institution}
                        >
                          <GraduationCap className="h-4 w-4 shrink-0" />
                          <span>
                            {edu.institution.length > 20
                              ? `${edu.institution.slice(0, 20)}...`
                              : edu.institution}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-col gap-1 md:ml-4 md:mt-0 md:items-end">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="h-4 w-4" />
                        <span>{getPeriod(edu)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>

                  {edu.description && (
                    <p className="text-justify text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {edu.description}
                    </p>
                  )}

                  {/* Certificates & Documentation Gallery */}
                  {attachments.length > 0 && (
                    <div className="mt-5 border-t border-gray-100 pt-4 dark:border-gray-700/60">
                      <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <Award className="h-3.5 w-3.5 text-[#77BEF0]" />
                        <span>
                          Certificates & Documentation ({attachments.length})
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {attachments.map((att, attIdx) => (
                          <m.button
                            key={attIdx}
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() =>
                              setSelectedAttachment({
                                attachment: att,
                                list: attachments,
                                index: attIdx,
                              })
                            }
                            className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-50 text-left shadow-sm transition-all hover:border-[#77BEF0] hover:shadow-md dark:border-gray-700 dark:bg-gray-800/60"
                          >
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                              <Image
                                src={att.url}
                                alt={att.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                <Eye className="h-5 w-5 text-white drop-shadow" />
                              </div>
                            </div>
                            <div className="p-2.5">
                              <p className="line-clamp-1 text-xs font-medium text-gray-800 dark:text-gray-200">
                                {att.title}
                              </p>
                            </div>
                          </m.button>
                        ))}
                      </div>
                    </div>
                  )}
                </m.div>
              </m.div>
            );
          })}
        </m.div>
      )}

      {/* Lightbox / Image Viewer Dialog */}
      <Dialog
        open={!!selectedAttachment}
        onOpenChange={(open) => !open && setSelectedAttachment(null)}
      >
        <DialogContent className="w-[94vw] max-w-3xl overflow-hidden rounded-2xl border border-gray-200/80 bg-white/95 p-3 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-5 dark:border-gray-800/80 dark:bg-gray-900/95">
          <DialogHeader className="mb-2">
            <div className="flex items-center justify-between gap-2 pr-6 sm:pr-8">
              <DialogTitle className="flex items-center gap-2 text-sm font-semibold sm:text-base md:text-lg">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#77BEF0]/15 text-[#2170a8] dark:bg-[#77BEF0]/20 dark:text-[#90cdf4]">
                  <Award className="h-4 w-4" />
                </div>
                <span className="line-clamp-1">
                  {selectedAttachment?.attachment.title || "Document Preview"}
                </span>
              </DialogTitle>
            </div>
          </DialogHeader>

          {selectedAttachment && (
            <div className="relative flex flex-col items-center">
              {/* Main Image Container with Animated Presence */}
              <div className="relative aspect-[4/3] max-h-[58vh] w-full overflow-hidden rounded-xl border border-gray-200/80 bg-black/5 sm:aspect-[16/10] sm:max-h-[62vh] sm:rounded-2xl dark:border-gray-800 dark:bg-black/60">
                <AnimatePresence mode="wait">
                  <m.div
                    key={selectedAttachment.attachment.url}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={selectedAttachment.attachment.url}
                      alt={selectedAttachment.attachment.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 94vw, 800px"
                      priority
                    />
                  </m.div>
                </AnimatePresence>

                {/* Previous / Next Floating Buttons on Image (if list.length > 1) */}
                {selectedAttachment.list.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleNavigateAttachment("prev")}
                      title="Previous Document"
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 active:scale-95 sm:left-3 sm:p-2.5"
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigateAttachment("next")}
                      title="Next Document"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 active:scale-95 sm:right-3 sm:p-2.5"
                    >
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Footer Bar: Counter & Open Full Image */}
              <div className="mt-3 flex w-full items-center justify-between px-1 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  {selectedAttachment.list.length > 1 && (
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      {selectedAttachment.index + 1} /{" "}
                      {selectedAttachment.list.length}
                    </span>
                  )}
                  <span className="line-clamp-1 max-w-[170px] text-gray-600 sm:max-w-xs dark:text-gray-300">
                    {selectedAttachment.attachment.title}
                  </span>
                </div>

                <a
                  href={selectedAttachment.attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <span>Open Full</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </m.div>
  );
}
