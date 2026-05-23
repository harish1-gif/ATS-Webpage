"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LoadingText } from "./LoadingText";
import { PremiumTagline } from "./PremiumTagline";
import { getLoadingText, getPremiumTaglines } from "./loadingTextConfig";

/**
 * HOME PAGE LOADER - ELEGANT WHITE AI SYSTEM BOOT
 * Premium enterprise aesthetic matching AGZUS homepage
 * - White futuristic grid activates softly
 * - AGZUS logo assembles elegantly
 * - Wireframe particles connect
 * - Soft glow pulse expands
 * - Clean glass layers slide open
 * - Subtle holographic scan lines
 * - Luxury blur-to-focus reveal
 * - Elegant white ambient lighting
 */
export default function HomeLoader() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  const letters = ["A", "G", "Z", "U", "S"];
  const particles = Array.from({ length: 12 }, (_, i) => i);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 140,
        damping: 22,
        delay: i * 0.025,
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
        ease: "easeOut" as const,
      },
    },
  };

  const particleVariants = {
    initial: { opacity: 0, scale: 0, x: -20, y: -20 },
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0.5],
      x: [Math.cos((i / 12) * Math.PI * 2) * 40, 0],
      y: [Math.sin((i / 12) * Math.PI * 2) * 40, 0],
      transition: {
        delay: 0.05 + i * 0.012,
        duration: 0.35,
        type: "tween" as const,
        ease: "easeOut" as const,
      },
    }),
  };

  const softGlowVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: 1.3,
      opacity: [0.2, 0.4, 0.1],
      transition: {
        delay: 0.25,
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const scanlineVariants = {
    initial: { y: "-100%", opacity: 0 },
    animate: {
      y: "100%",
      opacity: [0, 0.3, 0],
      transition: {
        delay: 0.15,
        duration: 0.45,
        ease: "linear",
      },
    },
  };

  const glassLayerVariants = {
    initial: { y: -30, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 0.15,
      transition: {
        delay: 0.5 + i * 0.15,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Premium Glassmorphism Overlay */}
      <div className="absolute inset-0 backdrop-blur-[0.5px] bg-white/20" />

      {/* Soft Grid Background */}
      <motion.div
        className="absolute inset-0 opacity-0"
        variants={gridVariants}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(71,85,105,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(71,85,105,0.22)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </motion.div>

      {/* Ambient Glow - Violet */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-violet-300/15 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Ambient Glow - Blue */}
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-blue-300/15 blur-3xl pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.18, 0.25, 0.18],
        }}
        transition={{
          delay: 1,
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Elegant Scan Lines */}
      <motion.div
        className="absolute inset-0 w-full pointer-events-none"
        variants={scanlineVariants}
        initial="initial"
        animate="animate"
      >
        <div className="w-full h-12 bg-gradient-to-b from-transparent via-slate-400/15 to-transparent blur-md" />
      </motion.div>

      {/* Connecting Particles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {particles.map((i) => {
          const angle = (i / 12) * Math.PI * 2;
          const distance = 80;
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full bg-slate-500/85"
              variants={particleVariants}
              custom={i}
              initial="initial"
              animate="animate"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: "-4px",
                marginTop: "-4px",
              }}
            />
          );
        })}
      </div>

      {/* Central Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Soft Glow Pulse */}
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-radial from-violet-300/20 via-slate-200/5 to-transparent"
          variants={softGlowVariants}
          initial="initial"
          animate="animate"
        />

        {/* Letter Container */}
        <motion.div
          className="flex gap-1 md:gap-3 justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {letters.map((letter, i) => (
            <motion.div
              key={letter}
              custom={i}
              variants={letterVariants}
              className="text-5xl md:text-6xl font-black text-slate-700"
              style={{
                textShadow:
                  "0 2px 8px rgba(148, 163, 184, 0.15), 0 4px 16px rgba(100, 116, 139, 0.08)",
              }}
            >
              {letter}
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle Holographic Rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border border-slate-400/20"
            style={{
              width: `${180 + i * 60}px`,
              height: `${180 + i * 60}px`,
              marginLeft: `-${90 + i * 30}px`,
              marginTop: `-${90 + i * 30}px`,
            }}
            animate={{
              opacity: [0.15, 0.25, 0.1],
              scale: [1, 1.05, 1],
            }}
            transition={{
              delay: 0.6 + i * 0.2,
              duration: 2.5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Glass Layers Sliding Open */}
      {[0, 1].map((i) => (
        <motion.div
          key={`glass-${i}`}
          className="absolute top-1/2 w-full h-32 backdrop-blur-md border-y border-white/20 bg-white/10"
          style={{
            left: i === 0 ? "-100%" : "100%",
          }}
          variants={glassLayerVariants}
          custom={i}
          initial="initial"
          animate="animate"
        />
      ))}

      {/* Loading Status Text */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2 w-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.15 }}
      >
        <LoadingText words={getLoadingText("home")} duration={0.5} />
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
