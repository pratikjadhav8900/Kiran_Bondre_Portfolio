'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const competencies = [
  { name: 'Revenue Marketing', category: 'Strategy' },
  { name: 'GTM Strategy', category: 'Strategy' },
  { name: 'Partner & Alliance Marketing', category: 'Partnerships' },
  { name: 'Demand Generation', category: 'Growth' },
  { name: 'Enterprise ABM', category: 'Enterprise' },
  { name: 'Pipeline & ARR Ownership', category: 'Revenue' },
  { name: 'Hyperscaler Ecosystems', category: 'Cloud' },
  { name: 'MDF & Co-op Management', category: 'Operations' },
  { name: 'Field & Event Marketing', category: 'Events' },
  { name: 'PR & Brand Strategy', category: 'Brand' },
  { name: 'Sales Enablement', category: 'Sales' },
  { name: 'Global Stakeholder Management', category: 'Leadership' },
]

const certifications = [
  'AWS Certified Cloud Practitioner',
  'IBM Cloud Core',
  'ITIL 4 Foundation',
  'Business Analysis (SkillSoft)',
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 md:py-32 overflow-hidden"
    >


      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8"
        style={{ y }}
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block px-4 py-2 text-xs tracking-[0.3em] text-primary/80 border border-primary/30 rounded-full glass mb-6"
          >
            CORE COMPETENCIES
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Two decades of B2B marketing excellence across enterprise technology, 
            cloud ecosystems, and global markets.
          </p>
        </motion.div>

        {/* Skills - Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/20 rounded-2xl overflow-hidden mb-20">
          {competencies.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
              total={competencies.length}
            />
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-xs tracking-[0.3em] text-muted-foreground mb-8 uppercase">
            Certifications & Credentials
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              >
                <div className="px-5 py-3 text-sm font-medium text-foreground/70 border border-border/50 rounded-lg bg-background/50 backdrop-blur-sm group-hover:border-primary/40 group-hover:text-foreground transition-all duration-300">
                  {cert}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function SkillCard({ 
  skill, 
  index, 
  isInView,
  total,
}: { 
  skill: typeof competencies[0]
  index: number
  isInView: boolean
  total: number
}) {
  const number = String(index + 1).padStart(2, '0')
  
  return (
    <motion.div
      className="group relative bg-background/80 backdrop-blur-sm p-6 md:p-8 min-h-[140px] flex flex-col justify-between overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: 0.05 + index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Hover gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, oklch(0.7 0.15 200 / 0.08) 0%, transparent 60%)',
        }}
      />
      
      {/* Corner accent line */}
      <motion.div 
        className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-primary/60 to-transparent origin-left"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.04 }}
      />
      <motion.div 
        className="absolute top-0 left-0 h-12 w-px bg-gradient-to-b from-primary/60 to-transparent origin-top"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.04 }}
      />

      <div className="relative z-10">
        {/* Number */}
        <span className="text-[10px] tracking-[0.2em] text-primary/50 font-mono mb-3 block">
          {number}
        </span>
        
        {/* Skill name */}
        <h3 className="text-base md:text-lg font-medium text-foreground/90 group-hover:text-foreground transition-colors leading-tight">
          {skill.name}
        </h3>
      </div>

      {/* Category tag */}
      <div className="relative z-10 mt-4">
        <span className="text-[10px] tracking-[0.15em] text-muted-foreground/60 uppercase font-medium">
          {skill.category}
        </span>
      </div>

      {/* Hover arrow indicator */}
      <motion.div 
        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
      >
        <svg 
          className="w-4 h-4 text-primary/60" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
