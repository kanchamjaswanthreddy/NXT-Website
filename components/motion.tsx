'use client'
import { animate, motion, useInView, type Variants } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
}

/*
 * Elements that fade up as they enter the screen carry data-reveal, so the <noscript> rule in
 * app/layout.tsx can show them when JavaScript is off.
 */

export function Reveal({ children, className, delay = 0, as = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'section' | 'li' | 'article' }) {
  const M = motion[as] as typeof motion.div
  return (
    <M
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{ hidden: fadeUp.hidden, show: { opacity: 1, y: 0, transition: { duration: 1, ease, delay } } }}
    >
      {children}
    </M>
  )
}

export function Stagger({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'ul' | 'ol' }) {
  const M = motion[as] as typeof motion.div
  return (
    <M className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}>
      {children}
    </M>
  )
}

export function Item({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' }) {
  const M = motion[as] as typeof motion.div
  return <M data-reveal="" className={className} variants={fadeUp}>{children}</M>
}

/**
 * A number that counts up the first time it scrolls into view. The finished number is what the
 * server sends, so it reads correctly without JavaScript and to anything that does not scroll.
 */
export function Counter({ value, suffix = '', className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const armed = useRef(false)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return   // already on screen: leave it
    armed.current = true
    el.textContent = `0${suffix}`
  }, [suffix])

  useEffect(() => {
    const el = ref.current
    if (!inView || !armed.current || !el) return
    const controls = animate(0, value, { duration: 1.6, ease, onUpdate: (v) => { el.textContent = Math.round(v).toLocaleString() + suffix } })
    return () => controls.stop()
  }, [inView, value, suffix])

  return <span ref={ref} className={className}>{value.toLocaleString()}{suffix}</span>
}
