'use client'
import { motion, useInView, useMotionValue, useSpring, type Variants } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'

const ease = [0.22, 0.61, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export function Reveal({ children, className, delay = 0, as = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'section' | 'li' | 'article' }) {
  const M = motion[as] as typeof motion.div
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ hidden: fadeUp.hidden, show: { ...(fadeUp.show as object), transition: { duration: 0.7, ease, delay } } }}
    >
      {children}
    </M>
  )
}

export function Stagger({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'ul' | 'ol' }) {
  const M = motion[as] as typeof motion.div
  return (
    <M className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
      {children}
    </M>
  )
}

export function Item({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' }) {
  const M = motion[as] as typeof motion.div
  return <M className={className} variants={fadeUp}>{children}</M>
}

export function Counter({ value, suffix = '', className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 60, damping: 18 })
  useEffect(() => { if (inView) mv.set(value) }, [inView, value, mv])
  useEffect(() => spring.on('change', (v) => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix }), [spring, suffix])
  return <span ref={ref} className={className}>0{suffix}</span>
}
