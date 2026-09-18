"use client";

import React from "react";

export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Light Mode Gradients - Pure CSS Radial Gradients for 60fps Safari rendering */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(120,62,48,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_15%,rgba(179,144,112,0.12)_0%,transparent_50%),radial-gradient(circle_at_50%_45%,rgba(110,103,85,0.06)_0%,transparent_50%),radial-gradient(circle_at_100%_75%,rgba(120,62,48,0.08)_0%,transparent_50%),radial-gradient(circle_at_20%_95%,rgba(179,144,112,0.1)_0%,transparent_50%)] opacity-70 transition-opacity duration-700 dark:opacity-0" />

      {/* Dark Mode Gradients - Pure CSS Radial Gradients for 60fps Safari rendering */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(120,62,48,0.2)_0%,transparent_50%),radial-gradient(circle_at_100%_15%,rgba(179,144,112,0.14)_0%,transparent_50%),radial-gradient(circle_at_50%_45%,rgba(110,103,85,0.1)_0%,transparent_50%),radial-gradient(circle_at_100%_75%,rgba(120,62,48,0.16)_0%,transparent_50%),radial-gradient(circle_at_20%_95%,rgba(179,144,112,0.14)_0%,transparent_50%)] opacity-0 transition-opacity duration-700 dark:opacity-100" />
    </div>
  );
}
