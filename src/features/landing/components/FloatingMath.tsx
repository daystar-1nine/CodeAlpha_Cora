import * as React from "react";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const SYMBOLS = [
  "π", "∞", "∫", "Σ", "Δ", "θ", "√", "λ", "μ", "Ω", "φ", "α", "β", "γ", 
  "e=mc²", "∇", "∂", "∯", "≈", "≠", "ƒ", "ℝ", "ℂ", "ℤ", "x", "y", "z",
  "lim", "dx", "dy", "sin", "cos", "tan", "log", "ln", "e", "i", "0", "1"
];

interface MathObject {
  id: number;
  symbol: string;
  radius: number;
  speed: number;
  angle: number;
  yOffset: number;
  rotationSpeed: [number, number, number];
  scale: number;
  opacity: number;
}

export function FloatingMath() {
  const groupRef = useRef<THREE.Group>(null);

  // Procedural generation of 100 mathematical objects
  const objects: MathObject[] = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      // Orbit radius (from center of black hole)
      radius: 10 + Math.random() * 40,
      // Orbital speed
      speed: (Math.random() * 0.2 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
      // Initial angle
      angle: Math.random() * Math.PI * 2,
      // Vertical spread
      yOffset: (Math.random() - 0.5) * 30,
      // Local rotation speed
      rotationSpeed: [
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ],
      scale: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.2
    }));
  }, []);

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Animate each object in its orbit around [0, 0, -30] (Black Hole center)
    objects.forEach((obj, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;

      const currentAngle = obj.angle + t * obj.speed;
      
      // Calculate position relative to black hole at z = -30
      mesh.position.x = Math.cos(currentAngle) * obj.radius;
      mesh.position.z = -30 + Math.sin(currentAngle) * obj.radius;
      mesh.position.y = obj.yOffset + Math.sin(t + obj.id) * 2; // subtle floating

      // Apply local rotation
      mesh.rotation.x += obj.rotationSpeed[0] * 0.01;
      mesh.rotation.y += obj.rotationSpeed[1] * 0.01;
      mesh.rotation.z += obj.rotationSpeed[2] * 0.01;
    });
  });

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => (
        <Text
          key={obj.id}
          ref={(el) => {
            refs.current[i] = el as unknown as THREE.Mesh;
          }}
          fontSize={1.5 * obj.scale}
          color="#ffffff"
          fillOpacity={obj.opacity}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#8b5cf6"
          outlineOpacity={obj.opacity * 0.5}
        >
          {obj.symbol}
        </Text>
      ))}
    </group>
  );
}
