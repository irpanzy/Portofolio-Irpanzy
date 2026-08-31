"use client";

import { useEffect } from "react";
import { suppressHydrationWarnings } from "../utils/suppressHydrationWarnings";

export function HydrationWarningSupressor() {
  useEffect(() => {
    suppressHydrationWarnings();
  }, []);

  return null;
}
