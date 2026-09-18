import React from "react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  return (
    <footer className="w-full">
      <div className="py-6">
        <div className="mx-auto flex w-max items-center gap-2">
          <a
            href="mailto:irfanmuria04@gmail.com"
            aria-label="Send email to irfanmuria04@gmail.com"
            className="flex items-center gap-2 font-outfit text-sm text-[#59493E] transition-colors hover:text-[#783E30] dark:text-[#C5B8A5] dark:hover:text-[#FAF6F0]"
          >
            <Mail className="h-4 w-4 text-[#783E30] dark:text-[#B39070]" />
            <span>irfanmuria04@gmail.com</span>
          </a>
        </div>
      </div>

      <div className="mx-[10%] items-center justify-between border-t border-[#B39070]/20 py-6 text-center text-sm text-[#59493E] sm:flex dark:text-[#C5B8A5]">
        <p>
          &copy; {new Date().getFullYear()} Irfan Muria. All rights reserved
        </p>
        <ul className="mt-4 flex items-center justify-center gap-3 sm:mt-0">
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/irpanzy"
              aria-label="GitHub Profile"
              className="shadow-2xs hover:shadow-xs flex h-10 w-10 items-center justify-center rounded-full border border-[#B39070]/25 bg-[#FAF6F0]/80 text-[#59493E] backdrop-blur-md transition-all duration-200 hover:border-[#783E30] hover:bg-[#783E30]/10 hover:text-[#783E30] active:scale-95 dark:border-[#B39070]/20 dark:bg-[#2D1A17]/60 dark:text-[#C5B8A5] dark:hover:border-[#B39070] dark:hover:text-[#FAF6F0]"
            >
              <Github className="h-4 w-4" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/irfanmuria/"
              aria-label="LinkedIn Profile"
              className="shadow-2xs hover:shadow-xs flex h-10 w-10 items-center justify-center rounded-full border border-[#B39070]/25 bg-[#FAF6F0]/80 text-[#59493E] backdrop-blur-md transition-all duration-200 hover:border-[#783E30] hover:bg-[#783E30]/10 hover:text-[#783E30] active:scale-95 dark:border-[#B39070]/20 dark:bg-[#2D1A17]/60 dark:text-[#C5B8A5] dark:hover:border-[#B39070] dark:hover:text-[#FAF6F0]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/irfanmuriaa/"
              aria-label="Instagram Profile"
              className="shadow-2xs hover:shadow-xs flex h-10 w-10 items-center justify-center rounded-full border border-[#B39070]/25 bg-[#FAF6F0]/80 text-[#59493E] backdrop-blur-md transition-all duration-200 hover:border-[#783E30] hover:bg-[#783E30]/10 hover:text-[#783E30] active:scale-95 dark:border-[#B39070]/20 dark:bg-[#2D1A17]/60 dark:text-[#C5B8A5] dark:hover:border-[#B39070] dark:hover:text-[#FAF6F0]"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
