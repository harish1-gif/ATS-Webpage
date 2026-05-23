"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * AGZUS-Inspired Page Transitions
 * Uses futuristic grid, glowing energy, and glassmorphism
 */

/**
 * Grid Wipe Transition
 * Grid lines sweep across screen with glowing energy
 */
export function GridWipeTransition() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
      animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      exit={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        backgroundSize: "50px 50px",
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 1px, transparent 1px)
        `,
      }}
    />
  );
}

/**
 * Glowing Energy Transition
 * Violet/blue energy sweeps across screen
 */
export function GlowingEnergyTransition() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.2) 0%, transparent 100%)",
      }}
    />
  );
}

/**
 * Holographic Fade Reveal
 * Glass-like fade with holographic shimmer
 */
export function HolographicFadeReveal() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 1, backdropFilter: "blur(10px)" }}
      animate={{ opacity: 0, backdropFilter: "blur(0px)" }}
      exit={{ opacity: 1, backdropFilter: "blur(10px)" }}
      transition={{ duration: 0.7 }}
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)",
      }}
    />
  );
}

/**
 * Digital Scan Overlay
 * Scanning lines sweep down the screen
 */
export function DigitalScanOverlay() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      exit={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.15) 0px,
          rgba(0, 0, 0, 0.15) 2px,
          transparent 2px,
          transparent 10px
        )`,
      }}
    />
  );
}

/**
 * Floating Particle Dissolve
 * Particles float up and fade out as page transitions
 */
export function FloatingParticleDissolve() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(0, 0, 0, ${Math.random() * 0.3})`,
          }}
          animate={{
            y: -200,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.05,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Glass Slice Transition
 * Multiple glass layers slide in/out
 */
export function GlassSliceTransition() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 glass-panel"
          style={{
            transform: "translateY(0)",
          }}
          initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 33%, 0% 33%)" }}
          animate={{
            clipPath:
              i === 0
                ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
                : i === 1
                  ? "polygon(0% 33%, 100% 33%, 100% 33%, 0% 33%)"
                  : "polygon(0% 66%, 100% 66%, 100% 66%, 0% 66%)",
          }}
          exit={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          transition={{ duration: 0.7, delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}

/**
 * Ambient Glow Sweep
 * Glowing ambient light sweeps across screen
 */
export function AmbientGlowSweep() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        width: "100%",
        background:
          "linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.15) 50%, transparent 100%)",
      }}
    />
  );
}

/**
 * Page Transition Manager
 * Randomly selects and applies an AGZUS-style transition
 */
export function AGZUSPageTransitionManager() {
  const pathname = usePathname();
  const [transitionType, setTransitionType] = useState<number>(0);

  useEffect(() => {
    // Randomly select transition style (0-6)
    setTransitionType(Math.floor(Math.random() * 7));
  }, [pathname]);

  const transitions = [
    GridWipeTransition,
    GlowingEnergyTransition,
    HolographicFadeReveal,
    DigitalScanOverlay,
    FloatingParticleDissolve,
    GlassSliceTransition,
    AmbientGlowSweep,
  ];

  const TransitionComponent = transitions[transitionType];

  return (
    <AnimatePresence mode="wait">
      <TransitionComponent key={pathname} />
    </AnimatePresence>
  );
}

/**
 * Specific Page Transition Variants
 */

// Home Page - Grid activation with energy spread
export function HomePageTransition() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Grid expands */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundSize: "50px 50px",
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 1px, transparent 1px)
          `,
        }}
      />

      {/* Energy spread */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.2) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// Services Page - Grid and nodes reveal
export function ServicesPageTransition() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" }}
      animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      exit={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      style={{
        backgroundSize: "50px 50px",
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.12) 1px, transparent 1px)
        `,
      }}
    />
  );
}

// Contact Page - Radar scan transition
export function ContactPageTransition() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-black/20"
          style={{
            width: `${100 * ring}px`,
            height: `${100 * ring}px`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          exit={{ scale: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: ring * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// About Page - Blueprint reveal
export function AboutPageTransition() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        backgroundSize: "30px 30px",
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.12) 1px, transparent 1px)
        `,
      }}
    />
  );
}
