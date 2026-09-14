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

export default function Header({
  data: propData,
  isLoading: propIsLoading,
}: HeaderProps = {}) {
  const { data: queryData, isLoading: queryIsLoading } = useHero();
  const hero = propData !== undefined ? propData : queryData;
  const isLoading =
    propIsLoading !== undefined ? propIsLoading : !propData && queryIsLoading;

  if (isLoading && !hero) {
    return (
      <div
        id="home"
        className="mx-auto flex w-10/12 max-w-3xl animate-pulse flex-col items-center justify-center gap-4 pb-6 pt-[100px] text-center xl:min-h-screen"
      >
        <div className="h-32 w-32 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="h-8 w-64 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-14 w-full max-w-2xl rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-16 w-full max-w-xl rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-12 w-44 rounded-full bg-gray-300 dark:bg-gray-700" />
      </div>
    );
  }

  const avatar = hero?.avatarImage || assets.profile_img;
  const greeting = hero?.greeting || "";
  const title = hero?.title || "";
  const description = hero?.description || "";
  const resumeLink = hero?.resumeLink;

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

      {greeting && (
        <m.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-3 flex items-center justify-center gap-2 font-ovo text-xl sm:text-2xl md:text-3xl lg:text-4xl"
        >
          <span>{greeting}</span>
          <HandHeartIcon className="h-6 w-6 shrink-0 text-primary sm:h-7 sm:w-7 md:h-8 md:w-8" />
        </m.p>
      )}

      {title && (
        <m.h1
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-ovo text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {title}
        </m.h1>
      )}

      {description && (
        <m.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-xl font-ovo sm:max-w-2xl md:max-w-3xl lg:max-w-3xl"
        >
          {description}
        </m.p>
      )}

      {resumeLink && (
        <div className="mt-4 flex min-h-[52px] flex-col items-center gap-4 sm:flex-row">
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
        </div>
      )}
    </div>
  );
}
