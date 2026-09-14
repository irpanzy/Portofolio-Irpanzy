import { assets } from "@/assets/assets";
import {
  Briefcase,
  Cpu,
  GraduationCap,
  Home,
  Layers,
  Mail,
  Signature,
  User,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { m } from "framer-motion";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const NAVIGATION_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "work", label: "Projects", icon: Layers },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

export default function Navbar({ isDarkMode, setIsDarkMode }: NavbarProps) {
  const [isScroll, setIsScroll] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);

      const scrollPositionBottom = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 160;
      setIsAtBottom(scrollPositionBottom >= threshold);

      const scrollPosition = window.scrollY + 200;
      for (let i = NAVIGATION_ITEMS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAVIGATION_ITEMS[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAVIGATION_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Background Header Color */}
      <div className="fixed right-0 top-0 -z-10 w-11/12 translate-y-[-80%] dark:hidden">
        <Image
          src={assets.header_bg_color}
          className="w-full"
          alt=""
          role="presentation"
          priority
          quality={75}
        />
      </div>

      {/* Top Navbar */}
      <nav
        className={`fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-5 py-3 transition-all duration-300 lg:px-[8%] ${
          isScroll
            ? "bg-white/70 shadow-sm backdrop-blur-md dark:bg-darkTheme/70 dark:shadow-white/10"
            : ""
        }`}
      >
        {/* Logo */}
        <m.a
          href="#top"
          aria-label="Irpanzy Home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src={isDarkMode ? assets.logo_dark : assets.logo}
            alt="Irpanzy"
            className="cursor-pointer xl:mr-[60px]"
            width={112}
            height={40}
            priority
            style={{ width: "auto", height: "38px" }}
          />
        </m.a>

        {/* Desktop Menu (Centered Pill) */}
        <ul
          className={`hidden items-center gap-6 rounded-full px-8 py-2.5 xl:flex xl:gap-8 ${
            isScroll
              ? "bg-white/60 shadow-sm backdrop-blur-md dark:border dark:border-white/10 dark:bg-white/5"
              : "border border-black/5 bg-white/40 shadow-sm dark:border-white/10 dark:bg-transparent"
          }`}
        >
          {NAVIGATION_ITEMS.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <li key={id}>
                <a
                  className={`py-1 font-ovo text-[15px] transition-colors ${
                    isActive
                      ? "font-semibold text-primary"
                      : "text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                  }`}
                  href={`#${id}`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <m.button
            whileTap={{ rotate: 90 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsDarkMode((prev: boolean) => !prev)}
            aria-label="Toggle dark mode"
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white/60 p-1.5 shadow-sm transition-all hover:bg-black/5 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
          >
            <Image
              src={isDarkMode ? assets.sun_icon : assets.moon_icon}
              alt=""
              role="presentation"
              className="h-5 w-5"
            />
          </m.button>

          {/* Contact Button (Desktop) */}
          <m.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="hidden items-center gap-2.5 rounded-full border border-gray-400/80 px-4 py-1.5 font-ovo text-sm transition-colors duration-300 hover:border-primary hover:bg-lightHover xl:flex dark:border-gray-600 dark:hover:border-primary dark:hover:bg-darkHover"
          >
            Say Hello
            <Signature color={isDarkMode ? "white" : "black"} className="w-4" />
          </m.a>
        </div>
      </nav>

      {/* Floating Bottom Dock (Mobile Only) */}
      <div
        className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 xl:hidden ${
          isAtBottom
            ? "pointer-events-none translate-y-24 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/85 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-2xl dark:border-white/15 dark:bg-[#0f001c]/85 dark:shadow-[0_8px_30px_rgb(0,0,0,0.6)]">
          {NAVIGATION_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <m.a
                key={id}
                href={`#${id}`}
                aria-label={label}
                whileTap={{ scale: 0.88 }}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-primary/15 dark:bg-primary/25 text-primary"
                    : "text-gray-600 hover:bg-black/5 hover:text-black dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isActive ? "scale-110 stroke-[2.2]" : "stroke-[1.8]"
                  }`}
                />
              </m.a>
            );
          })}
        </div>
      </div>
    </>
  );
}
