"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LoadingText } from "./LoadingText";
import { PremiumTagline } from "./PremiumTagline";
import { getLoadingText, getPremiumTaglines } from "./loadingTextConfig";

interface DefaultLoaderProps {
  loaderType?: "blog" | "careers" | "admin" | "client" | "technologies" | "default";
}

/**
 * DEFAULT PAGE LOADER - MINIMAL TECH TRANSITION
 * Elegant white aesthetic for all pages
 * Used for: blog, careers, admin, client, technologies
 * - Soft particle effects
 * - Gentle expansion rings
 * - Minimal data flows
 * - Clean grid activation
 * - Premium transitions
 */
export default function DefaultLoader({ loaderType = "default" }: DefaultLoaderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  const particles = Array.from({ length: 12 }, (_, i) => i);
  const rings = Array.from({ length: 3 }, (_, i) => i);

  const particleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 0.9,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        type: "spring",
        stiffness: 120,
      },
    }),
  };

  const particleOrbitVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        delay: 0.6,
        duration: 5,
        type: "tween" as const,
        ease: "linear" as const,
        repeat: Infinity,
      },
    },
  };

  const ringVariants = {
    initial: { scale: 0, opacity: 0.6 },
    animate: (i: number) => ({
      scale: 1.8,
      opacity: 0,
      transition: {
        delay: 0.1 + i * 0.06,
        duration: 0.35,
        type: "tween" as const,
        ease: "easeOut" as const,
      },
    }),
  };

  const dataStreamVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 0.65,
      transition: {
        delay: 0.2,
        duration: 0.4,
        type: "tween" as const,
        ease: "easeInOut" as const,
      },
    },
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

  const centerGlowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        delay: 0.7,
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Premium Glass Overlay */}
      <div className="absolute inset-0 backdrop-blur-[0.5px] bg-white/25" />

      {/* White Minimal Grid */}
      <motion.div
        className="absolute inset-0 opacity-0"
        variants={gridVariants}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(71,85,105,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(71,85,105,0.22)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </motion.div>

      {/* Ambient Glows */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-300/12 blur-3xl pointer-events-none"
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
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-violet-300/12 blur-3xl pointer-events-none"
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

      {/* Central Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Gentle Expanding Rings */}
        {rings.map((i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border border-slate-300/45"
            custom={i}
            variants={ringVariants}
            initial="initial"
            animate="animate"
            style={{
              width: "120px",
              height: "120px",
            }}
          />
        ))}

        {/* Orbiting Particles */}
        <motion.div
          className="absolute w-64 h-64"
          variants={particleOrbitVariants}
          initial="initial"
          animate="animate"
        >
          {particles.map((i) => {
            const angle = (i / particles.length) * Math.PI * 2;
            const x = Math.cos(angle) * 120;
            const y = Math.sin(angle) * 120;

            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 rounded-full bg-slate-500/85"
                custom={i}
                variants={particleVariants}
                initial="initial"
                animate="animate"
                style={{
                  left: "50%",
                  top: "50%",
                  x,
                  y,
                  boxShadow: "0 0 8px rgba(71, 85, 105, 0.5)",
                }}
              />
            );
          })}
        </motion.div>

        {/* Center Elegant Glow */}
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-slate-400/30 via-slate-400/15 to-transparent blur-2xl"
          variants={centerGlowVariants}
          animate="animate"
          style={{
            boxShadow: "0 0 40px rgba(71, 85, 105, 0.35)",
          }}
        />
      </div>

      {/* SVG Data Streams */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="dataStreamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(148, 163, 184, 0.5)" />
            <stop offset="100%" stopColor="rgba(100, 116, 139, 0.2)" />
          </linearGradient>
        </defs>

        {/* Diagonal Data Streams */}
        <motion.line
          x1="20%"
          y1="20%"
          x2="80%"
          y2="80%"
          stroke="url(#dataStreamGradient)"
          strokeWidth="1.3"
          variants={dataStreamVariants}
          initial="initial"
          animate="animate"
        />
        <motion.line
          x1="80%"
          y1="20%"
          x2="20%"
          y2="80%"
          stroke="url(#dataStreamGradient)"
          strokeWidth="1.3"
          variants={dataStreamVariants}
          initial="initial"
          animate="animate"
        />

        {/* Vertical Data Stream */}
        <motion.line
          x1="50%"
          y1="10%"
          x2="50%"
          y2="90%"
          stroke="rgba(71, 85, 105, 0.45)"
          strokeWidth="1"
          variants={dataStreamVariants}
          initial="initial"
          animate="animate"
        />
      </svg>

      {/* Loading Status Text */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2 w-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.15 }}
      >
        <LoadingText words={getLoadingText(loaderType)} duration={0.5} />
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
