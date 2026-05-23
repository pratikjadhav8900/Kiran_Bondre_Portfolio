'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useOrbStore } from '@/store/use-orb-store'

const experiences = [
  {
    company: 'Sela',
    role: 'Manager – Global Marketing | Head of Marketing (India)',
    period: 'Mar 2023 – Present',
    location: 'Pune, India | Global Scope (India, US, Israel)',
    type: 'CURRENT ROLE',
    color: 'oklch(0.7 0.2 200)',
    overview: 'P&L-aligned marketing leader driving revenue growth across hyperscaler ecosystems with full GTM ownership for India operations while influencing global marketing strategy.',
    sections: [
      {
        title: 'Business & Revenue Impact',
        items: [
          'Generated ~$200K MRR annually (~$2.5–3M ARR) across Google Cloud (~$150K), AWS (~$80K), and Azure (~$50K) through partner-led demand programs',
          'Influenced a 4–5× pipeline-to-revenue ratio, resulting in ~$10–12M in annual sales pipeline across cloud services and SaaS-led engagements',
        ],
      },
      {
        title: 'Partner & Ecosystem GTM',
        items: [
          'Built and scaled partner-led GTM motions across Google Cloud, AWS, Azure, and Alibaba',
          'Launched and scaled co-branded offerings (Sela + AWS, Sela + Google Cloud, Sela + Umbrella)',
        ],
      },
    ],
    metrics: [
      { value: '$10-12M', label: 'Annual Pipeline' },
      { value: '$2.5M+', label: 'ARR Driven' },
      { value: '4-5×', label: 'Pipeline Ratio' },
      { value: '$250K+', label: 'Budget Owned' },
    ],
  },
  {
    company: 'Zensar Technologies',
    role: 'Associate Manager – Marketing (Enterprise & ABM)',
    period: 'Mar 2021 – Mar 2023',
    location: 'Pune, India | US Market',
    type: 'ENTERPRISE ABM',
    color: 'oklch(0.65 0.15 160)',
    overview: 'Led enterprise ABM and partner marketing initiatives for US West region, driving significant pipeline influence across major technology alliances.',
    sections: [
      {
        title: 'Key Responsibilities & Impact',
        items: [
          'Led enterprise ABM and partner marketing for the US West region, supporting SAP, Oracle, Salesforce, and Google Cloud alliances',
          'Influenced ~$12.5M in enterprise pipeline through integrated ABM, digital, field marketing, and OEM-led campaigns',
        ],
      },
    ],
    metrics: [
      { value: '$12.5M', label: 'Pipeline Influenced' },
      { value: '12+', label: 'Major Events' },
      { value: 'Fortune 500', label: 'Account Tier' },
      { value: '4', label: 'Partner Alliances' },
    ],
  },
  {
    company: 'Inventive SMI',
    role: 'Marketing Executive',
    period: 'Apr 2019 – Dec 2020',
    location: 'Pune, India',
    type: 'DEMAND GENERATION',
    color: 'oklch(0.6 0.15 40)',
    overview: 'Drove lead generation and sales enablement across enterprise technology solutions.',
    sections: [
      {
        title: 'Key Contributions',
        items: [
          'Drove lead generation and sales enablement across enterprise IT, ERP, cloud, and security solutions',
          'Supported opportunity management, forecasting, and CRM hygiene across multiple enterprise accounts',
        ],
      },
    ],
    metrics: [],
  },
  {
    company: 'TSL Consulting Pvt. Ltd.',
    role: 'Business Development Specialist',
    period: 'Oct 2017 – May 2018',
    location: 'Pune, India',
    type: 'BUSINESS DEVELOPMENT',
    color: 'oklch(0.6 0.12 280)',
    overview: 'Delivered qualified pipeline through digital and email marketing campaigns for enterprise technology portfolios.',
    sections: [
      {
        title: 'Key Contributions',
        items: [
          'Delivered qualified pipeline through digital and email marketing, including BANT-qualified appointment generation',
          'Executed end-to-end demand campaigns across IBM, Cisco, and enterprise technology portfolios',
        ],
      },
    ],
    metrics: [],
  },
]

function FloatingParticles({ count = 20, color = 'rgba(255,255,255,0.5)' }) {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const size = Math.random() * 4 + 1
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: `blur(${Math.random() * 2}px)`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, Math.random() * 0.5 + 0.1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )
      })}
    </div>
  )
}

function CinematicNode({ experience, index }: { experience: typeof experiences[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Determine mobile status
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Desktop Mouse Tilt
  const mouseRotateX = useTransform(y, [-150, 150], [12, -12])
  const mouseRotateY = useTransform(x, [-150, 150], [-12, 12])
  
  // Mobile Scroll Tilt
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25])
  
  const springConfig = { damping: 25, stiffness: 200 }
  const springRotateX = useSpring(isMobile ? scrollRotateX : mouseRotateX, springConfig)
  const springRotateY = useSpring(isMobile ? 0 : mouseRotateY, springConfig)

  // Glow transforms (must be at top level to obey Rules of Hooks)
  const glowX = useTransform(x, (val) => val - 150)
  const glowY = useTransform(y, (val) => val - 150)

  function handleMouseMove(e: React.MouseEvent) {
    if (isMobile) return
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  function handleMouseLeave() {
    if (isMobile) return
    setIsHovered(false)
    x.set(0)
    y.set(0)
    useOrbStore.getState().setOrbTargetRect(null)
    useOrbStore.getState().setActiveExperienceIndex(null)
  }

  function handleMouseEnter() {
    if (isMobile) return
    setIsHovered(true)
    if (cardRef.current) {
      useOrbStore.getState().setOrbTargetRect(cardRef.current.getBoundingClientRect())
      useOrbStore.getState().setActiveExperienceIndex(index)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="relative w-full group z-10"
    >
      {/* Background Environmental Glow */}
      <motion.div 
        className="absolute inset-0 -z-10 rounded-3xl opacity-0 transition-opacity duration-700 blur-3xl pointer-events-none"
        style={{ backgroundColor: experience.color }}
        animate={{ opacity: isHovered || isMobile ? 0.25 : 0 }}
      />

      {/* Main Holographic Panel */}
      <motion.div 
        className="relative bg-background/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10 overflow-hidden transition-colors duration-500"
        style={{
          boxShadow: isHovered || isMobile ? `0 0 40px -10px ${experience.color}40, inset 0 0 20px -10px ${experience.color}20` : '0 20px 40px -20px rgba(0,0,0,0.5)',
          borderColor: isHovered || isMobile ? `color-mix(in oklch, ${experience.color} 30%, transparent)` : 'rgba(255,255,255,0.05)',
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow orb following mouse on card (or pulsing on mobile) */}
        <motion.div 
          className="absolute w-[300px] h-[300px] rounded-full pointer-events-none transition-opacity duration-300 mix-blend-screen"
          style={{
            background: `radial-gradient(circle, ${experience.color}20 0%, transparent 70%)`,
            x: isMobile ? '0%' : glowX,
            y: isMobile ? '0%' : glowY,
            opacity: isHovered ? 1 : 0,
            left: isMobile ? '50%' : 'auto',
            top: isMobile ? '50%' : 'auto',
            translateX: isMobile ? '-50%' : '0',
            translateY: isMobile ? '-50%' : '0',
          }}
          animate={isMobile ? { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] } : { opacity: isHovered ? 1 : 0 }}
          transition={isMobile ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
        />

        {/* Content Container floating on Z */}
        <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
          
          <div className="flex flex-col gap-2 mb-6">
            <motion.div 
              className="inline-flex items-center gap-2"
              style={{ transform: "translateZ(20px)" }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: experience.color, boxShadow: `0 0 10px ${experience.color}` }} />
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-muted-foreground">{experience.type}</span>
            </motion.div>
            
            <motion.h3 
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{ 
                color: isHovered || isMobile ? experience.color : 'var(--foreground)',
                transform: "translateZ(30px)",
                transition: 'color 0.4s ease'
              }}
            >
              {experience.company}
            </motion.h3>
            
            <motion.p 
              className="text-lg md:text-xl text-foreground/80 font-medium"
              style={{ transform: "translateZ(20px)" }}
            >
              {experience.role}
            </motion.p>
            
            <motion.p 
              className="text-sm text-muted-foreground/60"
              style={{ transform: "translateZ(10px)" }}
            >
              {experience.period} • {experience.location}
            </motion.p>
          </div>

          <motion.div 
            className="w-full h-px bg-white/10 mb-6"
            style={{ transform: "translateZ(10px)" }}
          />

          {/* Overview & Highlights */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div style={{ transform: "translateZ(20px)" }}>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                {experience.overview}
              </p>
              <div className="space-y-4">
                {experience.sections[0]?.items.slice(0, 2).map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
                    <span className="text-primary mt-1">▰</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Holographic HUD Metrics */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              style={{ transform: "translateZ(60px)" }}
            >
              {experience.metrics.map((metric, i) => (
                <div 
                  key={i} 
                  className="relative p-4 rounded-xl border border-white/5 bg-black/20 overflow-hidden group/hud"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-100 md:opacity-0 group-hover/hud:opacity-100 transition-opacity" />
                  <div 
                    className="text-2xl md:text-3xl font-bold mb-1 tracking-tighter"
                    style={{ color: experience.color }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-[10px] tracking-widest uppercase text-muted-foreground/70">
                    {metric.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Deep parallax for the background nebula and stars
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const midgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['10%', '-20%'])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 md:py-48 overflow-hidden min-h-screen"
      style={{ perspective: "1000px" }}
    >
      {/* Background Deep Space Layer */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-50 mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#a855f7]/5 rounded-full blur-[120px] opacity-50 mix-blend-screen" />
      </motion.div>

      {/* Foreground Particles Layer */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ y: foregroundY }}
      >
        <FloatingParticles count={30} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-24 md:mb-40"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <span className="inline-block px-4 py-2 text-[10px] tracking-[0.4em] text-primary/80 border border-primary/20 rounded-full glass mb-6 uppercase">
            Mission Constellation
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
            Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/50">Nodes</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/60 max-w-2xl mx-auto font-light">
            Drifting through 8+ years of revenue growth across hyperscaler ecosystems and global B2B SaaS operations.
          </p>
        </motion.div>

        {/* Cinematic Nodes Layout */}
        <motion.div 
          className="flex flex-col gap-16 md:gap-32"
          style={{ y: midgroundY }}
        >
          {experiences.map((exp, index) => {
            // Asymmetrical positioning logic
            let alignmentClass = "mr-auto md:pr-24" // Default left-ish
            if (index % 2 !== 0) alignmentClass = "ml-auto md:pl-24" // Right-ish
            
            return (
              <div 
                key={exp.company} 
                className={`w-full md:w-[85%] lg:w-[75%] ${alignmentClass}`}
                style={{ perspective: "1200px" }}
              >
                <CinematicNode experience={exp} index={index} />
              </div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
