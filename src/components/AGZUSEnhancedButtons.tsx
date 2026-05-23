"use client";

import React from "react";
import { motion } from "framer-motion";

interface AGZUSEnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "glass";
  size?: "sm" | "md" | "lg";
  withGlow?: boolean;
  withParticles?: boolean;
}

/**
 * AGZUS Enhanced Button
 * Based on existing glass design with immersive animations:
 * - Glowing pulse effect
 * - Animated gradient sweep
 * - Floating hover depth
 * - Subtle neon glow
 * - Futuristic energy ripple
 * - Glass hover shine
 */
export function AGZUSEnhancedButton({
  children,
  variant = "primary",
  size = "md",
  withGlow = true,
  withParticles = false,
  className = "",
  ...props
}: AGZUSEnhancedButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-black hover:bg-black/90 text-white border border-black/20",
    secondary:
      "bg-white/90 hover:bg-white text-black border border-black/15",
    glass: "bg-white/20 hover:bg-white/30 text-black border border-white/40 backdrop-blur-sm",
  };

  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-2xl font-semibold uppercase tracking-wider
        transition-all duration-300 outline-none
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
      `}
      whileHover={{
        y: -3,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
      {...props}
    >
      {/* Animated gradient sweep - left to right */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
        }}
      />

      {/* Glowing pulse - only on hover */}
      {withGlow && (
        <motion.div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg -z-10"
          style={{
            background: "radial-gradient(circle, rgba(0, 0, 0, 0.2) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.5 }}
        />
      )}

      {/* Energy ripple on click */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ scale: 0, opacity: 1 }}
        whileTap={{
          scale: 2,
          opacity: 0,
        }}
        transition={{ duration: 0.5 }}
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex items-center justify-center gap-2"
        whileHover={{
          letterSpacing: "0.05em",
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>

      {/* Floating particles on hover */}
      {withParticles && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-black/30"
              style={{
                left: `${30 + i * 20}%`,
                top: "50%",
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.button>
  );
}

/**
 * Glass Panel Button
 * Pure glassmorphism with subtle animations
 */
export function GlassPanelButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  return (
    <motion.button
      className={`
        relative px-5 py-2.5 rounded-2xl font-semibold uppercase tracking-wider
        glass-card text-black border border-black/10
        ${className}
      `}
      whileHover={{
        y: -2,
        borderColor: "rgba(0, 0, 0, 0.2)",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.08)",
      }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Glass shine effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-40 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.4), transparent)",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

/**
 * Neon Glow Button
 * Subtle neon effect with tech aesthetic
 */
export function NeonGlowButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  return (
    <motion.button
      className={`
        relative px-5 py-2.5 rounded-xl font-semibold uppercase tracking-wider
        bg-black/5 text-black border border-black/20
        ${className}
      `}
      initial={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
      whileHover={{
        boxShadow: [
          "0 0 10px rgba(0, 0, 0, 0.1)",
          "0 0 20px rgba(0, 0, 0, 0.2)",
          "0 0 10px rgba(0, 0, 0, 0.1)",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/**
 * Futuristic Energy Button
 * Animated energy flow effect
 */
export function FuturisticEnergyButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  return (
    <motion.button
      className={`
        relative px-5 py-2.5 rounded-2xl font-semibold uppercase tracking-wider
        bg-white/90 text-black border border-black/15
        ${className}
      `}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {/* Energy flow background */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.05) 50%,
              rgba(0, 0, 0, 0) 100%
            )
          `,
          backgroundSize: "200% 200%",
        }}
      />

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
