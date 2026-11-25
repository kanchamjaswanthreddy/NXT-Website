'use client'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Pause, Play, type LucideIcon, HeartHandshake, Stethoscope, Sunrise, Users, Wallet } from 'lucide-react'
import { createDepthRenderer, type DepthRenderer } from '@/lib/depth-gl'
import { setBackdrop } from '@/components/Frame'

export interface Scene {
  key: string
  /** The word that ends "Protect your ...". */
  word: string
  title: string
  href: string
  /** A few words pinned to the picture. */
  note: string
  carriers: number
  /** Where the note sits, as a percentage of the picture: [left, top] on wide screens, then on tall ones. */
  at: [number, number]
  atTall: [number, number]
}

const ICONS: Record<string, LucideIcon> = { family: Users, retirement: Sunrise, care: HeartHandshake, health: Stethoscope, paycheck: Wallet }
const TALL = '(max-aspect-ratio: 4/5)'
const pic = (key: string, tall: boolean, depth = false) => `/media/scenes/${key}${tall ? '-tall' : ''}${depth ? '-depth' : ''}.jpg`
const v = (vars: Record<string, string | number>) => vars as CSSProperties

/**
 * The opening: one sentence whose last word changes, and with it the picture behind, the note
 * pinned to the picture and the card that is open.
 *
 * The pictures are plain images first. Where WebGL and motion are allowed, a canvas takes over:
 * each picture has a depth map, so it drifts like a slow camera, leans a little towards the
 * pointer, and dissolves into the next one nearest things first. The first scene is also a film
 * (the evening shore), which fades in over its own still once it can play.
 *
 * Scenes move on by themselves while the opening is on screen. The thin line on the open card is
 * a CSS animation and the scene changes when it ends, so hovering or focusing the cards, the
 * pause button and reduced motion all stop it the same way.
 */
export default function Hero({ scenes }: { scenes: Scene[] }) {
  const [i, setI] = useState(0)
  const [held, setHeld] = useState(false)
  const [seen, setSeen] = useState(true)
  const [gl, setGl] = useState(false)
  const [filmOn, setFilmOn] = useState(false)
  const root = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const target = useRef(0)

  const go = useCallback((k: number) => setI((k + scenes.length) % scenes.length), [scenes.length])

  // The backdrop outside the frame follows the scene.
  useEffect(() => { setBackdrop(`/media/scenes/${scenes[i].key}-blur.jpg`) }, [i, scenes])
  useEffect(() => () => setBackdrop(), [])

  // Only run while the opening is on screen.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // The canvas: depth, drift and dissolves.
  useEffect(() => {
    const el = root.current
    const c = canvas.current
    if (!el || !c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tall = window.matchMedia(TALL).matches
    const r: DepthRenderer | null = createDepthRenderer(c, scenes.map((s) => ({ src: pic(s.key, tall), depth: pic(s.key, tall, true) })), (k) => { if (k === 0) setGl(true) })
    if (!r) return
    r.resize()
    let raf = 0
    let a = 0, b = 0, mix = 0
    let px = 0, py = 0, tx = 0, ty = 0
    let visible = true
    const t0 = performance.now()
    let last = t0
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min(64, now - last)
      last = now
      if (!visible) return
      const want = target.current
      if (want !== b && mix === 0 && r.ready(want)) { a = b; b = want; mix = 0.0001 }
      if (mix > 0) { mix = Math.min(1, mix + dt / 1500); if (mix >= 1) { a = b; mix = 0 } }
      px += (tx - px) * 0.04
      py += (ty - py) * 0.04
      const t = (now - t0) / 1000
      r.draw({ a, b, mix, x: Math.sin(t * 0.21) * 0.9 + px * 0.9, y: Math.cos(t * 0.17) * 0.45 + py * 0.5, zoom: 1.06 + 0.02 * Math.sin(t * 0.11) })
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)
    const ro = new ResizeObserver(() => r.resize())
    ro.observe(c)
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); window.removeEventListener('pointermove', onMove); r.dispose(); setGl(false) }
  }, [scenes])
  useEffect(() => { target.current = i }, [i])

  // The film for the first scene: fetched once, played only while that scene is up.
  useEffect(() => {
    const el = video.current
    if (!el) return
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || saveData) return
    el.muted = true
    el.defaultMuted = true
    if (i === 0 && seen && !held) {
      if (!el.getAttribute('src')) { el.src = window.matchMedia(TALL).matches ? '/videos/dusk-open-tall.mp4' : '/videos/dusk-open-wide.mp4'; el.load() }
      el.play().catch(() => {})
    } else el.pause()
  }, [i, seen, held])
  useEffect(() => {
    const el = video.current
    if (!el) return
    const on = () => setFilmOn(true)
    el.addEventListener('playing', on)
    return () => el.removeEventListener('playing', on)
  }, [])

  const s = scenes[i]
  return (
    <section ref={root} className="hero" data-tone="dark" data-prog="exit" data-run={seen && !held ? '' : undefined} aria-labelledby="hero-h">
      <div className="hero-media" aria-hidden="true">
        {scenes.map((sc, k) => (
          <picture key={sc.key} data-on={k === i || undefined}>
            <source media={TALL} srcSet={pic(sc.key, true)} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pic(sc.key, false)} alt="" width={1920} height={1080} decoding="async" fetchPriority={k === 0 ? 'high' : 'low'} loading={k === 0 ? 'eager' : 'lazy'} />
          </picture>
        ))}
        <canvas ref={canvas} data-on={gl || undefined} />
        <video ref={video} muted loop playsInline preload="none" tabIndex={-1} data-on={(filmOn && i === 0) || undefined} />
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-copy">
        <h1 id="hero-h" className="hero-h">
          <span className="sr-only">Protect your {scenes.map((x) => x.word).join(', ')}.</span>
          <span aria-hidden="true">
            <span className="hero-line">Protect your</span>
            <span className="hero-line hero-word"><span key={s.key}>{s.word}<i className="dot">.</i></span></span>
          </span>
        </h1>
        <p className="hero-sub">One advisor, one plan, every option. A-rated carriers compared for you by an independent agency.</p>
      </div>

      {/* a few words pinned to the picture */}
      <p key={s.key} className="hero-note" style={v({ '--x': `${s.at[0]}%`, '--y': `${s.at[1]}%`, '--xt': `${s.atTall[0]}%`, '--yt': `${s.atTall[1]}%` })} aria-hidden="true">
        <i /><b>{s.title}</b><span>{s.note}</span>
      </p>

      <div className="hero-foot">
        <div className="hero-stat">
          <p className="hero-stat-n">70+</p>
          <p className="hero-stat-t">carrier partners,<br />licensed in 50 states</p>
          <Link href="#voices-h" className="hero-faces" aria-label="Read what clients say">
            {['bimlesh-yadav', 'carmelo-aguilar', 'andy-martinez'].map((n) => <span key={n}><Image src={`/media/avatars/${n}.jpg`} alt="" fill sizes="40px" /></span>)}
          </Link>
        </div>

        <div className="hero-cards">
          <button type="button" className="hero-hold" aria-pressed={held} aria-label={held ? 'Let the scenes change by themselves' : 'Stop the scenes from changing'} onClick={() => setHeld(!held)}>
            {held ? <Play size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" /> : <Pause size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" />}
          </button>
          <ul>
            {scenes.map((sc, k) => {
              const Icon = ICONS[sc.key] ?? Users
              const on = k === i
              return (
                <li key={sc.key} className="hero-card" data-on={on || undefined}>
                  <button type="button" className="hero-pick" aria-pressed={on} aria-label={`Show ${sc.title}`} onClick={() => go(k)}>
                    <span className="hero-thumb"><Image src={`/media/scenes/${sc.key}-thumb.jpg`} alt="" fill sizes="72px" /></span>
                    <span className="hero-tag">{sc.word}</span>
                  </button>
                  <div className="hero-open" inert={!on}>
                    <p className="hero-open-t"><Icon size={14} aria-hidden="true" />{sc.title}</p>
                    <p className="hero-open-m">{sc.carriers} carriers compared</p>
                    <Link href={sc.href} className="hero-go" aria-label={`${sc.title}: see the plan`}><ArrowRight size={17} aria-hidden="true" /></Link>
                    {on ? <i key={`${i}-${held}`} className="hero-bar" onAnimationEnd={() => go(i + 1)} /> : null}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
