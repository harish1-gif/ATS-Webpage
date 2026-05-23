"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  withParticles?: boolean;
  withWaves?: boolean;
  withGrid?: boolean;
  withGradientOrbs?: boolean;
  intensity?: "low" | "medium" | "high";
}

export default function AnimatedBackground({
  withParticles = true,
  withWaves = true,
  withGrid = true,
  withGradientOrbs = true,
  intensity = "medium",
}: AnimatedBackgroundProps) {
  // Generate particle positions once
  const particles = useMemo(() => {
    return [...Array(30)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  const particleCount = intensity === "low" ? 15 : intensity === "medium" ? 30 : 50;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated futuristic particles */}
      {withParticles &&
        particles.slice(0, particleCount).map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-cyan-400/60 to-brand-violet/40 blur-sm"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Moving digital waves */}
      {withWaves && (
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          style={{ opacity: 0.1 }}
        >
          <defs>
            <filter id="wave-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
          </defs>

          {[...Array(3)].map((_, i) => (
            <motion.path
              key={`wave-${i}`}
              d={`M0,${100 + i * 80} Q${window.innerWidth / 4},${80 + i * 80} ${
                window.innerWidth / 2
              },${100 + i * 80} T${window.innerWidth},${100 + i * 80}`}
              fill="none"
              stroke="rgba(139, 92, 246, 0.2)"
              strokeWidth="2"
              filter="url(#wave-blur)"
              animate={{
                d: [
                  `M0,${100 + i * 80} Q${window.innerWidth / 4},${80 + i * 80} ${
                    window.innerWidth / 2
                  },${100 + i * 80} T${window.innerWidth},${100 + i * 80}`,
                  `M0,${110 + i * 80} Q${window.innerWidth / 4},${90 + i * 80} ${
                    window.innerWidth / 2
                  },${110 + i * 80} T${window.innerWidth},${110 + i * 80}`,
                  `M0,${100 + i * 80} Q${window.innerWidth / 4},${80 + i * 80} ${
                    window.innerWidth / 2
                  },${100 + i * 80} T${window.innerWidth},${100 + i * 80}`,
                ],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      )}

      {/* Floating gradient orbs */}
      {withGradientOrbs && (
        <>
          <motion.div
            className="absolute w-80 h-80 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              top: "10%",
              left: "5%",
            }}
          />

          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            }}
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            style={{
              bottom: "5%",
              right: "10%",
            }}
          />
        </>
      )}

      {/* Animated soft grid */}
      {withGrid && (
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(0deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0 0", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Subtle AI-inspired background motion - tech-inspired lines */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background:
            "linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
