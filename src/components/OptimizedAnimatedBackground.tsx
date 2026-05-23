"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getOptimizedParticleCount } from "@/utils/performanceOptimization";

interface OptimizedAnimatedBackgroundProps {
  withParticles?: boolean;
  withGrid?: boolean;
  intensity?: "low" | "medium" | "high";
}

export default function OptimizedAnimatedBackground({
  withParticles = true,
  withGrid = true,
  intensity = "medium",
}: OptimizedAnimatedBackgroundProps) {
  const [isClient, setIsClient] = useState(false);

  // Generate particle positions only on client after hydration
  const particles = useMemo(() => {
    if (!isClient) return [];

    const baseCount = intensity === "low" ? 10 : intensity === "medium" ? 20 : 30;
    const optimizedCount = getOptimizedParticleCount(baseCount);

    const colors = [
      [148, 163, 184], // slate-400 silver
      [99, 102, 241],  // indigo-500
      [139, 92, 246],  // violet-500
      [96, 165, 250],  // blue-400
      [203, 213, 225], // slate-300 pearl
    ];

    return [...Array(optimizedCount)].map((_, i) => {
      const color = colors[i % colors.length];
      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.35 + 0.25,
        color,
      };
    });
  }, [intensity, isClient]);

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* Premium silver AI particles */}
      {withParticles &&
        particles.map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              background: `radial-gradient(circle, rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.opacity}) 0%, transparent 75%)`,
              opacity: particle.opacity,
            }}
            whileInView={{
              opacity: particle.opacity * 1.6,
              scale: 1.3,
            }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "200px" }}
          />
        ))}

      {/* Premium silver animated grid */}
      {withGrid && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(0deg, rgba(148, 163, 184, 0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.18) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            backgroundAttachment: "fixed",
          }}
          animate={{ opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Fine detail grid overlay */}
      {withGrid && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(0deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "25px 25px",
            backgroundAttachment: "fixed",
          }}
          animate={{ opacity: [0.25, 0.50, 0.25] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      )}

      {/* Violet ambient glow — top-left */}
      <motion.div
        className="absolute top-[8%] left-[-6%] w-[440px] h-[440px] rounded-full blur-3xl opacity-70 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.10) 0%, rgba(99, 102, 241, 0.05) 40%, rgba(248, 249, 251, 0) 70%)",
        }}
        animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Blue ambient glow — bottom-right */}
      <motion.div
        className="absolute bottom-[8%] right-[-6%] w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(96, 165, 250, 0.09) 0%, rgba(147, 197, 253, 0.04) 40%, rgba(248, 249, 251, 0) 70%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.80, 0.45] }}
        transition={{ duration: 15, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Silver center mist */}
      <motion.div
        className="absolute top-[40%] left-[35%] w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(148, 163, 184, 0.12) 0%, rgba(203, 213, 225, 0.06) 40%, rgba(248, 249, 251, 0) 70%)",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 17, delay: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pearl fog top */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(248,249,251,0.20) 60%, transparent 100%)",
        }}
      />

      {/* Holographic shimmer sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ backgroundPosition: ["-200% center", "200% center"] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear", delay: 4 }}
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(203, 213, 225, 0.11) 50%, transparent 60%)",
          backgroundSize: "200% auto",
        }}
      />
    </div>
  );
}
