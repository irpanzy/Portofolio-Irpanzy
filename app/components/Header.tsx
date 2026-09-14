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
      <div className="border-primary/20 relative h-32 w-32 animate-hero-fade overflow-hidden rounded-full border-2 shadow-md">
        <Image
          src={avatar}
          className="object-cover"
          alt="Foto Profil Irfan Muria"
          fill
          sizes="128px"
          priority
          fetchPriority="high"
          quality={90}
        />
      </div>

      {greeting && (
        <p className="mb-3 flex animate-hero-fade items-center justify-center gap-2 font-ovo text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          <span>{greeting}</span>
          <HandHeartIcon className="h-6 w-6 shrink-0 text-primary sm:h-7 sm:w-7 md:h-8 md:w-8" />
        </p>
      )}

      {title && (
        <h1 className="animate-hero-fade font-ovo text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>
      )}

      {description && (
        <p className="mx-auto max-w-xl animate-hero-fade font-ovo sm:max-w-2xl md:max-w-3xl lg:max-w-3xl">
          {description}
        </p>
      )}

      {resumeLink && (
        <div className="mt-5 flex animate-hero-fade items-center justify-center">
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-black/15 bg-white/70 px-6 py-2.5 font-ovo text-sm font-medium text-zinc-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-black/30 hover:bg-black/5 hover:shadow-md active:scale-95 dark:border-white/20 dark:bg-white/5 dark:text-zinc-200 dark:hover:border-white/40 dark:hover:bg-white/10"
          >
            <span>My Resume</span>
            <DownloadIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      )}
    </div>
  );
}
