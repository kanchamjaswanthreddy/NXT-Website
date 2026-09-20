'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'

interface DropdownItem {
  href: string
  label: string
}

interface NavItem {
  key: string
  href: string
  label: string
  children?: DropdownItem[]
}

const NAV_ITEMS: NavItem[] = [
  {
    key: 'solutions',
    href: '/solutions',
    label: 'Solutions',
  },
  {
    key: 'about',
    href: '/about',
    label: 'About',
    children: [
      { href: '/about', label: 'About Us' },
      { href: '/about#why-nxt', label: 'Why NXT' },
      { href: '/about#team', label: 'Meet Our Team' },
      { href: '/contact', label: 'Contact an Agent' },
    ],
  },
  {
    key: 'calculators',
    href: '/calculators',
    label: 'Calculators',
    children: [
      { href: '/calculators#life', label: 'Life Insurance Needs' },
      { href: '/calculators#income', label: 'Retirement Income Gap' },
      { href: '/calculators#annuity', label: 'Annuity Calculator' },
      { href: '/calculators#401k', label: '401(k) Calculator' },
      { href: '/calculators#mortgage', label: 'Mortgage Calculator' },
      { href: '/calculators#care', label: 'Care Cost Calculator' },
      { href: '/calculators#rule72', label: 'Rule of 72' },
      { href: '/calculators#smoking', label: 'Smoking Cost' },
    ],
  },
  {
    key: 'carriers',
    href: '/carriers',
    label: 'Carriers',
  },
  {
    key: 'insights',
    href: '/insights',
    label: 'Insights',
  },
  {
    key: 'careers',
    href: '/careers',
    label: 'Careers',
  },
]

const MOBILE_SECTIONS = [
  {
    heading: null,
    links: [
      { href: '/', label: 'Home' },
      { href: '/solutions', label: 'Solutions' },
    ],
  },
  {
    heading: 'About',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/about#why-nxt', label: 'Why NXT' },
      { href: '/about#team', label: 'Meet Our Team' },
      { href: '/contact', label: 'Contact an Agent' },
    ],
  },
  {
    heading: 'Calculators',
    links: [
      { href: '/calculators#life', label: 'Life Insurance Needs' },
      { href: '/calculators#income', label: 'Retirement Income Gap' },
      { href: '/calculators#annuity', label: 'Annuity Calculator' },
      { href: '/calculators#401k', label: '401(k) Calculator' },
      { href: '/calculators#mortgage', label: 'Mortgage Calculator' },
      { href: '/calculators#care', label: 'Care Cost Calculator' },
      { href: '/calculators#rule72', label: 'Rule of 72' },
      { href: '/calculators#smoking', label: 'Smoking Cost' },
    ],
  },
  {
    heading: null,
    links: [
      { href: '/carriers', label: 'Carriers' },
      { href: '/insights', label: 'Insights' },
      { href: '/careers', label: 'Careers' },
    ],
  },
]

const dropdownVariants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
}

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(() => {
    setActiveDropdown(null)
  }, [pathname])

  const handleMouseEnter = useCallback((key: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActiveDropdown(key)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }, [])

  const handleDropdownLinkClick = useCallback(() => {
    setActiveDropdown(null)
  }, [])

  const isActive = (item: NavItem): boolean => {
    const basePath = item.href.split('#')[0]
    if (pathname === basePath) return true
    if (pathname?.startsWith(basePath + '/')) return true
    if (item.children) {
      return item.children.some((child) => {
        const childBase = child.href.split('#')[0]
        return pathname === childBase || pathname?.startsWith(childBase + '/')
      })
    }
    return false
  }

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-platinum bg-white/92 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="container">
        <nav
          aria-label="Main"
          className="flex h-[84px] items-center justify-between gap-6"
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="NXT Financial Group home"
            className="shrink-0"
          >
            <Image
              src="/logo.png"
              alt="NXT Financial Group"
              width={200}
              height={88}
              priority
              className="h-12 w-auto md:h-14"
            />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item)
              const hasDropdown = Boolean(item.children)

              return (
                <li
                  key={item.key}
                  className="relative"
                  onMouseEnter={
                    hasDropdown ? () => handleMouseEnter(item.key) : undefined
                  }
                  onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
                >
                  {hasDropdown ? (
                    <button
                      type="button"
                      className={`relative flex items-center gap-1 py-2 text-[15px] font-medium text-ink transition-colors hover:text-navy after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-gold after:transition-transform ${
                        active
                          ? 'text-navy after:scale-x-100'
                          : 'after:scale-x-0 hover:after:scale-x-100'
                      }`}
                      aria-expanded={activeDropdown === item.key}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.key ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`relative py-2 text-[15px] font-medium text-ink transition-colors hover:text-navy after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-gold after:transition-transform ${
                        active
                          ? 'text-navy after:scale-x-100'
                          : 'after:scale-x-0 hover:after:scale-x-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}

                  <AnimatePresence>
                    {hasDropdown && activeDropdown === item.key && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-xl border border-platinum bg-white px-2 py-2 shadow-lg shadow-black/8"
                        style={{ minWidth: '220px' }}
                      >
                        {item.children!.map((child) => {
                          const childBase = child.href.split('#')[0]
                          const childActive =
                            pathname === childBase ||
                            pathname?.startsWith(childBase + '/')
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={handleDropdownLinkClick}
                              className={`block rounded-lg px-4 py-2.5 text-[14px] font-medium transition-colors ${
                                childActive
                                  ? 'bg-navy/5 text-navy'
                                  : 'text-ink hover:bg-platinum/50 hover:text-navy'
                              }`}
                            >
                              {child.label}
                            </Link>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href="tel:8572053333"
              className="mono flex items-center gap-2 text-sm text-ink hover:text-navy"
            >
              <Phone size={15} className="text-gold" /> 857-205-3333
            </a>
            <a
              href="https://nxt-crm-beta.vercel.app/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              Agent Login
            </a>
            <Link href="/contact" className="btn btn-primary btn-sm">
              Book a consultation
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative z-[60] flex h-12 w-12 items-center justify-center rounded-full text-navy active:bg-platinum/60 lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

    </header>

    {open && (
      <div
        id="mobile-nav"
        className="fixed inset-x-0 bottom-0 top-[84px] z-[999] overflow-y-auto bg-white lg:hidden"
      >
        <div className="container flex flex-col py-6">
          {MOBILE_SECTIONS.map((section, sectionIdx) => (
            <div key={sectionIdx} className="flex flex-col">
              {section.heading && (
                <p className="mb-1 mt-6 text-xs font-semibold uppercase tracking-widest text-ink/40">
                  {section.heading}
                </p>
              )}
              {section.links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block border-t border-platinum py-4 font-display text-2xl font-semibold text-navy"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary"
            >
              Book a consultation
            </Link>
            <a
              href="https://nxt-crm-beta.vercel.app/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-outline"
            >
              Agent Login
            </a>
            <a href="tel:8572053333" className="btn btn-outline">
              <Phone size={16} /> 857-205-3333
            </a>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
