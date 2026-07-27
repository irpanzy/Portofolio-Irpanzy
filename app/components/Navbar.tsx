import { assets } from "@/assets/assets";
import { Signature } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ isDarkMode, setIsDarkMode }: NavbarProps) {
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openSideMenu = () => setIsMenuOpen(true);
  const closeSideMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* Background Header Color */}
      <div className="fixed right-0 top-0 -z-10 w-11/12 translate-y-[-80%] dark:hidden">
        <Image
          src={assets.header_bg_color}
          className="w-full"
          alt="header background"
          priority
          quality={75}
        />
      </div>

      {/* Navbar */}
      <m.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed z-50 flex w-full items-center justify-between px-5 py-4 lg:px-[8%] ${
          isScroll
            ? "bg-white bg-opacity-50 shadow-sm backdrop-blur-lg dark:bg-darkTheme dark:shadow-white/20"
            : ""
        }`}
      >
        {/* Logo */}
        <m.a
          href="#top"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src={isDarkMode ? assets.logo_dark : assets.logo}
            alt="logo"
            className="cursor-pointer xl:mr-[60px]"
            width={112}
            height={40}
            priority
            style={{ width: "auto", height: "40px" }}
          />
        </m.a>

        {/* Desktop Menu */}
        <ul
          className={`hidden items-center gap-6 rounded-full px-10 py-3 xl:flex xl:gap-8 ${
            isScroll
              ? ""
              : "bg-white bg-opacity-50 shadow-sm dark:border dark:border-white/50 dark:bg-transparent"
          }`}
        >
          {navigationItems.map(({ id, label }) => (
            <m.li
              key={id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <a
                href={`#${id}`}
                className="font-ovo transition-all duration-300"
              >
                {label}
              </a>
            </m.li>
          ))}
        </ul>

        {/* Right-side Controls */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <m.button
            whileTap={{ rotate: 90 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsDarkMode((prev: boolean) => !prev)}
          >
            <Image
              src={isDarkMode ? assets.sun_icon : assets.moon_icon}
              alt="toggle"
              className="w-6"
            />
          </m.button>

          {/* Contact Button (Desktop) */}
          <m.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            href="#contact"
            className="ml-4 hidden items-center gap-3 rounded-full border border-gray-500 px-4 py-2 font-ovo transition-colors duration-300 xl:flex"
          >
            Say Hello
            <Signature color={isDarkMode ? "white" : "black"} className="w-4" />
          </m.a>

          {/* Mobile Menu Button */}
          <m.button
            className="ml-3 block xl:hidden"
            onClick={openSideMenu}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src={isDarkMode ? assets.menu_white : assets.menu_black}
              alt="menu"
              className="w-6"
            />
          </m.button>
        </div>
      </m.nav>

      {/* Backdrop (optional, bisa klik untuk tutup) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black xl:hidden"
              onClick={closeSideMenu}
            />
            {/* Mobile Menu */}
            <m.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex h-screen w-56 flex-col gap-4 bg-rose-50 px-10 py-20 shadow-lg sm:w-64 md:w-72 xl:hidden dark:bg-darkHover dark:text-white"
            >
              {/* Close Button */}
              <m.div
                className="absolute right-[21px] top-[34px] cursor-pointer"
                onClick={closeSideMenu}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image
                  src={isDarkMode ? assets.close_white : assets.close_black}
                  alt="close"
                  className="w-5"
                />
              </m.div>

              {/* Menu Items */}
              {navigationItems.map(({ id, label }) => (
                <m.li
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a
                    href={`#${id}`}
                    onClick={closeSideMenu}
                    className="font-ovo transition-all duration-300"
                  >
                    {label}
                  </a>
                </m.li>
              ))}
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
