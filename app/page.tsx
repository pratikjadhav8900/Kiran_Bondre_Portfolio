'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { CinematicLoader, SpotlightCursor } from '@/components/cinematic-effects'
import { CosmicBackground } from '@/components/cosmic-background'
import { GlobalOrb } from '@/components/global-orb'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { BusinessImpactSection } from '@/components/business-impact-section'
import { ExperienceSection } from '@/components/experience-section'
import { SkillsSection } from '@/components/skills-section'
import { ContactSection, Footer } from '@/components/contact-section'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <SmoothScrollProvider>
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && <CinematicLoader />}
      </AnimatePresence>

      {/* Global Cosmic Environment */}
      <CosmicBackground />
      <GlobalOrb />

      {/* Main content */}
      <div className={`relative min-h-screen transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <SpotlightCursor />
        
        {/* Noise overlay for texture */}
        <div className="noise-overlay" />

        {/* Navigation */}
        <Navigation />

        {/* Main sections */}
        <main>
          <HeroSection />
          <BusinessImpactSection />
          <ExperienceSection />
          <SkillsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}
