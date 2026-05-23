"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type LoaderType = "home" | "services" | "contact" | "about" | "portfolio" | "blog" | "careers" | "admin" | "client" | "technologies" | "default";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  currentLoader: LoaderType;
  setCurrentLoader: (loader: LoaderType) => void;
  pageReady: boolean;
  setPageReady: (ready: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Map routes to loader types
function getLoaderType(pathname: string): LoaderType {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/portfolio")) return "portfolio";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/careers")) return "careers";
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/client")) return "client";
  if (pathname.startsWith("/technologies")) return "technologies";
  return "default";
}

// Loader animation durations (in ms)
const loaderDurations: Record<LoaderType, number> = {
  home: 2800,
  services: 2600,
  contact: 2400,
  about: 2500,
  portfolio: 2700,
  blog: 2300,
  careers: 2400,
  admin: 2200,
  client: 2400,
  technologies: 2500,
  default: 2000,
};

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentLoader, setCurrentLoader] = useState<LoaderType>("home");
  const [pageReady, setPageReady] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathRef = useRef<string | null>(null);
  const loaderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pageReadyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only trigger on actual route changes
    if (pathname === previousPathRef.current) return;
    previousPathRef.current = pathname;

    // Clear any existing timeouts
    if (loaderTimeoutRef.current) clearTimeout(loaderTimeoutRef.current);
    if (pageReadyTimeoutRef.current) clearTimeout(pageReadyTimeoutRef.current);

    // Get the loader type for this route
    const loaderType = getLoaderType(pathname);
    const duration = loaderDurations[loaderType];

    // Reset state immediately
    setPageReady(false);
    setCurrentLoader(loaderType);

    // Show loading screen immediately
    setIsLoading(true);

    // Hide loader after animation completes, keeping it hidden for page reveal
    loaderTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    // Mark page as ready for reveal animation
    pageReadyTimeoutRef.current = setTimeout(() => {
      setPageReady(true);
    }, duration - 200); // Start fade in 200ms before loader ends

    return () => {
      if (loaderTimeoutRef.current) clearTimeout(loaderTimeoutRef.current);
      if (pageReadyTimeoutRef.current) clearTimeout(pageReadyTimeoutRef.current);
    };
  }, [pathname]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        currentLoader,
        setCurrentLoader,
        pageReady,
        setPageReady,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
