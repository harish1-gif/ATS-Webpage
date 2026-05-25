"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";
import { useScrollCharacterAnimation } from "@/hooks/useScrollCharacterAnimation";
import type { AnimationVariant } from "@/hooks/useScrollCharacterAnimation";

interface ScrollEffectCharacterProps {
  char: string;
  index: number;
  centerIndex: number;
  animationProps: any;
  isImage?: boolean;
  className?: string;
}

/**
 * Individual character/element component for scroll animation
 */
const ScrollEffectCharacter: React.FC<ScrollEffectCharacterProps> = ({
  char,
  index,
  centerIndex,
  animationProps,
  isImage = false,
  className = "",
}) => {
  const isSpace = char === " ";

  const baseClassName = cn("inline-block", isSpace && "w-4", className);

  if (isImage) {
    return (
      <motion.img
        src={char}
        alt={`icon-${index}`}
        className={baseClassName}
        style={{
          ...animationProps,
          transformOrigin: "center",
        }}
      />
    );
  }

  return (
    <motion.span
      className={baseClassName}
      style={{
        ...animationProps,
      }}
    >
      {char}
    </motion.span>
  );
};

interface ScrollEffectSectionProps {
  content: string[];
  variant?: AnimationVariant;
  title?: string;
  subtitle?: string;
  height?: string;
  backgroundColor?: string;
  textColor?: string;
  isImageContent?: boolean;
  textClassName?: string;
  containerClassName?: string;
}

/**
 * Reusable scroll effect section component
 * Can display text or images with distance-based animations
 */
export const ScrollEffectSection: React.FC<ScrollEffectSectionProps> = ({
  content,
  variant = "v1",
  title,
  subtitle,
  height = "h-[210vh]",
  backgroundColor = "bg-[#f5f4f3]",
  textColor = "text-black",
  isImageContent = false,
  textClassName = "text-6xl font-bold uppercase tracking-tighter",
  containerClassName = "",
}) => {
  const centerIndex = Math.floor(content.length / 2);
  const { targetRef, scrollYProgress, getCharacterAnimation } =
    useScrollCharacterAnimation({
      variant,
    });

  return (
    <div
      ref={targetRef}
      className={cn(
        "relative box-border flex flex-col items-center justify-center gap-[2vw] overflow-hidden p-[2vw]",
        height,
        backgroundColor,
        containerClassName,
      )}
    >
      {title && (
        <div className="flex flex-col items-center gap-2 mb-8">
          <h2 className={cn("text-3xl font-bold", textColor)}>{title}</h2>
          {subtitle && (
            <p className={cn("text-lg", textColor, "opacity-60")}>{subtitle}</p>
          )}
        </div>
      )}

      <div
        className={cn(
          "font-geist w-full max-w-4xl text-center",
          textClassName,
          textColor,
        )}
        style={{
          perspective: "500px",
        }}
      >
        {content.map((item, index) => {
          const animationProps = getCharacterAnimation(
            index,
            centerIndex,
            scrollYProgress,
          );

          return (
            <ScrollEffectCharacter
              key={index}
              char={item}
              index={index}
              centerIndex={centerIndex}
              animationProps={animationProps}
              isImage={isImageContent}
              className={isImageContent ? "h-12 w-12" : ""}
            />
          );
        })}
      </div>
    </div>
  );
};

interface ScrollEffectWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component for lenis smooth scrolling
 * Wraps all scroll effect sections
 */
export const ScrollEffectWrapper: React.FC<ScrollEffectWrapperProps> = ({
  children,
  className = "",
}) => {
  const ReactLenis = React.lazy(() =>
    import("lenis/react").then((module) => ({
      default: module.ReactLenis,
    })),
  );

  return (
    <React.Suspense fallback={<div>{children}</div>}>
      <ReactLenis root className={className}>
        {children}
      </ReactLenis>
    </React.Suspense>
  );
};

export default ScrollEffectSection;
