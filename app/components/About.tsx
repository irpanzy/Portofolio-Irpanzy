"use client";

import { assets } from "@/assets/assets";
import { useAbout, useTechStack } from "@/hooks/useApi";
import Image from "next/image";
import React from "react";
import { m } from "framer-motion";

interface AboutProps {
  isDarkMode: boolean;
}

export default function About({ isDarkMode }: AboutProps) {
  const { data: about, isLoading: isLoadingAbout } = useAbout();
  const { data: techStack, isLoading: isLoadingTechStack } = useTechStack();

  // Fallback info list if API data not available
  const defaultInfoList = [
    {
      icon: assets.edu_icon,
      iconDark: assets.edu_icon_dark,
      title: "Education",
      description:
        "Undergraduate Student of Software Engineering, Telkom University Purwokerto",
    },
    {
      icon: assets.code_icon,
      iconDark: assets.code_icon_dark,
      title: "Languages",
      description: "JavaScript, TypeScript, PHP, Dart",
    },
    {
      icon: assets.project_icon,
      iconDark: assets.project_icon_dark,
      title: "Projects",
      description: "Built more than 5 projects",
    },
  ];

  // Use API data if available, otherwise use fallback
  const infoList =
    about?.infoList && about.infoList.length > 0
      ? about.infoList.map((item) => ({
          icon: item.icon,
          iconDark: item.iconDark,
          title: item.title,
          description: item.description,
        }))
      : defaultInfoList;

  return (
    <m.div
      id="about"
      className="w-full scroll-mt-20 px-[12%] py-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <m.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 text-center font-ovo text-lg"
      >
        Introduction
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center font-ovo text-5xl"
      >
        About Me
      </m.h2>
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="my-10 flex w-full flex-col items-center gap-10 md:flex-row"
      >
        <div className="flex-2">
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-auto md:w-[250px] lg:w-[335px]"
          >
            <Image
              src={about?.profileImage || assets.user_image}
              alt="Profile"
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
          style={{ willChange: "opacity" }}
        >
          {isLoadingAbout ? (
            <div className="mb-10 max-w-3xl animate-pulse">
              <div className="mb-2 h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="mb-2 h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
          ) : (
            <p className="mb-10 max-w-3xl text-justify font-ovo">
              {about?.bio ||
                "8th Semester Student of Software Engineering Study Program at Telkom University Purwokerto with a focus on Fullstack Web Development. Experienced in building web and mobile applications, both frontend and backend."}
            </p>
          )}

          <m.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {infoList.map(({ icon, iconDark, title, description }, index) => {
              // Check if icon is a string (emoji or URL) or StaticImageData
              const currentIcon = isDarkMode ? iconDark : icon;
              const isEmoji =
                typeof currentIcon === "string" && currentIcon.length <= 4;

              return (
                <m.li
                  whileInView={{ scale: 1.05 }}
                  className="cursor-default rounded-xl border-[0.5px] border-gray-400 p-4 text-sm duration-500 hover:-translate-y-1 hover:bg-lightHover hover:shadow-black sm:p-5 sm:text-base md:p-6 md:text-[15px] lg:p-7 lg:text-base dark:border-white dark:hover:bg-darkHover/50 dark:hover:shadow-white"
                  key={index}
                >
                  {isEmoji ? (
                    <span className="mt-3 text-3xl">{currentIcon}</span>
                  ) : (
                    <Image
                      src={currentIcon}
                      alt={title}
                      className="mt-3"
                      width={28}
                      height={28}
                      loading="lazy"
                      style={{ width: "28px", height: "auto" }}
                    />
                  )}
                  <p className="my-4 font-semibold text-gray-700 dark:text-white">
                    {title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-white/80">
                    {description}
                  </p>
                </m.li>
              );
            })}
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

      {isLoadingTechStack ? (
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 sm:gap-6 md:grid-cols-6 md:gap-8 lg:grid-cols-10 lg:gap-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex h-16 w-16 animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700"
            />
          ))}
        </div>
      ) : (
        <m.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="grid grid-cols-4 gap-4 sm:grid-cols-5 sm:gap-6 md:grid-cols-6 md:gap-8 lg:grid-cols-10 lg:gap-10"
        >
          {techStack?.map((tool, index) => (
            <m.li
              key={tool._id || index}
              className="flex flex-col items-center justify-center gap-2"
            >
              <m.div
                whileHover={{ scale: 1.05 }}
                className="flex h-12 w-12 cursor-default items-center justify-center rounded-lg border border-gray-400 p-2 duration-500 hover:-translate-y-1 hover:bg-lightHover sm:h-14 sm:w-14 md:h-14 md:w-14 lg:h-16 lg:w-16 dark:hover:bg-darkHover"
              >
                <Image
                  src={tool.icon}
                  alt={tool.title}
                  className="h-full w-full object-contain"
                  width={48}
                  height={48}
                  loading="lazy"
                />
              </m.div>
              <span
                className="max-w-[100px] truncate text-center text-xs md:text-sm"
                title={tool.title}
              >
                {tool.title}
              </span>
            </m.li>
          ))}
        </m.ul>
      )}
    </m.div>
  );
}
