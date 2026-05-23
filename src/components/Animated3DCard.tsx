"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

interface Animated3DCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
  withHolographic?: boolean;
}

export default function Animated3DCard({
  children,
  className = "",
  glowColor = "rgba(139, 92, 246, 0.3)",
  delay = 0,
  withHolographic = true,
}: Animated3DCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        scale={1.02}
        transitionSpeed={400}
        className={`h-full ${className}`}
      >
        <motion.div
          className="relative h-full rounded-2xl overflow-hidden group"
          whileHover={{
            y: -8,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Holographic border glow */}
          {withHolographic && (
            <>
              <motion.div
                className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-brand-violet/20 via-brand-blue/10 to-brand-violet/20 opacity-0 group-hover:opacity-100"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Moving gradient reflections */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{
                  x: "100%",
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </>
          )}

          {/* Floating glass animation on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              pointerEvents: "none",
            }}
          />

          {/* Main content with z-index */}
          <div className="relative z-10">{children}</div>

          {/* Animated shine sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%", opacity: 0 }}
            whileHover={{
              x: "100%",
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            style={{
              pointerEvents: "none",
            }}
          />

          {/* Mouse reactive lighting - subtle glow that follows cursor */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 80%)`,
            }}
          />

          {/* Layered glass depth effect background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none" />
        </motion.div>
      </Tilt>
    </motion.div>
  );
}
