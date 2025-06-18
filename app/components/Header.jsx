import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { DownloadIcon, HandHeartIcon } from "lucide-react";

export default function Header() {
  return (
    <div
      id="home"
      className="w-10/12 max-w-3xl text-center mx-auto flex flex-col items-center justify-center gap-4 pb-6 pt-[100px] sm:pt-[100px] lg:pt-[75px] lg:min-h-screen"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <Image
          src={assets.profile_img}
          className="rounded-full w-32"
          alt="header"
        />
      </motion.div>
      <motion.h3
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-end gap-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 font-ovo"
      >
        Hello! I'm Irfan Muria
        <HandHeartIcon className="w-6 h-6" />
      </motion.h3>
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-ovo"
      >
        Fullstack Web Developer Enthusiast
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-3xl mx-auto font-ovo"
      >
        I build modern fullstack apps with React, Node.js, Express, Next.js,
        Laravel, and Flutter. Passionate about crafting scalable digital
        solutions and growing through collaboration.
      </motion.p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://drive.google.com/file/d/1GGRbxeSog_cFC8X6FWXmHKQhP0wpt62z/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="group px-10 py-3 border-[0.5px] rounded-full border-gray-700 flex items-center gap-2 transition duration-300 ease-in-out hover:shadow-lg hover:bg-lightHover dark:hover:bg-darkHover"
        >
          My Resume
          <motion.div
            initial={false}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <DownloadIcon
              alt="download"
              className="w-4 group-hover:animate-pulse"
            />
          </motion.div>
        </motion.a>
      </div>
    </div>
  );
}
