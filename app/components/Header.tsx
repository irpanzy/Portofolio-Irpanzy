"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { m } from "framer-motion";
import { DownloadIcon, HandHeartIcon } from "lucide-react";
import { useHero } from "@/hooks/useApi";
import type { Hero } from "@/types";

interface HeaderProps {
  data?: Hero | null;
  isLoading?: boolean;
}

const DEFAULT_HERO: Partial<Hero> = {
  greeting: "Hi! I'm Irfan Muria",
  title: "Fullstack Developer based in Indonesia.",
  description:
    "I build modern fullstack apps with React, Node.js, Express, Next.js, Laravel, and Cloud technologies.",
  resumeLink: "#contact",
};

export default function Header({
  data: propData,
  isLoading: propIsLoading,
}: HeaderProps = {}) {
  const { data: queryData, isLoading: queryIsLoading } = useHero();
  const hero = propData !== undefined ? propData : queryData;

  const avatar = hero?.avatarImage || assets.profile_img;
  const greeting = hero?.greeting || DEFAULT_HERO.greeting;
  const title = hero?.title || DEFAULT_HERO.title;
  const description = hero?.description || DEFAULT_HERO.description;
  const resumeLink = hero?.resumeLink || DEFAULT_HERO.resumeLink;

  return (
    <div
      id="home"
      className="mx-auto flex w-10/12 max-w-3xl flex-col items-center justify-center gap-4 pb-6 pt-[100px] text-center xl:min-h-screen"
    >
      <m.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      >
        <div className="border-primary/20 relative h-32 w-32 overflow-hidden rounded-full border-2 shadow-md">
          <Image
            src={avatar}
            className="object-cover"
            alt="Hero Avatar"
            fill
            sizes="128px"
            priority
            fetchPriority="high"
            quality={90}
          />
        </div>
      </m.div>

      <m.p
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-3 flex items-center justify-center gap-2 font-ovo text-xl sm:text-2xl md:text-3xl lg:text-4xl"
      >
        <span>{greeting}</span>
        <HandHeartIcon className="h-6 w-6 shrink-0 text-primary sm:h-7 sm:w-7 md:h-8 md:w-8" />
      </m.p>

      <m.h1
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-ovo text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {title}
      </m.h1>

      <p className="mx-auto max-w-xl font-ovo transition-opacity duration-300 sm:max-w-2xl md:max-w-3xl lg:max-w-3xl">
        {description}
      </p>

      <div className="mt-4 flex min-h-[52px] flex-col items-center gap-4 sm:flex-row">
        {resumeLink ? (
          <m.a
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border-[0.5px] border-gray-700 px-10 py-3 transition duration-300 ease-in-out hover:bg-lightHover hover:shadow-lg dark:border-gray-500 dark:hover:bg-darkHover"
          >
            <span>My Resume</span>
            <m.div
              initial={false}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <DownloadIcon className="w-4 group-hover:animate-pulse" />
            </m.div>
          </m.a>
        ) : (
          <a
            href="#contact"
            className="group flex items-center gap-2 rounded-full border-[0.5px] border-gray-700 px-10 py-3 transition duration-300 ease-in-out hover:bg-lightHover hover:shadow-lg dark:border-gray-500 dark:hover:bg-darkHover"
          >
            <span>Contact Me</span>
          </a>
        )}
      </div>
    </div>
  );
}
