"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { isLowPerformanceDevice } from "@/utils/performanceOptimization";

type TransitionStyle =
  | "curtain"
  | "particle"
  | "grid"
  | "wave"
  | "glass"
  | "neural"
  | "zoom"
  | "matrix";

interface PageTransitionProps {
  duration?: number;
}

const transitionStyles: TransitionStyle[] = [
  "curtain",
  "particle",
  "grid",
  "wave",
  "glass",
  "neural",
  "zoom",
  "matrix",
];

const getRandomTransition = (): TransitionStyle =>
  transitionStyles[Math.floor(Math.random() * transitionStyles.length)];

export default function OptimizedPageTransition({
  duration = 0.8,
}: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentStyle, setCurrentStyle] = useState<TransitionStyle>("curtain");
  const pathname = usePathname();
  const isLowPerf = isLowPerformanceDevice();

  useEffect(() => {
    setCurrentStyle(getRandomTransition());
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, duration * 1000 + 100);

    return () => clearTimeout(timer);
  }, [pathname, duration]);

  if (!isTransitioning || isLowPerf) return null;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      {currentStyle === "curtain" && (
        <CurtainReveal duration={duration} />
      )}
      {currentStyle === "particle" && (
        <ParticleDissolve duration={duration} />
      )}
      {currentStyle === "grid" && <GridScan duration={duration} />}
      {currentStyle === "wave" && <EnergyWave duration={duration} />}
      {currentStyle === "glass" && <GlassSlice duration={duration} />}
      {currentStyle === "neural" && <NeuralPulse duration={duration} />}
      {currentStyle === "zoom" && <DepthZoom duration={duration} />}
      {currentStyle === "matrix" && <MatrixReveal duration={duration} />}
    </div>
  );
}

// 1. Tech Curtain Reveal
function CurtainReveal({ duration }: { duration: number }) {
  useEffect(() => {
    const tl = gsap.timeline();

    // Left panel
    tl.from(
      ".curtain-left",
      {
        x: "-100%",
        opacity: 1,
        duration: duration * 0.6,
        ease: "power2.inOut",
      },
      0
    );

    // Right panel
    tl.from(
      ".curtain-right",
      {
        x: "100%",
        opacity: 1,
        duration: duration * 0.6,
        ease: "power2.inOut",
      },
      0
    );

    // Scan lines
    tl.from(
      ".scan-line",
      {
        scaleY: 0,
        opacity: 0,
        duration: duration * 0.5,
        stagger: 0.02,
        ease: "power1.out",
      },
      0.1
    );
  }, [duration]);

  return (
    <>
      <div
        className="curtain-left absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900 to-transparent w-1/2"
        style={{ pointerEvents: "none" }}
      />
      <div
        className="curtain-right absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900 to-transparent w-1/2 ml-1/2"
        style={{ pointerEvents: "none" }}
      />
      {[...Array(6)].map((_, i) => (
        <div
          key={`scan-${i}`}
          className="scan-line absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
          style={{
            top: `${(i + 1) * 16.67}%`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

// 2. AI Particle Dissolve
function ParticleDissolve({ duration }: { duration: number }) {
  useEffect(() => {
    const tl = gsap.timeline();

    // Create particle elements
    const particles = gsap.utils.toArray(".dissolve-particle");

    tl.from(
      particles,
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: duration * 0.7,
        stagger: {
          amount: duration * 0.4,
          from: "random",
        },
        ease: "power2.inOut",
      },
      0
    );
  }, [duration]);

  return (
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="dissolve-particle absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

// 3. Digital Grid Scan
function GridScan({ duration }: { duration: number }) {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(".grid-overlay", {
      x: "100%",
      duration: duration * 0.7,
      ease: "power2.inOut",
    });
  }, [duration]);

  return (
    <div
      className="grid-overlay absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        x: "-100%",
      }}
    />
  );
}

// 4. Cyber Energy Wave
function EnergyWave({ duration }: { duration: number }) {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(".energy-wave", {
      x: "-100%",
      opacity: 0,
      duration: duration * 0.8,
      ease: "power2.out",
    });

    tl.to(".energy-wave", {
      opacity: 0,
      duration: duration * 0.3,
    }, duration * 0.5);
  }, [duration]);

  return (
    <div
      className="energy-wave absolute inset-0 bg-gradient-to-r from-brand-violet/30 via-brand-violet/0 to-transparent"
      style={{ pointerEvents: "none" }}
    />
  );
}

// 5. Glass Slice Transition
function GlassSlice({ duration }: { duration: number }) {
  useEffect(() => {
    const tl = gsap.timeline();

    const slices = gsap.utils.toArray(".glass-slice");

    tl.from(
      slices,
      {
        x: (i) => (i % 2 === 0 ? "-100%" : "100%"),
        opacity: 1,
        duration: duration * 0.6,
        stagger: 0.08,
        ease: "power2.inOut",
      },
      0
    );
  }, [duration]);

  return (
    <div className="absolute inset-0">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="glass-slice absolute h-full w-1/4 bg-gradient-to-b from-white/10 to-transparent border-l border-white/20"
          style={{
            left: `${i * 25}%`,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}

// 6. Neural Network Pulse
function NeuralPulse({ duration }: { duration: number }) {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(".neural-line", {
      scaleX: 0,
      opacity: 0,
      duration: duration * 0.5,
      stagger: 0.05,
      ease: "back.out",
    });

    tl.to(".neural-line", {
      opacity: 0,
      duration: duration * 0.3,
    }, duration * 0.35);
  }, [duration]);

  return (
    <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
      {[...Array(5)].map((_, i) => (
        <line
          key={i}
          className="neural-line"
          x1="0"
          y1={`${(i + 1) * 20}%`}
          x2="100%"
          y2={`${(i + 1) * 20}%`}
          stroke="rgba(139, 92, 246, 0.6)"
          strokeWidth="2"
          opacity="0"
        />
      ))}
    </svg>
  );
}

// 7. 3D Depth Zoom
function DepthZoom({ duration }: { duration: number }) {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(".depth-zoom", {
      scale: 0.8,
      opacity: 0,
      filter: "blur(20px)",
      duration: duration * 0.7,
      ease: "power2.out",
    });
  }, [duration]);

  return (
    <div
      className="depth-zoom absolute inset-0 bg-white pointer-events-none"
      style={{
        opacity: 0,
      }}
    />
  );
}

// 8. Matrix Tech Reveal
function MatrixReveal({ duration }: { duration: number }) {
  useEffect(() => {
    const tl = gsap.timeline();

    const streaks = gsap.utils.toArray(".matrix-streak");

    tl.from(
      streaks,
      {
        x: "-100%",
        opacity: 0,
        duration: duration * 0.6,
        stagger: 0.05,
        ease: "power1.inOut",
      },
      0
    );
  }, [duration]);

  return (
    <div className="absolute inset-0">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="matrix-streak absolute w-full h-0.5 bg-gradient-to-r from-transparent via-brand-violet/40 to-transparent"
          style={{
            top: `${(i + 1) * 12.5}%`,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}
