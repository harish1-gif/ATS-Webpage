"use client";

import React, { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CinematicHoverProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
  glowColor?: string;
}

export default function CinematicHover({
  children,
  className = "",
  borderColor = "rgba(139, 92, 246, 0.3)",
  glowColor = "rgba(139, 92, 246, 0.2)",
}: CinematicHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
      whileHover={{
        boxShadow: `0 0 40px ${glowColor}`,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Light follow effect */}
      <motion.div
        className="absolute pointer-events-none opacity-0 group-hover:opacity-100"
        animate={{
          background: `radial-gradient(500px at ${position.x}px ${position.y}px, ${glowColor}, transparent 80%)`,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
        }}
      />

      {/* Main content */}
      <div className="relative z-10">{children}</div>

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none border rounded-inherit opacity-0"
        style={{
          borderColor,
        }}
        whileHover={{
          opacity: 1,
          boxShadow: `inset 0 0 20px ${borderColor}`,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Text gradient animation
export function AnimatedGradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-brand-violet via-purple-500 to-brand-blue ${className}`}
      animate={{
        backgroundPosition: ["0% center", "100% center", "0% center"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    >
      {children}
    </motion.span>
  );
}

// Glowing border animation
export function GlowingBorderBox({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        boxShadow: "0 0 30px rgba(139, 92, 246, 0.6), inset 0 0 30px rgba(139, 92, 246, 0.1)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-brand-violet/20 via-transparent to-brand-violet/20 rounded-inherit pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
