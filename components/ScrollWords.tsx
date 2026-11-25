'use client'
import { createElement, useRef } from 'react'
import { motion, useReducedMotion, useScroll, type MotionValue } from 'framer-motion'
import { useRamp } from '@/lib/ramp'

function Word({ word, progress, i, total, from, still }: { word: string; progress: MotionValue<number>; i: number; total: number; from: number; still: boolean }) {
  const opacity = useRamp(progress, [i / total, Math.min(1, (i + 2) / total)], [from, 1])
  return <motion.span data-reveal="" style={{ opacity: still ? 1 : opacity }}>{word}</motion.span>
}

/**
 * A line of text that fills in word by word as it scrolls up the screen: the same device as the
 * opening statement, for any heading or paragraph. The text is ordinary text in the page.
 */
export default function ScrollWords({ text, as = 'p', className, id, from = 0.24 }: { text: string; as?: 'h2' | 'h3' | 'p'; className?: string; id?: string; /** Opacity of words not yet reached. */ from?: number }) {
  const ref = useRef<HTMLElement>(null)
  const still = !!useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'end 56%'] })
  const words = text.split(' ')
  return createElement(as, { ref, id, className }, words.map((w, i) => (
    <span key={i}><Word word={w} progress={scrollYProgress} i={i} total={words.length} from={from} still={still} />{' '}</span>
  )))
}
