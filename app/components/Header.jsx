import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 border">
      <div>
        <Image
          src={assets.profile_img}
          className="rounded-full w-32"
          alt="header"
        />
      </div>
      <h3 className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-ovo">
        Hi! I'm Irfan Muria
        <Image src={assets.hand_icon} alt="hand" className="w-6 md:w-8" />
      </h3>
      <h1 className="text-3xl sm:text-6xl lg:text-[66px] font-ovo">
        Fullstack Web Developer based in Indonesia
      </h1>
      <p className="max-w-2xl mx-auto font-ovo">
        As a committed Software Engineering student at Telkom University, with a focus on Fullstack Web Development, I bring forth a robust blend of theoretical knowledge and practical expertise. My experiences have honed my leadership and team collaboration skills, essential for thriving in the dynamic tech landscape.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <a
          href="#contact"
          className="px-10 py-3 border rounded-full bg-black text-white flex items-center gap-2"
        >
          Contact Me
          <Image src={assets.right_arrow_white} alt="arrow" className="w-4" />
        </a>
        <a
          href="/CV Irfan Muria.pdf"
          download
          className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2"
        >
          My Resume
          <Image src={assets.download_icon} alt="download" className="w-4" />
        </a>
      </div>
    </div>
  );
}
