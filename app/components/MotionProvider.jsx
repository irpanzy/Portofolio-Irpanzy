"use client";
import { LazyMotion, domAnimation } from "framer-motion";

export default function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

