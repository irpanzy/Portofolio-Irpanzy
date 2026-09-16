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
  FileText,
  BookOpen,
} from "lucide-react";
import { useEducations } from "@/hooks/useApi";
import Image from "next/image";
import PdfThumbnail from "@/components/PdfThumbnail";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Education as EducationType, EducationAttachment } from "@/types";

interface EducationProps {
  isDarkMode: boolean;
  data?: EducationType[];
  isLoading?: boolean;
}

const typeConfig: Record<
  string,
  { label: string; badgeClass: string; dotClass: string }
> = {
  formal: {
    label: "Formal",
    badgeClass:
      "border-[#783E30]/25 bg-[#783E30]/10 text-[#783E30] dark:border-[#D6BC9E]/30 dark:bg-[#783E30]/20 dark:text-[#FAF6F0]",
    dotClass: "bg-[#783E30] dark:bg-[#D6BC9E]",
  },
  bootcamp: {
    label: "Bootcamp",
    badgeClass:
      "border-[#B39070]/30 bg-[#B39070]/12 text-[#783E30] dark:border-[#B39070]/30 dark:bg-[#B39070]/20 dark:text-[#D6BC9E]",
    dotClass: "bg-[#B39070] dark:bg-[#B39070]",
  },
  certification: {
    label: "Certification",
    badgeClass:
      "border-[#6E6755]/30 bg-[#6E6755]/12 text-[#59493E] dark:border-[#6E6755]/30 dark:bg-[#6E6755]/20 dark:text-[#C5B8A5]",
    dotClass: "bg-[#6E6755] dark:bg-[#A89F8B]",
  },
  course: {
    label: "Course",
    badgeClass:
      "border-[#B39070]/20 bg-[#FAF6F0]/60 text-[#6E6755] dark:border-[#B39070]/20 dark:bg-[#2D1A17]/60 dark:text-[#A89F8B]",
    dotClass: "bg-[#B39070] dark:bg-[#A89F8B]",
  },
};

export default function Education({
  isDarkMode,
  data: propData,
  isLoading: propIsLoading,
}: EducationProps) {
  const { data: queryData, isLoading: queryIsLoading } = useEducations();
  const educations = propData !== undefined ? propData : queryData;
  const isLoading =
    propIsLoading !== undefined ? propIsLoading : !propData && queryIsLoading;
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

  const getOverviewLabel = (type: string) => {
    switch (type) {
      case "bootcamp":
        return "Program Overview";
      case "certification":
        return "Certification Overview";
      case "course":
        return "Course Overview";
      case "formal":
      default:
        return "Academic Overview";
    }
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
        className="mb-2 text-center font-ovo text-lg text-[#783E30] dark:text-[#B39070]"
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
        className="mx-auto mb-12 mt-5 max-w-3xl text-center font-outfit text-sm text-[#59493E] md:text-base dark:text-[#C5B8A5]"
      >
        Formal education, bootcamps, and certifications that shaped my skills
        and expertise in software development.
      </m.p>

      {isLoading ? (
        <div className="mx-auto max-w-5xl space-y-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-[#B39070]/20 bg-[#FAF6F0]/60 p-8 backdrop-blur-md dark:border-[#B39070]/15 dark:bg-[#2D1A17]/60"
            >
              <div className="animate-pulse space-y-4">
                <div className="h-6 w-1/3 rounded-md bg-[#B39070]/20" />
                <div className="h-4 w-1/2 rounded bg-[#B39070]/20" />
                <div className="h-4 w-1/4 rounded bg-[#B39070]/20" />
              </div>
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
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="relative border-l border-[#B39070]/30 pb-12 pl-6 last:pb-0 sm:pl-8 dark:border-[#B39070]/20"
              >
                {/* Glowing rustic timeline node */}
                <div className="absolute -left-[7px] top-1 flex h-3.5 w-3.5 items-center justify-center">
                  <span className="absolute h-full w-full rounded-full bg-[#783E30]/30 opacity-40 dark:bg-[#B39070]/30" />
                  <span className="shadow-2xs h-3 w-3 rounded-full border-2 border-[#783E30] bg-[#FAF6F0] dark:border-[#B39070] dark:bg-[#190E0C]" />
                </div>

                {/* Glass Card */}
                <m.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card rounded-3xl p-6 font-outfit transition-all duration-300 hover:border-[#783E30]/40 sm:p-8 dark:hover:border-[#B39070]/40"
                >
                  <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4">
                      {edu.logo && (
                        <m.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="flex-shrink-0"
                        >
                          <div className="shadow-2xs flex h-12 w-12 items-center justify-center rounded-2xl border border-[#B39070]/20 bg-[#FAF6F0]/80 p-2 md:h-14 md:w-14 dark:border-[#B39070]/15 dark:bg-[#2D1A17]/80">
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
                        <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
                          <h3 className="font-ovo text-xl font-semibold tracking-tight text-[#2B1810] sm:text-2xl dark:text-[#FAF6F0]">
                            {edu.degree}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${badge.badgeClass}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${badge.dotClass}`}
                            />
                            {badge.label}
                          </span>
                        </div>
                        <div
                          className="mt-1 flex items-center gap-2 font-medium text-[#783E30] dark:text-[#D6BC9E]"
                          title={edu.institution}
                        >
                          <GraduationCap className="h-4 w-4 shrink-0" />
                          <span className="text-sm md:text-base">
                            {edu.institution}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2 md:ml-4 md:mt-0 md:flex-col md:items-end md:gap-1.5">
                      <span className="shadow-2xs inline-flex items-center gap-1.5 rounded-full border border-[#B39070]/25 bg-[#FAF6F0]/80 px-3 py-1 text-xs font-medium text-[#59493E] dark:border-[#B39070]/20 dark:bg-[#2D1A17]/60 dark:text-[#C5B8A5]">
                        <Calendar className="h-3.5 w-3.5 text-[#783E30] dark:text-[#B39070]" />
                        <span>{getPeriod(edu)}</span>
                      </span>
                      <span className="shadow-2xs inline-flex items-center gap-1.5 rounded-full border border-[#B39070]/25 bg-[#FAF6F0]/80 px-3 py-1 text-xs font-medium text-[#59493E] dark:border-[#B39070]/20 dark:bg-[#2D1A17]/60 dark:text-[#C5B8A5]">
                        <MapPin className="h-3.5 w-3.5 text-[#783E30] dark:text-[#B39070]" />
                        <span>{edu.location}</span>
                      </span>
                    </div>
                  </div>

                  {edu.description && (
                    <div className="shadow-2xs mb-5 rounded-2xl border border-[#B39070]/20 bg-[#FAF6F0]/80 p-4 backdrop-blur-sm sm:p-5 dark:border-[#B39070]/15 dark:bg-[#1E110F]/60">
                      <div className="mb-2.5 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#783E30]/10 text-[#783E30] dark:bg-[#B39070]/15 dark:text-[#B39070]">
                          <BookOpen className="h-3.5 w-3.5" />
                        </span>
                        <span className="font-outfit text-xs font-semibold uppercase tracking-wider text-[#783E30] dark:text-[#B39070]">
                          {getOverviewLabel(edu.type)}
                        </span>
                      </div>
                      <p className="font-outfit text-sm leading-relaxed text-[#59493E] sm:text-[15px] dark:text-[#D6BC9E]">
                        {edu.description}
                      </p>
                    </div>
                  )}

                  {/* Certificates & Documentation Gallery */}
                  {attachments.length > 0 && (
                    <div className="mt-6 border-t border-[#B39070]/15 pt-5 dark:border-[#B39070]/10">
                      <div className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#783E30] dark:text-[#B39070]">
                        <Award className="h-3.5 w-3.5 text-[#783E30] dark:text-[#B39070]" />
                        <span>
                          Certificates &amp; Documentation ({attachments.length}
                          )
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {attachments.map((att, attIdx) => {
                          const isPdf = att.url?.toLowerCase().includes(".pdf");

                          return (
                            <m.button
                              key={attIdx}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                setSelectedAttachment({
                                  attachment: att,
                                  list: attachments,
                                  index: attIdx,
                                })
                              }
                              className="shadow-2xs group relative flex flex-col overflow-hidden rounded-2xl border border-[#B39070]/25 bg-[#FAF6F0]/70 text-left transition-all hover:border-[#783E30] hover:shadow-md dark:border-[#B39070]/20 dark:bg-[#2D1A17]/60 dark:hover:border-[#B39070]"
                            >
                              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#B39070]/10 dark:bg-[#3E211E]/40">
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
                                <div className="backdrop-blur-2xs absolute inset-0 flex items-center justify-center bg-[#190E0C]/40 opacity-0 transition-opacity group-hover:opacity-100">
                                  <Eye className="drop-shadow-xs h-5 w-5 text-[#FAF6F0]" />
                                </div>
                              </div>
                              <div className="p-2.5">
                                <p className="line-clamp-1 text-xs font-medium text-[#2B1810] dark:text-[#FAF6F0]">
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

      {/* Lightbox / Image Viewer Dialog */}
      <Dialog
        open={!!selectedAttachment}
        onOpenChange={(open) => !open && setSelectedAttachment(null)}
      >
        <DialogContent className="w-[calc(100vw-20px)] max-w-3xl overflow-hidden rounded-3xl border border-[#B39070]/30 bg-[#FAF6F0]/95 p-4 shadow-2xl backdrop-blur-2xl sm:w-[92vw] sm:p-6 dark:border-[#B39070]/20 dark:bg-[#190E0C]/95">
          <DialogHeader className="mb-2">
            <div className="flex items-center justify-between gap-2 pr-8 sm:pr-10">
              <DialogTitle className="flex items-center gap-2.5 text-sm font-semibold sm:text-base md:text-lg">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#783E30]/15 text-[#783E30] dark:bg-[#B39070]/20 dark:text-[#B39070]">
                  <Award className="h-4 w-4" />
                </div>
                <span className="line-clamp-1 font-ovo text-[#2B1810] dark:text-[#FAF6F0]">
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
                  <div className="relative h-[48vh] max-h-[58vh] min-h-[300px] w-full overflow-hidden rounded-2xl border border-[#B39070]/20 bg-black/5 sm:aspect-[16/10] sm:h-auto sm:max-h-[66vh] sm:min-h-[50vh] dark:border-[#B39070]/15 dark:bg-black/60">
                    <AnimatePresence mode="wait">
                      <m.div
                        key={selectedAttachment.attachment.url}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        drag={
                          !isPdf && selectedAttachment.list.length > 1
                            ? "x"
                            : false
                        }
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                          if (info.offset.x < -40) {
                            handleNavigateAttachment("next");
                          } else if (info.offset.x > 40) {
                            handleNavigateAttachment("prev");
                          }
                        }}
                        className="relative h-full w-full"
                      >
                        {isPdf ? (
                          <div className="relative flex h-full w-full flex-col">
                            <iframe
                              src={`${selectedAttachment.attachment.url}#view=FitH`}
                              className="h-full w-full rounded-2xl border-0 bg-white"
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

                    {/* Previous / Next Floating Buttons on Image */}
                    {selectedAttachment.list.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleNavigateAttachment("prev")}
                          title="Previous Document"
                          aria-label="Previous Document"
                          className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 p-2.5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 active:scale-95 sm:flex"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNavigateAttachment("next")}
                          title="Next Document"
                          aria-label="Next Document"
                          className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 p-2.5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 active:scale-95 sm:flex"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Footer Bar: Controls, Counter & Open Full Image/PDF */}
                  <div className="mt-4 flex w-full items-center justify-between gap-2 px-0.5 text-xs text-[#59493E] dark:text-[#C5B8A5]">
                    <div className="flex min-w-0 items-center gap-2">
                      {selectedAttachment.list.length > 1 && (
                        <div className="flex items-center gap-1 rounded-full border border-[#B39070]/25 bg-[#FAF6F0]/80 p-1 dark:border-[#B39070]/20 dark:bg-[#2D1A17]/70">
                          <button
                            type="button"
                            onClick={() => handleNavigateAttachment("prev")}
                            title="Previous Document"
                            aria-label="Previous Document"
                            className="flex h-6 w-6 items-center justify-center rounded-full text-[#59493E] transition-colors hover:bg-[#B39070]/15 hover:text-[#783E30] active:scale-90 dark:text-[#C5B8A5] dark:hover:bg-[#B39070]/20 dark:hover:text-[#FAF6F0]"
                          >
                            <ChevronLeft className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-1.5 text-[11px] font-semibold text-[#2B1810] sm:text-xs dark:text-[#FAF6F0]">
                            {selectedAttachment.index + 1} /{" "}
                            {selectedAttachment.list.length}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleNavigateAttachment("next")}
                            title="Next Document"
                            aria-label="Next Document"
                            className="flex h-6 w-6 items-center justify-center rounded-full text-[#59493E] transition-colors hover:bg-[#B39070]/15 hover:text-[#783E30] active:scale-90 dark:text-[#C5B8A5] dark:hover:bg-[#B39070]/20 dark:hover:text-[#FAF6F0]"
                          >
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                      {isPdf && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#783E30]/25 bg-[#783E30]/10 px-2 py-0.5 text-[10px] font-semibold text-[#783E30] dark:border-[#B39070]/30 dark:text-[#D6BC9E]">
                          <FileText className="h-2.5 w-2.5" />
                          PDF
                        </span>
                      )}
                    </div>

                    <a
                      href={selectedAttachment.attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shadow-2xs inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#B39070]/30 bg-[#FAF6F0]/80 px-3 py-1.5 text-xs font-medium text-[#2B1810] transition-colors hover:border-[#783E30] hover:text-[#783E30] dark:border-[#B39070]/20 dark:bg-[#2D1A17]/60 dark:text-[#FAF6F0] dark:hover:border-[#B39070]"
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
