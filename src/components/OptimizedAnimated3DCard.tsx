"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

interface OptimizedAnimated3DCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}

export default function OptimizedAnimated3DCard({
  children,
  className = "",
  glowColor = "rgba(139, 92, 246, 0.2)",
  delay = 0,
}: OptimizedAnimated3DCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Tilt
        tiltMaxAngleX={3}
        tiltMaxAngleY={3}
        scale={1.01}
        transitionSpeed={300}
        className={`h-full ${className}`}
      >
        <motion.div
          className="relative h-full rounded-2xl overflow-hidden group"
          whileHover={{
            y: -4,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Simple glow on hover - no backdrop filter */}
          <motion.div
            className="absolute inset-0 rounded-2xl border border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              borderColor: glowColor,
              boxShadow: `0 0 20px ${glowColor}`,
              pointerEvents: "none",
            }}
          />

          {/* Main content */}
          <div className="relative z-10">{children}</div>

          {/* Subtle gradient overlay - lightweight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none" />
        </motion.div>
      </Tilt>
    </motion.div>
  );
}
