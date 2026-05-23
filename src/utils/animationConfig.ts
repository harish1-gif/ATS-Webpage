// Centralized animation configuration for consistent timing and easing

export const animationConfig = {
  // Transition timings
  transitions: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.6,
    verySlow: 1.0,
  },
  
  // Page transition
  pageTransition: {
    duration: 0.8,
    delay: 0.1,
  },

  // Button animations
  button: {
    hoverScale: 1.05,
    activScale: 0.95,
    glowDuration: 0.6,
  },

  // Scroll animations
  scroll: {
    revealDuration: 0.8,
    staggerDelay: 0.1,
  },

  // 3D effects
  tilt: {
    maxTiltX: 5,
    maxTiltY: 5,
    scale: 1.02,
  },

  // Easing functions
  easing: {
    easeInOut: [0.4, 0, 0.2, 1],
    easeOut: [0.2, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    smooth: [0.25, 0.46, 0.45, 0.94],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
};

// Framer Motion variants for common animations
export const motionVariants = {
  // Fade and scale variants
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },

  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },

  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },

  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },

  // Stagger container variants
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },

  // Glow variants
  glowPulse: {
    animate: {
      boxShadow: [
        "0 0 20px rgba(139, 92, 246, 0.3)",
        "0 0 40px rgba(139, 92, 246, 0.6)",
        "0 0 20px rgba(139, 92, 246, 0.3)",
      ],
    },
  },
};
