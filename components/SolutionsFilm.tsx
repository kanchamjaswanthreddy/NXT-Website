'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type FocusEvent, type MouseEvent } from 'react'
import { motion, useMotionValueEvent, useScroll, type MotionValue } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { solutions } from '@/lib/solutions'
import { CHAPTER_MEDIA, small } from '@/lib/media'
import { createDepthRenderer, type DepthRenderer } from '@/lib/depth-gl'
import { PIN_WIDE, useMedia } from '@/lib/use-media'
import { useRamp } from '@/lib/ramp'
import { scrollToY } from './SmoothScroll'

/** The five disciplines the heading counts. Home & Auto is linked underneath. */
const CHAPTERS = solutions.filter((s) => s.slug in CHAPTER_MEDIA)
const N = CHAPTERS.length
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const ease = (lo: number, hi: number, v: number) => { const t = clamp((v - lo) / (hi - lo), 0, 1); return t * t * (3 - 2 * t) }

function Bar({ progress, i }: { progress: MotionValue<number>; i: number }) {
  const scaleX = useRamp(progress, [i / N, (i + 1) / N], [0, 1])
  return <i><motion.b style={{ scaleX }} /></i>
}

/**
 * The five disciplines as one continuous scene.
 *
 * On a wide screen the section holds in place while you scroll: the list stays on the left, the
 * active discipline opens, and on the right one photograph dissolves into the next. Each
 * photograph has real depth (see lib/depth-gl.ts), so it moves like a slow camera as you scroll
 * and follows the pointer slightly.
 *
 * On phones, with reduced motion, or without JavaScript, the same content is a row of cards.
 */
export default function SolutionsFilm() {
  const track = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const latest = useRef(0)
  const shown = useRef(false)
  const pin = useMedia(PIN_WIDE)
  const [active, setActive] = useState(0)
  const [gl, setGl] = useState(false)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    latest.current = v
    if (!pin) return
    const i = clamp(Math.floor(v * N + 0.14), 0, N - 1)
    setActive((p) => (p === i ? p : i))
  })

  // Depth and dissolve on the canvas; the stacked images underneath are the fallback.
  useEffect(() => {
    const c = canvas.current
    const win = windowRef.current
    if (!pin || !c || !win) return
    let r: DepthRenderer | null = null
    let raf = 0
    let visible = false
    let px = 0, py = 0, tx = 0, ty = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!r || !visible) return
      px += (tx - px) * 0.05
      py += (ty - py) * 0.05
      const x = clamp(latest.current * N, 0, N - 0.0001)
      const a = Math.floor(x)
      const f = x - a
      const b = Math.min(N - 1, a + 1)
      const mix = b === a ? 0 : ease(0.72, 1, f)
      const ok = r.ready(a) && (mix === 0 || r.ready(b))
      if (ok !== shown.current) { shown.current = ok; setGl(ok) }
      if (ok) r.draw({ a, b, mix, x: px, y: py * 0.6 + (f - 0.5) * 1.6, zoom: 1.05 + 0.04 * f })
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !r) {
        // Use the file the browser already chose for each plain image, so nothing downloads twice.
        const plain = win.querySelectorAll<HTMLImageElement>('.seq-shot img')
        r = createDepthRenderer(c, CHAPTERS.map((s, i) => ({ src: plain[i]?.currentSrc || CHAPTER_MEDIA[s.slug].src, depth: CHAPTER_MEDIA[s.slug].depth })))
        r?.resize()
      }
    }, { rootMargin: '700px 0px' })
    io.observe(win)
    const ro = new ResizeObserver(() => r?.resize())
    ro.observe(win)
    const onMove = (e: PointerEvent) => {
      const box = win.getBoundingClientRect()
      tx = clamp(((e.clientX - box.left) / box.width - 0.5) * 2, -1.4, 1.4)
      ty = clamp(((e.clientY - box.top) / box.height - 0.5) * 2, -1.4, 1.4)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      r?.dispose()
      shown.current = false
      setGl(false)
    }
  }, [pin])

  const go = (i: number) => {
    const el = track.current
    if (!el) return
    const span = el.offsetHeight - window.innerHeight
    scrollToY(el.getBoundingClientRect().top + window.scrollY + span * ((i + 0.3) / N))
  }
  const onTitleClick = (e: MouseEvent, i: number) => { if (pin && i !== active) { e.preventDefault(); go(i) } }
  const onTitleFocus = (e: FocusEvent<HTMLAnchorElement>, i: number) => { if (pin && i !== active && e.currentTarget.matches(':focus-visible')) go(i) }

  return (
    <section aria-labelledby="solutions-h" className="seq on-dark">
      <div className="container pb-10 pt-[clamp(5rem,11vw,10rem)] md:pb-14">
        <h2 id="solutions-h" className="display-xl max-w-[13em]">Everything we do fits on one hand.</h2>
        <Link href="/solutions" className="link mt-6">All five, in detail <ChevronRight size={17} /></Link>
      </div>

      <div ref={track} className="seq-track" style={{ ['--n' as string]: N }}>
        <div className="seq-stage">
          <div className="seq-left">
            <ol className="seq-list">
              {CHAPTERS.map((s, i) => {
                const on = !pin || active === i
                return (
                  <li key={s.slug} className="seq-item" data-on={pin ? active === i : true}>
                    <div className="seq-card-img">
                      <Image src={small(CHAPTER_MEDIA[s.slug].src)} alt={CHAPTER_MEDIA[s.slug].alt} fill sizes="(min-width: 1100px) 33vw, (min-width: 768px) 50vw, 82vw" className="object-cover" />
                    </div>
                    <div className="seq-text">
                      <h3><Link href={`/solutions/${s.slug}`} className="seq-title" onClick={(e) => onTitleClick(e, i)} onFocus={(e) => onTitleFocus(e, i)}>{s.title}</Link></h3>
                      <div className="seq-body" inert={!on}>
                        <div>
                          <div className="seq-body-pad">
                            <p className="mt-2 text-[1.1875rem] leading-snug md:text-[1.1875rem]">{s.short}</p>
                            <p className="mt-3 text-[1.0625rem] leading-relaxed !text-silver">{s.sub.map((p) => p.name).join(', ')}.</p>
                            <Link href={`/solutions/${s.slug}`} className="link mt-4 text-[1.0625rem]">Explore {s.title.toLowerCase() === 'medicare planning' ? 'Medicare planning' : s.title.toLowerCase()} <ChevronRight size={16} /></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
            <div className="seq-bars" aria-hidden="true">{CHAPTERS.map((s, i) => <Bar key={s.slug} progress={scrollYProgress} i={i} />)}</div>
            <p className="seq-also">Also from NXT: <Link href="/solutions/home-auto" className="link">Home &amp; Auto insurance <ChevronRight size={16} /></Link></p>
          </div>

          <div ref={windowRef} className="seq-window" aria-hidden="true">
            {CHAPTERS.map((s, i) => (
              <div key={s.slug} className="seq-shot" data-on={active === i}>
                <Image src={CHAPTER_MEDIA[s.slug].src} alt="" fill sizes="(min-width: 1024px) 58vw, 1px" className="object-cover" />
              </div>
            ))}
            <canvas ref={canvas} data-on={gl} />
          </div>
        </div>
      </div>
    </section>
  )
}
