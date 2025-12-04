import { assets, infoList, toolsData } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { m } from "framer-motion";

export default function About({ isDarkMode }) {
  return (
    <m.div
      id="about"
      className="w-full px-[12%] py-6 scroll-mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-ovo"
      >
        Introduction
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-ovo"
      >
        About Me
      </m.h2>
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex w-full flex-col md:flex-row items-center gap-10 my-10"
      >
        <div className="flex-2">
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-auto md:w-[250px] lg:w-[335px]"
          >
            <Image
              src={assets.user_image}
              alt="user"
              className="rounded-3xl"
              width={335}
              height={335}
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 250px, 335px"
            />
          </m.div>
        </div>
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex-1"
          style={{ willChange: 'opacity' }}
        >
          <p className="mb-10 max-w-3xl font-ovo text-justify">
            7th Semester Student of Software Engineering Study Program at Telkom
            University Purwokerto with a focus on Fullstack Web Development.
            Experienced in building web and mobile applications, both frontend
            and backend. Has participated in the MSIB Kampus Merdeka program and
            worked on a ticket booking project called TiketGo. Familiar with
            using React.js, Next.js, Express.js, Flutter, Laravel as well as
            PostgreSQL and Git in project development.
          </p>
          <m.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-3xl"
          >
            {infoList.map(({ icon, iconDark, title, description }, index) => (
              <m.li
                whileInView={{ scale: 1.05 }}
                className="border-[0.5px] border-gray-400 p-4 sm:p-5 md:p-6 lg:p-7 rounded-xl hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50 cursor-default text-sm sm:text-base md:text-[15px] lg:text-base max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg"
                key={index}
              >
                <Image
                  src={isDarkMode ? iconDark : icon}
                  alt={title}
                  className="mt-3"
                  width={28}
                  height={28}
                  loading="lazy"
                  style={{ width: '28px', height: 'auto' }}
                />
                <p className="my-4 font-semibold text-gray-700 dark:text-white">
                  {title}
                </p>
                <p className="text-gray-600 text-sm dark:text-white/80">
                  {description}
                </p>
              </m.li>
            ))}
          </m.ul>
        </m.div>
      </m.div>
      <m.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="my-6 ml-2 font-ovo"
      >
        Tech Stack
      </m.h3>
      <m.ul
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-7 sm:gap-8 md:gap-9 lg:gap-10"
      >
        {toolsData.map((tool, index) => (
          <m.li
            key={index}
            className="flex flex-col items-center justify-center gap-1 md:gap-2"
          >
            <m.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center w-12 sm:w-13 md:w-14 lg:w-15 aspect-square border border-gray-400 rounded-lg hover:-translate-y-1 duration-500 cursor-default hover:bg-lightHover dark:hover:bg-darkHover"
            >
              <Image
                src={tool.icon}
                alt={tool.title}
                className=""
                width={32}
                height={32}
                loading="lazy"
                style={{ width: '32px', height: '32px' }}
              />
            </m.div>
            <span
              className="text-xs md:text-sm text-center truncate max-w-[100px]"
              title={tool.title}
            >
              {tool.title}
            </span>
          </m.li>
        ))}
      </m.ul>
    </m.div>
  );
}

