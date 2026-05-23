"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * 3D Rotating Cube - Core loading element
 */
function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.7;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial
        color="#000000"
        wireframe
        emissive="#000000"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

/**
 * 3D Rotating Torus - Secondary element
 */
function RotatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.4;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={2}>
      <torusGeometry args={[1.2, 0.3, 32, 32]} />
      <meshPhongMaterial
        color="#1a1a1a"
        wireframe
        emissive="#1a1a1a"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

/**
 * 3D Particle Field - Floating particles
 */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 80;
  const positionsRef = useRef<Float32Array | null>(null);

  if (!positionsRef.current) {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 8;
      arr[i + 1] = (Math.random() - 0.5) * 8;
      arr[i + 2] = (Math.random() - 0.5) * 8;
    }
    positionsRef.current = arr;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positionsRef.current, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#333333" size={0.08} transparent opacity={0.6} />
    </points>
  );
}

/**
 * 3D Scene with floating shapes
 */
function LoadingScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />

      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
        <RotatingCube />
      </Float>

      <RotatingTorus />
      <ParticleField />

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
}

/**
 * 3D Loading Screen - Full page overlay
 */
export function Loading3DScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 w-full h-full">
        <LoadingScene />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundSize: "50px 50px",
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.16) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.16) 1px, transparent 1px)
          `,
          opacity: 0.4,
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* AGZUS Logo */}
        <div className="text-3xl font-black text-black tracking-wider">
          AGZUS
        </div>

        {/* Loading text */}
        <div className="flex items-center gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-black/60">
            Loading
          </p>
          <div className="flex gap-1">
            <div
              className="w-1.5 h-1.5 rounded-full bg-black/40 animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full bg-black/40 animate-bounce"
              style={{ animationDelay: "0.15s" }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full bg-black/40 animate-bounce"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-40 h-1 bg-black/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-black/40 rounded-full"
            style={{
              width: "0%",
              animation: "progress 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Enhanced 3D Loading with more complex geometry
 */
function RotatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.6;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.4;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.8}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhongMaterial
        color="#0a0a0a"
        wireframe
        emissive="#1a1a1a"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function EnhancedLoadingScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#ffffff" />

      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.4}>
        <RotatingOctahedron />
      </Float>

      <RotatingCube />
      <RotatingTorus />
      <ParticleField />

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.5} />
    </Canvas>
  );
}

/**
 * Enhanced 3D Loading Screen with more complex elements
 */
export function Enhanced3DLoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 w-full h-full">
        <EnhancedLoadingScene />
      </div>

      {/* Animated grid overlay with pulsing effect */}
      <div
        className="absolute inset-0 pointer-events-none animate-pulse"
        style={{
          backgroundSize: "50px 50px",
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          opacity: 0.4,
          animation: "gridPulse 4s ease-in-out infinite",
        }}
      />

      {/* Radial glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.05) 0%, transparent 100%)",
          animation: "glowPulse 3s ease-in-out infinite",
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* AGZUS Logo with glow */}
        <div className="relative">
          <div className="absolute inset-0 rounded-lg blur-lg pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity" />
          <div className="text-4xl font-black text-black tracking-wider">
            AGZUS
          </div>
        </div>

        {/* Loading text with animation */}
        <div className="flex items-center gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-black/60">
            Initializing Intelligence
          </p>
        </div>

        {/* 3D rotating progress indicator */}
        <div className="w-48 h-1.5 bg-black/5 rounded-full overflow-hidden border border-black/10">
          <div
            className="h-full bg-gradient-to-r from-transparent via-black/40 to-transparent rounded-full"
            style={{
              animation: "shimmer 2s infinite",
            }}
          />
        </div>

        {/* Status dots */}
        <div className="flex items-center gap-3 mt-4">
          <div
            className="w-2 h-2 rounded-full bg-black/40 animate-pulse"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-black/40 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-black/40 animate-pulse"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.1;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Minimal 3D Loading - Lightweight version
 */
function MinimalLoadingScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.4} />

      <RotatingCube />
      <ParticleField />
    </Canvas>
  );
}

/**
 * Minimal 3D Loading Screen - Performance optimized
 */
export function Minimal3DLoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
      {/* 3D Canvas */}
      <div className="absolute inset-0 w-full h-full">
        <MinimalLoadingScene />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundSize: "50px 50px",
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-black/60">
          Loading...
        </p>
      </div>
    </div>
  );
}
