import * as React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export function BlackHole() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const accretionRef = useRef<THREE.Mesh>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5;
      coreRef.current.rotation.z = t * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.3;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.1;
    }
    if (accretionRef.current) {
      accretionRef.current.rotation.z = t * 0.8;
    }
  });

  return (
    <group position={[0, 0, -30]}>
      {/* Event Horizon (Pure Black Core) */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[4, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Gravitational Distortion Aura */}
      <mesh scale={1.1}>
        <sphereGeometry args={[4, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
        <MeshDistortMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={2}
          transparent
          opacity={0.1}
          distort={0.4}
          speed={2}
        />
      </mesh>

      {/* Accretion Disk */}
      <mesh ref={accretionRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[5, 12, isMobile ? 64 : 128]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={4}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Light Bending / Outer Energy Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[8, 0.1, isMobile ? 8 : 16, isMobile ? 50 : 100]} />
        <meshBasicMaterial
          color="#ec4899"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Intense Core Light */}
      <pointLight color="#8b5cf6" intensity={200} distance={50} />
    </group>
  );
}
