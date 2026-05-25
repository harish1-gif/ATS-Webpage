"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLoading } from "@/contexts/LoadingContext";
import { getLoaderComponent } from "@/components/PageLoaders";
import { useEffect, useState } from "react";

/**
 * Global Loading Screen Manager
 * Shows/hides unique loaders based on page transitions
 * Each page has its own unique futuristic animation
 */
export function GlobalLoadingScreen() {
  // Loading screens disabled - pages load instantly
  return null;
}
