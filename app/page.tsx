import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, Scale, Landmark, Users, PhoneCall } from 'lucide-react'
import HeroV4 from '@/components/HeroV4'
import SolutionCards from '@/components/SolutionCards'
import CarrierWall from '@/components/CarrierWall'
import CarrierTicker from '@/components/CarrierTicker'
import Faq from '@/components/Faq'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import { Reveal, Stagger, Item, Counter } from '@/components/motion'
import { posts } from '@/lib/insights'

const STATS = [[Landmark, 70, '+', 'Carrier partners'], [Users, 50, '', 'States licensed'], [Scale, 5, '', 'Disciplines, practiced daily'], [PhoneCall, 1, ' day', 'To hear back from us']] as const

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
    { '@type': 'Question', name: 'Where are you licensed?', acceptedAnswer: { '@type': 'Answer', text: 'Our headquarters is in Everett, Massachusetts, and we are licensed to serve clients in all 50 states.' } },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }} />
      <HeroV4 />

      {/* STATS */}
      <section className="border-y border-platinum bg-white">
        <Stagger as="ul" className="container grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
          {STATS.map(([Icon, v, suf, l]) => (
            <Item as="li" key={l} className="flex items-center gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-stone text-navy"><Icon size={22} /></span><div><p className="font-display text-3xl font-semibold text-navy"><Counter value={v} suffix={suf} /></p><p className="text-sm text-ink-soft">{l}</p></div></Item>
          ))}
        </Stagger>
      </section>

      {/* BRING YOUR PLAN TO LIFE */}
      <section className="section relative overflow-hidden">
        <div aria-hidden="true" className="glow -left-40 top-20 h-[460px] w-[460px] bg-sunrise/15" />
        <div className="container grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal className="relative">
            <div className="arch-r frame-gold relative aspect-[5/6] "><div className="photo"><Image src="/images/advisors.png" alt="NXT advisors in a planning meeting" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" style={{ filter: 'saturate(0.9)' }} /></div></div>
            <div className="card absolute -bottom-6 -right-2 w-[260px] rounded-2xl p-5 shadow-lift md:-right-8"><p className="label-sm">Your first meeting</p><p className="mt-1 font-display text-xl font-semibold text-navy">45 minutes. No products. Just where you stand.</p></div>
          </Reveal>
          <div>
            <Reveal><p className="label-sm mb-5">Reach your retirement goals</p><h2 className="display">A plan that fits your family, built by one advisor who stays.</h2></Reveal>
            <Reveal delay={0.1}><p className="lead mt-6 text-ink-soft">The person who meets you first is the person who places your coverage, reviews it every year and picks up the phone when something changes. We map your income gap, your care plan, your Medicare choices and your legacy, then we put the whole market to work on each piece.</p></Reveal>
            <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">{['Guaranteed income sized to your essentials', 'A funded long-term care plan', 'Medicare that keeps your doctors', 'Life insurance sized honestly, not by rule of thumb'].map((t) => <Item as="li" key={t} className="flex items-start gap-3 text-[15px]"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-midnight"><Check size={11} strokeWidth={3} /></span>{t}</Item>)}</Stagger>
            <Reveal delay={0.2}><Link href="/contact" className="btn btn-primary mt-10">Book a consultation <ArrowRight size={16} /></Link></Reveal>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section bg-stone">
        <div className="container">
          <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div className="max-w-[640px]"><p className="label-sm mb-5">Five solutions</p><h2 className="display">Everything we do fits on one hand.</h2></div><Link href="/solutions" className="link self-start">All five, in detail <ArrowRight size={16} /></Link></Reveal>
          <SolutionCards />
        </div>
      </section>

      {/* CARRIERS */}
      <section className="section overflow-hidden">
        <div className="container">
          <Reveal className="mb-12 max-w-[700px] text-center md:mx-auto"><p className="label-sm mb-5">Trusted partners</p><h2 className="display">Connected to the carriers behind the guarantees.</h2><p className="lead mt-5 text-ink-soft">A promise to pay is only as good as the company making it. We place business only with carriers rated A- or better by AM Best, and we compare them for you.</p></Reveal>
          <CarrierWall />
          <div className="mt-8 text-center"><Link href="/carriers" className="btn btn-outline">See all carriers by solution <ArrowUpRight size={16} /></Link></div>
        </div>
        <div className="mt-16"><CarrierTicker /></div>
      </section>

      {/* STATEMENT */}
      <section className="relative isolate overflow-hidden bg-midnight on-dark">
        <Image src="/images/atrium.png" alt="NXT Financial Group office atrium" fill sizes="100vw" className="object-cover opacity-25" style={{ filter: 'saturate(0.5)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/85 to-midnight/40" />
        <div className="container relative grid grid-cols-1 gap-12 py-24 md:py-32 lg:grid-cols-[1fr_1fr]">
          <Reveal><p className="label-sm mb-6">Why independent matters</p><h2 className="display">A captive agent has one product line and a quota. We have neither.</h2></Reveal>
          <Reveal delay={0.1} className="self-end space-y-6"><p className="lead">When the recommendation can come from any of forty carriers, the conversation stops being about the product and starts being about you: your income gap, your health, your family, your timeline.</p><Link href="/about" className="btn btn-ghost">About NXT <ArrowUpRight size={16} /></Link></Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ */}
      <section className="section">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start"><p className="label-sm mb-5">Questions, answered</p><h2 className="display">What people ask before they call.</h2><p className="lead mt-5 text-ink-soft">If yours is not here, ask it. We answer every message within a business day.</p><Link href="/contact" className="btn btn-outline mt-8">Ask a question</Link></Reveal>
          <Reveal delay={0.1}><Faq /></Reveal>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="section bg-stone">
        <div className="container">
          <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="label-sm mb-5">Insights</p><h2 className="display">Read before you decide.</h2></div><Link href="/insights" className="link self-start">All articles <ArrowRight size={16} /></Link></Reveal>
          <Stagger as="ul" className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <Item as="li" key={p.slug}><Link href={`/insights/${p.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden rounded-[24px]"><div className="relative aspect-[4/3] bg-stone"><Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ filter: 'saturate(0.85)' }} /></div><div className="flex flex-1 flex-col p-6"><p className="mono text-xs text-gold">{p.date} · {p.readTime}</p><h3 className="display-sm mt-2 text-[1.35rem] group-hover:text-command">{p.title}</h3><p className="mt-2 flex-1 text-[14px] text-ink-soft">{p.excerpt}</p><span className="link mt-4 text-sm">Read the full story <ArrowRight size={15} /></span></div></Link></Item>
            ))}
          </Stagger>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
