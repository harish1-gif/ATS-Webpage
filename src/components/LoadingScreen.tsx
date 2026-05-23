"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ATSLogo from "./ATSLogo";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 600); // Small delay for premium feel
          return 100;
        }
        // Accelerate near the end
        const increment = prev > 70 ? Math.random() * 8 + 2 : Math.random() * 4 + 1;
        return Math.min(Math.round(prev + increment), 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center"
        >
          {/* Subtle Ambient glows */}
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] ambient-glow-violet animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] ambient-glow-blue animate-pulse-glow" />

          <div className="relative flex flex-col items-center max-w-sm w-full px-6">
            {/* Animated Custom SVG Logo */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-32 h-32 flex items-center justify-center mb-6"
            >
              <ATSLogo size={120} animated={true} progress={progress} hideText={true} color="#000000" />
            </motion.div>

            {/* Percentage Progress indicator */}
            <div className="text-4xl font-extrabold text-black tracking-tighter mb-4">
              {progress}%
            </div>

            {/* Progress Bar */}
            <div className="w-full h-[2px] bg-zinc-200 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-black"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>
            
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-6 font-mono">
              Loading Digital Experience
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
