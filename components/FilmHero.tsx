'use client'
import Link from 'next/link'
import { useRef, type CSSProperties } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Film from './Film'
import { FILMS } from '@/lib/media'
import { SCROLL_FX, useMedia } from '@/lib/use-media'
import { useRamp } from '@/lib/ramp'

const css = (vars: Record<string, string | number>) => vars as CSSProperties
const LINES = ['Income you can’t outlive.', 'Care you can choose.', 'A legacy that lands.']

/**
 * Home page opening. The film fills the screen under the headline; as the page scrolls, the
 * words lift away and the film draws back into a rounded frame on white, which the rest of the
 * page then follows. The closing frame above the footer is the same move in reverse.
 */
export default function FilmHero() {
  const ref = useRef<HTMLElement>(null)
  const fx = useMedia(SCROLL_FX)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const frame = useRamp(scrollYProgress, [0.05, 0.8], [0, 1])
  const scale = useRamp(scrollYProgress, [0, 1], [1.07, 1])
  const copyOpacity = useRamp(scrollYProgress, [0, 0.2], [1, 0])
  const copyY = useRamp(scrollYProgress, [0, 0.3], [0, -64])
  const veil = useRamp(scrollYProgress, [0, 0.35], [1, 0])
  const reach = useTransform(copyOpacity, (v) => (v < 0.02 ? 'hidden' : 'visible'))

  return (
    <section ref={ref} className="hero">
      <div className="hero-stage">
        <motion.div className="film" style={fx ? css({ '--e': frame as unknown as number }) : undefined}>
          <Film film={FILMS.hero} priority scale={fx ? scale : undefined} />
          <motion.div aria-hidden="true" className="hero-veil" style={fx ? { opacity: veil } : undefined} />
        </motion.div>

        <motion.div className="hero-copy" style={fx ? { opacity: copyOpacity, y: copyY, visibility: reach } : undefined}>
          <h1 className="hero-h1">
            {LINES.map((line, i) => <span key={line} className="rise" style={css({ '--i': i })}>{line}</span>)}
          </h1>
        </motion.div>

        <motion.div className="hero-actions" style={fx ? { opacity: copyOpacity, visibility: reach } : undefined}>
          <Link href="/contact" className="btn btn-primary rise" style={css({ '--i': 5 })}>Book a free consultation</Link>
          <Link href="/solutions" className="btn btn-ghost rise" style={css({ '--i': 6 })}>Explore solutions</Link>
          <p className="hero-sub rise" style={css({ '--i': 7 })}>A-rated carriers only. Licensed in 50 states. No cost to you.</p>
        </motion.div>
      </div>
    </section>
  )
}
