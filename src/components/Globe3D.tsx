"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

// Converts Lat/Lng to 3D Sphere coordinates
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
}

// Pondicherry, India coordinates
const pondicherryCoords = { lat: 11.94, lng: 79.80 };

// Inner rotating globe component
function GlobeModel({ radius = 2.2 }: { radius?: number }) {
  const globeRef = useRef<THREE.Group>(null);
  const pointRef = useRef<THREE.Mesh>(null);
  
  // Pondicherry 3D coordinate vector
  const pVector = latLngToVector3(pondicherryCoords.lat, pondicherryCoords.lng, radius);

  // Auto-rotate the globe slowly
  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
    if (pointRef.current) {
      // Pulse Pondicherry glow
      const scale = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.15;
      pointRef.current.scale.set(scale, scale, scale);
    }
  });

  // Generate continent point coordinates (stylized wireframe grid)
  const dotPoints = useRef<THREE.Vector3[]>([]);
  if (dotPoints.current.length === 0) {
    // Generate semi-random coordinates on the sphere representing continents
    for (let i = 0; i < 500; i++) {
      const lat = (Math.random() - 0.5) * 140; // Avoid polar regions
      const lng = (Math.random() - 0.5) * 360;
      
      // Group dots into simulated landmass shapes
      // (Simple check to cluster dots for aesthetic reasons)
      const isInLand = 
        (lat > -10 && lat < 50 && lng > -100 && lng < -30) || // Americas
        (lat > -40 && lat < 10 && lng > -80 && lng < -40) ||
        (lat > 10 && lat < 60 && lng > -10 && lng < 120) ||   // Eurasia
        (lat > -35 && lat < 30 && lng > 10 && lng < 45) ||    // Africa
        (lat > -40 && lat < -10 && lng > 110 && lng < 150);   // Australia
        
      if (isInLand || Math.random() < 0.1) {
        dotPoints.current.push(latLngToVector3(lat, lng, radius));
      }
    }
  }

  return (
    <group ref={globeRef}>
      {/* Semi-transparent Earth base */}
      <Sphere args={[radius, 32, 32]}>
        <meshBasicMaterial 
          color="#f8fafc" 
          transparent 
          opacity={0.3} 
          wireframe={false} 
        />
      </Sphere>

      {/* Grid line overlay */}
      <Sphere args={[radius + 0.01, 24, 24]}>
        <meshBasicMaterial 
          color="#cbd5e1" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Sphere>

      {/* Grid points representing continents */}
      <points>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                dotPoints.current.flatMap((p) => [p.x, p.y, p.z])
              ),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial 
          color="#7c3aed" 
          size={0.035} 
          transparent 
          opacity={0.7} 
          sizeAttenuation 
        />
      </points>

      {/* Pondicherry, India locator marker */}
      <group position={pVector}>
        {/* Pulsing ring */}
        <mesh ref={pointRef}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#7c3aed" />
        </mesh>
        
        {/* Outer glowing halo */}
        <mesh>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshBasicMaterial color="#2563eb" transparent opacity={0.3} />
        </mesh>

        {/* Floating Label */}
        <Html distanceFactor={6} center>
          <div className="px-3 py-2 glass-panel bg-white/90 text-[10px] font-bold text-slate-800 rounded-lg whitespace-nowrap shadow-md flex items-center gap-1.5 border-brand-violet/20">
            <span className="w-2 h-2 rounded-full bg-brand-violet animate-pulse" />
            ATS Headquarters
          </div>
        </Html>
      </group>
    </group>
  );
}

export default function Globe3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <FallbackGlobe />;
  }

  return (
    <div className="w-full h-full min-h-[350px] md:min-h-[500px] flex items-center justify-center relative cursor-grab active:cursor-grabbing">
      {/* Soft lighting effects inside Canvas */}
      <Canvas camera={{ position: [0, 0, 5.5], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <GlobeModel />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

// Sleek responsive SVG fallback if WebGL fails or loading
function FallbackGlobe() {
  return (
    <div className="w-full h-full min-h-[350px] md:min-h-[500px] flex items-center justify-center relative select-none">
      <div className="w-72 h-72 rounded-full border border-slate-100/80 shadow-[inset_0_0_40px_rgba(124,58,237,0.05)] flex items-center justify-center animate-spin-slow">
        {/* Decorative Grid Lines */}
        <svg className="w-full h-full text-slate-200" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.5" />
          
          {/* Pondicherry glowing dot */}
          <circle cx="68" cy="42" r="2.5" className="fill-brand-violet animate-pulse" />
          <circle cx="68" cy="42" r="5" className="fill-brand-blue/20 stroke-none animate-ping" />
        </svg>
        
        {/* Floating marker label */}
        <div className="absolute top-[38%] left-[64%] px-2.5 py-1 glass-panel bg-white/90 text-[9px] font-bold text-slate-700 rounded-md shadow-sm border border-brand-violet/20 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-pulse" />
          ATS HQ
        </div>
      </div>
    </div>
  );
}
