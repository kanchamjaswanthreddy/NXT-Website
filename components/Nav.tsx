'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const LINKS = [
  { href: '/solutions', label: 'Solutions' },
  { href: '/carriers', label: 'Carriers' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Planning tools' },
  { href: '/insights', label: 'Insights' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const f = () => setScrolled(window.scrollY > 12); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'border-b border-platinum bg-white/92 backdrop-blur-md' : 'bg-transparent'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <div className="container">
        <nav aria-label="Main" className="flex h-[84px] items-center justify-between gap-6">
          <Link href="/" onClick={() => setOpen(false)} aria-label="NXT Financial Group home" className="shrink-0">
            <Image src="/logo.png" alt="NXT Financial Group" width={170} height={75} priority className="h-10 w-auto md:h-11" />
          </Link>
          <ul className="hidden items-center gap-8 lg:flex">
            {LINKS.map(({ href, label }) => {
              const active = pathname === href || pathname?.startsWith(href + '/')
              return <li key={href}><Link href={href} className={`relative py-2 text-[15px] font-medium text-ink transition-colors hover:text-navy after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-gold after:transition-transform ${active ? 'text-navy after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}>{label}</Link></li>
            })}
          </ul>
          <div className="hidden items-center gap-5 lg:flex">
            <a href="tel:8572053333" className="mono flex items-center gap-2 text-sm text-ink hover:text-navy"><Phone size={15} className="text-gold" /> 857-205-3333</a>
            <Link href="/contact" className="btn btn-primary btn-sm">Book a consultation</Link>
          </div>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} className="flex h-11 w-11 items-center justify-center rounded-full text-navy lg:hidden">{open ? <X size={24} /> : <Menu size={24} />}</button>
        </nav>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-x-0 bottom-0 top-[84px] z-40 overflow-y-auto bg-white lg:hidden">
            <div className="container flex flex-col py-6">
              {[{ href: '/', label: 'Home' }, ...LINKS, { href: '/partner', label: 'For advisors' }, { href: '/referral', label: 'Refer a friend' }].map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className="hairline py-4 font-display text-3xl font-semibold text-navy">{label}</Link>
              ))}
              <div className="mt-6 flex flex-col gap-3"><Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary">Book a consultation</Link><a href="tel:8572053333" className="btn btn-outline"><Phone size={16} /> 857-205-3333</a></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
