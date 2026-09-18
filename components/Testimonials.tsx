'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  { name: 'Coming soon', role: '', quote: 'We are collecting testimonials from our valued clients. Check back soon to hear their stories.' },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const t = TESTIMONIALS[idx]
  const hasPrev = idx > 0
  const hasNext = idx < TESTIMONIALS.length - 1

  if (TESTIMONIALS.length === 1 && TESTIMONIALS[0].name === 'Coming soon') {
    return (
      <section className="section bg-stone">
        <div className="container max-w-3xl text-center">
          <p className="label-sm mb-5">Testimonials</p>
          <h2 className="display">What our clients say.</h2>
          <p className="lead mx-auto mt-5 max-w-xl text-ink-soft">We are collecting testimonials from our valued clients. Check back soon to hear their stories and experiences working with NXT Financial Group.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section bg-stone">
      <div className="container max-w-3xl">
        <p className="label-sm mb-5 text-center">Testimonials</p>
        <h2 className="display text-center">What our clients say.</h2>
        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.blockquote key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="card rounded-[24px] p-8 text-center md:p-12">
              <div className="mb-6 flex justify-center gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={20} className="fill-gold text-gold" />)}</div>
              <p className="text-lg leading-relaxed text-ink md:text-xl">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-6"><cite className="not-italic"><span className="block font-semibold text-navy">{t.name}</span>{t.role && <span className="text-sm text-ink-soft">{t.role}</span>}</cite></footer>
            </motion.blockquote>
          </AnimatePresence>
          {TESTIMONIALS.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button onClick={() => setIdx((i) => i - 1)} disabled={!hasPrev} aria-label="Previous testimonial" className="flex h-10 w-10 items-center justify-center rounded-full border border-platinum text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-navy"><ChevronLeft size={18} /></button>
              <span className="mono text-sm text-ink-soft">{idx + 1} / {TESTIMONIALS.length}</span>
              <button onClick={() => setIdx((i) => i + 1)} disabled={!hasNext} aria-label="Next testimonial" className="flex h-10 w-10 items-center justify-center rounded-full border border-platinum text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-navy"><ChevronRight size={18} /></button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
