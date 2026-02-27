import { assets, workData } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { m } from "framer-motion";
import { CircleArrowOutUpRight, ExternalLink, Github, Eye } from "lucide-react";

export default function Work({ isDarkMode }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="work"
      className="w-full px-[12%] py-6 scroll-mt-20"
    >
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-ovo"
      >
        A Glimpse of My Journey
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-ovo"
      >
        What I've Built
      </m.h2>
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo"
      >
        A showcase of real-world projects built with modern web technologies -
        from Fullstack applications to scalable backend systems and RESTful
        APIs.
      </m.p>
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-6 dark:text-black"
      >
        {workData.map((project, index) => (
          <m.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col"
          >
            {/* Gambar Header */}
            <div className="aspect-[4/3] relative cursor-pointer overflow-hidden">
              <Image
                src={project.bgImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
                quality={75}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300 z-0" />
              {/* Overlay - Always visible on mobile, hover on desktop */}
              <div className="absolute inset-0 bg-black/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
                {project.demoLink && (
                  <m.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#9ECAD6] hover:bg-[#8AB8C8] text-white text-sm px-4 py-2 rounded-full transition duration-200 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="w-4 h-4" />
                    Live Preview
                  </m.a>
                )}
                {project.githubLink && (
                  <m.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#1B3C53] hover:bg-[#162A36] text-white text-sm px-4 py-2 rounded-full transition duration-200 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </m.a>
                )}
                {!project.demoLink && !project.githubLink && project.link && (
                  <m.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#B8CFCE] hover:bg-[#a5c0bf] text-black text-sm px-4 py-2 rounded-full transition duration-200 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Project
                  </m.a>
                )}
              </div>
            </div>

            {/* Konten Card */}
            <div className="p-4 bg-white dark:bg-gray-50 flex flex-col flex-grow">
              <div className="flex-grow">
                <h3 className="font-semibold text-black text-lg mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed text-justify">
                  {project.description}
                </p>
                {project.techStack && project.techStack.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-black mb-3">
                      Tech Stack:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full px-3 py-1.5 text-xs transition-colors"
                          title={tech.title}
                        >
                          <Image
                            src={tech.icon}
                            alt={tech.title}
                            width={16}
                            height={16}
                            className="object-contain flex-shrink-0"
                            style={{ width: "16px", height: "16px" }}
                          />
                          <span className="text-gray-700 font-medium">
                            {tech.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </m.div>
        ))}
      </m.div>
      <m.a
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="https://github.com/irpanzy?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="group w-max flex items-center justify-center gap-2 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto mt-10 transition duration-300 ease-in-out hover:shadow-lg hover:bg-lightHover dark:text-white dark:border-white dark:hover:bg-darkHover"
      >
        Show More
        <m.div
          initial={false}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <CircleArrowOutUpRight className="w-4 group-hover:animate-pulse" />
        </m.div>
      </m.a>
    </m.div>
  );
}
