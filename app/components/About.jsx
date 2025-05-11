import { assets, infoList, toolsData } from "@/assets/assets";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg font-ovo">Introduction</h4>
      <h2 className="text-center text-5xl font-ovo">About Me</h2>
      <div className="flex w-full flex-col lg:flex-row items-center gap-10 my-10">
        <div className="flex-2">
          <div className="w-72 sm:w-[350px] rounded-3xl max-w-none">
            <Image
              src={assets.user_image}
              alt="user"
              className="w-full rounded-3xl"
            />
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-10 max-w-3xl font-ovo">
            6th-semester Software Engineering student at Telkom University
            Purwokerto, focusing on Fullstack Web Development. Experienced in
            developing web and mobile applications, both frontend and backend.
            Participated in the MSIB Kampus Merdeka program and built TiketGo, a
            flight ticket booking website. Proficient in JavaScript, TypeScript,
            Dart, and PHP, and skilled with React, Next.js, Express.js, Laravel,
            and Flutter. Familiar with RESTful APIs, database design, and
            management using MySQL and PostgreSQL. Comfortable with Git, GitHub,
            and collaboration tools like ClickUp. Enthusiastic learner and
            active team contributor.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
            {infoList.map(({ icon, iconDark, title, description }, index) => (
              <li
                className="border-[0.5px] border-gray-400 p-6 rounded-xl cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black"
                key={index}
              >
                <Image src={icon} alt={title} className="w-7 mt-3" />
                <h3 className="my-4 font-semibold text-gray-700">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </li>
            ))}
          </ul>
          <h4 className="my-6 text-gray-700 font-ovo">Tools I Use</h4>
          <ul className="flex items-center gap-3 sm:gap-5">
            {toolsData.map((tool, index) => (
              <li
                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500"
                key={index}
              >
                <Image src={tool} alt="Tool" className="w-5 sm:w-7" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
