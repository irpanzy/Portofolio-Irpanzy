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
import { m, AnimatePresence } from "framer-motion";

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
      {/* Top Navbar */}
      <nav
        className={`fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-5 py-3 transition-all duration-300 lg:px-[8%] ${
          isScroll
            ? "shadow-xs border-b border-[#B39070]/20 bg-[#FAF6F0]/80 backdrop-blur-xl dark:border-[#B39070]/15 dark:bg-[#190E0C]/80 dark:shadow-black/40"
            : ""
        }`}
      >
        {/* Logo */}
        <m.a
          href="#top"
          aria-label="Irpanzy Home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative block h-[38px] w-[112px] xl:mr-[60px]"
        >
          <Image
            src={assets.logo}
            alt="Irpanzy"
            className={`cursor-pointer transition-opacity duration-500 ease-in-out ${
              isDarkMode ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            width={112}
            height={40}
            priority
            style={{ width: "auto", height: "38px" }}
          />
          <Image
            src={assets.logo_dark}
            alt="Irpanzy"
            className={`absolute left-0 top-0 cursor-pointer transition-opacity duration-500 ease-in-out ${
              isDarkMode ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            width={112}
            height={40}
            priority
            style={{ width: "auto", height: "38px" }}
          />
        </m.a>

        {/* Desktop Menu (Centered Glass Pill) */}
        <ul
          className={`hidden items-center gap-6 rounded-full px-8 py-2.5 xl:flex xl:gap-8 ${
            isScroll
              ? "border border-[#B39070]/25 bg-[#FAF6F0]/85 shadow-sm backdrop-blur-xl dark:border-[#B39070]/20 dark:bg-[#2D1A17]/70"
              : "shadow-xs border border-[#B39070]/20 bg-[#FAF6F0]/60 backdrop-blur-md dark:border-[#B39070]/15 dark:bg-[#2D1A17]/40"
          }`}
        >
          {NAVIGATION_ITEMS.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <li key={id}>
                <a
                  className={`py-1 font-outfit text-[15px] font-medium transition-colors ${
                    isActive
                      ? "font-semibold text-[#783E30] dark:text-[#B39070]"
                      : "text-[#59493E] hover:text-[#783E30] dark:text-[#C5B8A5] dark:hover:text-[#FAF6F0]"
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
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
            onClick={() => setIsDarkMode((prev: boolean) => !prev)}
            aria-label="Toggle dark mode"
            type="button"
            className={`shadow-xs relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border backdrop-blur-md transition-all duration-300 ${
              isScroll
                ? "border-[#B39070]/25 bg-[#FAF6F0]/85 hover:bg-[#B39070]/15 dark:border-[#B39070]/20 dark:bg-[#2D1A17]/70 dark:hover:bg-[#B39070]/20"
                : "border-[#B39070]/20 bg-[#FAF6F0]/60 hover:bg-[#B39070]/15 dark:border-[#B39070]/15 dark:bg-[#2D1A17]/40 dark:hover:bg-[#B39070]/20"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={isDarkMode ? "dark" : "light"}
                initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                <Image
                  src={isDarkMode ? assets.sun_icon : assets.moon_icon}
                  alt=""
                  role="presentation"
                  className="h-5 w-5"
                />
              </m.div>
            </AnimatePresence>
          </m.button>

          {/* Contact Button (Desktop) */}
          <m.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className={`shadow-xs group hidden items-center gap-2.5 rounded-full border px-4 py-1.5 font-outfit text-sm font-medium backdrop-blur-md transition-all duration-300 xl:flex ${
              isScroll
                ? "border-[#B39070]/25 bg-[#FAF6F0]/85 text-[#59493E] hover:border-[#783E30] hover:bg-[#783E30]/10 hover:text-[#783E30] dark:border-[#B39070]/20 dark:bg-[#2D1A17]/70 dark:text-[#C5B8A5] dark:hover:border-[#B39070] dark:hover:bg-[#B39070]/15 dark:hover:text-[#FAF6F0]"
                : "border-[#B39070]/20 bg-[#FAF6F0]/60 text-[#59493E] hover:border-[#783E30] hover:bg-[#783E30]/10 hover:text-[#783E30] dark:border-[#B39070]/15 dark:bg-[#2D1A17]/40 dark:text-[#C5B8A5] dark:hover:border-[#B39070] dark:hover:bg-[#B39070]/15 dark:hover:text-[#FAF6F0]"
            }`}
          >
            Say Hello
            <Signature className="w-4 text-[#59493E] transition-colors duration-300 group-hover:text-[#783E30] dark:text-[#C5B8A5] dark:group-hover:text-[#FAF6F0]" />
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
        <div className="flex items-center gap-1 rounded-full border border-[#B39070]/30 bg-[#FAF6F0]/90 p-1.5 shadow-[0_8px_30px_rgba(120,62,48,0.12)] backdrop-blur-2xl dark:border-[#B39070]/20 dark:bg-[#1C0F0D]/90 dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
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
                    ? "bg-[#783E30]/15 text-[#783E30] dark:bg-[#B39070]/20 dark:text-[#B39070]"
                    : "text-[#59493E] hover:bg-[#B39070]/10 hover:text-[#783E30] dark:text-[#C5B8A5] dark:hover:bg-[#B39070]/10 dark:hover:text-[#FAF6F0]"
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
