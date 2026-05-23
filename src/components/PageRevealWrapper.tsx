"use client";

import { motion } from "framer-motion";
import { useLoading } from "@/contexts/LoadingContext";

/**
 * Page Reveal Wrapper
 * Handles smooth reveal of page content after loading animation completes
 * Shows content with fade-in and blur-to-focus effect
 */
export default function PageRevealWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pageReady } = useLoading();

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={
        pageReady
          ? { opacity: 1, filter: "blur(0px)" }
          : { opacity: 0, filter: "blur(10px)" }
      }
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
