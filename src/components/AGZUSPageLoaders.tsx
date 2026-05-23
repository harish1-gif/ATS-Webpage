"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * HOME PAGE LOADER
 * Glowing AGZUS grid activates → ambient violet energy spreads →
 * logo builds from digital particles → futuristic background pulses alive
 */
export function HomePageLoader() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background grid animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundSize: "50px 50px",
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.20) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.20) 1px, transparent 1px)
          `,
        }}
        animate={{ opacity: [0.08, 0.25, 0.08] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Violet energy spread */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 0%, transparent 100%)",
            "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.1) 0%, transparent 60%)",
            "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 0%, transparent 100%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated logo build from particles */}
        <motion.div
          className="relative w-32 h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Letter blocks animating in */}
          {["A", "G", "Z", "U", "S"].map((letter, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl font-black text-black"
              style={{ left: `${i * 24}px` }}
              animate={{
                opacity: [0, 1, 1],
                scale: [0.5, 1.1, 1],
                y: [20, -10, 0],
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              {letter}
            </motion.div>
          ))}

          {/* Glow pulse around logo */}
          <motion.div
            className="absolute inset-0 rounded-lg blur-lg pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0, 0, 0, 0.15) 0%, transparent 70%)",
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2.8,
            }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="text-xs font-bold uppercase tracking-widest text-black/60"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Initializing Intelligence
        </motion.p>

        {/* Pulse indicator line */}
        <motion.div
          className="h-1 rounded-full"
          style={{
            width: "120px",
            background: "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.3), transparent)",
          }}
          animate={{ scaleX: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

/**
 * SERVICES PAGE LOADER
 * Tech grid expands outward → glowing service nodes connect →
 * holographic glass panels reveal
 */
export function ServicesPageLoader() {
  const nodes = [
    { x: "30%", y: "30%" },
    { x: "70%", y: "35%" },
    { x: "50%", y: "65%" },
    { x: "20%", y: "70%" },
    { x: "80%", y: "70%" },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Grid expansion background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundSize: "50px 50px",
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.20) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.20) 1px, transparent 1px)
          `,
        }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Connection lines between nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="nodeGradient">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0.1)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.05)" />
          </linearGradient>
        </defs>
        <motion.line
          x1="30%"
          y1="30%"
          x2="70%"
          y2="35%"
          stroke="url(#nodeGradient)"
          strokeWidth="1.5"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.line
          x1="70%"
          y1="35%"
          x2="50%"
          y2="65%"
          stroke="url(#nodeGradient)"
          strokeWidth="1.5"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
      </svg>

      {/* Service nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 rounded-lg border border-black/20 glass-card"
            style={{ left: node.x, top: node.y }}
            animate={{
              scale: [1, 1.15, 1],
              borderColor: ["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.1)"],
              boxShadow: [
                "0 0 20px rgba(0, 0, 0, 0.05)",
                "0 0 40px rgba(0, 0, 0, 0.15)",
                "0 0 20px rgba(0, 0, 0, 0.05)",
              ],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Center text */}
      <motion.p
        className="relative z-10 text-xs font-bold uppercase tracking-widest text-black/60"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading Services
      </motion.p>
    </div>
  );
}

/**
 * CONTACT PAGE LOADER
 * Communication pulse waves → radar scan effect →
 * glowing network lines → glass layers slide smoothly
 */
export function ContactPageLoader() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Grid background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundSize: "50px 50px",
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.12) 1px, transparent 1px)
          `,
        }}
      />

      {/* Radar scan rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3, 4].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-black/15"
            style={{
              width: `${60 * ring}px`,
              height: `${60 * ring}px`,
            }}
            animate={{
              opacity: [0.3, 0, 0],
              scale: [1, 1.5, 1.5],
            }}
            transition={{
              duration: 2,
              delay: ring * 0.4,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Center pulse */}
      <motion.div
        className="relative z-10 w-12 h-12 rounded-full border-2 border-black/30 flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
          borderColor: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0.3)"],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.div
          className="w-2 h-2 bg-black rounded-full"
          animate={{ scale: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Loading text */}
      <motion.p
        className="absolute bottom-20 text-xs font-bold uppercase tracking-widest text-black/60"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Establishing Connection
      </motion.p>
    </div>
  );
}

/**
 * ABOUT PAGE LOADER
 * Futuristic blueprint reveal → digital architecture lines animate →
 * glowing timeline pulse
 */
export function AboutPageLoader() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Blueprint grid - finer detail */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundSize: "30px 30px",
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
          `,
        }}
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* SVG Architecture Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <defs>
          <linearGradient id="blueprintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0.1)" />
            <stop offset="50%" stopColor="rgba(0, 0, 0, 0.2)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.1)" />
          </linearGradient>
        </defs>

        {/* Vertical architecture line */}
        <motion.line
          x1="50%"
          y1="10%"
          x2="50%"
          y2="90%"
          stroke="url(#blueprintGradient)"
          strokeWidth="2"
          strokeDasharray="10,5"
          animate={{
            opacity: [0.1, 0.4, 0.1],
            strokeDashoffset: [0, 20],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Horizontal architecture line */}
        <motion.line
          x1="20%"
          y1="50%"
          x2="80%"
          y2="50%"
          stroke="url(#blueprintGradient)"
          strokeWidth="2"
          strokeDasharray="10,5"
          animate={{
            opacity: [0.1, 0.4, 0.1],
            strokeDashoffset: [0, -20],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
        />
      </svg>

      {/* Timeline pulse points */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full border border-black/40"
            style={{
              left: `${20 + i * 20}%`,
              top: "50%",
            }}
            animate={{
              scale: [1, 1.5, 1],
              borderColor: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0.3)"],
            }}
            transition={{
              duration: 2,
              delay: i * 0.4,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Center text */}
      <motion.p
        className="relative z-10 text-xs font-bold uppercase tracking-widest text-black/60"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Unveiling Blueprint
      </motion.p>
    </div>
  );
}
