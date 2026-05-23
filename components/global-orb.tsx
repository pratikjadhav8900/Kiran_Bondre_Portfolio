'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useOrbStore } from '@/store/use-orb-store'

export function GlobalOrb() {
  const { orbTargetRect, activeExperienceIndex } = useOrbStore()
  const [mounted, setMounted] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const smoothX = useSpring(x, { stiffness: 40, damping: 25 })
  const smoothY = useSpring(y, { stiffness: 40, damping: 25 })
  
  // Base scale for the iframe container
  const scale = useSpring(1, { stiffness: 100, damping: 15 })

  useEffect(() => {
    setMounted(true)
    x.set(0)
    y.set(window.innerHeight * 0.35)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (orbTargetRect) {
      // Position the robot to interact with the card, kept mostly to the left side
      // Ensure it doesn't clip off the left side of the screen
      const targetX = window.innerWidth > 1200 ? Math.max(0, orbTargetRect.left - 400) : 0
      const targetY = orbTargetRect.top + orbTargetRect.height / 2 - 350
      
      x.set(targetX)
      y.set(targetY)
      scale.set(1.2) // Grow when analyzing
    } else {
      const defaultX = 0
      const defaultY = window.innerHeight * 0.35
      x.set(defaultX)
      y.set(defaultY)
      scale.set(1)
    }
  }, [orbTargetRect, mounted, x, y, scale])

  // Environmental fluid movement
  useEffect(() => {
    if (!mounted || orbTargetRect) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX
      const mouseY = e.clientY
      
      const defaultX = 0
      const defaultY = window.innerHeight * 0.35
      
      // Drift elegantly towards cursor
      x.set(defaultX + (mouseX - window.innerWidth / 2) * 0.05)
      y.set(defaultY + (mouseY - window.innerHeight / 2) * 0.05)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [orbTargetRect, mounted, x, y])

  if (!mounted) return null

  const colors = [
    'oklch(0.7 0.2 200)', // Cyan
    'oklch(0.65 0.15 160)', // Mint
    'oklch(0.6 0.15 40)',  // Orange
    'oklch(0.6 0.12 280)', // Purple
    'oklch(0.55 0.1 300)'  // Pink
  ]
  const glowColor = activeExperienceIndex !== null ? colors[activeExperienceIndex % colors.length] : 'oklch(0.7 0.2 200)'

  return (
    <motion.div
      className="fixed z-40 pointer-events-none w-[250px] h-[250px] md:w-[600px] md:h-[600px]"
      style={{
        x: smoothX,
        y: smoothY,
        scale,
      }}
    >
      {/* Dynamic Environmental Glow */}
      <div 
        className="absolute inset-20 blur-[100px] opacity-60 transition-colors duration-1000 mix-blend-screen"
        style={{ backgroundColor: glowColor, transform: 'scale(1.2)' }}
      />
      
      {/* Secondary Pulse Ring for Holographic feel */}
      <motion.div 
        className="absolute inset-32 rounded-full border border-white/20 blur-md mix-blend-overlay"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* The AI Robot Character */}
      <div 
        className="relative w-full h-full pointer-events-none"
        style={{
          opacity: 0.95,
          // Mask out the corners to gracefully hide the Spline watermark without clipping the robot
          WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 85%)',
          maskImage: 'radial-gradient(circle at center, black 65%, transparent 85%)'
        }}
      >
        <iframe 
          src="https://my.spline.design/genkubgreetingrobot-UANgTpxP2tIMF3f6b10PJy2L/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ 
            border: 'none', 
            background: 'transparent', 
            pointerEvents: 'none',
            transform: 'scale(1.2)', // Scale up to push watermark further to the edge
            transformOrigin: 'center center'
          }}
          allow="autoplay"
        />
      </div>

      {/* Foreground Holographic Highlight */}
      <div 
        className="absolute inset-10 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 blur-xl mix-blend-overlay"
        style={{ transform: 'scale(0.8)' }}
      />
    </motion.div>
  )
}
