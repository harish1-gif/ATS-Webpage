import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export type AnimationVariant = "v1" | "v2" | "v3";

interface ScrollAnimationConfig {
  variant?: AnimationVariant;
  scrollRange?: [number, number];
  xMultiplier?: number;
  yMultiplier?: number;
  rotateMultiplier?: number;
}

/**
 * Hook to create scroll-based character animations with distance from center
 * @param config - Configuration for animation behavior
 * @returns Object with targetRef, scrollYProgress, and animation calculations
 */
export const useScrollCharacterAnimation = (
  config: ScrollAnimationConfig = {},
) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const {
    variant = "v1",
    scrollRange = [0, 0.5],
    xMultiplier = 50,
    yMultiplier = 50,
    rotateMultiplier = 50,
  } = config;

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  /**
   * Calculate individual character animations based on variant
   */
  const getCharacterAnimation = (
    index: number,
    centerIndex: number,
    scrollProgress: any,
  ) => {
    const distanceFromCenter = index - centerIndex;

    if (variant === "v1") {
      // Text spread with perspective - rotateX animation
      return {
        x: useTransform(
          scrollProgress,
          scrollRange,
          [distanceFromCenter * xMultiplier, 0],
        ),
        rotateX: useTransform(
          scrollProgress,
          scrollRange,
          [distanceFromCenter * rotateMultiplier, 0],
        ),
      };
    } else if (variant === "v2") {
      // Wave up effect with scale
      return {
        x: useTransform(
          scrollProgress,
          scrollRange,
          [distanceFromCenter * xMultiplier, 0],
        ),
        scale: useTransform(scrollProgress, scrollRange, [0.75, 1]),
        y: useTransform(
          scrollProgress,
          scrollRange,
          [Math.abs(distanceFromCenter) * yMultiplier, 0],
        ),
      };
    } else {
      // v3: Complex rotation with multiple transforms
      return {
        x: useTransform(
          scrollProgress,
          scrollRange,
          [distanceFromCenter * (xMultiplier * 1.8), 0],
        ),
        rotate: useTransform(
          scrollProgress,
          scrollRange,
          [distanceFromCenter * rotateMultiplier, 0],
        ),
        y: useTransform(
          scrollProgress,
          scrollRange,
          [-Math.abs(distanceFromCenter) * 20, 0],
        ),
        scale: useTransform(scrollProgress, scrollRange, [0.75, 1]),
      };
    }
  };

  return {
    targetRef,
    scrollYProgress,
    getCharacterAnimation,
  };
};
