import { assets } from "@/assets/assets";
import Image from "next/image";
import { UserRoundSearch } from "lucide-react";
import React from "react";
import { motion } from "motion/react";

export default function Header() {
  return (
    <div
      id="home"
      className="w-11/12 max-w-3xl text-center mx-auto min-h-screen flex flex-col items-center justify-center gap-4 pt-[100px] sm:pt-[75px] pb-12 sm:pb-0"
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
        className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-ovo"
      >
        Hi! I'm Irfan Muria
        <Image src={assets.hand_icon} alt="hand" className="w-6 md:w-8" />
      </motion.h3>
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-3xl sm:text-6xl lg:text-[66px] font-ovo"
      >
        Fullstack Web Developer Enthusiast
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="max-w-2xl mx-auto font-ovo"
      >
        I'm a 6th-semester Software Engineering student at Telkom University,
        passionate about building full-featured web and mobile apps. I have
        hands-on experience with modern technologies like React, Next.js,
        Express.js, Flutter, and Laravel. I'm always eager to learn new tools,
        collaborate in teams, and bring ideas into functional products.
      </motion.p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          href="/CV Irfan Muria.pdf"
          download
          className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 dark:bg-white dark:text-black"
        >
          My Resume
          <Image src={assets.download_icon} alt="download" className="w-4" />
        </motion.a>
      </div>
    </div>
  );
}
