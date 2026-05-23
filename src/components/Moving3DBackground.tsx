"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ 
  geometry, 
  position, 
  scale = 1, 
  speed = 1, 
  rotationSpeed = 0.5 
}: { 
  geometry: THREE.BufferGeometry; 
  position: [number, number, number]; 
  scale?: number; 
  speed?: number; 
  rotationSpeed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow float movement
    meshRef.current.position.y = position[1] + Math.sin(time * 0.2 * speed) * 0.4;
    meshRef.current.position.x = position[0] + Math.cos(time * 0.1 * speed) * 0.2;
    
    // Rotation
    meshRef.current.rotation.x = time * 0.05 * rotationSpeed;
    meshRef.current.rotation.y = time * 0.08 * rotationSpeed;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <primitive object={geometry} attach="geometry" />
      <meshBasicMaterial 
        color="#a1a1aa" 
        wireframe 
        transparent 
        opacity={0.18} 
      />
    </mesh>
  );
}

// Particle field connecting nodes
function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 60;
  
  const [positions] = useState(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 12; // X
      arr[i + 1] = (Math.random() - 0.5) * 12; // Y
      arr[i + 2] = (Math.random() - 0.5) * 8; // Z
    }
    return arr;
  });

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = time * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#000000"
        size={0.04}
        transparent
        opacity={0.2}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  // Create shared geometries to save memory
  const geometries = useRef<{
    torus: THREE.TorusGeometry;
    icosahedron: THREE.IcosahedronGeometry;
    box: THREE.BoxGeometry;
    cone: THREE.ConeGeometry;
  } | null>(null);

  if (!geometries.current) {
    geometries.current = {
      torus: new THREE.TorusGeometry(0.8, 0.25, 8, 24),
      icosahedron: new THREE.IcosahedronGeometry(0.8, 1),
      box: new THREE.BoxGeometry(0.8, 0.8, 0.8),
      cone: new THREE.ConeGeometry(0.6, 1.2, 4),
    };
  }

  // Handle cleanups
  useEffect(() => {
    return () => {
      if (geometries.current) {
        geometries.current.torus.dispose();
        geometries.current.icosahedron.dispose();
        geometries.current.box.dispose();
        geometries.current.cone.dispose();
      }
    };
  }, []);

  return (
    <>
      <FloatingShape 
        geometry={geometries.current.torus} 
        position={[-3.5, 2, -2]} 
        scale={1.2} 
        speed={0.8} 
        rotationSpeed={0.6}
      />
      <FloatingShape 
        geometry={geometries.current.icosahedron} 
        position={[3.5, -2, -1]} 
        scale={1.4} 
        speed={0.7} 
        rotationSpeed={0.8}
      />
      <FloatingShape 
        geometry={geometries.current.box} 
        position={[-2.5, -2.2, 0]} 
        scale={0.9} 
        speed={1.2} 
        rotationSpeed={0.5}
      />
      <FloatingShape 
        geometry={geometries.current.cone} 
        position={[2.8, 2.5, -3]} 
        scale={1.1} 
        speed={0.9} 
        rotationSpeed={1.1}
      />
      <ParticleNetwork />
    </>
  );
}

export default function Moving3DBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-[0.8]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1} />
        <Scene />
      </Canvas>
    </div>
  );
}
