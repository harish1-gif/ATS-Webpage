"use client";

import React, { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

interface InteractiveElementProps extends MotionProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverGlow?: boolean;
  hoverLift?: boolean;
  glowColor?: string;
}

export default function InteractiveElement({
  children,
  className = "",
  hoverScale = 1.02,
  hoverGlow = true,
  hoverLift = true,
  glowColor = "rgba(139, 92, 246, 0.2)",
  ...props
}: InteractiveElementProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        scale: hoverScale,
        y: hoverLift ? -4 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      {...props}
    >
      {/* Glow effect on hover */}
      {hoverGlow && (
        <motion.div
          className="absolute -inset-1 rounded-lg opacity-0 pointer-events-none blur-md"
          style={{
            background: glowColor,
          }}
          whileHover={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      )}

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Floating element wrapper - adds floating animation
export function FloatingElement({
  children,
  className = "",
  intensity = 1,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10 * intensity, 0],
      }}
      transition={{
        duration: 4 + intensity,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Pulse element wrapper
export function PulsingElement({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// Shimmer effect wrapper
export function ShimmerElement({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ backgroundPosition: "0% center" }}
      animate={{ backgroundPosition: "200% center" }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
        backgroundSize: "200% 100%",
      }}
    >
      {children}
    </motion.div>
  );
}
