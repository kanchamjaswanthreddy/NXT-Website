import type { CSSProperties, ReactNode } from 'react'
import ScrollVars from './pv/Motion'
import { carrierGroups } from '@/lib/carriers'

interface Props {
  /** Short label above the title, usually the section name. */
  eyebrow?: string
  title: string
  intro?: string
  /** A photograph from /public/media; it fills the whole opener. */
  image?: string
  imageAlt?: string
  /** Kept for callers that still pass them; no longer used. */
  imageDepth?: string
  visual?: ReactNode
  children?: ReactNode
  numeral?: string
  time?: number
}

const SLUG: Record<string, string> = { Annuities: 'annuities', 'Life Insurance': 'life-insurance', 'Care Planning': 'care-planning', 'Medicare Planning': 'medicare-planning', 'Disability Income': 'disability-income', 'Home & Auto': 'home-auto' }
const i = (n: number) => ({ '--i': n }) as CSSProperties
/** Pages that pass no photograph get one that suits them, so no two openers look alike. */
const FALLBACK: Record<string, string> = {
  'Carrier partners': '/media/atrium.jpg', Solutions: '/media/scenes/family.jpg', 'For advisors': '/media/team-meeting.jpg', 'Become an NXT Agent': '/media/team.jpg',
  Contact: '/media/family-advisor.jpg', 'Planning tools': '/media/desk.jpg', Referrals: '/media/family.jpg', Insights: '/media/knot.jpg',
}

/**
 * Inner page opener, built like the home page's: the page's own photograph fills the frame and
 * drifts, the title arrives a word at a time, the page's name slides past in huge outline letters,
 * rings turn and a sweep passes over the picture, and it all lets go as it is scrolled away.
 */
export default function PageHero({ eyebrow, title, intro, image, imageAlt = '', children }: Props) {
  const src = image ?? (eyebrow ? FALLBACK[eyebrow] : undefined) ?? '/media/family-advisor.jpg'
  const words = title.split(' ')
  // a solution page counts its own carriers; every other page shows the whole panel
  const own = eyebrow && SLUG[eyebrow] ? carrierGroups.find((g) => g.solution === SLUG[eyebrow])?.carriers.length : undefined
  const band = Array.from({ length: 6 }, () => eyebrow ?? 'NXT Financial Group')
  return (
    <section className="ph on-dark" data-tone="dark" data-prog="exit">
      <div className="ph-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={imageAlt} fetchPriority="high" />
      </div>
      <div className="ph-shade" />
      <p className="ph-word" aria-hidden="true"><span>{band.map((w, k) => <span key={k}>{w}<i>.</i></span>)}</span></p>
      <div className="ph-in">
        {eyebrow && <p className="chip rise" style={i(0)}>{eyebrow}</p>}
        <h1 className="ph-title" aria-label={title}>
          {words.map((w, k) => <span key={k} aria-hidden="true" style={i(k)}>{w}{k < words.length - 1 ? ' ' : ''}</span>)}
        </h1>
        {intro && <p className="ph-intro rise" style={i(words.length * 0.6 + 2)}>{intro}</p>}
        {children && <div className="ph-cta rise" style={i(words.length * 0.6 + 4)}>{children}</div>}
      </div>
      <ul className="ph-facts rise" style={i(words.length * 0.6 + 6)}>
        <li><b>{own ?? '70+'}</b>{own ? `${eyebrow?.toLowerCase().replace(' planning', '').replace(' insurance', '')} carriers compared` : 'carriers compared'}</li>
        <li><b>50</b>states licensed</li>
        <li><b>$0</b>cost to you</li>
      </ul>
      <ScrollVars />
    </section>
  )
}
