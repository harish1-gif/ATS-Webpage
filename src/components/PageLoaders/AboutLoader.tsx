"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LoadingText } from "./LoadingText";
import { PremiumTagline } from "./PremiumTagline";
import { getLoadingText, getPremiumTaglines } from "./loadingTextConfig";

/**
 * ABOUT PAGE LOADER - DIGITAL BLUEPRINT REVEAL
 * Elegant white architecture aesthetic
 * - White blueprint lines animate
 * - Futuristic architecture wireframes
 * - Elegant layered depth
 * - Soft ambient glows
 * - Minimal cinematic transitions
 */
export default function AboutLoader() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  const blueprintLayers = Array.from({ length: 3 }, (_, i) => i);
  const timelinePoints = Array.from({ length: 5 }, (_, i) => i);

  const layerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: (i: number) => ({
      opacity: 0.5 - i * 0.12,
      scale: 1,
      transition: {
        delay: 0.075 + i * 0.045,
        duration: 0.2,
        ease: "easeOut",
      },
    }),
  };

  const blueprintLineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 0.6,
      transition: {
        delay: 0.2,
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const timelineVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: (i: number) => ({
      opacity: 0.8,
      scale: 1,
      transition: {
        delay: 0.175 + i * 0.03,
        duration: 0.12,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const glowRevealVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: 1.4,
      opacity: [0.3, 0.1],
      transition: {
        delay: 0.325,
        duration: 0.32,
        ease: "easeOut",
      },
    },
  };

  const wireframeBoxVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: (i: number) => ({
      scaleX: 1,
      opacity: 0.6,
      transition: {
        delay: 0.1 + i * 0.03,
        duration: 0.15,
        ease: "easeOut",
      },
    }),
  };

  const gridVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 0.32,
      transition: {
        delay: 0.08,
        duration: 0.35,
        type: "tween" as const,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Premium Glass Overlay */}
      <div className="absolute inset-0 backdrop-blur-[0.5px] bg-white/25" />

      {/* White Blueprint Grid */}
      <motion.div
        className="absolute inset-0 opacity-0"
        variants={gridVariants}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(71,85,105,0.22)_2px,transparent_2px),linear-gradient(90deg,rgba(71,85,105,0.22)_2px,transparent_2px)] bg-[size:60px_60px]" />
      </motion.div>

      {/* Ambient Glows */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-blue-300/12 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.22, 0.32, 0.22],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-violet-300/12 blur-3xl pointer-events-none"
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.22, 0.32, 0.22],
        }}
        transition={{
          delay: 1.5,
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Layered Blueprint Glass Panels */}
      <div className="absolute inset-0 flex items-center justify-center">
        {blueprintLayers.map((i) => (
          <motion.div
            key={`layer-${i}`}
            className="absolute border border-slate-300/30 rounded-lg backdrop-blur-md bg-white/15"
            custom={i}
            variants={layerVariants}
            initial="initial"
            animate="animate"
            style={{
              width: `${300 + i * 100}px`,
              height: `${200 + i * 80}px`,
              boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.1)",
            }}
          />
        ))}
      </div>

      {/* SVG Blueprint Lines - Main Wireframe */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="blueprintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(148, 163, 184, 0.5)" />
            <stop offset="100%" stopColor="rgba(100, 116, 139, 0.2)" />
          </linearGradient>
        </defs>

        {/* Vertical Lines */}
        {[0.2, 0.4, 0.6, 0.8].map((x, i) => (
          <motion.line
            key={`v-line-${i}`}
            x1={`${x * 100}%`}
            y1="20%"
            x2={`${x * 100}%`}
            y2="80%"
            stroke="url(#blueprintGradient)"
            strokeWidth="1.5"
            variants={blueprintLineVariants}
            initial="initial"
            animate="animate"
            style={{ originX: "50%", originY: "50%" }}
          />
        ))}

        {/* Horizontal Lines */}
        {[0.3, 0.5, 0.7].map((y, i) => (
          <motion.line
            key={`h-line-${i}`}
            x1="20%"
            y1={`${y * 100}%`}
            x2="80%"
            y2={`${y * 100}%`}
            stroke="url(#blueprintGradient)"
            strokeWidth="1.5"
            variants={blueprintLineVariants}
            initial="initial"
            animate="animate"
            style={{ originX: "50%", originY: "50%" }}
          />
        ))}

        {/* Diagonal Corner Lines */}
        <motion.line
          x1="20%"
          y1="20%"
          x2="80%"
          y2="80%"
          stroke="rgba(148, 163, 184, 0.3)"
          strokeWidth="1"
          variants={blueprintLineVariants}
          initial="initial"
          animate="animate"
        />
        <motion.line
          x1="80%"
          y1="20%"
          x2="20%"
          y2="80%"
          stroke="rgba(148, 163, 184, 0.3)"
          strokeWidth="1"
          variants={blueprintLineVariants}
          initial="initial"
          animate="animate"
        />
      </svg>

      {/* Timeline Animation - Horizontal progression */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 flex gap-8">
        {timelinePoints.map((i) => (
          <div key={`timeline-${i}`}>
            {/* Connection Line */}
            {i < timelinePoints.length - 1 && (
              <motion.div
                className="absolute top-1/2 -right-8 w-8 h-px bg-gradient-to-r from-slate-400/50 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.9 + i * 0.12,
                  duration: 0.5,
                }}
              />
            )}

            {/* Timeline Point */}
            <motion.div
              className="w-3.5 h-3.5 rounded-full border border-slate-500/70 bg-white/80 relative"
              custom={i}
              variants={timelineVariants}
              initial="initial"
              animate="animate"
              style={{
                boxShadow: "0 0 10px rgba(71, 85, 105, 0.4)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Glow Reveal Circle */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-slate-300/25"
        variants={glowRevealVariants}
        initial="initial"
        animate="animate"
      />

      {/* Wireframe Boxes Animation */}
      <div className="absolute left-1/4 bottom-1/4 flex gap-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`box-${i}`}
            className="w-12 h-12 border border-slate-400/60 rounded"
            custom={i}
            variants={wireframeBoxVariants}
            initial="initial"
            animate="animate"
          />
        ))}
      </div>

      {/* Loading Status Text */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2 w-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.15 }}
      >
        <LoadingText words={getLoadingText("about")} duration={0.5} />
      </motion.div>

      {/* Premium Rotating Tagline */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.15 }}
      >
        <PremiumTagline words={getPremiumTaglines()} duration={0.6} />
      </motion.div>
    </div>
  );
}
