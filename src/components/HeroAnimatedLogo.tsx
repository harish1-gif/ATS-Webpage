"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroAnimatedLogo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[500px]">
      {/* Outer scanning rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-gray-400 via-transparent to-white opacity-30"
      />

      {/* Middle pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-8 rounded-full border-2 border-gray-400/40"
      />

      {/* Inner rotating ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-16 rounded-full border border-dashed border-gray-300/50"
      />

      {/* Scanning horizontal line */}
      <motion.div
        animate={{ y: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-60"
      />

      {/* Scanning vertical line */}
      <motion.div
        animate={{ x: ["-100%", "100%", "-100%"] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-60"
      />

      {/* Radial scanning lines - North */}
      <motion.div
        animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-24 w-0.5 bg-gradient-to-b from-white to-transparent origin-top"
      />

      {/* Radial scanning lines - East */}
      <motion.div
        animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent to-white origin-right"
      />

      {/* Radial scanning lines - South */}
      <motion.div
        animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-24 w-0.5 bg-gradient-to-t from-white to-transparent origin-bottom"
      />

      {/* Radial scanning lines - West */}
      <motion.div
        animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.9 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-0.5 bg-gradient-to-l from-transparent to-white origin-left"
      />

      {/* Glowing background orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-32 rounded-full bg-gradient-to-r from-gray-400 to-white blur-3xl opacity-20"
      />

      {/* Center Logo - Main Focus */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center"
      >
        {/* Logo glow effect */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400 via-gray-300 to-white blur-2xl -z-10"
        />

        {/* Logo container */}
        <motion.div
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 1, 0, -1, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <Image
            src="/ATS_LOGO-removebg-preview.png"
            alt="AGZUS AI Recognition"
            width={280}
            height={220}
            className="w-auto h-80 object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Floating data points around logo */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            rotate: 360,
            x: Math.cos((i * Math.PI) / 3) * 180,
            y: Math.sin((i * Math.PI) / 3) * 180
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute z-5"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-400 to-white"
          />
        </motion.div>
      ))}

      {/* Scanning beam pulses */}
      <motion.div
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-24 rounded-full border border-gray-400/60 opacity-0"
      />
    </div>
  );
}
