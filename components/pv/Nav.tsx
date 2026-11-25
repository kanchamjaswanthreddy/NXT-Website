'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowUp } from 'lucide-react'
import { scrollToY } from '@/components/SmoothScroll'

const LINKS = [['/solutions', 'Solutions'], ['/carriers', 'Carriers'], ['/about', 'About'], ['/nxt-life', 'NXT Life'], ['/insights', 'Insights']] as const
const LOGIN = 'https://crm.nxtfinancialgroup.com/auth/login'

/**
 * Header for the preview. It takes its colours from whichever section sits under it (sections
 * declare data-tone="dark" or "light"), slides away while scrolling down and returns on the way
 * up. Also carries the back-to-top button, whose ring fills with the page's progress.
 */
export default function PvNav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [hide, setHide] = useState(false)
  const [far, setFar] = useState(false)
  const [tone, setTone] = useState<'dark' | 'light'>('dark')
  const ring = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let last = window.scrollY
    let spans: { top: number; bottom: number; tone: 'dark' | 'light' }[] = []
    const measure = () => {
      const sy = window.scrollY
      spans = Array.from(document.querySelectorAll<HTMLElement>('.pv [data-tone]:not(.pv-nav)')).map((el) => {
        const r = el.getBoundingClientRect()
        return { top: r.top + sy, bottom: r.bottom + sy, tone: el.dataset.tone === 'light' ? 'light' : 'dark' }
      })
      onScroll()
    }
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 24)
      if (Math.abs(y - last) > 6) { setHide(y > last && y > 220); last = y }
      setFar(y > window.innerHeight * 0.9)
      const probe = y + 34
      const under = spans.find((s) => probe >= s.top && probe < s.bottom)
      if (under) setTone(under.tone)
      const max = document.documentElement.scrollHeight - window.innerHeight
      ring.current?.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : '0')
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', measure) }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) window.__lenis?.stop(); else window.__lenis?.start()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; window.__lenis?.start() }
  }, [open])

  return (
    <>
      <a href="#main" className="pv-skip">Skip to content</a>
      <header className="pv-nav" data-tone={open ? 'dark' : tone} data-solid={solid || open || undefined} data-hide={(hide && !open) || undefined}>
        <div className="pv-nav-in">
          <div className="pv-nav-brand">
            <Link href="/" className="pv-logo" aria-label="NXT Financial Group, home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="pv-logo-w" src="/media/logo-white.png" alt="" width={420} height={186} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="pv-logo-c" src="/media/logo.png" alt="" width={420} height={186} />
            </Link>
            <p className="pv-nav-tag">Independent insurance<br />for retirement and protection</p>
          </div>
          <div className="pv-nav-main">
            <nav aria-label="Main" className="pv-nav-links">
              <ul>
                {LINKS.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}
              </ul>
            </nav>
            <div className="pv-nav-cta">
              <a href={LOGIN} target="_blank" rel="noopener noreferrer" className="pv-nav-login pv-mono">Agent login</a>
              <Link href="/get-started" className="pv-btn pv-btn-line pv-btn-sm">Get started</Link>
            </div>
            <button type="button" className="pv-burger" aria-expanded={open} aria-controls="pv-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <div id="pv-menu" className="pv-menu" data-open={open || undefined} inert={!open} data-lenis-prevent>
        <ul>
          {LINKS.map(([href, label], i) => (
            <li key={href} style={{ '--i': i } as CSSProperties}><Link href={href} onClick={() => setOpen(false)}><span className="pv-mono">0{i + 1}</span>{label}</Link></li>
          ))}
        </ul>
        <div className="pv-menu-cta">
          <Link href="/get-started" className="pv-btn" onClick={() => setOpen(false)}>Get started</Link>
          <a href={LOGIN} target="_blank" rel="noopener noreferrer" className="pv-btn pv-btn-line">Agent login</a>
        </div>
      </div>

      <button ref={ring} type="button" className="pv-top" data-on={far || undefined} tabIndex={far ? 0 : -1} aria-label="Back to top" onClick={() => scrollToY(0)}>
        <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="1.5" y="1.5" width="45" height="45" pathLength={1} /></svg>
        <ArrowUp size={18} strokeWidth={2.25} aria-hidden="true" />
      </button>
    </>
  )
}
