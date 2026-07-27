"use client";

import React from "react";
import { m } from "framer-motion";
import { MapPin, Calendar, Building2 } from "lucide-react";
import { useExperiences } from "@/hooks/useApi";
import Image from "next/image";

interface ExperienceProps {
  isDarkMode: boolean;
}

export default function Experience({ isDarkMode }: ExperienceProps) {
  const { data: experiences, isLoading } = useExperiences();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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
              className="animate-pulse rounded-2xl bg-gray-200 p-8 dark:bg-gray-800"
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
          {experiences?.map((exp, index) => (
            <m.div
              key={exp._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-lg md:p-8 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-gray-600"
            >
              {/* Company Logo */}
              {exp.logo && (
                <div className="mb-6 flex items-start justify-between">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-white p-2 shadow-md">
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Company & Position */}
              <div className="mb-4">
                <h3 className="mb-2 font-ovo text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                  {exp.position}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 md:text-base dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    <span className="font-medium">{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>
                      {formatDate(exp.startDate)} -{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate!)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {exp.description && (
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  {exp.description}
                </p>
              )}

              {/* Responsibilities */}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Key Responsibilities:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 md:text-base dark:text-gray-300">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600"></span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Decorative element */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-20 dark:from-blue-900/20 dark:to-purple-900/20"></div>
            </m.div>
          ))}
        </m.div>
      )}
    </m.div>
  );
}
