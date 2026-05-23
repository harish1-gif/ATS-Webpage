"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface OptimizedLogoJumpProps {
  text?: string;
  className?: string;
  onAnimationComplete?: () => void;
}

export default function OptimizedLogoJump({
  text = "AGZUS",
  className = "",
  onAnimationComplete,
}: OptimizedLogoJumpProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLogoClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onAnimationComplete?.();
    }, 600);
  };

  const letterVariants = {
    idle: {
      y: 0,
    },
    jumping: (i: number) => ({
      y: -30,
      transition: {
        delay: i * 0.06,
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    }),
  };

  return (
    <motion.div
      className={`cursor-pointer inline-block ${className}`}
      onClick={handleLogoClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative inline-block">
        <div className="flex gap-0">
          {text.split("").map((letter, i) => (
            <motion.span
              key={`letter-${i}`}
              custom={i}
              variants={letterVariants}
              initial="idle"
              animate={isAnimating ? "jumping" : "idle"}
              className="inline-block font-bebas-neue text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-violet to-brand-blue relative"
            >
              {letter}

              {/* Subtle glow pulse on jump - lightweight */}
              {isAnimating && (
                <motion.div
                  className="absolute -inset-2 rounded-lg pointer-events-none"
                  style={{
                    boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.4,
                  }}
                />
              )}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
