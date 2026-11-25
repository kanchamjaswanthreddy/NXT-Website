'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const TILT = '.card, main .tile, .sit, .sol, .stats li, .versus, .steps li'
const PULL = '.btn-primary, .btn-cta, .btn-light, .nav-cta'

/**
 * Site-wide pointer and arrival effects: a ring that follows the cursor and grows over anything
 * clickable, tiles that lean toward the pointer with a light under it, buttons that lean in, and
 * a data-in mark on each section the first time it comes into view (CSS draws from that).
 * Pointer effects run only with a real mouse and with motion allowed.
 */
export default function Fx() {
  const cur = useRef<HTMLDivElement>(null)
  const path = usePathname()
  const [deep, setDeep] = useState(false)

  // every page opens at its top, unless the address points at a part of it
  useEffect(() => {
    if (location.hash) return
    const l = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: { immediate?: boolean; force?: boolean }) => void } }).__lenis
    if (l) l.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }, [path])

  // mark sections as they arrive; re-armed on every page change
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) { (e.target as HTMLElement).dataset.in = ''; io.unobserve(e.target) }
    }, { rootMargin: '0px 0px -18% 0px' })
    document.querySelectorAll('main section, .footer, .closing-tile').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [path])

  useEffect(() => {
    const on = () => setDeep(scrollY > 700)
    on(); addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine) return
    document.documentElement.classList.add('has-cur')

    const el = cur.current
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, raf = 0, lit: HTMLElement | null = null, pulled: HTMLElement | null = null
    const tick = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2
      if (el) { el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`; el.style.setProperty('--lx', `${x - tx}px`); el.style.setProperty('--ly', `${y - ty}px`) }
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0
    }
    const clear = () => {
      if (lit) { lit.style.removeProperty('--rx'); lit.style.removeProperty('--ry'); lit.removeAttribute('data-lit'); lit = null }
      if (pulled) { pulled.style.removeProperty('translate'); pulled = null }
    }
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY
      if (!raf) raf = requestAnimationFrame(tick)
      const t = e.target as HTMLElement
      if (el) { el.dataset.on = ''; if (t.closest?.('a, button, [role="button"], summary, label, input, select, textarea')) el.dataset.over = ''; else delete el.dataset.over }
      const card = t.closest?.(TILT) as HTMLElement | null
      if (card !== lit) { if (lit) { lit.style.removeProperty('--rx'); lit.style.removeProperty('--ry'); lit.removeAttribute('data-lit') } lit = card }
      if (card) {
        const r = card.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
        card.dataset.lit = ''
        card.style.setProperty('--mx', `${px * 100}%`); card.style.setProperty('--my', `${py * 100}%`)
        card.style.setProperty('--ry', `${(px - 0.5) * 7}deg`); card.style.setProperty('--rx', `${(0.5 - py) * 7}deg`)
      }
      const btn = t.closest?.(PULL) as HTMLElement | null
      if (btn !== pulled) { if (pulled) pulled.style.removeProperty('translate'); pulled = btn }
      if (btn) { const r = btn.getBoundingClientRect(); btn.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.22}px ${(e.clientY - r.top - r.height / 2) * 0.3}px` }
    }
    const leave = () => { clear(); if (el) delete el.dataset.on }
    addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => { document.documentElement.classList.remove('has-cur'); removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf); clear() }
  }, [])

  const top = () => {
    const l = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis
    if (l) l.scrollTo(0); else scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <>
      <div ref={cur} className="cur" aria-hidden="true"><i /><b /></div>
      <button type="button" className="totop" data-on={deep || undefined} onClick={top} aria-label="Back to top" tabIndex={deep ? 0 : -1}>
        <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" /><circle cx="24" cy="24" r="21" pathLength="100" /><path d="M24 31V18M18 23l6-6 6 6" /></svg>
      </button>
    </>
  )
}
