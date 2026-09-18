"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MotionProvider from "./components/MotionProvider";
import AmbientBackground from "./components/AmbientBackground";
import { usePortfolioAll } from "@/hooks/useApi";
import type { PortfolioAllData } from "@/types";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

interface HomeClientProps {
  initialData?: PortfolioAllData | null;
}

export default function HomeClient({ initialData }: HomeClientProps) {
  const { data: portfolio, isLoading } = usePortfolioAll(initialData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode, mounted]);

  return (
    <MotionProvider>
      <AmbientBackground />
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main>
        <Header data={portfolio?.hero} isLoading={isLoading} />
        <About
          data={portfolio?.about}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />
        <Education
          data={portfolio?.educations}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />
        <Experience
          data={portfolio?.experiences}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />
        <Work
          data={portfolio?.projects}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />
        <Skills
          data={portfolio?.techstacks}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />
        <Contact isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </MotionProvider>
  );
}
