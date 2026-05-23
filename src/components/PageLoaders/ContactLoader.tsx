"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LoadingText } from "./LoadingText";
import { PremiumTagline } from "./PremiumTagline";
import { getLoadingText, getPremiumTaglines } from "./loadingTextConfig";

/**
 * CONTACT PAGE LOADER - FUTURISTIC SIGNAL
 * Elegant white communication aesthetic
 * - Elegant radar pulse
 * - White communication rings
 * - Transparent connection lines
 * - Soft floating particles
 * - Glass layers reveal smoothly
 * - Clean enterprise transition
 */
export default function ContactLoader() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  const nodes = Array.from({ length: 8 }, (_, i) => i);
  const pulseRings = Array.from({ length: 3 }, (_, i) => i);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const centerNodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  };

  const centerGlowVariants = {
    animate: {
      scale: [1, 1.4, 1],
      opacity: [1, 0.4, 1],
      transition: {
        delay: 0.2,
        duration: 0.55,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.075 + i * 0.02,
        duration: 0.12,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const nodePulseVariants = {
    animate: (i: number) => ({
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        delay: 1 + i * 0.15,
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  const connectionVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: (i: number) => ({
      pathLength: 1,
      opacity: 0.65,
      transition: {
        delay: 0.25 + i * 0.025,
        duration: 0.3,
        type: "tween" as const,
        ease: "easeInOut" as const,
      },
    }),
  };

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        delay: 0.5,
        duration: 10,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  const orbitVariantsReverse = {
    animate: {
      rotate: -360,
      transition: {
        delay: 0.7,
        duration: 12,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  const radarPulseVariants = {
    animate: (i: number) => ({
      scale: [0, 3],
      opacity: [0.8, 0],
      transition: {
        delay: 0.325 + i * 0.1,
        duration: 0.32,
        repeat: Infinity,
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

  // Calculate node positions in a circle
  const nodeAngle = (360 / nodes.length);
  const getNodePosition = (i: number) => {
    const angle = (i * nodeAngle * Math.PI) / 180;
    const radius = 120;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Premium Glass Overlay */}
      <div className="absolute inset-0 backdrop-blur-[0.5px] bg-white/25" />

      {/* Soft White Grid Background */}
      <motion.div
        className="absolute inset-0 opacity-0"
        variants={gridVariants}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(71,85,105,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(71,85,105,0.22)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </motion.div>

      {/* Ambient Glows */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-violet-300/12 blur-3xl pointer-events-none"
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
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-300/12 blur-3xl pointer-events-none"
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

      {/* Center Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer Rotating Orbit Ring */}
        <motion.div
          className="absolute w-96 h-96 border border-slate-300/35 rounded-full"
          variants={orbitVariantsReverse}
          animate="animate"
        />

        {/* Middle Rotating Orbit Ring */}
        <motion.div
          className="absolute w-64 h-64 border border-slate-300/40 rounded-full"
          variants={orbitVariants}
          animate="animate"
        />

        {/* Inner Static Ring */}
        <div className="absolute w-32 h-32 border border-slate-300/50 rounded-full" />

        {/* Connecting Particles */}
        <motion.div
          className="absolute w-96 h-96"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {nodes.map((i) => {
            const pos = getNodePosition(i);
            return (
              <motion.div
                key={`node-${i}`}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  x: pos.x,
                  y: pos.y,
                  marginLeft: "-3px",
                  marginTop: "-3px",
                }}
              >
                {/* Node Core */}
                <motion.div
                  className="w-2.5 h-2.5 bg-slate-500/90 rounded-full"
                  variants={nodeVariants}
                  custom={i}
                  initial="initial"
                  animate="animate"
                  style={{
                    boxShadow: "0 0 8px rgba(71, 85, 105, 0.5)",
                  }}
                />

                {/* Node Pulse Ring */}
                <motion.div
                  className="absolute inset-0 w-2.5 h-2.5 border border-slate-500/70 rounded-full"
                  variants={nodePulseVariants}
                  custom={i}
                  animate="animate"
                  style={{
                    marginLeft: "-1.25px",
                    marginTop: "-1.25px",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Center Node */}
        <motion.div
          className="absolute w-3.5 h-3.5 bg-slate-600/90 rounded-full"
          variants={centerNodeVariants}
          initial="initial"
          animate="animate"
          style={{
            marginLeft: "-7px",
            marginTop: "-7px",
            boxShadow: "0 0 16px rgba(71, 85, 105, 0.65)",
          }}
        />

        {/* Center Glow Ring */}
        <motion.div
          className="absolute w-3.5 h-3.5 border-2 border-slate-500/85 rounded-full"
          variants={centerGlowVariants}
          animate="animate"
          style={{
            marginLeft: "-7px",
            marginTop: "-7px",
          }}
        />

        {/* Radar Pulse Rings */}
        {pulseRings.map((i) => (
          <motion.div
            key={`pulse-${i}`}
            className="absolute w-3.5 h-3.5 border border-slate-400/65 rounded-full"
            variants={radarPulseVariants}
            custom={i}
            animate="animate"
            style={{
              marginLeft: "-7px",
              marginTop: "-7px",
            }}
          />
        ))}

        {/* Connection Lines (SVG) */}
        <svg
          className="absolute w-96 h-96 pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: "-192px",
            marginTop: "-192px",
          }}
          viewBox="0 0 384 384"
        >
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(148, 163, 184, 0.5)" />
              <stop offset="100%" stopColor="rgba(100, 116, 139, 0.2)" />
            </linearGradient>
          </defs>

          {/* Draw lines connecting center to nodes */}
          {nodes.map((i) => {
            const pos = getNodePosition(i);
            const x = 192 + pos.x;
            const y = 192 + pos.y;
            return (
              <motion.line
                key={`line-${i}`}
                x1="192"
                y1="192"
                x2={x}
                y2={y}
                stroke="url(#connectionGradient)"
                strokeWidth="1.3"
                variants={connectionVariants}
                custom={i}
                initial="initial"
                animate="animate"
              />
            );
          })}
        </svg>
      </div>

      {/* Loading Status Text */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2 w-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.15 }}
      >
        <LoadingText words={getLoadingText("contact")} duration={0.5} />
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
