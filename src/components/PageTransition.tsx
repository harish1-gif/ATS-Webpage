"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Trigger transition effect on route change
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <>
          {/* Main transition overlay */}
          <motion.div
            key="transition-overlay"
            className="fixed inset-0 z-[9998] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dark transparent overlay with tech lines */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Holographic scanning effect - vertical lines */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`scan-line-${i}`}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
                  style={{ left: `${(i + 1) * 8.33}%` }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: [0, 1, 0], scaleY: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.05,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Glowing neon streaks moving sideways */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`streak-${i}`}
                  className="absolute h-1 bg-gradient-to-r from-transparent via-brand-violet to-transparent"
                  style={{
                    top: `${25 + i * 25}%`,
                    width: "100%",
                  }}
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{
                    x: "100%",
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            {/* Animated digital particles */}
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, (Math.random() - 0.5) * 100],
                  }}
                  transition={{
                    duration: 0.8 + Math.random() * 0.4,
                    delay: Math.random() * 0.4,
                  }}
                />
              ))}
            </div>

            {/* Center glow effect */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-brand-violet/40 via-transparent to-transparent rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.5, 1],
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
            />

            {/* Blur-to-focus effect with animated energy pulse */}
            <motion.div
              className="absolute inset-0 backdrop-blur-sm"
              initial={{ backdropFilter: "blur(20px)" }}
              animate={{
                backdropFilter: ["blur(20px)", "blur(10px)", "blur(0px)"],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            />

            {/* Floating HUD elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`hud-${i}`}
                  className="absolute w-20 h-20 border border-cyan-500/30 rounded-lg"
                  style={{
                    top: `${20 + i * 25}%`,
                    left: `${10 + i * 20}%`,
                  }}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{
                    opacity: [0, 0.4, 0],
                    rotate: [0, 45],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            {/* 3D rotating light reflections */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))",
              }}
              initial={{ opacity: 0, rotate: 0 }}
              animate={{
                opacity: [0, 0.3, 0],
                rotate: 360,
              }}
              transition={{
                duration: 1.2,
                ease: "linear",
              }}
            />

            {/* Screen wipe effect - tech curtain reveal */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent"
              initial={{ x: "-100%" }}
              animate={{
                x: ["−100%", "100%"],
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Loading animation progress indicator */}
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`loader-${i}`}
                    className="w-2 h-2 bg-brand-violet rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.div>
              <span className="text-xs text-slate-400 font-mono">Loading</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
