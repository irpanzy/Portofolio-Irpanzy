"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
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
        <div className="h-32 w-32 rounded-full bg-[#B39070]/20" />
        <div className="h-8 w-64 rounded-full bg-[#B39070]/20" />
        <div className="h-14 w-full max-w-2xl rounded-2xl bg-[#B39070]/20" />
        <div className="h-16 w-full max-w-xl rounded-2xl bg-[#B39070]/20" />
        <div className="h-12 w-44 rounded-full bg-[#B39070]/20" />
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
      className="relative mx-auto flex w-11/12 max-w-4xl flex-col items-center justify-center gap-4 pb-10 pt-[105px] text-center xl:min-h-screen"
    >
      {/* Avatar Container with Specular Glass Ring */}
      <div className="relative h-32 w-32 animate-hero-fade overflow-hidden rounded-full border-2 border-[#B39070]/40 p-1 shadow-lg shadow-[#783E30]/10 backdrop-blur-md dark:border-[#B39070]/30 dark:shadow-black/40">
        <div className="relative h-full w-full overflow-hidden rounded-full">
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
      </div>

      {greeting && (
        <p className="mb-1 flex animate-hero-fade items-center justify-center gap-2 font-ovo text-xl leading-none text-[#783E30] sm:text-2xl md:text-3xl dark:text-[#D6BC9E]">
          <span>{greeting}</span>
          <HandHeartIcon className="h-[0.80em] w-[0.80em] shrink-0 -translate-y-[2px] text-[#783E30] dark:text-[#B39070]" />
        </p>
      )}

      {title && (
        <h1 className="animate-hero-fade font-ovo text-3xl font-normal tracking-tight text-[#2B1810] sm:text-5xl md:text-6xl lg:text-7xl dark:text-[#FAF6F0]">
          {title}
        </h1>
      )}

      {description && (
        <p className="mx-auto max-w-xl animate-hero-fade font-outfit text-sm leading-relaxed text-[#59493E] sm:max-w-2xl sm:text-base md:max-w-3xl dark:text-[#C5B8A5]">
          {description}
        </p>
      )}

      {resumeLink && (
        <div className="mt-4 flex animate-hero-fade items-center justify-center">
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#B39070]/35 bg-[#FAF6F0]/80 px-6 py-2.5 font-outfit text-sm font-semibold text-[#2B1810] shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#783E30] hover:bg-[#783E30]/10 hover:text-[#783E30] hover:shadow-md active:scale-95 dark:border-[#B39070]/30 dark:bg-[#3E211E]/40 dark:text-[#FAF6F0] dark:hover:border-[#B39070] dark:hover:bg-[#B39070]/15 dark:hover:text-[#FAF6F0]"
          >
            <span>My Resume</span>
            <DownloadIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      )}
    </div>
  );
}
