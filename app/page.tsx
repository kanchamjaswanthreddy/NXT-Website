import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CalendarCheck, Car, Check, ChevronRight, HeartHandshake, Minus, Sunrise, Users, Wallet, type LucideIcon } from 'lucide-react'
import './home.css'
import Hero, { type Scene } from '@/components/home/Hero'
import Hub from '@/components/home/Hub'
import CarrierDots from '@/components/CarrierDots'
import Faq from '@/components/Faq'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import ScrollVars from '@/components/pv/Motion'
import { Reveal, Stagger, Item, Counter } from '@/components/motion'
import { posts } from '@/lib/insights'
import { small } from '@/lib/media'
import { solutions } from '@/lib/solutions'
import { allCarriers, carrierGroups, whiteLogos } from '@/lib/carriers'

export const metadata: Metadata = {
  title: 'NXT Financial Group | IMO — Independent Marketing Organization',
  description: 'NXT Financial Group is a leading IMO (Independent Marketing Organization) comparing 70+ top-rated insurance carriers. Annuities, life insurance, Medicare, disability, care planning and home & auto — all 50 states.',
  openGraph: { title: 'NXT Financial Group | IMO — Independent Marketing Organization', description: 'Compare 70+ carriers across 6 insurance disciplines. One advisor, one plan, every option.', images: ['/og-image.png'] },
  alternates: { canonical: 'https://www.nxtfinancialgroup.com' },
}

const homeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does it cost anything to work with NXT?', acceptedAnswer: { '@type': 'Answer', text: 'No. We are compensated by the carrier that issues your policy or contract. You never pay us a fee, and our compensation does not change the rate you receive.' } },
    { '@type': 'Question', name: 'Are you tied to one insurance company?', acceptedAnswer: { '@type': 'Answer', text: 'No. We are independent and hold appointments with many carriers rated A- or better by AM Best. We carry no quota with any of them, so the recommendation is the one that fits.' } },
    { '@type': 'Question', name: 'I am turning 65. When should I call?', acceptedAnswer: { '@type': 'Answer', text: 'Ideally three to six months before your birthday. Your initial enrollment window opens three months before the month you turn 65 and closes three months after.' } },
    { '@type': 'Question', name: 'Can you review policies I already own?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A policy review is often the most useful first meeting: we look at what you have, what it costs and whether it still does the job.' } },
    { '@type': 'Question', name: 'Where are you licensed?', acceptedAnswer: { '@type': 'Answer', text: 'Our headquarters is in Malden, Massachusetts, and we are licensed to serve clients in all 50 states.' } },
  ],
}

const v = (vars: Record<string, string | number>) => vars as CSSProperties
const sol = (slug: string) => solutions.find((s) => s.slug === slug)!
const carriersFor = (slug: string) => carrierGroups.find((g) => g.solution === slug)?.carriers.length ?? 0
/** "Guaranteed income you cannot outlive." becomes "guaranteed income you cannot outlive". */
const asNote = (s: string) => s.charAt(0).toLowerCase() + s.slice(1).replace(/\.$/, '')

/** The opening's scenes: the word, the solution it stands for, and where its note sits on the picture. */
const SCENES: Scene[] = ([
  ['family', 'family', 'life-insurance', [61, 60], [56, 55]],
  ['retirement', 'retirement', 'annuities', [36, 55], [30, 60]],
  ['care', 'independence', 'care-planning', [50, 57], [44, 57]],
  ['health', 'health', 'medicare-planning', [52, 60], [18, 60]],
  ['paycheck', 'paycheck', 'disability-income', [24, 60], [22, 62]],
] as [string, string, string, [number, number], [number, number]][]).map(([key, word, slug, at, atTall]) => ({
  key, word, title: sol(slug).title, href: `/solutions/${slug}`, note: asNote(sol(slug).short), carriers: carriersFor(slug), at, atTall,
}))

const SITUATIONS: { title: string; slug: string; icon: LucideIcon }[] = [
  { title: 'Retiring within ten years', slug: 'annuities', icon: Sunrise },
  { title: 'Protecting a family', slug: 'life-insurance', icon: Users },
  { title: 'Turning 65', slug: 'medicare-planning', icon: CalendarCheck },
  { title: 'Thinking about future care', slug: 'care-planning', icon: HeartHandshake },
  { title: 'Living on one paycheck', slug: 'disability-income', icon: Wallet },
  { title: 'Insuring a home or a car', slug: 'home-auto', icon: Car },
]

const STEPS = [
  ['Listen', 'We map your income gap, your health, your family and your timeline before any product comes up.'],
  ['Compare', 'Rates, caps and rider costs from the carriers that fit, side by side.'],
  ['Place', 'You choose. We handle the application, underwriting, transfer and delivery.'],
  ['Review', 'The person who met you first goes through the plan with you every year.'],
]

const STATS = [[50, '', 'States licensed'], [5, '', 'Disciplines, practiced daily'], [1, ' day', 'To hear back from us']] as const
const PLAN = ['Guaranteed income sized to your essentials', 'A funded long-term care plan', 'Medicare that keeps your doctors', 'Life insurance sized honestly, not by rule of thumb']
const CAPTIVE = ['Recommends from one company’s products', 'Works toward a sales quota', 'Starts the conversation with the product']
const INDEPENDENT = ['Recommends from every carrier on the list', 'Carries no quota with any of them', 'Starts with your income gap, your health, your family, your timeline']

/** Two rows of carrier marks: every carrier with a logo that reads on a white tile. */
const LOGOS = allCarriers.filter((c) => c.logo && !whiteLogos.has(c.slug))
const ROWS = [LOGOS.filter((_, k) => k % 2 === 0), LOGOS.filter((_, k) => k % 2 === 1)]

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }} />

      <Hero scenes={SCENES} />

      {/* ONE ADVISOR, EVERY OPTION */}
      <Hub tiles={solutions.map((s) => ({ slug: s.slug, title: s.title, short: s.short, carriers: carriersFor(s.slug) }))} total="70+" />

      {/* WHERE ARE YOU RIGHT NOW */}
      <section className="section fx" aria-labelledby="sit-h">
        <div className="container">
          <Reveal className="sec-head">
            <p className="chip">Start here</p>
            <h2 id="sit-h" className="display">Where are you right now<span className="dot">?</span></h2>
            <p className="lead text-ink-soft">Pick the one closest to you. Each opens the plan that usually comes first.</p>
          </Reveal>
          <Stagger as="ul" className="sit-grid">
            {SITUATIONS.map((s) => {
              const Icon = s.icon
              return (
                <Item as="li" key={s.slug}>
                  <Link href={`/solutions/${s.slug}`} className="sit">
                    <span className="sit-ic"><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span>
                    <span className="sit-t">{s.title}</span>
                    <span className="sit-s"><b>{sol(s.slug).title}</b>{sol(s.slug).short}</span>
                    <span className="sit-go" aria-hidden="true"><ArrowUpRight size={18} /></span>
                  </Link>
                </Item>
              )
            })}
          </Stagger>
        </div>
      </section>

      {/* SOLUTIONS: six pictures */}
      <section className="section sol-track bg-stone" data-prog="pin" aria-labelledby="sol-h">
        <div className="sol-pin">
        <div className="container">
          <Reveal className="sec-head sec-head-row">
            <div>
              <p className="chip">Solutions</p>
              <h2 id="sol-h" className="display">Six kinds of cover, one plan<span className="dot">.</span></h2>
            </div>
            <Link href="/solutions" className="link">All solutions <ChevronRight size={17} /></Link>
          </Reveal>
          <Stagger as="ul" className="sol-grid">
            {solutions.map((s) => (
              <Item as="li" key={s.slug}>
                <Link href={`/solutions/${s.slug}`} className="sol">
                  <Image src={small(s.image)} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  <span className="sol-chip">{carriersFor(s.slug)} carriers</span>
                  <span className="sol-b">
                    <span className="sol-t">{s.title}</span>
                    <span className="sol-s">{s.short}</span>
                  </span>
                  <span className="sol-go" aria-hidden="true"><ArrowUpRight size={18} /></span>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
        </div>
      </section>

      {/* a line of large words that slides with the scroll */}
      <div className="band" data-prog="" aria-hidden="true">
        <p>Income you can’t outlive<i className="dot">.</i> Care you can choose<i className="dot">.</i> A legacy that lands<i className="dot">.</i></p>
        <p>One advisor<i className="dot">.</i> One plan<i className="dot">.</i> Every option<i className="dot">.</i> No cost to you<i className="dot">.</i></p>
      </div>

      {/* ONE ADVISOR WHO STAYS */}
      <section className="section fx fx-l fx-b" aria-labelledby="plan-h">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal>
            <figure className="tile plan-pic">
              <Image src="/media/family-advisor.jpg" alt="A family around a table with their advisor" fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
              <figcaption className="pin" style={v({ '--x': '8%', '--y': '9%' })}><i /><b>One advisor</b><span>from first meeting to yearly review</span></figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="chip">Reach your retirement goals</p>
            <h2 id="plan-h" className="display mt-5">A plan that fits your family, built by one advisor who stays<span className="dot">.</span></h2>
            <p className="lead mt-6 text-ink-soft">The person who meets you first is the person who places your coverage, reviews it every year and picks up the phone when something changes. We map your income gap, your care plan, your Medicare choices and your legacy, then we put the whole market to work on each piece.</p>
            <ul className="checks mt-8">
              {PLAN.map((t) => <li key={t}><span aria-hidden="true"><Check size={14} strokeWidth={2.6} /></span>{t}</li>)}
            </ul>
            <Link href="/contact" className="btn btn-primary mt-9">Book a consultation</Link>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-stone fx" aria-labelledby="how-h">
        <div className="container">
          <Reveal className="sec-head">
            <p className="chip">How it works</p>
            <h2 id="how-h" className="display">The same four steps, whichever plan you need<span className="dot">.</span></h2>
          </Reveal>
          <div className="steps-wrap" data-prog="" data-from="0.85" data-to="0.35">
          <Stagger as="ol" className="steps">
            {STEPS.map(([title, text], k) => (
              <Item as="li" key={title}>
                <span className="steps-n" aria-hidden="true">{k + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Item>
            ))}
          </Stagger>
          </div>
        </div>
      </section>

      {/* WHY INDEPENDENT: one carrier against the whole list */}
      <section className="panel" aria-labelledby="why-h">
        <div className="panel-in on-dark" data-tone="dark">
          <Reveal>
            <p className="chip">Why independent matters</p>
            <h2 id="why-h" className="display-xl mt-6 max-w-[15em]">A captive agent has one product line and a quota. We have neither<span className="dot">.</span></h2>
          </Reveal>
          <Stagger className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Item className="versus">
              <h3>A captive agent</h3>
              <CarrierDots mode="one" />
              <ul>{CAPTIVE.map((t) => <li key={t}><Minus size={18} aria-hidden="true" />{t}</li>)}</ul>
            </Item>
            <Item className="versus versus-us">
              <h3>NXT Financial Group</h3>
              <CarrierDots mode="all" />
              <ul>{INDEPENDENT.map((t) => <li key={t}><span aria-hidden="true"><Check size={13} strokeWidth={2.8} /></span>{t}</li>)}</ul>
            </Item>
          </Stagger>
          <ul className="stats">
            {STATS.map(([n, suffix, label]) => (
              <li key={label}>
                <p className="stats-n"><Counter value={n} suffix={suffix} /></p>
                <p>{label}</p>
              </li>
            ))}
          </ul>
          <Link href="/about" className="link mt-10">About NXT <ChevronRight size={17} /></Link>
        </div>
      </section>

      {/* CARRIERS */}
      <section className="section overflow-hidden fx fx-l" aria-labelledby="car-h">
        <div className="container">
          <Reveal className="sec-head sec-head-center">
            <p className="chip">Trusted partners</p>
            <h2 id="car-h" className="display">Connected to the carriers behind the guarantees<span className="dot">.</span></h2>
            <p className="lead text-ink-soft">A promise to pay is only as good as the company making it. We place business only with carriers rated A- or better by AM Best, and we compare them for you.</p>
          </Reveal>
        </div>
        {/* the rows slide in opposite directions as the section is scrolled through */}
        <div className="belt" data-prog="">
          {ROWS.map((row, r) => (
            <ul key={r} className={r ? 'belt-row belt-rev' : 'belt-row'}>
              {row.map((c) => (
                // eslint-disable-next-line @next/next/no-img-element
                <li key={c.slug}><img src={c.logo} alt={c.name} loading="lazy" decoding="async" /></li>
              ))}
            </ul>
          ))}
        </div>
        <div className="mt-12 text-center"><Link href="/carriers" className="link">See all carriers by solution <ChevronRight size={17} /></Link></div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ */}
      <section className="section">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="chip">Questions, answered</p>
            <h2 className="display mt-5">What people ask before they call<span className="dot">.</span></h2>
            <p className="lead mt-6 text-ink-soft">If yours is not here, ask it. We answer every message within a business day.</p>
            <Link href="/contact" className="link mt-7">Ask a question <ChevronRight size={17} /></Link>
          </div>
          <Faq />
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="section bg-stone">
        <div className="container">
          <div className="sec-head sec-head-row">
            <div><p className="chip">Insights</p><h2 className="display">Read before you decide<span className="dot">.</span></h2></div>
            <Link href="/insights" className="link">All articles <ChevronRight size={17} /></Link>
          </div>
          <Stagger as="ul" className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <Item as="li" key={p.slug}>
                <Link href={`/insights/${p.slug}`} className="group block">
                  <div className="tile aspect-[4/3] bg-platinum"><Image src={small(p.image)} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.045]" /></div>
                  <p className="mt-6 text-[1rem] text-ink-soft">{p.date}, {p.readTime}</p>
                  <h3 className="mt-2 text-[1.375rem] font-medium leading-[1.18] tracking-[-.03em] text-midnight">{p.title}</h3>
                  <p className="mt-3 text-[1.0625rem] text-ink-soft">{p.excerpt}</p>
                  <span className="link mt-4 text-[1.0625rem]">Read the full story <ChevronRight size={16} /></span>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <Newsletter />
      <ScrollVars />
    </>
  )
}
