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
  // Page reveal animation disabled - content shows immediately
  return <div className="w-full">{children}</div>;
}
