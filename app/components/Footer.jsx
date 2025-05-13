import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

export default function Footer({ isDarkMode }) {
  return (
    <div>
      <div className="py-6">
        <Image
          src={isDarkMode ? assets.logo_dark : assets.logo}
          alt="logo"
          className="w-36 mx-auto mb-2"
        />
        <div className="w-max flex items-center gap-2 mx-auto">
          <a
            href="mailto:irfanmuria04@gmail.com"
            className="flex items-center gap-2"
          >
            <Image
              src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon}
              alt="email"
              className="w-6"
            />
            irfanmuria04@gmail.com
          </a>
        </div>
      </div>

      <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] py-6">
        <p>
          &copy; {new Date().getFullYear()} Irfan Muria. All rights reserved
        </p>
        <ul className="flex items-center gap-5 justify-center mt-4 sm:mt-0">
          <li>
            <a target="_blank" href="https://github.com/irpanzy">
              <Image
                src={
                  isDarkMode
                    ? assets.github_logo_white
                    : assets.github_logo_dark
                }
                alt="github"
                className="w-10"
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
                className="w-10"
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
                className="w-10"
              />{" "}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
