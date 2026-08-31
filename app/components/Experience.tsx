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
          {experiences?.map((exp, index) => (
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

                  <div className="mt-2 flex flex-col gap-1 md:ml-4 md:mt-0 md:items-end">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="h-4 w-4" />
                      <span>{getPeriod(exp)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {exp.description && (
                  <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                    {exp.description}
                  </p>
                )}

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div>
                    <p className="mb-3 font-medium text-gray-700 dark:text-gray-200">
                      Key Responsibilities:
                    </p>
                    <m.ul className="space-y-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <m.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 1.2 + idx * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#77BEF0]"></div>
                          <span className="text-justify">{responsibility}</span>
                        </m.li>
                      ))}
                    </m.ul>
                  </div>
                )}
              </m.div>
            </m.div>
          ))}
        </m.div>
      )}
    </m.div>
  );
}
