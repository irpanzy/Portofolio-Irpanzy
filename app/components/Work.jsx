import { assets, workData } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import {
  CircleArrowOutUpRight,
  ExternalLink,
  PanelLeftOpen,
} from "lucide-react";

export default function Work({ isDarkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="work"
      className="w-full px-[12%] py-6 scroll-mt-20"
    >
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-ovo"
      >
        A Glimpse of My Journey
      </motion.h4>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-ovo"
      >
        What I've Built
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo"
      >
        A showcase of real-world projects built with modern web technologies -
        from Fullstack applications to scalable backend systems and RESTful
        APIs.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="grid grid-cols-auto my-10 gap-5 dark:text-black"
      >
        {workData.map((project, index) => (
          <motion.a
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-[4/3] bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group overflow-hidden shadow-md"
            style={{ backgroundImage: `url(${project.bgImage})` }}
            href={project.link}
          >
            {/* Overlay gelap agar teks lebih terbaca */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300 z-0" />

            {/* Info utama */}
            <div className="bg-white/90 backdrop-blur-sm w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-start justify-between flex-col gap-1 duration-500 group-hover:bottom-7 z-10">
              <div className="w-full flex justify-between items-start">
                <div className="max-w-[85%]">
                  <h2 className="font-semibold text-black">{project.title}</h2>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[1px_1px_0_#000] group-hover:bg-[#B8CFCE] transition shrink-0">
                  <ExternalLink className="w-5" />
                </div>
              </div>

              {project.stack && (
                <div className="text-xs font-medium mt-1">
                  <p className="font-bold">Tech Stack:</p> {project.stack}
                </div>
              )}
            </div>
          </motion.a>
        ))}
      </motion.div>
      <motion.a
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
        <motion.div
          initial={false}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <CircleArrowOutUpRight className="w-4 group-hover:animate-pulse" />
        </motion.div>
      </motion.a>
    </motion.div>
  );
}
