"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function RouteLoadingBarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed left-0 top-0 z-[10000] h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          exit={{ width: "100%", opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />
      )}
    </AnimatePresence>
  );
}

export default function RouteLoadingBar() {
  return (
    <Suspense fallback={null}>
      <RouteLoadingBarContent />
    </Suspense>
  );
}
