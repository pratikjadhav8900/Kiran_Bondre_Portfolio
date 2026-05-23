'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion'
import { BusinessImpactSpline } from './spline-scenes'

interface Metric {
  value: string
  numericValue: number
  suffix: string
  label: string
  description: string
}

const metrics: Metric[] = [
  {
    value: '$10M+',
    numericValue: 10,
    suffix: 'M+',
    label: 'Pipeline Influenced',
    description: 'Annual sales pipeline across cloud services',
  },
  {
    value: '$2.5M+',
    numericValue: 2.5,
    suffix: 'M+',
    label: 'ARR Driven',
    description: 'Through partner-led demand programs',
  },
  {
    value: '15-20%',
    numericValue: 17.5,
    suffix: '%',
    label: 'YoY Growth',
    description: 'Business growth through GTM restructuring',
  },
  {
    value: '4-5×',
    numericValue: 4.5,
    suffix: '×',
    label: 'Revenue Ratio',
    description: 'Pipeline-to-revenue conversion rate',
  },
]

export function BusinessImpactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative min-h-screen py-20 md:py-32 overflow-hidden"
    >
      {/* Content container */}
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ENTERPRISE GROWTH ENGINE
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Revenue Impact</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Driving measurable business outcomes through data-driven GTM strategy and partner-led growth motions
          </p>
        </motion.div>

        {/* 3D Model + Metrics Grid */}
        <div className="relative">
          {/* Spline vortex in the center */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
            <BusinessImpactSpline />
          </div>

          {/* Metrics grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {metrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Cloud ecosystem badges */}
        <motion.div
          className="mt-16 md:mt-24 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {['Google Cloud', 'AWS', 'Azure', 'Alibaba Cloud'].map((cloud, i) => (
            <motion.div
              key={cloud}
              className="px-6 py-3 glass rounded-full text-sm text-foreground/80 border border-primary/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: 'oklch(0.7 0.2 200 / 0.5)' }}
            >
              {cloud}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function MetricCard({ metric, index, isInView }: { metric: Metric; index: number; isInView: boolean }) {
  const [count, setCount] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, metric.numericValue, {
      duration: 2,
      delay: 0.5 + index * 0.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setCount(value),
    })

    return () => controls.stop()
  }, [isInView, metric.numericValue, index])

  const displayValue = metric.suffix.includes('M') 
    ? `$${count.toFixed(1)}${metric.suffix}`
    : metric.suffix.includes('%')
      ? `${count.toFixed(0)}${metric.suffix}`
      : `${count.toFixed(1)}${metric.suffix}`

  return (
    <motion.div
      ref={cardRef}
      className="group relative p-8 rounded-2xl glass-strong overflow-hidden"
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, y: -5 }}
      style={{ perspective: 1000 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 50%, oklch(0.7 0.2 200 / 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Border glow */}
      <div className="absolute inset-0 rounded-2xl border border-primary/20 group-hover:border-primary/40 transition-colors duration-500" />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-2"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {displayValue}
        </motion.div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
          {metric.label}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          {metric.description}
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
          <path
            d="M80 0 L80 80 L0 80"
            stroke="oklch(0.7 0.2 200)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    </motion.div>
  )
}
