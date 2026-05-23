"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

export type PageVariant =
  | "home"
  | "about"
  | "services"
  | "portfolio"
  | "contact"
  | "careers"
  | "blog"
  | "technologies"
  | "client"
  | "admin";

const DURATION = 0.72;
const EASE = [0.22, 1, 0.36, 1] as const; // custom spring-like cubic-bezier

/** Each page has its own unique entrance animation */
const pageVariants: Record<PageVariant, Variants> = {
  // Home — cinematic fade + subtle scale-up
  home: {
    initial: { opacity: 0, scale: 0.97, filter: "blur(6px)" },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: DURATION, ease: EASE },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      filter: "blur(4px)",
      transition: { duration: 0.35, ease: "easeIn" },
    },
  },

  // About — slide in from the left
  about: {
    initial: { opacity: 0, x: -60, filter: "blur(4px)" },
    animate: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: DURATION, ease: EASE },
    },
    exit: {
      opacity: 0,
      x: 40,
      transition: { duration: 0.32, ease: "easeIn" },
    },
  },

  // Services — slide in from the right
  services: {
    initial: { opacity: 0, x: 60, filter: "blur(4px)" },
    animate: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: DURATION, ease: EASE },
    },
    exit: {
      opacity: 0,
      x: -40,
      transition: { duration: 0.32, ease: "easeIn" },
    },
  },

  // Portfolio — rise up from below
  portfolio: {
    initial: { opacity: 0, y: 70, filter: "blur(4px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: DURATION, ease: EASE },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.32, ease: "easeIn" },
    },
  },

  // Contact — clip-path curtain reveal (top-to-bottom wipe)
  contact: {
    initial: {
      opacity: 1,
      clipPath: "inset(0 0 100% 0)",
      filter: "blur(2px)",
    },
    animate: {
      opacity: 1,
      clipPath: "inset(0 0 0% 0)",
      filter: "blur(0px)",
      transition: { duration: DURATION, ease: EASE },
    },
    exit: {
      opacity: 0,
      clipPath: "inset(100% 0 0 0)",
      transition: { duration: 0.35, ease: "easeIn" },
    },
  },

  // Careers — zoom in from center
  careers: {
    initial: { opacity: 0, scale: 1.08, filter: "blur(8px)" },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: DURATION, ease: EASE },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
      transition: { duration: 0.32, ease: "easeIn" },
    },
  },

  // Blog — diagonal drift (X + Y combined)
  blog: {
    initial: { opacity: 0, x: -40, y: 40, filter: "blur(4px)" },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: DURATION, ease: EASE },
    },
    exit: {
      opacity: 0,
      x: 30,
      y: -30,
      transition: { duration: 0.32, ease: "easeIn" },
    },
  },

  // Technologies — perspective flip-in (rotateX)
  technologies: {
    initial: { opacity: 0, rotateX: 12, y: 40, filter: "blur(4px)" },
    animate: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: DURATION, ease: EASE },
    },
    exit: {
      opacity: 0,
      rotateX: -8,
      y: -20,
      transition: { duration: 0.32, ease: "easeIn" },
    },
  },

  // Client Portal — fade in with subtle scale
  client: {
    initial: { opacity: 0, scale: 0.99, filter: "blur(3px)" },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: DURATION, ease: EASE },
    },
    exit: {
      opacity: 0,
      scale: 1.01,
      filter: "blur(2px)",
      transition: { duration: 0.32, ease: "easeIn" },
    },
  },

  // Admin Console — tech-forward slide from top
  admin: {
    initial: { opacity: 0, y: -50, filter: "blur(5px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: DURATION, ease: EASE },
    },
    exit: {
      opacity: 0,
      y: 20,
      filter: "blur(3px)",
      transition: { duration: 0.32, ease: "easeIn" },
    },
  },
};

interface PageTransitionProps {
  variant: PageVariant;
  children: ReactNode;
}

export default function PageTransition({ variant, children }: PageTransitionProps) {
  const variants = pageVariants[variant];

  return (
    <motion.div
      key={variant}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ transformOrigin: "center top", willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
