'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone } from 'lucide-react'
import Film from './Film'
import { FILMS } from '@/lib/media'

const HIDE = ['/contact', '/get-started', '/privacy-policy', '/terms']

/**
 * The closing tile above the footer on every page except forms and legal pages: the evening
 * shore in a rounded window, with the invitation to a first meeting.
 */
export default function ClosingFilm() {
  const pathname = usePathname() ?? ''
  if (HIDE.some((p) => pathname.startsWith(p))) return null
  return (
    <section aria-labelledby="closing-h" className="closing">
      <div className="closing-tile on-dark" data-tone="dark">
        <div className="film">
          <Film film={FILMS.closing} />
          <div aria-hidden="true" className="closing-shade" />
        </div>
        <div className="closing-copy">
          <p className="chip">Your first meeting</p>
          <h2 id="closing-h" className="display-xl mx-auto mt-6 max-w-[13em]">45 minutes. No products. Just where you stand<span className="dot">.</span></h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-light">Book a free consultation</Link>
            <a href="tel:8572053333" className="btn btn-ghost"><Phone size={16} aria-hidden="true" /> 857-205-3333</a>
          </div>
        </div>
      </div>
    </section>
  )
}
