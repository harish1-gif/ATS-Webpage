// "use client";

// import React, { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// export default function ScrollTravelLogo() {
//   const containerRef = useRef<HTMLDivElement>(null);
  
//   // Track scroll position of the entire window
//   const { scrollYProgress } = useScroll();

//   // Paths for A, T, S (matching the exact geometry from ATSLogo)
//   const pathA = "M 86,22 L 20,122 L 38,122 L 77,63 L 95,92 L 72,92 L 72,122 L 92,122 L 92,106 L 104,106 L 114,122 L 132,122 L 103,77 L 112,63 L 135,63 L 135,50 L 98,50 Z";
//   const pathT = "M 78,50 L 158,50 L 158,63 L 128,63 L 128,142 L 118,155 L 108,142 L 108,63 L 78,63 Z";
//   const pathS = "M 138,70 L 198,70 L 198,83 L 148,83 L 168,103 L 198,103 L 198,135 L 148,135 L 148,122 L 180,122 L 160,103 L 138,103 Z";

//   // Transformations on scroll
//   // Letter A: travels down-left, rotates CCW
//   const ax = useTransform(scrollYProgress, [0, 0.5, 1], [0, -180, -320]);
//   const ay = useTransform(scrollYProgress, [0, 0.5, 1], [0, 200, 500]);
//   const aRot = useTransform(scrollYProgress, [0, 0.5, 1], [0, -30, -60]);
//   const aOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.08, 0.12, 0.05, 0]);

//   // Letter T: travels down, scales up, remains centered
//   const ty = useTransform(scrollYProgress, [0, 0.5, 1], [0, 300, 700]);
//   const tScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.25, 1.5]);
//   const tOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.08, 0.15, 0.06, 0]);

//   // Letter S: travels down-right, rotates CW
//   const sx = useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 320]);
//   const sy = useTransform(scrollYProgress, [0, 0.5, 1], [0, 200, 500]);
//   const sRot = useTransform(scrollYProgress, [0, 0.5, 1], [0, 30, 60]);
//   const sOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.08, 0.12, 0.05, 0]);

//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden flex items-center justify-center"
//     >
//       <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] flex items-center justify-center opacity-70">
//         <svg
//           viewBox="0 0 220 220"
//           className="w-full h-full filter drop-shadow-[0_0_15px_rgba(124,58,237,0.15)]"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           {/* Letter A */}
//           <motion.path
//             d={pathA}
//             stroke="url(#glow-gradient-a)"
//             strokeWidth={1.5}
//             style={{
//               x: ax,
//               y: ay,
//               rotate: aRot,
//               opacity: aOpacity,
//               transformOrigin: "77px 63px",
//             }}
//           />

//           {/* Letter T */}
//           <motion.path
//             d={pathT}
//             stroke="url(#glow-gradient-t)"
//             strokeWidth={1.5}
//             style={{
//               y: ty,
//               scale: tScale,
//               opacity: tOpacity,
//               transformOrigin: "118px 63px",
//             }}
//           />

//           {/* Letter S */}
//           <motion.path
//             d={pathS}
//             stroke="url(#glow-gradient-s)"
//             strokeWidth={1.5}
//             style={{
//               x: sx,
//               y: sy,
//               rotate: sRot,
//               opacity: sOpacity,
//               transformOrigin: "168px 103px",
//             }}
//           />

//           {/* Glow gradients */}
//           <defs>
//             <linearGradient id="glow-gradient-a" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
//               <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
//             </linearGradient>
//             <linearGradient id="glow-gradient-t" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
//               <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8" />
//             </linearGradient>
//             <linearGradient id="glow-gradient-s" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
//               <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8" />
//             </linearGradient>
//           </defs>
//         </svg>
//       </div>
//     </div>
//   );
// }
