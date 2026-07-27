import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  return (
    <div>
      <div className="py-6">
        <Image
          src={isDarkMode ? assets.logo_dark : assets.logo}
          alt="logo"
          className="mx-auto mb-2"
          width={144}
          height={48}
          loading="lazy"
          style={{ width: "auto", height: "48px" }}
        />
        <div className="mx-auto flex w-max items-center gap-2">
          <a
            href="mailto:irfanmuria04@gmail.com"
            className="flex items-center gap-2"
          >
            <Image
              src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon}
              alt="email"
              className=""
              width={24}
              height={24}
              loading="lazy"
              style={{ width: "24px", height: "24px" }}
            />
            irfanmuria04@gmail.com
          </a>
        </div>
      </div>

      <div className="mx-[10%] items-center justify-between border-t border-gray-400 py-6 text-center sm:flex">
        <p>
          &copy; {new Date().getFullYear()} Irfan Muria. All rights reserved
        </p>
        <ul className="mt-4 flex items-center justify-center gap-5 sm:mt-0">
          <li>
            <a target="_blank" href="https://github.com/irpanzy">
              <Image
                src={
                  isDarkMode
                    ? assets.github_logo_white
                    : assets.github_logo_dark
                }
                alt="github"
                className=""
                width={40}
                height={40}
                loading="lazy"
                style={{ width: "40px", height: "40px" }}
              />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.linkedin.com/in/irfanmuria/">
              <Image
                src={
                  isDarkMode
                    ? assets.linkedin_logo_white
                    : assets.linkedin_logo_blue
                }
                alt="linkedin"
                className=""
                width={40}
                height={40}
                loading="lazy"
                style={{ width: "40px", height: "40px" }}
              />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.instagram.com/irfanmuriaa/">
              <Image
                src={
                  isDarkMode
                    ? assets.instagram_logo_white
                    : assets.instagram_logo_dark
                }
                alt="instagram"
                className=""
                width={40}
                height={40}
                loading="lazy"
                style={{ width: "40px", height: "40px" }}
              />{" "}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
