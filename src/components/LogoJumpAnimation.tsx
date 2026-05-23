"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface LogoJumpAnimationProps {
  text?: string;
  className?: string;
  onAnimationComplete?: () => void;
}

export default function LogoJumpAnimation({
  text = "AGZUS",
  className = "",
  onAnimationComplete,
}: LogoJumpAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLogoClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onAnimationComplete?.();
    }, 1000);
  };

  const letterVariants = {
    idle: {
      y: 0,
      rotate: 0,
    },
    jumping: (i: number) => ({
      y: [-40, 0],
      rotate: [0, 20, 0],
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    }),
  };

  const glowVariants = {
    idle: {
      boxShadow: "0 0 0px rgba(139, 92, 246, 0)",
    },
    jumping: {
      boxShadow: [
        "0 0 0px rgba(139, 92, 246, 0)",
        "0 0 20px rgba(139, 92, 246, 0.8)",
        "0 0 40px rgba(139, 92, 246, 0.4)",
        "0 0 0px rgba(139, 92, 246, 0)",
      ],
      transition: {
        duration: 1,
      },
    },
  };

  const particleVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: (i: number) => ({
      opacity: [1, 0],
      scale: [1, 0],
      x: [0, (Math.cos((i / 8) * Math.PI * 2) * 50)],
      y: [0, (Math.sin((i / 8) * Math.PI * 2) * 50)],
      transition: {
        delay: 0.3,
        duration: 0.6,
      },
    }),
  };

  return (
    <motion.div
      className={`cursor-pointer inline-block ${className}`}
      onClick={handleLogoClick}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
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
              style={{
                willChange: "transform",
              }}
            >
              {/* Glow effect for each letter */}
              <motion.div
                custom={i}
                variants={glowVariants}
                initial="idle"
                animate={isAnimating ? "jumping" : "idle"}
                className="absolute -inset-2 rounded-lg pointer-events-none"
              />

              {letter}

              {/* Particle sparkles around each letter */}
              {isAnimating && (
                <>
                  {[...Array(8)].map((_, pi) => (
                    <motion.div
                      key={`particle-${i}-${pi}`}
                      custom={pi}
                      variants={particleVariants}
                      initial="hidden"
                      animate="visible"
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      style={{
                        top: "50%",
                        left: "50%",
                        willChange: "transform, opacity",
                      }}
                    />
                  ))}
                </>
              )}
            </motion.span>
          ))}
        </div>

        {/* Hover reactive animation on logo container */}
        <motion.div
          className="absolute -inset-4 rounded-lg border border-brand-violet/0"
          whileHover={{
            borderColor: "rgba(139, 92, 246, 0.5)",
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Subtle hover glow background */}
      <motion.div
        className="absolute -inset-6 rounded-xl bg-gradient-to-r from-brand-violet/0 via-brand-violet/10 to-brand-violet/0 opacity-0 blur-xl"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
    </motion.div>
  );
}
