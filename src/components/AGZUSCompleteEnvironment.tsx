"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * AGZUS Complete Environment — Premium Silver-Gray AI Edition
 * Layered, cinematic, futuristic light gray atmosphere
 * Keeps AGZUS white enterprise clean aesthetic — elevates it.
 */

interface CompleteEnvironmentProps {
  includeGrid?: boolean;
  includeGlow?: boolean;
  includeScanLines?: boolean;
  includeParticles?: boolean;
  intensity?: "light" | "medium" | "heavy";
}

export function AGZUSCompleteEnvironment({
  includeGrid = true,
  includeGlow = true,
  includeScanLines = false,
  includeParticles = true,
  intensity = "medium",
}: CompleteEnvironmentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const particleCount =
    intensity === "light" ? 8 : intensity === "medium" ? 14 : 22;
  const gridOpacity = intensity === "light" ? 0.45 : intensity === "medium" ? 0.65 : 0.80;
  const glowStrength = intensity === "light" ? 0.7 : intensity === "medium" ? 1.0 : 1.3;

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">

      {/* ── LAYER 0: CINEMATIC BASE GRADIENT ─────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 15% 10%, rgba(139, 92, 246, ${0.05 * glowStrength}) 0%, transparent 60%),
            radial-gradient(ellipse 70% 60% at 85% 90%, rgba(96, 165, 250, ${0.05 * glowStrength}) 0%, transparent 60%),
            radial-gradient(ellipse 100% 70% at 50% 50%, rgba(148, 163, 184, ${0.06 * glowStrength}) 0%, transparent 70%),
            linear-gradient(160deg, #f8f9fb 0%, #f3f4f6 30%, #eef1f5 60%, #f1f5f9 100%)
          `,
        }}
      />

      {/* ── LAYER 1: ANIMATED PRIMARY SILVER GRID ─────────────── */}
      {includeGrid && (
        <>
          {/* 50px grid */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundSize: "50px 50px",
              backgroundImage: `
                linear-gradient(to right, rgba(148, 163, 184, 0.20) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(148, 163, 184, 0.20) 1px, transparent 1px)
              `,
            }}
            animate={{ opacity: [gridOpacity * 0.65, gridOpacity, gridOpacity * 0.65] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* 25px fine grid — ultra subtle */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundSize: "25px 25px",
              backgroundImage: `
                linear-gradient(to right, rgba(148, 163, 184, 0.09) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(148, 163, 184, 0.09) 1px, transparent 1px)
              `,
            }}
            animate={{ opacity: [gridOpacity * 0.3, gridOpacity * 0.55, gridOpacity * 0.3] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </>
      )}

      {/* ── LAYER 2: AMBIENT GLOW BLOBS (PREMIUM COLORED) ────── */}
      {includeGlow && (
        <>
          {/* Violet top-left */}
          <motion.div
            className="absolute top-[2%] left-[-8%] w-[520px] h-[520px] rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(139, 92, 246, ${0.10 * glowStrength}) 0%, rgba(99, 102, 241, ${0.05 * glowStrength}) 40%, rgba(248, 249, 251, 0) 70%)`,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6],
              x: [0, 25, 0],
              y: [0, -18, 0],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Blue bottom-right */}
          <motion.div
            className="absolute bottom-[2%] right-[-8%] w-[440px] h-[440px] rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(96, 165, 250, ${0.09 * glowStrength}) 0%, rgba(147, 197, 253, ${0.04 * glowStrength}) 40%, rgba(248, 249, 251, 0) 70%)`,
            }}
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.5, 0.9, 0.5],
              x: [0, -20, 0],
              y: [0, 22, 0],
            }}
            transition={{ duration: 16, delay: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Silver center accent */}
          <motion.div
            className="absolute top-[35%] left-[25%] w-[360px] h-[360px] rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(148, 163, 184, ${0.12 * glowStrength}) 0%, rgba(203, 213, 225, ${0.06 * glowStrength}) 40%, rgba(248, 249, 251, 0) 70%)`,
            }}
            animate={{
              scale: [1, 1.20, 1],
              opacity: [0.4, 0.75, 0.4],
            }}
            transition={{ duration: 18, delay: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Indigo top-right subtle accent */}
          <motion.div
            className="absolute top-[10%] right-[10%] w-[260px] h-[260px] rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(99, 102, 241, ${0.07 * glowStrength}) 0%, rgba(139, 92, 246, ${0.03 * glowStrength}) 40%, rgba(248, 249, 251, 0) 70%)`,
            }}
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.3, 0.65, 0.3],
            }}
            transition={{ duration: 12, delay: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* ── LAYER 3: HOLOGRAPHIC GLASS REFLECTIONS ───────────── */}
      {/* Top pearl fog */}
      <div
        className="absolute inset-x-0 top-0 h-64 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.60) 0%, rgba(248,249,251,0.25) 50%, transparent 100%)",
        }}
      />
      {/* Sweeping shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ backgroundPosition: ["-200% center", "200% center"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 3 }}
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(203, 213, 225, 0.12) 50%, transparent 60%)",
          backgroundSize: "200% auto",
        }}
      />
      {/* Depth glass pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.06, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, transparent 50%, rgba(203, 213, 225, 0.07) 100%)",
        }}
      />

      {/* ── LAYER 4: BLUEPRINT WIREFRAME LINES ───────────────── */}
      <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
        <defs>
          <linearGradient id="agzusSilverFlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(148,163,184,0)" />
            <stop offset="40%" stopColor="rgba(148,163,184,0.22)" />
            <stop offset="60%" stopColor="rgba(99,102,241,0.12)" />
            <stop offset="100%" stopColor="rgba(148,163,184,0)" />
          </linearGradient>
        </defs>
        <motion.g
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#agzusSilverFlow)" strokeWidth="1.5" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#agzusSilverFlow)" strokeWidth="1" opacity="0.6" />
        </motion.g>
        {/* Horizontal dashed accent */}
        <motion.line
          x1="0" y1="38%" x2="100%" y2="38%"
          stroke="rgba(148,163,184,0.10)"
          strokeWidth="1"
          strokeDasharray="8 18"
          animate={{ strokeDashoffset: [0, -52] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        {/* Vertical dashed accent */}
        <motion.line
          x1="62%" y1="0" x2="62%" y2="100%"
          stroke="rgba(99,102,241,0.07)"
          strokeWidth="1"
          strokeDasharray="6 22"
          animate={{ strokeDashoffset: [0, -56] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </svg>

      {/* ── LAYER 5: AMBIENT AI PARTICLES ─────────────────────── */}
      {includeParticles && (
        <>
          {Array.from({ length: particleCount }, (_, i) => {
            const x = (i * 73 + 11) % 100;
            const y = (i * 47 + 17) % 100;
            const delay = (i * 0.4) % 4;
            const duration = 5 + (i % 5);
            const colors = [
              `rgba(148, 163, 184, 0.55)`,
              `rgba(99, 102, 241, 0.45)`,
              `rgba(139, 92, 246, 0.40)`,
              `rgba(96, 165, 250, 0.45)`,
              `rgba(203, 213, 225, 0.60)`,
            ];
            const color = colors[i % colors.length];
            const size = 2 + (i % 3);

            return (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `radial-gradient(circle, ${color} 0%, transparent 80%)`,
                }}
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.3, 0.85, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </>
      )}

      {/* ── LAYER 6: SCAN LINES (optional) ───────────────────── */}
      {includeScanLines && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.01, 0.04, 0.01] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                rgba(148, 163, 184, 0.06) 0px,
                rgba(148, 163, 184, 0.06) 1px,
                transparent 1px,
                transparent 32px
              )
            `,
          }}
        />
      )}

      {/* ── LAYER 7: CINEMATIC ENERGY FLOW ───────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(139, 92, 246, 0.025) 0%,
              rgba(148, 163, 184, 0.04) 33%,
              rgba(96, 165, 250, 0.025) 66%,
              rgba(148, 163, 184, 0.035) 100%
            )
          `,
          backgroundSize: "300% 300%",
        }}
      />

      {/* ── LAYER 8: PREMIUM EDGE HIGHLIGHT GLOW POINTS ──────── */}
      {[
        { x: "18%",  y: "18%",  delay: 0,   color: "rgba(139, 92, 246, 0.12)" },
        { x: "82%",  y: "25%",  delay: 1.2, color: "rgba(96, 165, 250, 0.10)" },
        { x: "50%",  y: "68%",  delay: 2.5, color: "rgba(148, 163, 184, 0.15)" },
        { x: "8%",   y: "82%",  delay: 1.8, color: "rgba(99, 102, 241, 0.09)" },
        { x: "92%",  y: "78%",  delay: 3,   color: "rgba(148, 163, 184, 0.12)" },
      ].map((point, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-2xl pointer-events-none"
          style={{
            left: point.x,
            top: point.y,
            width: "130px",
            height: "130px",
            background: `radial-gradient(circle, ${point.color} 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 7,
            delay: point.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * AGZUS Minimal Environment — Premium Silver Lightweight
 * Performance-optimized version for secondary pages
 */
export function AGZUSMinimalEnvironment() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Base silver grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundSize: "50px 50px",
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.16) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.16) 1px, transparent 1px)
          `,
        }}
        animate={{ opacity: [0.45, 0.70, 0.45] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Top pearl fog */}
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)",
        }}
      />

      {/* Violet top-left glow */}
      <motion.div
        className="absolute top-[5%] left-[-10%] w-[420px] h-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.09) 0%, rgba(99, 102, 241, 0.04) 40%, rgba(248, 249, 251, 0) 70%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Blue bottom-right glow */}
      <motion.div
        className="absolute bottom-[5%] right-[-10%] w-[380px] h-[380px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(96, 165, 250, 0.08) 0%, rgba(148, 163, 184, 0.04) 40%, rgba(248, 249, 251, 0) 70%)",
        }}
        animate={{ scale: [1, 1.10, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 16, delay: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Silver center haze */}
      <motion.div
        className="absolute top-[30%] right-[20%] w-[280px] h-[280px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(148, 163, 184, 0.10) 0%, rgba(203, 213, 225, 0.05) 40%, rgba(248, 249, 251, 0) 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 18, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sweeping shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ backgroundPosition: ["-200% center", "200% center"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(203, 213, 225, 0.10) 50%, transparent 60%)",
          backgroundSize: "200% auto",
        }}
      />
    </div>
  );
}
