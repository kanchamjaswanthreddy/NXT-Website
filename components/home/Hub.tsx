'use client'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { Car, HeartHandshake, ShieldCheck, Stethoscope, Sunrise, Users, Wallet, type LucideIcon } from 'lucide-react'

export interface HubTile { slug: string; title: string; short: string; carriers: number }

const ICONS: Record<string, LucideIcon> = {
  annuities: Sunrise, 'life-insurance': Users, 'care-planning': HeartHandshake, 'medicare-planning': Stethoscope, 'disability-income': Wallet, 'home-auto': Car,
}
const v = (vars: Record<string, string | number>) => vars as CSSProperties
const LIVE = '(prefers-reduced-motion: no-preference) and (min-height: 560px)'

/**
 * One advisor, every option: the six kinds of cover arrive around a shield one at a time (the words
 * beside it say what each one is for), gather
 * into it, and leave a single comparison behind: one carrier with a captive agent, seventy with us.
 *
 * With motion allowed the section holds still while it is scrolled through and the scroll picks
 * the moment (`data-step` 0 to 4; the stylesheet does every move). Otherwise it is simply the
 * finished diagram with the comparison under it.
 */
export default function Hub({ tiles, total }: { tiles: HubTile[]; total: string }) {
  const root = useRef<HTMLElement>(null)
  const [live, setLive] = useState(false)
  const [step, setStep] = useState(0)
  const [shown, setShown] = useState(0)
  const [count, setCount] = useState(0)
  const goal = parseInt(total, 10) || 0

  useEffect(() => {
    const mq = window.matchMedia(LIVE)
    const apply = () => setLive(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el || !live) return
    let raf = 0
    const read = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const span = r.height - window.innerHeight
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
      // 0 to .46: the tiles arrive; .5: they gather; .6: one carrier; .72: struck out, seventy counts up
      setShown(Math.min(tiles.length, Math.max(0, Math.ceil((p - 0.04) / 0.07))))
      setStep(p < 0.5 ? (r.top < window.innerHeight * 0.6 ? 1 : 0) : p < 0.6 ? 2 : p < 0.72 ? 3 : 4)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [live, tiles.length])

  // The count runs up once the old figure has been struck out, and resets if the page goes back.
  useEffect(() => {
    if (!live) return
    if (step < 4) { setCount(0); return }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const u = Math.min(1, (now - t0) / 1300)
      setCount(Math.round(goal * (1 - Math.pow(1 - u, 3))))
      if (u < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [step, live, goal])

  const suffix = total.replace(/^\d+/, '')
  const now = live && step === 1 && shown > 0 ? shown - 1 : -1
  const cur = now >= 0 ? tiles[now] : null
  return (
    <section ref={root} className="hub" data-live={live || undefined} data-step={live ? step : undefined} aria-labelledby="hub-h">
      <div className="hub-stage">
        <div className="hub-copy">
          <p className="chip">One advisor</p>
          <h2 id="hub-h" className="hub-title">Every kind of cover, with one advisor in the middle<span className="dot">.</span></h2>
          <p className="hub-lead">Six areas of cover, each with its own carriers. One person compares them for you.</p>
          <div className="hub-now" aria-hidden="true">
            <div className="hub-ticks">{tiles.map((t, k) => <i key={t.slug} data-on={k < shown || undefined} />)}</div>
            {cur ? (
              <div key={cur.slug} className="hub-now-card">
                <b>{cur.title}</b>
                <span>{cur.short}</span>
                <small>{cur.carriers} carriers compared</small>
              </div>
            ) : null}
          </div>
        </div>

        <div className="hub-web" style={v({ '--n': tiles.length })}>
          <span className="hub-glow" aria-hidden="true" />
          <span className="hub-ring" aria-hidden="true" />
          <span className="hub-ring" aria-hidden="true" />
          <span className="hub-core" aria-hidden="true"><ShieldCheck strokeWidth={1.6} /></span>
          <ul>
            {tiles.map((t, k) => {
              const Icon = ICONS[t.slug] ?? ShieldCheck
              return (
                <li key={t.slug} style={v({ '--i': k })} data-on={!live || k < shown || undefined} data-now={k === now || undefined}>
                  <i aria-hidden="true" />
                  <Link href={`/solutions/${t.slug}`} className="hub-tile">
                    <span className="hub-ic" aria-hidden="true"><Icon strokeWidth={1.75} /></span>
                    <b>{t.title}</b>
                    <small>{t.carriers} carriers</small>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="hub-sum">
          <span className="hub-badge" aria-hidden="true"><ShieldCheck strokeWidth={1.6} /></span>
          <p className="hub-h">Compare them all with one advisor<span className="dot">.</span></p>
          <p className="hub-old"><span><b>1</b> carrier</span> with a captive agent</p>
          <p className="hub-new"><b>{live ? count : goal}{suffix}</b><span>carriers</span></p>
          <p className="hub-note"><span className="hub-save">No cost to you</span>A-rated carriers only, licensed in 50 states</p>
        </div>
      </div>
    </section>
  )
}
