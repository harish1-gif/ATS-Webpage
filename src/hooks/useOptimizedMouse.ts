"use client";

import { useEffect, useRef, useState } from "react";
import { throttle } from "@/utils/performanceOptimization";

interface MousePosition {
  x: number;
  y: number;
}

// Optimized mouse tracking with throttling
export const useOptimizedMouseTracking = (
  elementRef: React.RefObject<HTMLElement>,
  intensity: number = 0.3
) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const isTrackingRef = useRef(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const handleMouseMove = throttle((e: MouseEvent) => {
      if (!elementRef.current || !isTrackingRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      // Only track if within reasonable distance (100px)
      if (distance < 100) {
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const strength = (1 - distance / 100) * intensity;

        mouseRef.current = {
          x: Math.cos(angle) * strength * 30,
          y: Math.sin(angle) * strength * 30,
        };

        setPosition(mouseRef.current);
      } else {
        mouseRef.current = { x: 0, y: 0 };
        setPosition({ x: 0, y: 0 });
      }
    }, 16); // ~60fps throttle

    const handleMouseEnter = () => {
      isTrackingRef.current = true;
    };

    const handleMouseLeave = () => {
      isTrackingRef.current = false;
      mouseRef.current = { x: 0, y: 0 };
      setPosition({ x: 0, y: 0 });
    };

    const element = elementRef.current;
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [elementRef, intensity]);

  return position;
};

// Simple scroll position tracking
export const useOptimizedScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 16); // ~60fps throttle

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
};

// Intersection observer for scroll animations
export const useOptimizedIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  callback: (isVisible: boolean) => void,
  options?: IntersectionObserverInit
) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      callback(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: "-50px",
      ...options,
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, callback, options]);
};

// Hover state management
export const useOptimizedHoverState = (
  elementRef: React.RefObject<HTMLElement>
) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const element = elementRef.current;
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [elementRef]);

  return isHovered;
};
