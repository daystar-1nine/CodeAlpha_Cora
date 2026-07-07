"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

import { CosmicEnvironment } from "./CosmicEnvironment";
import { BlackHole } from "./BlackHole";
import { FloatingMath } from "./FloatingMath";
import { PremiumCalculator } from "./PremiumCalculator";

// Subtle camera breathing and parallax
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Parallax
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 2, 0.05);
    // Breathing
    state.camera.position.z = 15 + Math.sin(t * 0.5) * 1;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
  return null;
}

function MobileCameraSetup() {
  const { camera } = useThree();
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = 65; // Wider FOV for mobile to show more of the scene
        camera.position.z = 20; // Pull back slightly
        camera.updateProjectionMatrix();
      }
    }
  }, [camera]);
  return null;
}

export function Scene() {
  return (
    <Canvas 
      dpr={[1, 2]} 
      camera={{ position: [0, 0, 15], fov: 45 }}
    >
      <color attach="background" args={["#030303"]} />
      
      {/* Performance Optimization */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
      <CameraRig />
      <MobileCameraSetup />

      {/* Composition */}
      {/* CosmicEnvironment */}
      <CosmicEnvironment />
      <BlackHole />
      <FloatingMath />
      {/* PremiumCalculator is very heavy, temporarily disabled to prevent WebGL crash */}
      {/* <PremiumCalculator /> */}

      {/* Environment for realistic reflections on glass */}
      <Environment preset="city" />

      {/* Cinematic Post-Processing - Disabled to prevent WebGL context loss on some GPUs */}
      {/* <EffectComposer multisampling={0}>
        <DepthOfField focusDistance={0.02} focalLength={0.15} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} opacity={1.5} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer> */}
    </Canvas>
  );
}
