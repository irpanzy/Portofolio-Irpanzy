"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Building2,
  Award,
  Eye,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  ListChecks,
} from "lucide-react";
import { useExperiences } from "@/hooks/useApi";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PdfThumbnail from "@/components/PdfThumbnail";
import type { ExperienceAttachment } from "@/types";

interface ExperienceProps {
  isDarkMode: boolean;
}

export default function Experience({ isDarkMode }: ExperienceProps) {
  const { data: experiences, isLoading } = useExperiences();
  const [selectedAttachment, setSelectedAttachment] = useState<{
    attachment: ExperienceAttachment;
    list: ExperienceAttachment[];
    index: number;
  } | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getPeriod = (exp: {
    startDate: string;
    endDate?: string;
    current: boolean;
  }) => {
    const start = formatDate(exp.startDate);
    const end = exp.current
      ? "Present"
      : exp.endDate
        ? formatDate(exp.endDate)
        : "Present";
    return `${start} - ${end}`;
  };

  const normalizeAttachments = (
    rawAttachments?: any
  ): ExperienceAttachment[] => {
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
          return { title: `Document ${idx + 1}`, url: item };
        }
        if (typeof item === "object" && item.url) {
          return {
            title: item.title || `Document ${idx + 1}`,
            url: item.url,
            fileId: item.fileId,
          };
        }
        return null;
      })
      .filter(Boolean) as ExperienceAttachment[];
  };

  const handleNavigateAttachment = (direction: "prev" | "next") => {
    if (!selectedAttachment) return;
    const { list, index } = selectedAttachment;
    const newIndex =
      direction === "prev"
        ? (index - 1 + list.length) % list.length
        : (index + 1) % list.length;
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
      id="experience"
      className="w-full scroll-mt-20 px-4 py-8 md:px-12"
    >
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 text-center font-ovo text-lg"
      >
        Professional Journey
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center font-ovo text-5xl md:text-5xl"
      >
        Work Experience
      </m.h2>
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mx-auto mb-12 mt-5 max-w-3xl text-center font-ovo text-sm text-gray-600 md:text-base dark:text-gray-300"
      >
        Real-world experience building scalable applications and working with
        modern web technologies in professional environments.
      </m.p>

      {isLoading ? (
        <div className="mx-auto max-w-5xl space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
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
          {experiences?.map((exp, index) => {
            const attachments = normalizeAttachments(exp.attachments);

            return (
              <m.div
                key={exp._id}
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
                      {exp.logo && (
                        <m.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.1 }}
                          className="flex-shrink-0"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 shadow-sm md:h-14 md:w-14 dark:border-gray-600 dark:bg-gray-800">
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} logo`}
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
                        <h3 className="font-ovo text-xl font-semibold text-gray-800 dark:text-white">
                          {exp.position}
                        </h3>
                        <div className="mt-1 flex items-center gap-2 font-medium text-[#77BEF0]">
                          <Building2 className="h-4 w-4" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2 md:ml-4 md:mt-0 md:flex-col md:items-end md:gap-1.5">
                      <span className="shadow-xs inline-flex items-center gap-1.5 rounded-lg border border-gray-200/60 bg-gray-50/80 px-2.5 py-1 text-xs font-medium text-gray-600 dark:border-gray-700/60 dark:bg-gray-800/60 dark:text-gray-300">
                        <Calendar className="h-3.5 w-3.5 text-[#77BEF0]" />
                        <span>{getPeriod(exp)}</span>
                      </span>
                      <span className="shadow-xs inline-flex items-center gap-1.5 rounded-lg border border-gray-200/60 bg-gray-50/80 px-2.5 py-1 text-xs font-medium text-gray-600 dark:border-gray-700/60 dark:bg-gray-800/60 dark:text-gray-300">
                        <MapPin className="h-3.5 w-3.5 text-[#77BEF0]" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  {exp.description && (
                    <div className="mb-5 rounded-r-xl border border-l-4 border-gray-100 border-l-[#77BEF0] bg-slate-50/70 p-4 shadow-sm dark:border-gray-700/60 dark:border-l-[#77BEF0] dark:bg-darkHover/40">
                      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <Briefcase className="h-3.5 w-3.5 text-[#77BEF0]" />
                        <span>Role Overview</span>
                      </div>
                      <p className="text-justify text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                        {exp.description}
                      </p>
                    </div>
                  )}

                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <div>
                      <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <ListChecks className="h-3.5 w-3.5 text-[#77BEF0]" />
                        <span>Key Responsibilities</span>
                      </div>
                      <m.ul className="space-y-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        {exp.responsibilities.map((responsibility, idx) => (
                          <m.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 1.2 + idx * 0.1,
                            }}
                            className="flex items-start gap-3"
                          >
                            <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#77BEF0]"></div>
                            <span className="text-justify">
                              {responsibility}
                            </span>
                          </m.li>
                        ))}
                      </m.ul>
                    </div>
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
                        {attachments.map((att, attIdx) => {
                          const isPdf = att.url?.toLowerCase().includes(".pdf");

                          return (
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
                                {isPdf ? (
                                  <PdfThumbnail
                                    url={att.url}
                                    title={att.title}
                                  />
                                ) : (
                                  <Image
                                    src={att.url}
                                    alt={att.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                  />
                                )}
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
                          );
                        })}
                      </div>
                    </div>
                  )}
                </m.div>
              </m.div>
            );
          })}
        </m.div>
      )}

      {/* Lightbox / Document Viewer Dialog */}
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

          {selectedAttachment &&
            (() => {
              const isPdf = selectedAttachment.attachment.url
                ?.toLowerCase()
                .includes(".pdf");

              return (
                <div className="relative flex flex-col items-center">
                  {/* Main Media Container with Animated Presence */}
                  <div className="relative aspect-[4/3] max-h-[58vh] min-h-[38vh] w-full overflow-hidden rounded-xl border border-gray-200/80 bg-black/5 sm:aspect-[16/10] sm:max-h-[66vh] sm:min-h-[55vh] sm:rounded-2xl dark:border-gray-800 dark:bg-black/60">
                    <AnimatePresence mode="wait">
                      <m.div
                        key={selectedAttachment.attachment.url}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative h-full w-full"
                      >
                        {isPdf ? (
                          <div className="relative flex h-full w-full flex-col">
                            <iframe
                              src={`${selectedAttachment.attachment.url}#view=FitH`}
                              className="h-full w-full rounded-xl border-0 bg-white"
                              title={selectedAttachment.attachment.title}
                            />
                          </div>
                        ) : (
                          <Image
                            src={selectedAttachment.attachment.url}
                            alt={selectedAttachment.attachment.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 94vw, 800px"
                            priority
                          />
                        )}
                      </m.div>
                    </AnimatePresence>

                    {/* Previous / Next Floating Buttons on Image (if list.length > 1) */}
                    {selectedAttachment.list.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleNavigateAttachment("prev")}
                          title="Previous Document"
                          className="absolute left-1.5 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-1.5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 active:scale-95 sm:left-3 sm:p-2.5"
                        >
                          <ChevronLeft className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNavigateAttachment("next")}
                          title="Next Document"
                          className="absolute right-1.5 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-1.5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 active:scale-95 sm:right-3 sm:p-2.5"
                        >
                          <ChevronRight className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Footer Bar: Counter & Open Full Image/PDF */}
                  <div className="mt-3 flex w-full items-center justify-between gap-2 px-1 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                      {selectedAttachment.list.length > 1 && (
                        <span className="shrink-0 whitespace-nowrap rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-700 sm:px-2.5 sm:text-xs dark:bg-gray-800 dark:text-gray-300">
                          {selectedAttachment.index + 1} /{" "}
                          {selectedAttachment.list.length}
                        </span>
                      )}
                      {isPdf && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                          <FileText className="h-2.5 w-2.5" />
                          PDF
                        </span>
                      )}
                      <span className="line-clamp-1 hidden max-w-[170px] truncate text-gray-600 sm:inline-block sm:max-w-xs dark:text-gray-300">
                        {selectedAttachment.attachment.title}
                      </span>
                    </div>

                    <a
                      href={selectedAttachment.attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary sm:text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <span>{isPdf ? "Open PDF" : "Open Full"}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              );
            })()}
        </DialogContent>
      </Dialog>
    </m.div>
  );
}
