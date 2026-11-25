'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/testimonials'

/** Every testimonial in one sideways row: swipe, scroll, or use the arrows. */
export default function Testimonials() {
  const rail = useRef<HTMLUListElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const measure = () => {
    const el = rail.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
  }
  useEffect(() => { measure() }, [])

  const step = (dir: number) => {
    const el = rail.current
    const card = el?.querySelector('li')
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <section aria-labelledby="voices-h" className="section overflow-hidden bg-stone">
      <div className="container flex items-end justify-between gap-8">
        <h2 id="voices-h" className="display max-w-[11em]">What our clients and advisors say.</h2>
        <div className="hidden shrink-0 gap-2 pb-2 md:flex">
          <button type="button" onClick={() => step(-1)} disabled={edge.start} aria-label="Earlier testimonials" className="round-btn"><ChevronLeft size={20} /></button>
          <button type="button" onClick={() => step(1)} disabled={edge.end} aria-label="More testimonials" className="round-btn"><ChevronRight size={20} /></button>
        </div>
      </div>
      <ul ref={rail} onScroll={measure} tabIndex={0} aria-label="Testimonials" className="gallery mt-12 md:mt-16">
        {TESTIMONIALS.map((t) => (
          <li key={t.name} className="flex">
            <figure className="flex w-full flex-col rounded-[28px] bg-white p-7 md:p-9">
              <blockquote className="flex-1"><p className="text-[1.1875rem] leading-[1.55] text-ink md:text-[1.125rem]">&ldquo;{t.quote}&rdquo;</p></blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                {t.image ? (
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-platinum"><Image src={t.image} alt="" fill sizes="48px" className="object-cover" /></span>
                ) : (
                  <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-midnight text-[1rem] font-semibold text-white">{t.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}</span>
                )}
                <span><span className="block font-semibold tracking-[-.015em] text-midnight">{t.name}</span><span className="block text-[1rem] text-ink-soft">{t.role}</span></span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
