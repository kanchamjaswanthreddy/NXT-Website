import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Briefcase, Layers, TrendingUp, DollarSign, RefreshCw, CalendarCheck, Shield, Zap, GraduationCap, Cloud } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, Stagger, Item } from '@/components/motion'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join NXT Financial Group. Explore open positions in financial services and build a rewarding career helping clients plan for retirement.',
}

const TOP_REASONS = [
  {
    icon: Briefcase,
    title: 'You OWN your book of business',
    desc: 'Your clients, your relationships, your asset. Everything you build belongs to you — not the company.',
  },
  {
    icon: Layers,
    title: 'Deeper override structure',
    desc: '8 tiers / 30% total generational override. The more you build your team, the more your income multiplies — for life.',
  },
  {
    icon: TrendingUp,
    title: 'Higher income ceiling',
    desc: 'Start at 75% and grow to a 130% personal contract, plus 30% total override. Your ceiling is 160% total field compensation.',
  },
  {
    icon: DollarSign,
    title: '4+ income streams',
    desc: 'Life, Health, Wealth, Medicare, Legacy Planning. Multiple ways to earn from every single client relationship.',
  },
  {
    icon: RefreshCw,
    title: 'Recurring commissions',
    desc: 'Policies renew every year. Your income rebuilds itself automatically while you focus on growing.',
  },
  {
    icon: CalendarCheck,
    title: 'Paid every Friday',
    desc: 'Weekly pay cycle, every Friday. No waiting. No monthly delays.',
  },
  {
    icon: Shield,
    title: 'Legacy and right-to-transfer',
    desc: 'Build something you can pass down. NXT advisors can transfer their book of business to a family member or successor. Your equity is real.',
  },
  {
    icon: Zap,
    title: 'No desk fees. No mandatory meetings. No production minimums.',
    desc: 'Build your business at your pace, on your terms, without pressure.',
  },
  {
    icon: GraduationCap,
    title: 'NXT Academy — 24/7 on-demand training',
    desc: 'Licensing prep, product training, sales skills, leadership development. Everything you need, whenever you need it.',
  },
  {
    icon: Cloud,
    title: 'No office required — 100% cloud-based',
    desc: 'Work from anywhere. No brick-and-mortar overhead, no commute, no assigned desk. Your office is wherever you are.',
  },
] as const

const POSITIONS = [
  { title: 'Financial Associate', location: 'Remote — All States', type: 'Full-time', dept: 'Field Sales' },
  { title: 'Senior Financial Associate', location: 'Malden, MA / Remote', type: 'Full-time', dept: 'Field Sales' },
  { title: 'Financial Director', location: 'Remote — All States', type: 'Full-time', dept: 'Field Leadership' },
  { title: 'Senior Financial Director', location: 'Remote — All States', type: 'Full-time', dept: 'Field Leadership' },
  { title: 'Commission Planning Analyst', location: 'Malden, MA / Remote', type: 'Full-time', dept: 'Finance & Operations' },
  { title: 'Director of Compliance & Licensing', location: 'Malden, MA', type: 'Full-time', dept: 'Compliance' },
  { title: 'Carrier Relations Manager', location: 'Malden, MA / Remote', type: 'Full-time', dept: 'Business Development' },
  { title: 'Head of Recruiting & Agent Development', location: 'Remote — All States', type: 'Full-time', dept: 'Talent & Growth' },
  { title: 'Marketing & Brand Strategist', location: 'Remote — All States', type: 'Full-time', dept: 'Marketing' },
  { title: 'Operations & New Business Coordinator', location: 'Malden, MA', type: 'Full-time', dept: 'Finance & Operations' },
] as const

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career in financial services."
        intro="Join a growing team of independent financial professionals. We provide training, carrier access and back-office support so you can focus on helping clients."
        image="/images/team.png"
      />

      {/* Top 10 Reasons */}
      <section className="section bg-stone">
        <div className="container">
          <Reveal className="mb-14 max-w-[720px]">
            <p className="label-sm mb-5">Why NXT</p>
            <h2 className="display">Top 10 reasons to work for NXT Financial Group.</h2>
          </Reveal>

          <Stagger as="ol" className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {TOP_REASONS.map((reason, i) => {
              const Icon = reason.icon
              return (
                <Item
                  as="li"
                  key={reason.title}
                  className="card flex gap-5 rounded-[24px] p-7"
                >
                  <span className="shrink-0 font-display text-3xl font-black text-navy">{i + 1}.</span>
                  <div className="flex-1">
                    <h3 className="mb-2 text-[15px] font-bold text-navy">{reason.title}</h3>
                    <p className="text-[14px] leading-relaxed text-ink-soft">{reason.desc}</p>
                  </div>
                </Item>
              )
            })}
          </Stagger>

          {/* The NXT Promise */}
          <Reveal className="mt-14">
            <div className="rounded-[24px] bg-navy p-8 text-center md:p-12">
              <p className="text-sm font-bold uppercase tracking-widest text-gold">The NXT Promise</p>
              <p className="mx-auto mt-4 max-w-[640px] font-display text-2xl font-semibold leading-snug text-white md:text-3xl">
                Build a career worth having. Own a business worth keeping. Leave a legacy worth passing down.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-12 max-w-[640px]">
            <p className="label-sm mb-5">Open positions</p>
            <h2 className="display">Current openings across the team.</h2>
          </Reveal>

          <Stagger as="ul" className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {POSITIONS.map((pos) => (
              <Item
                as="li"
                key={`${pos.title}-${pos.location}`}
                className="card flex flex-col justify-between rounded-[24px] p-8"
              >
                <div>
                  <span className="inline-block rounded-full bg-navy/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy">{pos.dept}</span>
                  <h3 className="display-sm mt-3">{pos.title}</h3>
                  <p className="mt-2 text-[15px] text-ink-soft">
                    {pos.location} &middot; {pos.type}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="btn btn-primary mt-6 w-fit"
                >
                  Apply now <ArrowRight size={16} />
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-stone">
        <div className="container max-w-[720px] text-center">
          <Reveal>
            <h2 className="display">Don&rsquo;t see your role?</h2>
            <p className="lead mt-5 text-ink-soft">
              We&rsquo;re always looking for talented people who share our
              commitment to helping clients plan with confidence. Reach out and
              tell us about yourself.
            </p>
            <Link href="/contact" className="btn btn-primary mt-9 inline-flex">
              Get in touch <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
