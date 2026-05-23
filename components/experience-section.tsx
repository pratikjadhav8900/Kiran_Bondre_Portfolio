'use client'

import { useRef, useState, useEffect, forwardRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
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
          'Supported $10K–$25K MRR average deal sizes, including committed contracts and multi-stream professional services engagements',
          'Contributed ~15–20% YoY business growth through GTM restructuring, partner solution launches, and demand acceleration initiatives',
        ],
      },
      {
        title: 'Leadership & Scope',
        items: [
          'Served as India Marketing Head, owning end-to-end GTM strategy, execution, and regional outcomes while influencing global marketing strategy across the US and Israel',
          'Owned and optimized $250K+ in annual marketing investments across PPF, MDF, and Co-op programs, directly aligned to revenue impact and partner scorecards',
          'Operated as single-threaded owner for India marketing, leading multiple external agencies (digital, field, content, PR) and reporting directly to Global CMO',
          'Actively contributed to Corporate Strategy and Corporate Development, supporting strategic alliances, M&A discussions, and long-term growth planning',
        ],
      },
      {
        title: 'Partner & Ecosystem GTM',
        items: [
          'Built and scaled partner-led GTM motions across Google Cloud, AWS, Azure, and Alibaba, positioning Sela as a preferred implementation and consulting partner',
          'Launched and scaled co-branded offerings (Sela + AWS, Sela + Google Cloud, Sela + Umbrella, Sela + Sugar), including marketplace-ready solutions',
          'Enabled multiple partner awards and recognitions by strengthening GTM readiness, content maturity, and pipeline contribution',
        ],
      },
      {
        title: 'Demand, Brand & Market Visibility',
        items: [
          'Led brand repositioning and digital transformation, owning website strategy, SEO, SEM, and messaging architecture in collaboration with global stakeholders',
          'Built full-funnel content and thought leadership engine, including enterprise case studies, customer testimonials, video interviews, podcasts, and panel discussions',
          'Planned and executed CXO-focused field events (partner offices, executive dinners, five-star venues) to drive enterprise pipeline and deepen partner engagement',
          'Spearheaded all PR initiatives for Sela India, securing recognition in CIO Magazine (Top 5 Cloud Service Providers), India Business Awards, and Insight Success Magazine (Front Page Feature)',
        ],
      },
      {
        title: 'Organization Building',
        items: [
          'Led end-to-end India office launch, including site selection, commercial negotiations, branding, executive inauguration, press outreach, and launch amplification',
          'Designed and scaled sales enablement assets across India and Israel, including GTM decks, one-pagers, battlecards, solution briefs, and partner pitch kits',
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
          'Supported Fortune 500 and large enterprise accounts, partnering closely with Sales, Alliance, and regional leadership teams',
          'Planned and executed 12+ large-scale partner events across the US and Europe to build qualified enterprise pipeline',
          'Contributed to thought leadership and PR initiatives to strengthen Zensar\'s positioning within OEM ecosystems',
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
          'Enabled sales teams with account research, pitch decks, and solution mapping aligned to customer needs',
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
  {
    company: 'Alepo Technologies',
    role: 'Network Engineer',
    period: 'Oct 2015 – May 2016',
    location: 'Mumbai, India',
    type: 'ENGINEERING FOUNDATION',
    color: 'oklch(0.55 0.1 300)',
    overview: 'Technical foundation in network engineering and product support.',
    sections: [
      {
        title: 'Key Contributions',
        items: [
          'Supported troubleshooting and maintenance of deployed products and servers in Agile/SCRUM environments',
        ],
      },
    ],
    metrics: [],
  },
]


export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  // Track which card is most visible
  useEffect(() => {
    const handleScroll = () => {
      const refs = cardRefs.current
      if (!refs || refs.length === 0) return

      const viewportCenter = window.innerHeight / 2

      let closestIndex = 0
      let closestDistance = Infinity

      refs.forEach((ref, index) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const cardCenter = rect.top + rect.height / 2
        const distance = Math.abs(cardCenter - viewportCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveIndex(closestIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen py-20 md:py-32 overflow-hidden"
    >


      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
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
            PROFESSIONAL JOURNEY
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            8+ years driving revenue growth across B2B SaaS, Cloud, and IT Services
          </p>
        </motion.div>

        {/* Two-column layout with floating orb */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Removed internal floating orb since it's global now */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-1/2 -translate-y-1/2">
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/50 opacity-10 uppercase tracking-[0.2em] transform -rotate-90 origin-left ml-20">
                TIMELINE
              </h3>
            </div>
          </div>

          {/* Experience timeline */}
          <div className="lg:col-span-8 relative space-y-6">
            {/* Vertical timeline line */}
            <div className="absolute left-0 lg:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
            
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.company}
                experience={exp}
                index={index}
                isInView={isInView}
                isActive={activeIndex === index}
                ref={(el) => { cardRefs.current[index] = el }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ExperienceCardProps {
  experience: typeof experiences[0]
  index: number
  isInView: boolean
  isActive: boolean
}

const ExperienceCard = forwardRef<HTMLDivElement, ExperienceCardProps>(
  function ExperienceCard({ experience, index, isInView, isActive }, ref) {
    const [isExpanded, setIsExpanded] = useState(index === 0)

    return (
      <motion.div
        ref={ref}
        className="relative pl-8 lg:pl-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
        onMouseEnter={() => {
          if (ref && typeof ref !== 'function' && ref.current) {
            useOrbStore.getState().setOrbTargetRect(ref.current.getBoundingClientRect())
            useOrbStore.getState().setActiveExperienceIndex(index)
          }
        }}
        onMouseLeave={() => {
          useOrbStore.getState().setOrbTargetRect(null)
          useOrbStore.getState().setActiveExperienceIndex(null)
        }}
      >
        {/* Timeline dot */}
        <motion.div 
          className="absolute left-0 lg:left-4 top-8 w-3 h-3 -translate-x-1/2 rounded-full border-2 z-10"
          style={{ 
            borderColor: experience.color,
            backgroundColor: isActive ? experience.color : 'transparent',
            boxShadow: isActive ? `0 0 20px ${experience.color}` : 'none',
          }}
          animate={{ scale: isActive ? 1.3 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Connector line when active */}
        {isActive && (
          <motion.div
            className="absolute left-3 lg:left-7 top-8 h-[2px] hidden lg:block"
            style={{
              width: '40px',
              background: `linear-gradient(to right, ${experience.color}, transparent)`,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Card */}
        <motion.div
          className="glass-strong rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => setIsExpanded(!isExpanded)}
          animate={{
            borderColor: isActive ? experience.color : 'rgba(255,255,255,0.1)',
            boxShadow: isActive ? `0 0 40px -10px ${experience.color}` : 'none',
          }}
          style={{ borderWidth: '1px' }}
          whileHover={{ scale: 1.005 }}
        >
          {/* Header */}
          <div className="p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span 
                    className="px-3 py-1 text-[10px] tracking-wider font-medium rounded-full"
                    style={{ 
                      backgroundColor: `color-mix(in oklch, ${experience.color} 20%, transparent)`,
                      color: experience.color,
                    }}
                  >
                    {experience.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{experience.period}</span>
                </div>
                <h3 
                  className="text-lg md:text-xl font-bold mb-1"
                  style={{ color: experience.color }}
                >
                  {experience.company}
                </h3>
                <p className="text-foreground/90 font-medium text-sm">{experience.role}</p>
                <p className="text-xs text-muted-foreground/70 mt-1">{experience.location}</p>
              </div>
              
              {/* Metrics preview */}
              {experience.metrics.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {experience.metrics.slice(0, 2).map((metric, i) => (
                    <div key={i} className="text-right">
                      <div 
                        className="text-base md:text-lg font-bold"
                        style={{ color: experience.color }}
                      >
                        {metric.value}
                      </div>
                      <div className="text-[9px] text-muted-foreground uppercase tracking-wider">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {experience.overview}
            </p>

            {/* Expand indicator */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
              <span className="text-[10px] text-muted-foreground/60">
                {isExpanded ? 'Click to collapse' : 'Click to expand'}
              </span>
              <motion.div 
                className="flex items-center gap-2 text-muted-foreground/50"
                animate={{ rotate: isExpanded ? 180 : 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="px-5 md:px-6 pb-6 space-y-5">
                  {/* All metrics */}
                  {experience.metrics.length > 0 && (
                    <div 
                      className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl"
                      style={{ 
                        backgroundColor: `color-mix(in oklch, ${experience.color} 5%, transparent)`,
                      }}
                    >
                      {experience.metrics.map((metric, i) => (
                        <motion.div 
                          key={i} 
                          className="text-center p-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div 
                            className="text-xl md:text-2xl font-bold"
                            style={{ color: experience.color }}
                          >
                            {metric.value}
                          </div>
                          <div className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">
                            {metric.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Sections */}
                  {experience.sections.map((section, sectionIndex) => (
                    <motion.div 
                      key={section.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + sectionIndex * 0.1 }}
                    >
                      <h4 
                        className="text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2"
                        style={{ color: experience.color }}
                      >
                        <span 
                          className="w-6 h-[1px]"
                          style={{ backgroundColor: experience.color }}
                        />
                        {section.title}
                      </h4>
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.05 }}
                          >
                            <span 
                              className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                              style={{ backgroundColor: experience.color }}
                            />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    )
  }
)
