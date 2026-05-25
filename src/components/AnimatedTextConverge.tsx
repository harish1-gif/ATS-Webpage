"use client";

import { motion } from "framer-motion";

interface AnimatedTextConvergeProps {
  children: string;
  duration?: number;
  delay?: number;
  highlightWords?: string[]; // Words to highlight with gradient
}

export default function AnimatedTextConverge({
  children,
  duration = 0.8,
  delay = 0,
  highlightWords = [],
}: AnimatedTextConvergeProps) {
  // Split text into words
  const words = children.split(" ");

  // Animation variants for words coming from 4 directions
  const getDirectionVariant = (index: number) => {
    const direction = index % 4;
    switch (direction) {
      case 0: // From left
        return {
          initial: { opacity: 0, x: -80 },
          animate: { opacity: 1, x: 0 },
        };
      case 1: // From right
        return {
          initial: { opacity: 0, x: 80 },
          animate: { opacity: 1, x: 0 },
        };
      case 2: // From top
        return {
          initial: { opacity: 0, y: -80 },
          animate: { opacity: 1, y: 0 },
        };
      case 3: // From bottom
        return {
          initial: { opacity: 0, y: 80 },
          animate: { opacity: 1, y: 0 },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        };
    }
  };

  // Check if word should be highlighted
  const isHighlighted = (word: string) => {
    return highlightWords.some(
      (hw) => word.toLowerCase() === hw.toLowerCase()
    );
  };

  return (
    <>
      {words.map((word, index) => {
        const variant = getDirectionVariant(index);
        const highlighted = isHighlighted(word);

        return (
          <motion.span
            key={`${word}-${index}`}
            variants={variant}
            initial="initial"
            animate="animate"
            transition={{
              duration: duration,
              ease: [0.22, 1, 0.36, 1], // matching PageTransition EASE
              delay: delay + (index * duration) / words.length / 2,
            }}
            className={`inline-block ${index < words.length - 1 ? "mr-2" : ""} ${
              highlighted
                ? "bg-clip-text text-transparent bg-gradient-to-r from-brand-violet to-brand-blue"
                : ""
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </>
  );
}
