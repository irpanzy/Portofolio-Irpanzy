"use client";

import React from "react";

export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden [isolation:isolate] [transform:translate3d(0,0,0)]"
    >
      {/* Top Left Terracotta Glow */}
      <div className="absolute -left-20 -top-24 h-[550px] w-[550px] rounded-full bg-[#783E30]/15 blur-[90px] transition-colors duration-500 ease-in-out dark:bg-[#783E30]/25" />

      {/* Top Right Warm Sand Glow */}
      <div className="dark:bg-[#B39070]/18 absolute -right-24 top-10 h-[600px] w-[600px] rounded-full bg-[#B39070]/20 blur-[100px] transition-colors duration-500 ease-in-out" />

      {/* Center Olive Earth Glow */}
      <div className="dark:bg-[#6E6755]/18 absolute left-1/3 top-[42%] h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6E6755]/15 blur-[100px] transition-colors duration-500 ease-in-out" />

      {/* Mid Right Terracotta Hearth */}
      <div className="bg-[#783E30]/12 absolute -right-32 top-[65%] h-[500px] w-[500px] rounded-full blur-[90px] transition-colors duration-500 ease-in-out dark:bg-[#783E30]/20" />

      {/* Bottom Sand Pool */}
      <div className="bg-[#B39070]/18 absolute -bottom-32 left-1/4 h-[600px] w-[600px] rounded-full blur-[100px] transition-colors duration-500 ease-in-out dark:bg-[#B39070]/20" />
    </div>
  );
}
