"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  glowEffect?: boolean;
}

export default function AnimatedButton({
  children,
  variant = "primary",
  size = "md",
  glowEffect = true,
  className = "",
  ...props
}: AnimatedButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-slate-900 hover:bg-brand-violet text-white border border-slate-900/50",
    secondary: "bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200",
    ghost: "bg-transparent hover:bg-slate-100/10 text-white border border-slate-400/30",
  };

  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-xl font-bold uppercase tracking-wider
        transition-all duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-violet
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
      `}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
      onHoverStart={(e) => {
        if (glowEffect) {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            variant === "primary"
              ? "0 0 30px rgba(139, 92, 246, 0.6), inset 0 0 30px rgba(139, 92, 246, 0.2)"
              : "0 0 20px rgba(139, 92, 246, 0.4)";
        }
      }}
      onHoverEnd={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
      }}
      {...props}
    >
      {/* Magnetic ripple effect background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-brand-violet/0 via-white/20 to-brand-violet/0"
        initial={{ x: "-100%" }}
        whileHover={{
          x: "100%",
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        style={{
          pointerEvents: "none",
        }}
      />

      {/* Neon border animation */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-xl border border-brand-violet/0"
          animate={{
            borderColor: ["rgba(139, 92, 246, 0)", "rgba(139, 92, 246, 0.5)", "rgba(139, 92, 246, 0)"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            pointerEvents: "none",
          }}
        />
      )}

      {/* Content with icon movement */}
      <motion.div
        className="relative flex items-center justify-center gap-2 z-10"
        whileHover={{
          letterSpacing: "0.05em",
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Energy glow behind button */}
      {glowEffect && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-brand-violet/30 to-brand-blue/30 rounded-xl blur opacity-0 -z-10"
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}
    </motion.button>
  );
}
