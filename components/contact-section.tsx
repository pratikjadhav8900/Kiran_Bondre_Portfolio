'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const contactInfo = {
  location: 'Pune, India',
  openTo: ['Mumbai', 'Bangalore', 'Gurgaon', 'Remote (Global)'],
  linkedin: 'linkedin.com/in/kiran-bondre',
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 md:py-32 overflow-hidden"
    >


      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block px-4 py-2 text-xs tracking-[0.3em] text-primary/80 border border-primary/30 rounded-full glass mb-6"
          >
            {"LET'S CONNECT"}
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Get in Touch</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            {"Looking for a revenue-focused marketing leader to drive your GTM strategy? Let's discuss how I can help scale your business."}
          </p>
        </motion.div>

        {/* Contact card */}
        <motion.div
          className="relative glass-strong rounded-3xl p-8 md:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `conic-gradient(from 0deg, oklch(0.7 0.2 200), oklch(0.6 0.15 280), oklch(0.8 0.15 160), oklch(0.7 0.2 200))`,
              padding: '2px',
            }}
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full rounded-3xl bg-background" />
          </motion.div>

          <div className="relative z-10">
            {/* Location */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary">
                  <path d="M10 11a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 18s7-5.5 7-10a7 7 0 10-14 0c0 4.5 7 10 7 10z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="text-foreground font-medium">{contactInfo.location}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Open to: {contactInfo.openTo.join(' • ')}
              </p>
            </motion.div>

            {/* LinkedIn CTA */}
            <motion.a
              href={`https://${contactInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg glow-primary transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </motion.a>

            {/* Additional contact hint */}
            <motion.p
              className="mt-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              Or reach out via LinkedIn for collaboration opportunities
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative py-8 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kiran Bondre. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Open to opportunities
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
