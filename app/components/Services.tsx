"use client";

import { useServices } from "@/hooks/useApi";
import { DynamicIcon } from "@/lib/iconUtils";
import React from "react";
import { m } from "framer-motion";

interface ServicesProps {
  isDarkMode: boolean;
}

export default function Services({ isDarkMode }: ServicesProps) {
  const { data: services, isLoading } = useServices();

  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="services"
      className="w-full scroll-mt-20 px-[12%] py-6"
    >
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 text-center font-ovo text-lg"
      >
        What I Offer
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center font-ovo text-5xl"
      >
        Let&apos;s Build Something Great
      </m.h2>
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mx-auto mb-12 mt-5 max-w-2xl text-center font-ovo"
      >
        Crafting digital solutions with modern technologies, from responsive web
        applications to seamless mobile experiences.
      </m.p>

      {isLoading ? (
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg border border-gray-300 p-6 dark:border-gray-700"
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
              <div className="mb-2 h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="mb-2 h-4 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
          ))}
        </div>
      ) : (
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2"
        >
          {services?.map((service, index) => (
            <m.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              key={service._id}
              className="group cursor-default rounded-lg border border-gray-400 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-lightHover hover:shadow-black dark:border-white dark:hover:bg-darkHover/50 dark:hover:shadow-white"
            >
              <div className="mb-4">
                <DynamicIcon
                  iconName={service.icon}
                  className="h-10 w-10"
                  size={40}
                />
              </div>
              <h3 className="my-4 font-ovo text-lg font-semibold text-gray-700 dark:text-white">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-white/80">
                {service.description}
              </p>
            </m.div>
          ))}
        </m.div>
      )}
    </m.div>
  );
}
