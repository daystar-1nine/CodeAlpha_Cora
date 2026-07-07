import * as React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export function CosmicEnvironment() {
  const dustRef = useRef<THREE.Points>(null);

  // Volumetric nebula lights
  const colors = ["#8b5cf6", "#3b82f6", "#ec4899"]; // Purple, Blue, Pink
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useFrame(({ clock }) => {
    if (dustRef.current) {
      dustRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      dustRef.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <group>
      {/* Ambient Cosmic Illumination */}
      <ambientLight intensity={0.1} />
      
      {/* Nebula colored lights */}
      <pointLight position={[10, 10, -20]} color={colors[0]} intensity={200} distance={100} />
      <pointLight position={[-15, -10, -30]} color={colors[1]} intensity={250} distance={100} />
      <pointLight position={[0, -20, -15]} color={colors[2]} intensity={150} distance={100} />

      {/* Infinite Starfield (Layered) */}
      <Stars radius={100} depth={50} count={isMobile ? 1500 : 5000} factor={4} saturation={0} fade speed={1} />
      <Stars radius={50} depth={20} count={isMobile ? 800 : 3000} factor={2} saturation={0.5} fade speed={0.5} />

      {/* Galaxy Dust / Floating Particles */}
      <Sparkles
        count={isMobile ? 50 : 200}
        scale={20}
        size={2}
        speed={0.2}
        opacity={0.1}
        color={colors[0]}
        position={[0, 0, -10]}
      />
      <Sparkles
        count={isMobile ? 50 : 200}
        scale={30}
        size={1}
        speed={0.1}
        opacity={0.15}
        color={colors[1]}
        position={[0, 0, -20]}
      />
    </group>
  );
}
