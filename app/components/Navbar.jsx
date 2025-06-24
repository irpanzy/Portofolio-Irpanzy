import { assets } from "@/assets/assets";
import { Signature } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar({ isDarkMode, setIsDarkMode }) {
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

  return (
    <>
      {/* Background Header Color */}
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden">
        <Image src={assets.header_bg_color} className="w-full" alt="header" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full fixed px-5 lg:px-[8%] py-4 flex items-center justify-between z-50 ${
          isScroll
            ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20"
            : ""
        }`}
      >
        {/* Logo */}
        <motion.a
          href="#top"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src={isDarkMode ? assets.logo_dark : assets.logo}
            alt="logo"
            className="w-28 cursor-pointer lg:mr-[60px]"
          />
        </motion.a>

        {/* Desktop Menu */}
        <ul
          className={`hidden lg:flex items-center gap-6 lg:gap-8 rounded-full px-10 py-3 ${
            isScroll
              ? ""
              : "bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"
          }`}
        >
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About Me" },
            { id: "work", label: "Projects" },
            { id: "services", label: "Services" },
            { id: "contact", label: "Contact" },
          ].map(({ id, label }) => (
            <motion.li
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
            </motion.li>
          ))}
        </ul>

        {/* Right-side Controls */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <motion.button
            whileTap={{ rotate: 90 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsDarkMode((prev) => !prev)}
          >
            <Image
              src={isDarkMode ? assets.sun_icon : assets.moon_icon}
              alt="toggle"
              className="w-6"
            />
          </motion.button>

          {/* Contact Button (Desktop) */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            href="#contact"
            className="hidden lg:flex items-center gap-3 px-4 py-2 border border-gray-500 rounded-full ml-4 font-ovo transition-colors duration-300"
          >
            Say Hello
            <Signature color={isDarkMode ? "white" : "black"} className="w-4" />
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            className="block lg:hidden ml-3"
            onClick={openSideMenu}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src={isDarkMode ? assets.menu_white : assets.menu_black}
              alt="menu"
              className="w-6"
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Backdrop (optional, bisa klik untuk tutup) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={closeSideMenu}
            />
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4 }}
              className="lg:hidden flex flex-col gap-4 py-20 px-10 fixed right-0 top-0 bottom-0 w-48 sm:w-56 md:w-64 z-50 h-screen bg-rose-50 dark:bg-darkHover dark:text-white shadow-lg"
            >
              {/* Close Button */}
              <motion.div
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
              </motion.div>

              {/* Menu Items */}
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About Me" },
                { id: "work", label: "Projects" },
                { id: "services", label: "Services" },
                { id: "contact", label: "Contact" },
              ].map(({ id, label }) => (
                <motion.li
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
                </motion.li>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
