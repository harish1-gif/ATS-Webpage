"use client";

import { motion } from "framer-motion";

interface TextExplosionProps {
  children: string;
  duration?: number;
  delay?: number;
}

export default function TextExplosion({
  children,
  duration = 0.8,
  delay = 0,
}: TextExplosionProps) {
  const words = children.split(" ");

  // 6 outward directions from center
  const directions = [
    { x: -120, y: -120 }, // top-left
    { x: 120, y: -120 }, // top-right
    { x: -150, y: 0 }, // left
    { x: 150, y: 0 }, // right
    { x: -120, y: 120 }, // bottom-left
    { x: 120, y: 120 }, // bottom-right
  ];

  const getDirection = (index: number) => directions[index % directions.length];

  return (
    <span className="inline-block">
      {words.map((word, index) => {
        const direction = getDirection(index);
        const wordDelay = delay + (index * duration) / words.length / 2;

        return (
          <motion.span
            key={`${word}-${index}`}
            initial={{
              opacity: 0,
              x: 0,
              y: 0,
              scale: 0.8,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              x: direction.x,
              y: direction.y,
              scale: 1,
              filter: "blur(0px)",
            }}
            whileHover={{
              scale: 1.08,
              textShadow: "0 0 20px rgba(168, 85, 247, 0.6)",
            }}
            transition={{
              duration: duration,
              delay: wordDelay,
              ease: [0.22, 1, 0.36, 1],
              type: "spring",
              stiffness: 80,
              damping: 15,
            }}
            className="inline-block mr-2 cursor-pointer relative"
          >
            <motion.span
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3,
                delay: wordDelay + duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </motion.span>
        );
      })}
    </span>
  );
}
