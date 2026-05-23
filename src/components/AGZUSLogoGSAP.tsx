"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Hero Version ─────────────────────────────────────────────────────────────
// Large centered logo in hero section — letters slide in from alternating sides
// and lock into place as user scrolls down.
export function AGZUSHeroLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".agzus-letter");

      // Initial state: letters scattered left/right off-screen
      const offsets = [-900, -600, 0, 600, 900]; // A G Z U S
      const yOffsets = [-60, 60, -80, 60, -60];

      gsap.set(letters, (i: number) => ({
        x: offsets[i],
        y: yOffsets[i],
        opacity: 0,
        rotationY: i % 2 === 0 ? -45 : 45,
        scale: 0.6,
      }));

      // ScrollTrigger timeline — letters fly in and lock
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1.2,
        },
      });

      letters.forEach((letter, i) => {
        tl.to(
          letter,
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotationY: 0,
            scale: 1,
            ease: "power3.out",
            duration: 1,
          },
          i * 0.12
        );
      });

      // Subtle parallax float after lock
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: -80,
          ease: "none",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const letters = [
    { char: "A", color: "#0a0a0a" },
    { char: "G", color: "#1a1a1a" },
    { char: "Z", color: "#0a0a0a" },
    { char: "U", color: "#1a1a1a" },
    { char: "S", color: "#0a0a0a" },
  ];

  return (
    <div
      ref={containerRef}
      className="agzus-hero-wrap relative flex items-center justify-center w-full"
    >
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,0,0,0.04) 0%, transparent 80%)",
        }}
      />

      <div className="relative flex items-end gap-[2px] sm:gap-1 select-none">
        {letters.map(({ char, color }, i: number) => (
          <span
            key={char}
            className="agzus-letter inline-block font-black leading-none"
            style={{
              color,
              fontSize: "clamp(4rem, 14vw, 10rem)",
              fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
              letterSpacing: "-0.02em",
              textShadow:
                i % 2 === 0
                  ? "0 8px 32px rgba(0,0,0,0.12), 0 2px 0 rgba(0,0,0,0.08)"
                  : "0 8px 32px rgba(0,0,0,0.08)",
              willChange: "transform, opacity",
            }}
          >
            {char}
          </span>
        ))}

        {/* Underline accent */}
        <div
          className="absolute -bottom-3 left-0 right-0 h-[3px] origin-left"
          style={{
            background: "linear-gradient(90deg, #000 0%, #555 50%, transparent 100%)",
            transform: "scaleX(0)",
            animation: "none",
          }}
          id="agzus-underline"
        />
      </div>

      {/* Subtitle */}
      <div
        className="agzus-letter absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "clamp(0.5rem, 1.5vw, 0.75rem)",
          letterSpacing: "0.5em",
          color: "#888",
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        TECHNOLOGY &nbsp; SOLUTIONS
      </div>
    </div>
  );
}

// ─── Sticky Background Version ────────────────────────────────────────────────
// Watermark fixed behind all content — letters slowly drift left/right on scroll.
export function AGZUSStickyBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".bg-agzus-letter");

      // Stagger left/right drift as page scrolls
      const driftX = [-120, -60, 0, 60, 120];

      letters.forEach((letter, i) => {
        gsap.to(letter, {
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 2 + i * 0.3,
          },
          x: driftX[i],
          y: i % 2 === 0 ? -40 : 40,
          rotation: i % 2 === 0 ? -6 : 6,
          ease: "none",
        });
      });

      // Overall opacity pulse
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "30% top",
          scrub: true,
        },
        opacity: 0.06,
        ease: "none",
      });
    }, bgRef);

    return () => ctx.revert();
  }, []);

  const letters = ["A", "G", "Z", "U", "S"];

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 pointer-events-none z-[-2] flex items-center justify-center overflow-hidden"
      style={{ opacity: 0.035 }}
    >
      <div className="flex items-center gap-0 select-none">
        {letters.map((char, i) => (
          <span
            key={char}
            className="bg-agzus-letter inline-block font-black leading-none"
            style={{
              color: "#000",
              fontSize: "clamp(8rem, 28vw, 22rem)",
              fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
              letterSpacing: "-0.03em",
              willChange: "transform",
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Compact Nav / Section Header Version ─────────────────────────────────────
// Smaller version for use inside sections — animates on scroll into view.
export function AGZUSSectionLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".section-agzus-letter");

      gsap.set(letters, (i: number) => ({
        x: i % 2 === 0 ? -200 : 200,
        opacity: 0,
        skewX: i % 2 === 0 ? 20 : -20,
      }));

      gsap.to(letters, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "expo.out",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const sizeMap = { sm: "2.5rem", md: "4rem", lg: "6rem" };
  const fontSize = sizeMap[size];

  return (
    <div ref={ref} className="flex items-center gap-0 select-none">
      {["A", "G", "Z", "U", "S"].map((char) => (
        <span
          key={char}
          className="section-agzus-letter inline-block font-black leading-none"
          style={{
            color: "#0a0a0a",
            fontSize,
            fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
            letterSpacing: "-0.01em",
            willChange: "transform, opacity",
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

// ─── Default Export: Full Demo Page ───────────────────────────────────────────
export default function AGZUSLogoGSAPDemo() {
  return (
    <>
      {/* Sticky watermark background — persists across all sections */}
      <AGZUSStickyBackground />

      {/* Hero Section */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 2rem",
          background: "transparent",
        }}
      >
        <AGZUSHeroLogo />
        <p
          style={{
            marginTop: "5rem",
            fontSize: "0.75rem",
            letterSpacing: "0.4em",
            color: "#aaa",
            fontFamily: "'Courier New', monospace",
            textTransform: "uppercase",
          }}
        >
          ↓ &nbsp; Scroll to see the magic
        </p>
      </section>

      {/* Content section */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 2rem",
          gap: "2rem",
        }}
      >
        <AGZUSSectionLogo size="lg" />
        <p
          style={{
            maxWidth: 480,
            textAlign: "center",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#555",
            fontFamily: "'Georgia', serif",
          }}
        >
          Empowering global enterprises with futuristic AI automation,
          hyper-scalable cloud architectures, and next-generation custom
          software solutions.
        </p>
      </section>

      {/* Another scroll section */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 2rem",
        }}
      >
        <AGZUSSectionLogo size="md" />
      </section>
    </>
  );
}
