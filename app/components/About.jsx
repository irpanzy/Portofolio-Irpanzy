import { assets, infoList, toolsData } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

export default function About({ isDarkMode }) {
  return (
    <motion.div
      id="about"
      className="w-full px-[12%] py-6 scroll-mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-ovo"
      >
        Introduction
      </motion.h4>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-ovo"
      >
        About Me
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex w-full flex-col md:flex-row items-center gap-10 my-10"
      >
        <div className="flex-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-auto md:w-[250px] lg:w-[350px] rounded-3xl max-w-none"
          >
            <Image
              src={assets.user_image}
              alt="user"
              className="w-full rounded-3xl"
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex-1"
        >
          <p className="mb-10 max-w-3xl font-ovo text-justify">
            I’m a 6th-semester Software Engineering student at Telkom University
            Purwokerto with hands-on experience in fullstack web and mobile
            development. I've worked on various projects, including a flight
            booking platform called TiketGo, a personal finance app built using
            Flutter, and a modern e-commerce website developed with Next.js and
            Supabase. I also utilize RESTful APIs, PostgreSQL or MySQL, Git, and
            project management tools like ClickUp. I enjoy working in
            collaborative environments and continuously seek opportunities to
            improve and make an impact.
          </p>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl"
          >
            {infoList.map(({ icon, iconDark, title, description }, index) => (
              <motion.li
                whileInView={{ scale: 1.05 }}
                className="border-[0.5px] border-gray-400 p-4 sm:p-5 md:p-6 lg:p-7 rounded-xl hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50 cursor-default text-sm sm:text-base md:text-[15px] lg:text-base max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg"
                key={index}
              >
                <Image
                  src={isDarkMode ? iconDark : icon}
                  alt={title}
                  className="w-7 mt-3"
                />
                <h3 className="my-4 font-semibold text-gray-700 dark:text-white">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm dark:text-white/80">
                  {description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
      <motion.h4
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="my-6 ml-2 font-ovo"
      >
        Tech Stack
      </motion.h4>
      <motion.ul
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-7 sm:gap-8 md:gap-9 lg:gap-10"
      >
        {toolsData.map((tool, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center gap-1 md:gap-2"
          >
            <motion.li
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center w-12 sm:w-13 md:w-14 lg:w-15 aspect-square border border-gray-400 rounded-lg hover:-translate-y-1 duration-500 cursor-default hover:bg-lightHover dark:hover:bg-darkHover"
            >
              <Image src={tool.icon} alt={tool.title} className="w-6 sm:w-7 md:w-8 lg:9" />
            </motion.li>
            <span
              className="text-xs md:text-sm text-center truncate max-w-[100px]"
              title={tool.title}
            >
              {tool.title}
            </span>
          </motion.div>
        ))}
      </motion.ul>
    </motion.div>
  );
}
