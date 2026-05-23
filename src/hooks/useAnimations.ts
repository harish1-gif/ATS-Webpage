"use client";

import { useEffect, useRef } from "react";
import { useMotionTemplate, useMotionValue } from "framer-motion";

export function useParallax(speed: number = 0.5) {
  const elementRef = useRef<HTMLDivElement>(null);
  const offsetY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const element = elementRef.current;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight) {
          const scrolled = window.scrollY;
          offsetY.set(scrolled * speed);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offsetY, speed]);

  return elementRef;
}

export function useMousePosition() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY };
}

// Hook for scroll-triggered animations with intersection observer
export function useScrollAnimation() {
  const elementRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.current = true;
          entry.target.classList.add("animate-in");
        } else {
          isVisible.current = false;
          entry.target.classList.remove("animate-in");
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-50px",
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return elementRef;
}
