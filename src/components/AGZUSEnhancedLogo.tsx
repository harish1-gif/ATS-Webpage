"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface AGZUSLogoInteractionProps {
  text?: string;
  className?: string;
  onAnimationComplete?: () => void;
  interactive?: boolean;
}

/**
 * AGZUS Enhanced Logo Interaction
 * When clicked:
 * - Each letter jumps independently
 * - Violet glow pulse spreads
 * - Subtle particle spark
 * - Glass reflection sweep
 * - Futuristic energy wave
 * - Smooth spring animation
 */
export function AGZUSEnhancedLogoInteraction({
  text = "AGZUS",
  className = "",
  onAnimationComplete,
  interactive = true,
}: AGZUSLogoInteractionProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLogoClick = () => {
    if (isAnimating || !interactive) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onAnimationComplete?.();
    }, 1200);
  };

  const letterVariants = {
    idle: {
      y: 0,
      scale: 1,
    },
    jumping: (i: number) => ({
      y: -50,
      scale: 1.15,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 12,
      },
    }),
  };

  return (
    <motion.div
      className={`cursor-pointer inline-block relative ${className}`}
      onClick={handleLogoClick}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative inline-block">
        {/* Glow pulse backdrop */}
        {isAnimating && (
          <motion.div
            className="absolute inset-0 rounded-lg blur-2xl pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0, 0, 0, 0.2) 0%, transparent 70%)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.5, 0.8],
              opacity: [0.5, 0.2, 0],
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />
        )}

        {/* Letters with jump animation */}
        <div className="flex gap-0 relative z-10">
          {text.split("").map((letter, i) => (
            <motion.div
              key={`letter-${i}`}
              custom={i}
              variants={letterVariants}
              initial="idle"
              animate={isAnimating ? "jumping" : "idle"}
              className="inline-block"
            >
              <span className="inline-block text-4xl font-black text-black">
                {letter}
              </span>

              {/* Particle sparks around jumping letters */}
              {isAnimating && (
                <>
                  {[...Array(3)].map((_, p) => (
                    <motion.div
                      key={`particle-${i}-${p}`}
                      className="absolute w-1 h-1 rounded-full bg-black/40"
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                      animate={{
                        x: Math.cos((p * Math.PI * 2) / 3) * 40,
                        y: Math.sin((p * Math.PI * 2) / 3) * 40 - 30,
                        opacity: [1, 0],
                        scale: [1, 0.5],
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1 + p * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </>
              )}

              {/* Glass reflection shine */}
              {isAnimating && (
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.4), transparent)",
                  }}
                  animate={{
                    opacity: [0.8, 0, 0],
                    x: [0, 20],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Futuristic energy wave (grows outward) */}
        {isAnimating && (
          <>
            {[0, 1, 2].map((ring) => (
              <motion.div
                key={`wave-${ring}`}
                className="absolute rounded-full border border-black/20 pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{
                  width: "0px",
                  height: "0px",
                }}
                animate={{
                  width: "200px",
                  height: "200px",
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: ring * 0.15,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Minimal Interactive Logo
 * Subtle interaction without heavy animation
 */
export function MinimalInteractiveLogo({
  text = "AGZUS",
  className = "",
}: AGZUSLogoInteractionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`cursor-pointer inline-block ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        {/* Subtle background glow on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-lg blur-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "radial-gradient(circle, rgba(0, 0, 0, 0.2), transparent 70%)",
            }}
          />
        )}

        {/* Letters */}
        <div className="flex gap-0 relative z-10">
          {text.split("").map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block text-3xl font-black text-black"
              animate={isHovered ? { y: -4 } : { y: 0 }}
              transition={{
                duration: 0.3,
                delay: i * 0.05,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Glowing Animated Logo
 * Logo with continuous subtle glow and pulsing effect
 */
export function GlowingAnimatedLogo({
  text = "AGZUS",
  className = "",
}: AGZUSLogoInteractionProps) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Background glow pulse */}
      <motion.div
        className="absolute inset-0 rounded-lg blur-xl pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(0, 0, 0, 0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Letters with floating effect */}
      <div className="flex gap-0">
        {text.split("").map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block text-3xl font-black text-black"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
