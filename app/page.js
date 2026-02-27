"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MotionProvider from "./components/MotionProvider";
import { Toaster } from "react-hot-toast";

const About = dynamic(() => import("./components/About"), {
  loading: () => <div className="min-h-screen" />,
  ssr: true,
});
const Experience = dynamic(() => import("./components/Experience"), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
});
const Work = dynamic(() => import("./components/Work"), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
});
const Services = dynamic(() => import("./components/Services"), {
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

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "";
    }
  }, [isDarkMode]);

  if (!mounted) {
    return null;
  }

  return (
    <MotionProvider>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main>
        <Header isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Experience isDarkMode={isDarkMode} />
        <Work isDarkMode={isDarkMode} />
        <Services isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: isDarkMode ? "#1f2937" : "#fff",
            color: isDarkMode ? "#f9fafb" : "#111827",
            border: isDarkMode ? "1px solid #374151" : "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "12px 16px",
            fontFamily: "inherit",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </MotionProvider>
  );
}
