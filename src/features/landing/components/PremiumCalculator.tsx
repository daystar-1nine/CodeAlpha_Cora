import * as React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function PremiumCalculator() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Idle floating animation
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.5;
    
    // Mouse reactive tilt
    const targetRotationX = (state.pointer.y * Math.PI) / 8;
    const targetRotationY = (state.pointer.x * Math.PI) / 8;
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    
    // Idle slight rotation combined with mouse tilt
    groupRef.current.rotation.z = Math.sin(t) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Calculator Body - Premium Glass */}
      <RoundedBox args={[8, 12, 0.8]} radius={0.5} smoothness={4}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          color="#ffffff"
          attenuationDistance={1}
          attenuationColor="#ffffff"
          roughness={0.1}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Screen Placeholder */}
      <mesh position={[0, 3, 0.41]}>
        <planeGeometry args={[6.5, 3.5]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          emissive="#3b82f6" 
          emissiveIntensity={0.2}
          roughness={0.2} 
          metalness={0.8} 
        />
      </mesh>

      {/* Premium Buttons Grid Placeholder */}
      {/* Row 1 */}
      {[-2, 0, 2].map((x, i) => (
        <mesh key={`btn-0-${i}`} position={[x, -0.5, 0.41]}>
          <boxGeometry args={[1.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#171717" roughness={0.5} metalness={0.5} />
        </mesh>
      ))}
      {/* Row 2 */}
      {[-2, 0, 2].map((x, i) => (
        <mesh key={`btn-1-${i}`} position={[x, -2.5, 0.41]}>
          <boxGeometry args={[1.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#171717" roughness={0.5} metalness={0.5} />
        </mesh>
      ))}
      {/* Row 3 */}
      {[-2, 0, 2].map((x, i) => (
        <mesh key={`btn-2-${i}`} position={[x, -4.5, 0.41]}>
          <boxGeometry args={[1.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#171717" roughness={0.5} metalness={0.5} />
        </mesh>
      ))}
      
      {/* Action Button */}
      <mesh position={[2, -3.5, 0.41]}>
         <boxGeometry args={[1.5, 3.5, 0.1]} />
         <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} roughness={0.2} metalness={0.5} />
      </mesh>

    </group>
  );
}
