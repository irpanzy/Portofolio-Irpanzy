import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { m } from "framer-motion";
import { DownloadIcon, HandHeartIcon } from "lucide-react";

export default function Header() {
  return (
    <div
      id="home"
      className="mx-auto flex w-10/12 max-w-3xl flex-col items-center justify-center gap-4 pb-6 pt-[100px] text-center xl:min-h-screen"
    >
      <m.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <Image
          src={assets.profile_img}
          className="rounded-full"
          alt="Irfan Muria Profile"
          width={128}
          height={128}
          priority
          fetchPriority="high"
          quality={85}
          style={{ width: "128px", height: "128px" }}
        />
      </m.div>
      <m.p
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-3 flex items-end gap-2 font-ovo text-xl sm:text-2xl md:text-3xl lg:text-4xl"
      >
        Hello! I&apos;m Irfan Muria
        <HandHeartIcon className="h-6 w-6" />
      </m.p>
      <m.h1
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-ovo text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Fullstack Web Developer Enthusiast
      </m.h1>
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mx-auto max-w-xl font-ovo sm:max-w-2xl md:max-w-3xl lg:max-w-3xl"
      >
        I build modern fullstack apps with React, Node.js, Express, Next.js,
        Laravel, and Flutter. Passionate about crafting scalable digital
        solutions and growing through collaboration.
      </m.p>
      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
        <m.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://drive.google.com/file/d/12bPFTozNx7s5lfRSvOQX6Lp86JFgKKAT/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 rounded-full border-[0.5px] border-gray-700 px-10 py-3 transition duration-300 ease-in-out hover:bg-lightHover hover:shadow-lg dark:hover:bg-darkHover"
        >
          My Resume
          <m.div
            initial={false}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <DownloadIcon className="w-4 group-hover:animate-pulse" />
          </m.div>
        </m.a>
      </div>
    </div>
  );
}
