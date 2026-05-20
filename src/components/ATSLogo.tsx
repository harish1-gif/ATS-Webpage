"use client";

import React from "react";
import { motion } from "framer-motion";

interface ATSLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
  progress?: number; // 0 to 100 for loading progress binding
  hideText?: boolean;
  color?: string;
}

export default function ATSLogo({
  className = "",
  size = 200,
  animated = false,
  progress = 100,
  hideText = false,
  color = "currentColor",
}: ATSLogoProps) {
  // SVG viewBox is 0 0 240 240
  const strokeDash = 500;
  const strokeOffset = strokeDash - (progress / 100) * strokeDash;

  // Path definitions for Monogram (A, T, S)
  const pathA = "M 86,22 L 20,122 L 38,122 L 77,63 L 95,92 L 72,92 L 72,122 L 92,122 L 92,106 L 104,106 L 114,122 L 132,122 L 103,77 L 112,63 L 135,63 L 135,50 L 98,50 Z";
  const pathT = "M 78,50 L 158,50 L 158,63 L 128,63 L 128,142 L 118,155 L 108,142 L 108,63 L 78,63 Z";
  const pathS = "M 138,70 L 198,70 L 198,83 L 148,83 L 168,103 L 198,103 L 198,135 L 148,135 L 148,122 L 180,122 L 160,103 L 138,103 Z";

  // AGZUS Wordmark Paths (Y = 175 to 200)
  const wordmarkA = "M 32,200 L 45,172 L 58,200 M 36,192 L 54,192";
  const wordmarkG = "M 88,177 L 88,172 L 68,172 L 68,200 L 88,200 L 88,184 L 78,184";
  const wordmarkZ = "M 98,172 L 118,172 L 98,200 L 118,200";
  const wordmarkU = "M 128,172 L 128,200 L 148,200 L 148,172";
  const wordmarkS = "M 178,172 L 158,172 L 158,184 L 178,184 L 178,200 L 158,200";

  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 220 220"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Monogram letters */}
        <g className="logo-monogram">
          {/* Letter A */}
          <motion.path
            d={pathA}
            fill={progress >= 100 ? color : "transparent"}
            stroke={color}
            strokeWidth={progress >= 100 ? 0 : 2}
            strokeDasharray={strokeDash}
            strokeDashoffset={animated ? strokeOffset : 0}
            transition={{ fill: { delay: 0.5, duration: 0.5 } }}
          />

          {/* Letter T */}
          <motion.path
            d={pathT}
            fill={progress >= 100 ? color : "transparent"}
            stroke={color}
            strokeWidth={progress >= 100 ? 0 : 2}
            strokeDasharray={strokeDash}
            strokeDashoffset={animated ? strokeOffset : 0}
            transition={{ fill: { delay: 0.6, duration: 0.5 } }}
          />

          {/* Letter S */}
          <motion.path
            d={pathS}
            fill={progress >= 100 ? color : "transparent"}
            stroke={color}
            strokeWidth={progress >= 100 ? 0 : 2}
            strokeDasharray={strokeDash}
            strokeDashoffset={animated ? strokeOffset : 0}
            transition={{ fill: { delay: 0.7, duration: 0.5 } }}
          />
        </g>

        {/* Wordmarks */}
        {!hideText && (
          <g className="logo-wordmark">
            {/* AGZUS wordmark */}
            <motion.path
              d={wordmarkA}
              stroke={color}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress >= 100 ? 1 : 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            />
            <motion.path
              d={wordmarkG}
              stroke={color}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress >= 100 ? 1 : 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            />
            <motion.path
              d={wordmarkZ}
              stroke={color}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress >= 100 ? 1 : 0 }}
              transition={{ delay: 1.0, duration: 0.4 }}
            />
            <motion.path
              d={wordmarkU}
              stroke={color}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress >= 100 ? 1 : 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
            />
            <motion.path
              d={wordmarkS}
              stroke={color}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress >= 100 ? 1 : 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            />

            {/* TECHNOLOGY SOLUTIONS text */}
            <motion.text
              x="110"
              y="218"
              textAnchor="middle"
              fill={color}
              fontSize="6.5"
              fontWeight="bold"
              letterSpacing="2.5"
              initial={{ opacity: 0, y: 222 }}
              animate={{ opacity: progress >= 100 ? 0.6 : 0, y: progress >= 100 ? 218 : 222 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              TECHNOLOGY SOLUTIONS
            </motion.text>
          </g>
        )}
      </svg>
    </div>
  );
}
