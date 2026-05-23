"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LoadingText } from "./LoadingText";
import { PremiumTagline } from "./PremiumTagline";
import { getLoadingText, getPremiumTaglines } from "./loadingTextConfig";

/**
 * PORTFOLIO PAGE LOADER - LUXURY SHOWCASE REVEAL
 * Elegant white gallery aesthetic
 * - Floating glass frames
 * - Subtle project previews
 * - Elegant light sweeps
 * - Transparent layered motion
 * - Premium cinematic reveal
 */
export default function PortfolioLoader() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  const projectFrames = Array.from({ length: 5 }, (_, i) => i);
  const dataStreams = Array.from({ length: 4 }, (_, i) => i);

  const frameContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const frameVariants = {
    initial: { scale: 0, rotateY: -60, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      rotateY: 0,
      opacity: 0.85,
      transition: {
        delay: i * 0.0275,
        duration: 0.2,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    }),
  };

  const frameRotateVariants = {
    animate: (i: number) => ({
      rotateY: [0, 360, 0],
      rotateZ: [0, 3, -3, 0],
      transition: {
        delay: 1.3 + i * 0.15,
        duration: 3.5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    }),
  };

  const dataStreamVariants = {
    initial: { opacity: 0, x: 0 },
    animate: (i: number) => ({
      opacity: [0.2, 0.5, 0.2],
      x: [0, 150, 0],
      transition: {
        delay: 0.9 + i * 0.3,
        duration: 2.8,
        ease: "easeInOut",
        repeat: Infinity,
      },
    }),
  };

  const lightSweepVariants = {
    initial: { x: "-100%", opacity: 0 },
    animate: {
      x: "100%",
      opacity: [0, 0.4, 0],
      transition: {
        delay: 0.175,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const panelVariants = {
    initial: { scaleY: 0, opacity: 0 },
    animate: (i: number) => ({
      scaleY: 1,
      opacity: 0.45,
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

      {/* White Minimal Grid */}
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
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-300/12 blur-3xl pointer-events-none"
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
        className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-violet-300/12 blur-3xl pointer-events-none"
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

      {/* Transparent Display Panels */}
      <div className="absolute inset-0 flex justify-around items-center px-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`panel-${i}`}
            className="w-px h-64 border-l border-slate-300/25 backdrop-blur-md bg-gradient-to-b from-white/20 to-transparent"
            custom={i}
            variants={panelVariants}
            initial="initial"
            animate="animate"
          />
        ))}
      </div>

      {/* Cinematic Light Sweep */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
        variants={lightSweepVariants}
        initial="initial"
        animate="animate"
        style={{
          pointerEvents: "none",
        }}
      />

      {/* Central Project Frames - Circular arrangement */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-96 h-80 relative"
          variants={frameContainerVariants}
          initial="initial"
          animate="animate"
          style={{
            perspective: "1200px",
          }}
        >
          {projectFrames.map((i) => {
            const angle = (i / projectFrames.length) * Math.PI * 2;
            const x = Math.cos(angle) * 120;
            const y = Math.sin(angle) * 100;

            return (
              <motion.div
                key={`frame-${i}`}
                className="absolute w-32 h-24 border border-slate-300/40 rounded-lg bg-gradient-to-br from-white/30 to-slate-100/10 backdrop-blur-md flex items-center justify-center"
                custom={i}
                variants={frameVariants}
                animate={["animate", "animate"]}
                style={{
                  left: "50%",
                  top: "50%",
                  x: x,
                  y: y,
                  boxShadow: "0 4px 12px rgba(100, 116, 139, 0.08), inset 0 0 16px rgba(255, 255, 255, 0.2)",
                }}
              >
                <motion.div
                  className="w-full h-full border border-slate-200/40 rounded-lg"
                  custom={i}
                  variants={frameRotateVariants}
                  initial="initial"
                  animate="animate"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Data Streams - Floating lines */}
        {dataStreams.map((i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent"
            custom={i}
            variants={dataStreamVariants}
            initial="initial"
            animate="animate"
            style={{
              width: "300px",
              top: `${35 + i * 12}%`,
              left: "25%",
            }}
          />
        ))}
      </div>

      {/* Elegant Corner Frames */}
      {[0, 1, 2, 3].map((i) => {
        const corners = [
          { x: "10%", y: "10%" },
          { x: "90%", y: "10%" },
          { x: "10%", y: "90%" },
          { x: "90%", y: "90%" },
        ];
        const corner = corners[i];

        return (
          <motion.div
            key={`corner-${i}`}
            className="absolute w-20 h-20 border border-slate-300/30 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{
              delay: 0.6 + i * 0.1,
              duration: 0.5,
            }}
            style={{
              left: corner.x,
              top: corner.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Loading Status Text */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2 w-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.15 }}
      >
        <LoadingText words={getLoadingText("portfolio")} duration={0.5} />
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
