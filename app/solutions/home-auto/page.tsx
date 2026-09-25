import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Home, Car, Shield, Umbrella, Key, BadgeDollarSign, AlertTriangle, HelpCircle, ChevronDown } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, Stagger, Item } from '@/components/motion'
import { getSolution, solutions } from '@/lib/solutions'
import { carrierGroups } from '@/lib/carriers'

export const metadata: Metadata = {
  title: 'Home & Auto Insurance — Compare Top Carriers',
  description: 'Compare homeowners, auto, umbrella and specialty property insurance from top-rated carriers. Bundle and save up to 25%. NXT Financial Group shops the market for you.',
  openGraph: { title: 'Home & Auto Insurance | NXT Financial Group', description: 'Homeowners, auto, umbrella and renters coverage compared across top carriers. Get a free quote.' },
  alternates: { canonical: 'https://www.nxtfinancialgroup.com/solutions/home-auto' },
}

const COVERAGE_TYPES = [
  {
    icon: Home,
    title: 'Homeowners Insurance',
    summary: 'Dwelling, personal property, liability and loss-of-use coverage tailored to your home\'s replacement cost and your area\'s risks.',
    details: ['Dwelling and other structures', 'Personal property replacement cost', 'Personal liability up to $500K', 'Additional living expenses', 'Medical payments to others'],
  },
  {
    icon: Car,
    title: 'Auto Insurance',
    summary: 'Liability, collision, comprehensive and uninsured motorist coverage compared across carriers for the best rate at the limits you actually need.',
    details: ['Bodily injury and property damage liability', 'Collision and comprehensive', 'Uninsured/underinsured motorist', 'Medical payments and PIP', 'Roadside assistance and rental'],
  },
  {
    icon: Umbrella,
    title: 'Umbrella Liability',
    summary: 'An extra layer of liability protection, typically $1M–$5M, that sits above your home and auto policies for catastrophic claims.',
    details: ['$1M–$5M additional liability', 'Covers lawsuits beyond base policy limits', 'Protects assets and future earnings', 'Covers libel and slander claims', 'Usually less than $1/day per million'],
  },
  {
    icon: Key,
    title: 'Renters Insurance',
    summary: 'Personal property and liability coverage for tenants — often under $20 a month and frequently required by landlords.',
    details: ['Personal belongings protection', 'Liability coverage', 'Additional living expenses', 'Medical payments to guests', 'Identity theft protection'],
  },
  {
    icon: Home,
    title: 'Specialty Property',
    summary: 'Coverage for vacation homes, investment properties, landlord policies, flood, earthquake and high-value items.',
    details: ['Vacation and second homes', 'Investment and rental properties', 'Flood and earthquake endorsements', 'Scheduled jewelry, art and collectibles', 'Vacant property coverage'],
  },
]

const STATS = [
  { value: '$310K', label: 'Average home claim from fire or weather damage' },
  { value: '1 in 8', label: 'Drivers involved in an accident each year' },
  { value: '$500K+', label: 'Potential liability from a single at-fault accident' },
  { value: '40%', label: 'Homeowners who are underinsured for rebuilding costs' },
]

const BUNDLE_BENEFITS = [
  { title: 'Multi-policy discount', desc: 'Bundle home and auto with the same carrier and save 10–25% on both policies.' },
  { title: 'Single deductible events', desc: 'Some carriers offer a single deductible when the same event damages both your home and vehicle.' },
  { title: 'One renewal, one advisor', desc: 'We manage your entire property portfolio in one place — no separate calls, no separate renewal dates to track.' },
  { title: 'Umbrella eligibility', desc: 'Bundling makes it easier and cheaper to add an umbrella policy that protects all your assets.' },
]

const FAQ = [
  { q: 'How much homeowners coverage do I need?', a: 'Your dwelling coverage should match the full replacement cost of your home — not the market value or mortgage balance. We calculate replacement cost based on your home\'s size, construction type, materials and local labor costs.' },
  { q: 'What\'s the difference between collision and comprehensive?', a: 'Collision covers damage from hitting another car or object. Comprehensive covers everything else — theft, vandalism, weather, animal strikes and falling objects. Most lenders require both if you have a loan.' },
  { q: 'Do I need an umbrella policy?', a: 'If your assets (home equity, savings, investments) exceed your auto and home liability limits, an umbrella policy is strongly recommended. At roughly $150–$300 per year for $1M in coverage, it\'s one of the best values in insurance.' },
  { q: 'How often should I re-shop my policies?', a: 'We recommend a full market comparison at every renewal — typically annually. Rates change frequently, and loyalty discounts rarely outpace the savings from competitive shopping.' },
  { q: 'Does NXT handle claims?', a: 'Claims are filed directly with your carrier, but your NXT advisor advocates on your behalf throughout the process — helping document the loss, following up on timelines and ensuring fair settlement.' },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}

export default function HomeAutoPage() {
  const s = getSolution('home-auto')!
  const group = carrierGroups.find((g) => g.solution === 'home-auto')
  const i = solutions.findIndex((x) => x.slug === 'home-auto')
  const next = solutions[(i + 1) % solutions.length]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero
        eyebrow="Home & Auto"
        title="Your home and your car are more than assets. They are how your life works."
        intro="A single storm, accident or liability claim can wipe out years of savings in minutes. We shop homeowners, auto, umbrella and specialty property coverage across top-rated carriers so you get the right limits, the right deductibles and a price that makes sense."
        image="/images/atrium.png"
      >
        <Link href="/contact" className="btn btn-primary">Get a quote <ArrowRight size={16} /></Link>
      </PageHero>

      {/* Why it matters — stats */}
      <section className="section bg-navy on-dark">
        <div className="container">
          <Reveal className="mb-14 text-center">
            <p className="label-sm mb-5">Why it matters</p>
            <h2 className="display mx-auto max-w-3xl">The risks are real. The right coverage makes them manageable.</h2>
          </Reveal>
          <Stagger as="div" className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <Item key={label} className="text-center">
                <p className="font-display text-3xl font-black text-gold md:text-4xl">{value}</p>
                <p className="mt-2 text-sm leading-relaxed text-platinum/70">{label}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Coverage types — expanded cards */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-14 max-w-[700px]">
            <p className="label-sm mb-5">What we place</p>
            <h2 className="display">Complete property and casualty coverage, in every form.</h2>
          </Reveal>
          <Stagger as="div" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COVERAGE_TYPES.map(({ icon: Icon, title, summary, details }) => (
              <Item key={title} className="card flex flex-col rounded-[24px] p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="display-sm mb-3">{title}</h3>
                <p className="mb-5 text-[15px] leading-relaxed text-ink-soft">{summary}</p>
                <ul className="mt-auto space-y-2 border-t border-platinum pt-5">
                  {details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-[13px] text-ink-soft">
                      <Check size={14} className="mt-0.5 shrink-0 text-gold" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Bundle benefits */}
      <section className="section bg-stone">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="label-sm mb-5">Save more</p>
            <h2 className="display">Bundle and save up to 25%.</h2>
            <p className="lead mt-5 text-ink-soft">
              Most families carry home, auto and umbrella separately — paying more for less. Bundling with a single carrier unlocks meaningful discounts and simplifies everything.
            </p>
            <Link href="/contact" className="btn btn-primary mt-8">Get a bundle quote <ArrowRight size={16} /></Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {BUNDLE_BENEFITS.map(({ title, desc }, idx) => (
                <div key={title} className="card rounded-[20px] p-6">
                  <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-navy font-display text-sm font-bold text-gold">{idx + 1}</span>
                  <h3 className="mb-2 text-[15px] font-bold text-navy">{title}</h3>
                  <p className="text-[14px] leading-relaxed text-ink-soft">{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Is this for you + Process */}
      <section className="section">
        <div className="container grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="label-sm mb-5">Is this for you?</p>
            <h2 className="display-sm mb-6">It usually fits when</h2>
            <ul className="space-y-4">
              {s.fit.map((f) => (
                <li key={f} className="flex gap-3 text-[16px]">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-midnight"><Check size={11} strokeWidth={3} /></span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label-sm mb-5">How it goes</p>
            <h2 className="display-sm mb-6">Three steps, no pressure</h2>
            <ol className="space-y-5">
              {s.process.map((p, n) => (
                <li key={p} className="flex gap-4">
                  <span className="numeral text-2xl">0{n + 1}</span>
                  <p className="pt-1 text-[16px]">{p}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Common risks visual */}
      <section className="section bg-navy on-dark">
        <div className="container">
          <Reveal className="mb-14 text-center">
            <p className="label-sm mb-5">What keeps families up at night</p>
            <h2 className="display mx-auto max-w-3xl">The events no one plans for — but everyone should prepare for.</h2>
          </Reveal>
          <Stagger as="div" className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: AlertTriangle, title: 'Weather damage', desc: 'Hurricanes, hail, tornadoes and winter storms cause billions in property damage every year. Standard homeowners covers most — but flood and earthquake usually require separate policies.' },
              { icon: Car, title: 'At-fault accidents', desc: 'A serious accident with injuries can generate claims well over $300,000. Minimum state liability limits often fall dangerously short.' },
              { icon: Shield, title: 'Liability lawsuits', desc: 'A guest injured on your property, a dog bite, a teenage driver — liability claims can reach into your savings, your home equity and your future wages.' },
              { icon: Home, title: 'Theft and vandalism', desc: 'Burglary, package theft, vehicle break-ins. Personal property coverage replaces what\'s taken — replacement cost policies pay for new, not depreciated value.' },
              { icon: BadgeDollarSign, title: 'Underinsurance', desc: '40% of homeowners don\'t have enough coverage to fully rebuild. Rising construction costs and code upgrades mean yesterday\'s limit may not cover today\'s rebuild.' },
              { icon: Key, title: 'Gaps between policies', desc: 'A tree falls on your car in your driveway — is that home or auto? Gaps between policies can leave you paying out of pocket. Bundling and umbrella coverage close them.' },
            ].map(({ icon: Icon, title, desc }) => (
              <Item key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <Icon size={22} className="mb-4 text-gold" />
                <h3 className="mb-2 font-display text-lg font-semibold text-white">{title}</h3>
                <p className="text-[14px] leading-relaxed text-platinum/60">{desc}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Carriers */}
      {group && (
        <section className="section">
          <div className="container">
            <Reveal className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="label-sm mb-5">Carrier partners</p>
                <h2 className="display-sm">Who we shop for home &amp; auto</h2>
              </div>
              <Link href={`/carriers#${group.key}`} className="link">Full carrier list <ArrowRight size={16} /></Link>
            </Reveal>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-platinum pt-8 sm:grid-cols-3 lg:grid-cols-4">
              {group.carriers.map((c) => (
                <li key={c.slug} className="flex items-baseline justify-between gap-3 border-b border-platinum pb-4">
                  <span className="wordmark">{c.name}</span>
                  {c.rating && <span className="mono text-xs text-ink-soft">{c.rating}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section bg-stone">
        <div className="container">
          <Reveal className="mb-14 max-w-[700px]">
            <p className="label-sm mb-5">Common questions</p>
            <h2 className="display">Home &amp; auto, answered.</h2>
          </Reveal>
          <div className="mx-auto max-w-3xl divide-y divide-navy/10">
            {FAQ.map(({ q, a }) => (
              <Reveal key={q}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold text-navy">
                    {q}
                    <ChevronDown size={18} className="shrink-0 text-ink-soft transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-midnight on-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-midnight/90 to-navy/60" />
        <div className="container relative py-28 text-center md:py-36">
          <Reveal>
            <p className="label-sm mb-5">Get started</p>
            <h2 className="display mx-auto max-w-3xl">Protect your home. Protect your ride. Protect your future.</h2>
            <p className="lead mx-auto mt-6 max-w-2xl text-platinum">
              Get a no-obligation quote in minutes. We compare carriers so you don&rsquo;t have to.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="btn btn-cta">Get a free quote <ArrowRight size={16} /></Link>
              <Link href="/solutions" className="btn btn-ghost">View all solutions <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next solution */}
      <section className="bg-stone">
        <div className="container grid grid-cols-1 gap-8 py-20 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="label-sm mb-4">Next solution</p>
            <Link href={`/solutions/${next.slug}`} className="group inline-block">
              <span className="display block group-hover:text-command">{next.title}</span>
              <span className="mt-2 block text-ink-soft">{next.short}</span>
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
            <Image src={next.image} alt={next.title} fill sizes="50vw" className="object-cover" style={{ filter: 'saturate(0.85)' }} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
