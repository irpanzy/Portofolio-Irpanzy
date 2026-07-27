"use client";

import { useProjects } from "@/hooks/useApi";
import Image from "next/image";
import React from "react";
import { m } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface WorkProps {
  isDarkMode: boolean;
}

export default function Work({ isDarkMode }: WorkProps) {
  const { data: projects, isLoading } = useProjects();

  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="work"
      className="w-full scroll-mt-20 px-[12%] py-6"
    >
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 text-center font-ovo text-lg"
      >
        A Glimpse of My Journey
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center font-ovo text-5xl"
      >
        What I&apos;ve Built
      </m.h2>
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mx-auto mb-12 mt-5 max-w-2xl text-center font-ovo"
      >
        A showcase of real-world projects built with modern web technologies -
        from Fullstack applications to scalable backend systems and RESTful
        APIs.
      </m.p>

      {isLoading ? (
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800"
            >
              <div className="aspect-[4/3] bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-4">
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 dark:text-black"
        >
          {projects
            ?.filter((project) => project.isVisible)
            .map((project, index) => (
              <m.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                key={project._id}
                className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Gambar Header */}
                <div className="relative aspect-[4/3] cursor-pointer overflow-hidden">
                  <Image
                    src={project.bgImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 z-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />

                  {/* Buttons on hover */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.demoLink && (
                      <m.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-blue-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </m.a>
                    )}
                    {project.githubLink && (
                      <m.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-[#1B3C53] px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-[#162A36]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </m.a>
                    )}
                  </div>
                </div>

                {/* Konten Card */}
                <div className="flex flex-grow flex-col bg-white p-4 dark:bg-gray-50">
                  <div className="flex-grow">
                    <h3 className="mb-2 font-ovo text-xl font-bold text-gray-900">
                      {project.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-auto">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Tech Stack:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </m.div>
            ))}
        </m.div>
      )}
    </m.div>
  );
}
