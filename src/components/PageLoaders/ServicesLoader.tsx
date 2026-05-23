"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LoadingText } from "./LoadingText";
import { PremiumTagline } from "./PremiumTagline";
import { getLoadingText, getPremiumTaglines } from "./loadingTextConfig";

/**
 * SERVICES PAGE LOADER - MINIMAL TECH GRID
 * Premium white aesthetic matching AGZUS design
 * - Floating white wireframe cubes
 * - Transparent glass panels rotate softly
 * - Elegant grid expansion
 * - Soft holographic reflections
 * - AI node connections animate
 * - Premium white depth transitions
 */
export default function ServicesLoader() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  const cubes = Array.from({ length: 9 }, (_, i) => i);
  const nodes = Array.from({ length: 6 }, (_, i) => i);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cubeVariants = {
    initial: { scale: 0, rotateX: 45, rotateY: 45, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      opacity: 0.8,
      transition: {
        delay: i * 0.0175,
        duration: 0.175,
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    }),
  };

  const cubeRotateVariants = {
    animate: (i: number) => ({
      rotateX: [0, 360],
      rotateY: [0, 360],
      transition: {
        delay: 1.2 + i * 0.12,
        duration: 3 + i * 0.2,
        type: "tween" as const,
        ease: "linear" as const,
        repeat: Infinity,
      },
    }),
  };

  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.15 + i * 0.02,
        duration: 0.12,
        type: "spring" as const,
        stiffness: 120,
      },
    }),
  };

  const connectionLineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 0.6,
      transition: {
        delay: 0.25,
        duration: 0.325,
        type: "tween" as const,
        ease: "easeInOut" as const,
      },
    },
  };

  const gridVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 0.32,
      transition: {
        delay: 0.08,
        duration: 0.35,
        type: "tween" as const,
        ease: "easeOut" as const,
      },
    },
  };

  const glassPanelVariants = {
    initial: { y: -40, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 0.2,
      transition: {
        delay: 0.125 + i * 0.03,
        duration: 0.2,
        type: "tween" as const,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Premium Glass Overlay */}
      <div className="absolute inset-0 backdrop-blur-[0.5px] bg-white/30" />

      {/* Expanding White Grid */}
      <motion.div
        className="absolute inset-0"
        variants={gridVariants}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(71,85,105,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(71,85,105,0.22)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </motion.div>

      {/* Ambient Glows */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-300/12 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.22, 0.32, 0.22],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-300/12 blur-3xl pointer-events-none"
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.22, 0.32, 0.22],
        }}
        transition={{
          delay: 1.5,
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Glass Panels Background */}
      <div className="absolute inset-0 flex justify-center items-center gap-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`panel-${i}`}
            className="absolute w-64 h-80 border border-slate-200/30 rounded-lg backdrop-blur-md bg-white/15"
            variants={glassPanelVariants}
            custom={i}
            initial="initial"
            animate="animate"
            style={{
              boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.1)",
            }}
          />
        ))}
      </div>

      {/* Central 3D Grid of Cubes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="grid grid-cols-3 gap-6 w-80 h-80"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {cubes.map((i) => (
            <motion.div
              key={`cube-${i}`}
              className="w-20 h-20 relative"
              custom={i}
              variants={cubeVariants}
              animate="animate"
            >
              <motion.div
                className="w-full h-full border border-slate-300/55 rounded-lg bg-gradient-to-br from-white/20 to-slate-100/10 backdrop-blur-sm"
                custom={i}
                variants={cubeRotateVariants}
                animate="animate"
                style={{
                  boxShadow: "0 4px 12px rgba(71, 85, 105, 0.15), inset 0 0 16px rgba(255, 255, 255, 0.3)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Service Nodes - Circle around center */}
        <div className="absolute inset-0 flex items-center justify-center">
          {nodes.map((i) => {
            const angle = (i / nodes.length) * Math.PI * 2;
            const x = Math.cos(angle) * 200;
            const y = Math.sin(angle) * 200;

            return (
              <motion.div
                key={`node-${i}`}
                className="absolute w-3 h-3 rounded-full bg-slate-500/90"
                custom={i}
                variants={nodeVariants}
                initial="initial"
                animate="animate"
                style={{
                  left: "50%",
                  top: "50%",
                  marginLeft: "-6px",
                  marginTop: "-6px",
                  boxShadow: "0 0 12px rgba(71, 85, 105, 0.6)",
                }}
              />
            );
          })}

          {/* Connection Lines (SVG) */}
          <svg
            className="absolute w-96 h-96 pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(148, 163, 184, 0.5)" />
                <stop offset="100%" stopColor="rgba(100, 116, 139, 0.2)" />
              </linearGradient>
            </defs>

            {nodes.map((i) => {
              const startAngle = (i / nodes.length) * Math.PI * 2;
              const endAngle = ((i + 1) % nodes.length) * Math.PI * 2;
              const startX = Math.cos(startAngle) * 200 + 192;
              const startY = Math.sin(startAngle) * 200 + 192;
              const endX = Math.cos(endAngle) * 200 + 192;
              const endY = Math.sin(endAngle) * 200 + 192;

              return (
                <motion.line
                  key={`line-${i}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="url(#connectionGradient)"
                  strokeWidth="1.5"
                  variants={connectionLineVariants}
                  initial="initial"
                  animate="animate"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Loading Status Text */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2 w-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.15 }}
      >
        <LoadingText words={getLoadingText("services")} duration={0.5} />
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
