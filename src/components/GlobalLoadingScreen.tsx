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
  const { isLoading, currentLoader } = useLoading();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isLoading) return null;

  const LoaderComponent = getLoaderComponent(currentLoader);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key={`loader-${currentLoader}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50"
        >
          <LoaderComponent loaderType={currentLoader} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
