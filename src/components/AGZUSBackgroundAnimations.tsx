"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Animated Futuristic Grid — Premium Silver Edition
 * Ultra-light silver lines with subtle pulse animation
 */
export function AnimatedFuturisticGrid() {
  return (
    <>
      {/* Primary grid — 50px silver */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.65, 0.95, 0.65] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundSize: "50px 50px",
          backgroundImage: `
            linear-gradient(to right, rgba(100, 116, 139, 0.28) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100, 116, 139, 0.28) 1px, transparent 1px)
          `,
        }}
      />
      {/* Secondary fine grid — 25px ultra-light */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          backgroundSize: "25px 25px",
          backgroundImage: `
            linear-gradient(to right, rgba(100, 116, 139, 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100, 116, 139, 0.14) 1px, transparent 1px)
          `,
        }}
      />
    </>
  );
}

/**
 * Animated Ambient Glow Blob — Premium colored soft glows
 * Violet, blue, silver, and indigo tones for luxury depth
 */
export function AnimatedAmbientGlob({
  color = "violet",
  delay = 0,
  size = "w-96 h-96",
}: {
  color?: "violet" | "blue" | "silver" | "indigo";
  delay?: number;
  size?: string;
}) {
  const gradients = {
    violet: "radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(99, 102, 241, 0.09) 40%, rgba(248, 249, 251, 0) 70%)",
    blue: "radial-gradient(circle, rgba(96, 165, 250, 0.16) 0%, rgba(147, 197, 253, 0.08) 40%, rgba(248, 249, 251, 0) 70%)",
    silver: "radial-gradient(circle, rgba(148, 163, 184, 0.24) 0%, rgba(203, 213, 225, 0.12) 40%, rgba(248, 249, 251, 0) 70%)",
    indigo: "radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, rgba(139, 92, 246, 0.07) 40%, rgba(248, 249, 251, 0) 70%)",
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${size}`}
      style={{ background: gradients[color] }}
      animate={{
        scale: [1, 1.18, 1],
        opacity: [0.75, 1.1, 0.75],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/**
 * Glowing Blueprint Grid Lines — Elegant silver wireframe
 * Creates premium futuristic atmosphere with diagonal energy flows
 */
export function GlowingGridLines() {
  return (
    <svg
      className="absolute inset-0 pointer-events-none -z-10"
      width="100%"
      height="100%"
    >
      <defs>
        <linearGradient id="gridGlowSilver" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(100, 116, 139, 0)" />
          <stop offset="30%" stopColor="rgba(100, 116, 139, 0.35)" />
          <stop offset="50%" stopColor="rgba(99, 102, 241, 0.22)" />
          <stop offset="70%" stopColor="rgba(100, 116, 139, 0.30)" />
          <stop offset="100%" stopColor="rgba(100, 116, 139, 0)" />
        </linearGradient>
        <linearGradient id="gridGlowIndigo" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
          <stop offset="50%" stopColor="rgba(99, 102, 241, 0.18)" />
          <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
        </linearGradient>
      </defs>

      <motion.g
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#gridGlowSilver)" strokeWidth="2" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#gridGlowIndigo)" strokeWidth="1.5" />
      </motion.g>

      {/* Horizontal accent line */}
      <motion.line
        x1="0" y1="35%" x2="100%" y2="35%"
        stroke="rgba(100, 116, 139, 0.18)"
        strokeWidth="1"
        strokeDasharray="8 16"
        animate={{ strokeDashoffset: [0, -48] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Vertical accent line */}
      <motion.line
        x1="65%" y1="0" x2="65%" y2="100%"
        stroke="rgba(100, 116, 139, 0.16)"
        strokeWidth="1"
        strokeDasharray="6 20"
        animate={{ strokeDashoffset: [0, -52] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 1 }}
      />
    </svg>
  );
}

/**
 * Holographic Glass Reflection — Premium layered shimmer
 * Sweeping light reflection for holographic depth
 */
export function HolographicGlassLayer() {
  return (
    <>
      {/* Sweep reflection */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        animate={{
          backgroundPosition: ["-200% center", "200% center"],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(203, 213, 225, 0.22) 50%, transparent 60%)",
          backgroundSize: "200% auto",
        }}
      />
      {/* Ambient white reflection top */}
      <motion.div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none -z-10"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(248,249,251,0.25) 60%, transparent 100%)",
        }}
      />
      {/* Glass depth layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.12, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, transparent 50%, rgba(203, 213, 225, 0.12) 100%)",
          backdropFilter: "blur(1px)",
        }}
      />
    </>
  );
}

/**
 * Pulsing Ambient Lights — Premium soft colored glow points
 * Creates luxury futuristic depth atmosphere
 */
export function PulsingAmbientLights() {
  const lights = [
    { x: "5%",  y: "8%",  delay: 0,   color: "rgba(139, 92, 246, 0.18)",  size: 180 },
    { x: "80%", y: "12%", delay: 1,   color: "rgba(96, 165, 250, 0.16)",  size: 200 },
    { x: "45%", y: "55%", delay: 2,   color: "rgba(100, 116, 139, 0.22)", size: 160 },
    { x: "10%", y: "70%", delay: 1.5, color: "rgba(99, 102, 241, 0.14)",  size: 140 },
    { x: "85%", y: "80%", delay: 2.5, color: "rgba(100, 116, 139, 0.18)", size: 180 },
    { x: "60%", y: "30%", delay: 0.8, color: "rgba(139, 92, 246, 0.12)",  size: 120 },
  ];

  return (
    <>
      {lights.map((light, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            left: light.x,
            top: light.y,
            width: `${light.size}px`,
            height: `${light.size}px`,
            background: `radial-gradient(circle, ${light.color} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.65, 1.1, 0.65],
          }}
          transition={{
            duration: 6 + i,
            delay: light.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/**
 * Animated Floating Blueprint Lines — Premium wireframe aesthetics
 * Transparent dashed lines creating a futuristic blueprint feel
 */
export function AnimatedBlueprintLines() {
  return (
    <svg
      className="absolute inset-0 pointer-events-none -z-10"
      width="100%"
      height="100%"
      opacity={0.5}
    >
      {/* Corner bracket top-left */}
      <motion.polyline
        points="0,60 0,0 60,0"
        fill="none"
        stroke="rgba(99, 102, 241, 0.32)"
        strokeWidth="1.5"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      {/* Corner bracket bottom-right */}
      <motion.polyline
        points="calc(100% - 60px),100% 100%,100% 100%,calc(100% - 60px)"
        fill="none"
        stroke="rgba(99, 102, 241, 0.28)"
        strokeWidth="1.5"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      {/* Horizontal scan line */}
      <motion.line
        x1="0" y1="50%" x2="100%" y2="50%"
        stroke="rgba(100, 116, 139, 0.16)"
        strokeWidth="1"
        strokeDasharray="4 12"
        animate={{ strokeDashoffset: [0, -64] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

/**
 * Flowing Energy Gradient — Cinematic silver-indigo energy flow
 */
export function FlowingEnergyGradient() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none -z-10"
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background: `
          linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.06) 0%,
            rgba(100, 116, 139, 0.08) 33%,
            rgba(96, 165, 250, 0.06) 66%,
            rgba(100, 116, 139, 0.07) 100%
          )
        `,
        backgroundSize: "300% 300%",
      }}
    />
  );
}

/**
 * Ambient AI Particles — Ultra-light floating dots
 * Simulates ambient AI processing atmosphere
 */
export function AmbientAIParticles({ count = 12 }: { count?: number }) {
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; size: number; delay: number; duration: number; color: string }>
  >([]);

  useEffect(() => {
    const colors = [
      "rgba(100, 116, 139, 0.75)",
      "rgba(99, 102, 241, 0.55)",
      "rgba(139, 92, 246, 0.50)",
      "rgba(96, 165, 250, 0.55)",
    ];
    setParticles(
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        delay: Math.random() * 4,
        duration: 5 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    );
  }, [count]);

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${p.color} 0%, transparent 80%)`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/**
 * Complete AGZUS Background Animation Suite — Premium Silver Edition
 * Full layered atmosphere: grid + glow + glass + particles + energy
 */
export function AGZUSBackgroundAnimationSuite() {
  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Base cinematic gradient */}
      <FlowingEnergyGradient />

      {/* Premium silver grid system */}
      <AnimatedFuturisticGrid />

      {/* Blueprint wireframe lines */}
      <AnimatedBlueprintLines />

      {/* Diagonal grid glow lines */}
      <GlowingGridLines />

      {/* Ambient glow blobs — layered colors */}
      <div className="absolute top-[5%] left-[-8%]">
        <AnimatedAmbientGlob color="violet" delay={0} size="w-[500px] h-[500px]" />
      </div>
      <div className="absolute top-[35%] right-[-8%]">
        <AnimatedAmbientGlob color="blue" delay={1.5} size="w-[400px] h-[400px]" />
      </div>
      <div className="absolute bottom-[5%] left-[20%]">
        <AnimatedAmbientGlob color="silver" delay={3} size="w-[350px] h-[350px]" />
      </div>
      <div className="absolute top-[60%] right-[30%]">
        <AnimatedAmbientGlob color="indigo" delay={2} size="w-[280px] h-[280px]" />
      </div>

      {/* Holographic glass reflections */}
      <HolographicGlassLayer />

      {/* Pulsing ambient light points */}
      <PulsingAmbientLights />

      {/* Ambient AI particles */}
      <AmbientAIParticles count={14} />
    </div>
  );
}
