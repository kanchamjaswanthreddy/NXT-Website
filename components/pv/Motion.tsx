'use client'
import { useEffect } from 'react'

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

interface Tracked { el: HTMLElement; top: number; h: number; mode: string; from: number; to: number; p: number }
interface Stack { el: HTMLElement; cards: HTMLElement[]; tops: number[]; hs: number[]; sticks: number[]; gap: number; on: boolean }

/**
 * One small script drives all the motion on the preview page, so the sections themselves stay
 * plain server-rendered markup:
 *
 *   data-rv        things that animate in once, the first time they scroll into view. The script
 *                  only "arms" what is still below the screen, so without JavaScript, or with
 *                  reduced motion, everything is simply there.
 *   data-prog      sets --p (0 to 1) on the element from its position on screen; the stylesheet
 *                  turns that into parallax, the word-by-word statement, the sliding band.
 *                  Modes: default (edge to edge through the screen, or data-from / data-to as
 *                  fractions of the screen height), "pin" (0 to 1 while a tall element holds a sticky child), "exit" (0 at the top of the screen, 1 once
 *                  scrolled past), "enter" (1 once its top reaches the top of the screen),
 *                  "reveal" (how far the element has come up from the bottom edge: 1 once it is all
 *                  in view, or fills the screen).
 *   data-stack     a list of sticky cards; each gets --c as the next card slides over it.
 *   data-magnet    pulls an element a little towards the pointer.
 *   data-tilt      sets --mx / --my (-1 to 1) from the pointer's place over the element.
 */
export default function PvMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.pv') ?? document.querySelector<HTMLElement>('main')
    if (!root) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (still) return

    // ---- things that animate in once ----
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.setAttribute('data-in', '')
        io.unobserve(e.target)
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 })
    root.querySelectorAll<HTMLElement>('[data-rv]').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return     // already on screen: leave it be
      el.setAttribute('data-armed', '')
      io.observe(el)
    })

    // ---- scroll progress ----
    let vh = window.innerHeight
    let items: Tracked[] = []
    let stacks: Stack[] = []
    let last = -1

    const update = (force = false) => {
      const sy = window.scrollY
      if (!force && sy === last) return
      last = sy
      for (const it of items) {
        let p: number
        if (it.mode === 'exit') p = (sy - it.top) / it.h
        else if (it.mode === 'pin') p = (sy - it.top) / Math.max(1, it.h - vh)
        else if (it.mode === 'enter') p = (sy + vh - it.top) / vh
        else if (it.mode === 'reveal') p = (sy + vh - it.top) / Math.min(it.h, vh)
        else p = (it.from * vh - (it.top - sy)) / (it.h + (it.from - it.to) * vh)
        p = clamp01(p)
        if (Math.abs(p - it.p) > 0.0004) { it.p = p; it.el.style.setProperty('--p', p.toFixed(4)) }
      }
      for (const s of stacks) {
        s.cards.forEach((card, i) => {
          let c = 0
          if (s.on && i < s.cards.length - 1) {
            const start = s.sticks[i] + s.hs[i] + s.gap                     // where the next card sits when this one has just stuck
            c = clamp01((start - (s.tops[i + 1] - sy)) / (start - s.sticks[i + 1]))
          }
          card.style.setProperty('--c', c.toFixed(4))
        })
      }
    }

    const measure = () => {
      vh = window.innerHeight
      const sy = window.scrollY
      items = Array.from(root.querySelectorAll<HTMLElement>('[data-prog]')).map((el) => {
        const r = el.getBoundingClientRect()
        return { el, top: r.top + sy, h: Math.max(1, r.height), mode: el.dataset.prog || '', from: parseFloat(el.dataset.from ?? '1'), to: parseFloat(el.dataset.to ?? '0'), p: -1 }
      })
      stacks = Array.from(root.querySelectorAll<HTMLElement>('[data-stack]')).map((el) => {
        const cards = Array.from(el.children) as HTMLElement[]
        const gap = parseFloat(getComputedStyle(el).rowGap) || 0
        const on = cards.length > 1 && getComputedStyle(cards[0]).position === 'sticky'
        let t = el.getBoundingClientRect().top + sy + (parseFloat(getComputedStyle(el).paddingTop) || 0)
        const tops: number[] = [], hs: number[] = [], sticks: number[] = []
        for (const c of cards) {
          tops.push(t); hs.push(c.offsetHeight); sticks.push(parseFloat(getComputedStyle(c).top) || 0)
          t += c.offsetHeight + gap
        }
        return { el, cards, tops, hs, sticks, gap, on }
      })
      update(true)
    }

    let raf = 0
    const tick = () => { update(); raf = requestAnimationFrame(tick) }
    let pending = 0
    const remeasure = () => { cancelAnimationFrame(pending); pending = requestAnimationFrame(measure) }
    measure()
    raf = requestAnimationFrame(tick)
    const ro = new ResizeObserver(remeasure)
    ro.observe(root)
    window.addEventListener('resize', remeasure)
    window.addEventListener('load', remeasure)
    document.fonts?.ready.then(remeasure).catch(() => {})

    // ---- pointer: magnets and tilts (mouse only) ----
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let held: HTMLElement | null = null
    const release = () => {
      if (!held) return
      held.style.setProperty('--mx', '0')
      held.style.setProperty('--my', '0')
      held = null
    }
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.<HTMLElement>('[data-magnet],[data-tilt]') ?? null
      if (el !== held) release()
      if (!el) return
      held = el
      const r = el.getBoundingClientRect()
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2
      if (el.hasAttribute('data-magnet')) {
        const pull = parseFloat(el.dataset.magnet || '') || 0.3
        el.style.setProperty('--mx', `${(nx * r.width * 0.5 * pull).toFixed(1)}px`)
        el.style.setProperty('--my', `${(ny * r.height * 0.5 * pull).toFixed(1)}px`)
      } else {
        el.style.setProperty('--mx', nx.toFixed(3))
        el.style.setProperty('--my', ny.toFixed(3))
      }
    }
    if (fine) {
      root.addEventListener('pointermove', onMove)
      root.addEventListener('pointerleave', release)
    }

    return () => {
      io.disconnect()
      ro.disconnect()
      cancelAnimationFrame(raf)
      cancelAnimationFrame(pending)
      window.removeEventListener('resize', remeasure)
      window.removeEventListener('load', remeasure)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', release)
    }
  }, [])
  return null
}
