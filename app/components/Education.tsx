"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
import { MapPin, Calendar, GraduationCap, Award, Eye } from "lucide-react";
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
  const [selectedAttachment, setSelectedAttachment] =
    useState<EducationAttachment | null>(null);

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
                        <div className="mt-1 flex items-center gap-2 font-medium text-[#77BEF0]">
                          <GraduationCap className="h-4 w-4" />
                          <span>{edu.institution}</span>
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
                          <button
                            key={attIdx}
                            type="button"
                            onClick={() => setSelectedAttachment(att)}
                            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-gray-50 text-left transition-all hover:border-[#77BEF0] hover:shadow-md dark:border-gray-700 dark:bg-gray-800/60"
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
                            <div className="p-2">
                              <p className="line-clamp-1 text-xs font-medium text-gray-800 dark:text-gray-200">
                                {att.title}
                              </p>
                            </div>
                          </button>
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
        <DialogContent className="max-w-3xl overflow-hidden bg-white p-4 sm:p-6 dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
              <Award className="h-5 w-5 text-[#77BEF0]" />
              {selectedAttachment?.title || "Document Preview"}
            </DialogTitle>
          </DialogHeader>
          {selectedAttachment && (
            <div className="space-y-4">
              <div className="relative aspect-[16/10] max-h-[65vh] w-full overflow-hidden rounded-lg border border-gray-200 bg-black/5 dark:border-gray-800 dark:bg-black/40">
                <Image
                  src={selectedAttachment.url}
                  alt={selectedAttachment.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>
              {selectedAttachment.title && (
                <div className="pt-1 text-center">
                  <span className="text-xs text-gray-500">
                    {selectedAttachment.title}
                  </span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </m.div>
  );
}
