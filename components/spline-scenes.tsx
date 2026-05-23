'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Environment, Stars } from '@react-three/drei'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import * as THREE from 'three'
import Spline from '@splinetool/react-spline'



export function BusinessImpactSpline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5])

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-[500px] md:h-[600px] lg:h-[800px]"
      style={{ scale, opacity }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-full h-full rounded-full blur-3xl opacity-30"
          style={{
            background: 'conic-gradient(from 0deg, oklch(0.7 0.2 200 / 0.3), oklch(0.6 0.15 280 / 0.3), oklch(0.8 0.15 160 / 0.3), oklch(0.7 0.2 200 / 0.3))',
          }}
        />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-auto rounded-3xl overflow-hidden">
        <iframe 
          src="https://my.spline.design/glassknotvortex-6alTqxrY3HyygLTzbLWOOqPc/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ border: 'none', background: 'transparent' }}
          allow="autoplay"
        />
      </div>
    </motion.div>
  )
}

export function ShowcaseSpline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -5])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95])

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-[500px] md:h-[600px] lg:h-[800px]"
      style={{
        y,
        rotateX,
        scale,
        perspective: 1200,
      }}
    >
      {/* Screen glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[80%] h-[60%] blur-3xl opacity-20 translate-y-10"
          style={{
            background: 'radial-gradient(ellipse, oklch(0.7 0.2 200 / 0.5) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-auto rounded-3xl overflow-hidden">
        <iframe 
          src="https://my.spline.design/mackbookmockupanimationwithframertutorial-RADKgmvSa4peohIwHWa4sb8p/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ border: 'none', background: 'transparent' }}
          allow="autoplay"
        />
      </div>
    </motion.div>
  )
}
