"use client";

import React from "react";
import { motion } from "framer-motion";

interface OptimizedAnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  glowEffect?: boolean;
}

export default function OptimizedAnimatedButton({
  children,
  variant = "primary",
  size = "md",
  glowEffect = true,
  className = "",
  ...props
}: OptimizedAnimatedButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-slate-900 hover:bg-brand-violet text-white border border-slate-900/50",
    secondary:
      "bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200",
    ghost: "bg-transparent hover:bg-slate-100/10 text-white border border-slate-400/30",
  };

  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-xl font-bold uppercase tracking-wider
        transition-colors duration-300 outline-none
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
      `}
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 0.5,
      }}
      suppressHydrationWarning
      {...props}
    >
      {/* Lightweight shine effect - CSS only */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          animation: "none",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.animation = "shine-sweep 0.6s ease-in-out";
        }}
      />

      {/* Subtle glow pulse animation - only on hover */}
      {glowEffect && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-brand-violet/20 to-brand-blue/10 rounded-xl opacity-0 blur-lg -z-10"
          whileHover={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      )}

      {/* Content */}
      <motion.div
        className="relative flex items-center justify-center gap-2 z-10"
        whileHover={{
          letterSpacing: "0.02em",
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
}
