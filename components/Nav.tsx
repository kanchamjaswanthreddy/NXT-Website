'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Phone, X } from 'lucide-react'
import { solutions } from '@/lib/solutions'

const LOGIN = 'https://crm.nxtfinancialgroup.com/auth/login'
const PILLS = [['/solutions', 'Solutions'], ['/carriers', 'Carriers'], ['/about', 'About'], ['/insights', 'Insights']] as const

const GROUPS: { title: string; links: [string, string][] }[] = [
  { title: 'Solutions', links: solutions.map((s) => [`/solutions/${s.slug}`, s.title] as [string, string]) },
  { title: 'Company', links: [['/about', 'About NXT'], ['/about#team', 'Meet our team'], ['/carriers', 'Carriers'], ['/nxt-life', 'NXT Life'], ['/insights', 'Insights'], ['/careers', 'Careers'], ['/partner', 'For advisors'], ['/contact', 'Contact an agent']] },
  { title: 'Tools', links: [['/calculators', 'Calculators'], ['/resources', 'Planning tools'], ['/referral', 'Refer a friend'], ['/solutions', 'All solutions']] },
]

/** Sections the header should turn white over: anything marked dark, wide enough to sit under it. */
const DARK = '[data-tone="dark"], main .on-dark, .footer'

/**
 * Site header: glass pills inside the frame, either side of the logo's notch. The pills turn
 * white-on-glass over pictures and dark sections, step out of the way while the page is read
 * downwards and return on the way back up. Everything else lives in the menu sheet.
 */
export default function Nav() {
  const pathname = usePathname() ?? ''
  const [open, setOpen] = useState(false)
  const [tone, setTone] = useState<'light' | 'dark'>('light')
  const [hide, setHide] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const sheet = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])
  useEffect(() => { setOpen(false) }, [pathname])

  // Tone and hiding follow the scroll.
  useEffect(() => {
    let zones: [number, number][] = []
    let last = window.scrollY
    let raf = 0
    const measure = () => {
      const y = window.scrollY
      zones = Array.from(document.querySelectorAll<HTMLElement>(DARK))
        .filter((el) => el.offsetWidth >= window.innerWidth * 0.6)
        .map((el) => { const r = el.getBoundingClientRect(); return [r.top + y, r.bottom + y] as [number, number] })
      apply()
    }
    const apply = () => {
      raf = 0
      const y = window.scrollY
      const probe = y + 48
      setTone(zones.some(([a, b]) => probe >= a && probe < b) ? 'dark' : 'light')
      if (y < 200) setHide(false)
      else if (y > last + 6) setHide(true)
      else if (y < last - 6) setHide(false)
      last = y
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply) }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    const settle = window.setTimeout(measure, 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => { cancelAnimationFrame(raf); window.clearTimeout(settle); ro.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', measure) }
  }, [pathname])

  // While the menu is open: hold the page still, close on Escape, and keep focus in the sheet.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); button.current?.focus() } }
    window.addEventListener('keydown', onKey)
    window.__lenis?.stop()
    const html = document.documentElement
    const was = html.style.overflow
    html.style.overflow = 'hidden'
    sheet.current?.querySelector<HTMLElement>('button, a')?.focus()
    return () => { window.removeEventListener('keydown', onKey); window.__lenis?.start(); html.style.overflow = was }
  }, [open])

  const current = (href: string) => (pathname === href || (href !== '/' && pathname.startsWith(href + '/')) ? 'page' as const : undefined)

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-1/2 focus:top-24 focus:z-[90] focus:-translate-x-1/2 focus:rounded-full focus:bg-midnight focus:px-5 focus:py-3 focus:text-white">Skip to content</a>
      <header className="nav" data-tone={tone} data-hide={hide && !open}>
        <nav className="nav-group" aria-label="Main">
          {PILLS.map(([href, label]) => <Link key={href} href={href} className="nav-pill nav-wide" aria-current={current(href)}>{label}</Link>)}
        </nav>
        <div className="nav-group">
          <a href="https://crm.nxtfinancialgroup.com/auth/login" target="_blank" rel="noopener noreferrer" className="nav-pill nav-login">Agent login</a>
          <Link href="/get-started" className="nav-pill nav-cta nav-mid">Get started</Link>
          <button ref={button} type="button" className="nav-pill nav-icon" aria-label="Menu" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}><Menu size={17} aria-hidden="true" /></button>
        </div>
      </header>

      <div className="menu-scrim" data-open={open} onClick={close} aria-hidden="true" />
      <div ref={sheet} id="site-menu" className="menu" data-open={open} role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
        <div className="menu-head">
          <span>Menu</span>
          <button type="button" className="round-btn !h-10 !w-10" aria-label="Close the menu" onClick={() => { close(); button.current?.focus() }}><X size={17} aria-hidden="true" /></button>
        </div>
        {GROUPS.map((g) => (
          <nav key={g.title} className="menu-group" aria-label={g.title}>
            <p>{g.title}</p>
            <div className="menu-links">
              {g.links.map(([href, label]) => <Link key={href} href={href} onClick={close} aria-current={current(href)}>{label}</Link>)}
            </div>
          </nav>
        ))}
        <div className="menu-foot">
          <Link href="/get-started" onClick={close} className="btn btn-primary">Get started</Link>
          <a href={LOGIN} target="_blank" rel="noopener noreferrer" onClick={close} className="btn btn-outline">Agent login</a>
          <a href="tel:8572053333" className="menu-tel"><Phone size={15} aria-hidden="true" />857-205-3333</a>
        </div>
      </div>
    </>
  )
}
