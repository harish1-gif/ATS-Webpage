"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LogoScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const scanLinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    // Main logo rotation and scale on scroll
    gsap.to(logoRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1, // smooth scrubbing
        markers: false,
      },
      rotation: 360,
      scale: 1.2,
      ease: "none",
    });

    // Rings rotation on scroll (opposite direction)
    if (ringsRef.current) {
      gsap.to(ringsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        rotation: -360,
        ease: "none",
      });
    }

    // Scanning lines opacity pulse on scroll
    if (scanLinesRef.current) {
      gsap.to(scanLinesRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        opacity: 0.1,
        ease: "sine.inOut",
      });
    }

    // Parallax movement on scroll
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
      },
      y: -100,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center min-h-[600px]"
    >
      {/* Rotating rings container */}
      <div
        ref={ringsRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Outer ring */}
        <div className="absolute w-80 h-80 rounded-full border-2 border-gray-400/30" />
        {/* Middle ring */}
        <div className="absolute w-64 h-64 rounded-full border-2 border-gray-300/40" />
        {/* Inner ring */}
        <div className="absolute w-48 h-48 rounded-full border border-dashed border-gray-400/50" />
      </div>

      {/* Scanning lines */}
      <div ref={scanLinesRef} className="absolute inset-0 flex items-center justify-center">
        {/* Horizontal scan line */}
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-gray-400/60 to-transparent opacity-50" />
        {/* Vertical scan line */}
        <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-gray-300/60 to-transparent opacity-50" />
      </div>

      {/* Logo container */}
      <div ref={logoRef} className="relative z-10 flex items-center justify-center">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400 via-gray-300 to-white blur-3xl opacity-20 -z-10" />

        {/* Logo image */}
        <Image
          src="/ATS_LOGO-removebg-preview.png"
          alt="AGZUS AI Recognition"
          width={280}
          height={220}
          className="w-auto h-80 object-contain drop-shadow-2xl"
          priority
        />
      </div>

      {/* Floating data points */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute z-5 pointer-events-none"
          style={{
            left: `calc(50% + ${Math.cos((i * Math.PI) / 3) * 200}px)`,
            top: `calc(50% + ${Math.sin((i * Math.PI) / 3) * 200}px)`,
          }}
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-400 to-white shadow-lg" />
        </div>
      ))}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">
          Scroll
        </p>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
