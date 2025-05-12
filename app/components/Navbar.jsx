import { assets } from "@/assets/assets";
import { UserRoundSearch } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const [isScroll, setIsScroll] = useState(false);
  const sideMenuRef = useRef();

  const openSideMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };

  const closeSideMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <>
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden">
        <Image src={assets.header_bg_color} className="w-full" alt="header" />
      </div>
      <nav
        className={`w-full fixed px-5 xl:px-[8%] py-4 flex items-center justify-between z-50 ${
          isScroll
            ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20 "
            : ""
        }`}
      >
        <a href="#top">
          <Image
            src={isDarkMode ? assets.logo_dark : assets.logo}
            alt="logo"
            className="w-28 cursor-pointer mr-14"
          />
        </a>
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-10 py-3 ${
            isScroll
              ? ""
              : "bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"
          } `}
        >
          <li>
            <a className="font-ovo" href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="font-ovo" href="#about">
              About Me
            </a>
          </li>
          <li>
            <a className="font-ovo" href="#services">
              Services
            </a>
          </li>
          <li>
            <a className="font-ovo" href="#work">
              My Work
            </a>
          </li>
          <li>
            <a className="font-ovo" href="#contact">
              Contact Me
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsDarkMode((prev) => !prev)}>
            <Image
              src={isDarkMode ? assets.sun_icon : assets.moon_icon}
              alt="moon"
              className="w-6"
            />
          </button>
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-3 px-4 py-2 border border-gray-500 rounded-full ml-4 font-ovo"
          >
            Contact
            {isDarkMode ? (
              <UserRoundSearch color="white" className="w-4" />
            ) : (
              <UserRoundSearch color="black" className="w-4" />
            )}
          </a>

          <button className="block md:hidden ml-3" onClick={openSideMenu}>
            <Image
              src={isDarkMode ? assets.menu_white : assets.menu_black}
              alt="menu"
              className="w-6"
            />
          </button>
        </div>

        {/* Mobile Menu */}

        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white"
        >
          <div className="absolute right-5 top-8" onClick={closeSideMenu}>
            <Image
              src={isDarkMode ? assets.close_white : assets.close_black}
              alt="menu"
              className="w-5 cursor-pointer"
            />
          </div>
          <li>
            <a className="font-ovo" onClick={closeSideMenu} href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="font-ovo" onClick={closeSideMenu} href="#about">
              About Me
            </a>
          </li>
          <li>
            <a className="font-ovo" onClick={closeSideMenu} href="#services">
              Services
            </a>
          </li>
          <li>
            <a className="font-ovo" onClick={closeSideMenu} href="#work">
              My Work
            </a>
          </li>
          <li>
            <a className="font-ovo" onClick={closeSideMenu} href="#contact">
              Contact Me
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
