"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MotionProvider from "./components/MotionProvider";
import { usePortfolioAll } from "@/hooks/useApi";
import type { PortfolioAllData } from "@/types";

const About = dynamic(() => import("./components/About"), {
  loading: () => <div className="min-h-screen" />,
  ssr: true,
});
const Education = dynamic(() => import("./components/Education"), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
});
const Experience = dynamic(() => import("./components/Experience"), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
});
const Work = dynamic(() => import("./components/Work"), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
});
const Skills = dynamic(() => import("./components/Skills"), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
});
const Contact = dynamic(() => import("./components/Contact"), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
});
const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
});

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
