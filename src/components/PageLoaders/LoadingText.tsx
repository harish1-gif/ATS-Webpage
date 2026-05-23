"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingTextProps {
  words: string[];
  duration?: number;
}

/**
 * AGZUS Loading Text - Premium Futuristic Status Text
 * Elegant uppercase typography with subtle glow and smooth transitions
 * Displays rotating futuristic status words with premium enterprise aesthetic
 */
export function LoadingText({ words, duration = 0.5 }: LoadingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <div className="flex items-center justify-center">
      <motion.div
        key={`word-${currentIndex}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative"
      >
        <div className="text-center">
          {/* Main text with glow effect */}
          <motion.h2
            className="text-lg font-light tracking-widest text-slate-700 uppercase whitespace-nowrap relative"
            style={{
              letterSpacing: "0.15em",
              fontWeight: 300,
              fontSize: "0.95rem",
            }}
          >
            {words[currentIndex]}
            {/* Subtle glow layer */}
            <motion.span
              className="absolute inset-0 text-slate-600/40 blur-sm pointer-events-none"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {words[currentIndex]}
            </motion.span>
          </motion.h2>

          {/* Underline accent */}
          <motion.div
            className="mt-2 h-px bg-gradient-to-r from-transparent via-slate-400/60 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: "center" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
