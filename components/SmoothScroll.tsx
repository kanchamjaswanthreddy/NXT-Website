'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

declare global {
  interface Window { __lenis?: Lenis }
}

/** Scroll to a position, through the smooth scroller when it is running. */
export function scrollToY(top: number) {
  if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.1 })
  else window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

/** Gliding scroll for the whole site. Skipped when the visitor prefers reduced motion. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Safari (and every iOS browser) already scrolls with momentum; a second smoothing layer on top makes it catch and stall
    if (/^((?!chrome|chromium|android|crios|fxios|edg).)*safari/i.test(navigator.userAgent) || /iP(hone|ad|od)/.test(navigator.userAgent)) return
    const lenis = new Lenis({ lerp: 0.1 })
    window.__lenis = lenis
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy(); delete window.__lenis }
  }, [])
  return null
}
