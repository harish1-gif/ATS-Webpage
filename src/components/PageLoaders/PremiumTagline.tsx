"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PremiumTaglineProps {
  words: string[];
  duration?: number;
}

/**
 * AGZUS Premium Tagline - Elegant Futuristic Compliments
 * Soft gray/silver text with subtle violet glow
 * Smooth fade transitions with holographic aesthetic
 * Enterprise premium white UI style with minimal design
 */
export function PremiumTagline({ words, duration = 0.6 }: PremiumTaglineProps) {
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
        key={`tagline-${currentIndex}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative"
      >
        <div className="text-center relative">
          {/* Main text with violet glow effect */}
          <motion.p
            className="font-light tracking-wide text-slate-400 whitespace-nowrap relative px-4"
            style={{
              letterSpacing: "0.05em",
              fontWeight: 300,
              fontSize: "1.75rem",
            }}
          >
            {words[currentIndex]}
            
            {/* Subtle violet glow layer - positioned absolutely for glow effect */}
            <motion.span
              className="absolute inset-0 text-violet-400/40 blur-sm pointer-events-none"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            >
              {words[currentIndex]}
            </motion.span>

            {/* Ultra-subtle holographic shimmer */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl pointer-events-none"
              animate={{
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                height: "100%",
              }}
            />
          </motion.p>

          {/* Elegant accent line below */}
          <motion.div
            className="mt-3 h-px bg-gradient-to-r from-transparent via-violet-300/40 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "center" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
