'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Environment } from '@react-three/drei'
import * as THREE from 'three'

function CosmicParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 2000
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d4ff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function NebulaHaze() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <planeGeometry args={[40, 40]} />
      <meshBasicMaterial 
        color="#7c3aed" 
        transparent 
        opacity={0.1} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

export function CosmicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#05050a]">
      {/* Fallback gradient if WebGL fails */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% 100%, oklch(0.15 0.03 260) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 20% 50%, oklch(0.7 0.2 200 / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 80% 50%, oklch(0.6 0.15 280 / 0.08) 0%, transparent 50%)
          `,
        }}
      />
      <div className="absolute inset-0 z-10 mix-blend-screen opacity-50">
         <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
          <CosmicParticles />
          <NebulaHaze />
          <Environment preset="night" />
        </Canvas>
      </div>
    </div>
  )
}
