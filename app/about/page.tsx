import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, MapPin, ShieldCheck, Building2, BookOpen, Eye, Globe, HeartHandshake, Handshake, CheckCircle, Crown, Lock, GraduationCap, Target, Heart } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, Stagger, Item } from '@/components/motion'
import { leadership, coreTeam, advisors } from '@/lib/team'
import { getAgentsByState } from '@/lib/agents'

export const metadata: Metadata = {
  title: 'About',
  description: 'NXT Financial Group is an independent marketing organization (IMO) headquartered in Malden, Massachusetts — built for advisors and families, serving all 50 states.',
}

const DIFFERENTIATORS = [
  { icon: Crown, title: 'True ownership', desc: 'Advisors own their book of business, their downline, and their legacy. The people doing the work deserve to keep what they build.' },
  { icon: Building2, title: '70+ carrier access', desc: 'Appointed with more than 70 of the most respected carriers in the United States across life, health, annuities, Medicare, and wealth products.' },
  { icon: BookOpen, title: 'Education first', desc: 'Every NXT advisor is trained to teach before they sell. An informed client is the best client, and an educated advisor builds the most durable business.' },
  { icon: Eye, title: 'Full transparency', desc: 'Every commission, every fee, every split — explained clearly from day one. No fine print. No surprises. No hidden agendas.' },
  { icon: Globe, title: 'Nationwide platform', desc: 'Back-office platform, training infrastructure, and carrier relationships designed to support advisors at every level — from licensing to executive leadership.' },
  { icon: HeartHandshake, title: 'Legacy planning for advisors', desc: 'NXT advisors build something they can pass down. The equity an advisor creates belongs to them — and to their family.' },
]

const PROTECT_VALUES = [
  { letter: 'P', word: 'Partnership', desc: 'We only succeed when our advisors and clients succeed. Win together or not at all.' },
  { letter: 'R', word: 'Responsibility', desc: 'Do the right thing — especially when no one is watching. Integrity is not a policy. It is a standard.' },
  { letter: 'O', word: 'Ownership', desc: 'Advisors own their book, their team, and their future. The people doing the work keep what they earn.' },
  { letter: 'T', word: 'Transparency', desc: 'Every fee, every split, every recommendation — explained clearly, never buried in fine print.' },
  { letter: 'E', word: 'Education', desc: 'We teach before we sell. An informed client makes the best decision. An educated advisor builds the strongest business.' },
  { letter: 'C', word: 'Commitment', desc: 'To our clients. To our advisors. To the communities we serve. We show up — fully — every single time.' },
  { letter: 'T', word: 'Trust', desc: 'Trust is not assumed. It is earned through consistency, honesty, and results. Everything we do is designed to deserve it.' },
]

const ADVISOR_BENEFITS = [
  'Competitive commission contracts from 75% to 130%',
  'Generational override structure (up to 30% total)',
  'True book of business ownership',
  'Legacy and right-to-transfer program',
  'Back-office platform and CRM',
  'Training, licensing support, and mentorship',
  'Access to 70+ top-rated U.S. carriers',
]

function TeamGrid({ members, cols = 'md:grid-cols-4' }: { members: typeof leadership; cols?: string }) {
  return (
    <Stagger as="ul" className={`grid grid-cols-2 gap-6 ${cols}`}>
      {members.map(({ name, role, image }) => (
        <Item as="li" key={name}>
          <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-[20px] bg-stone">
            <Image src={image} alt={name} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover object-[center_20%]" />
          </div>
          <h3 className="h3">{name}</h3>
          <p className="text-sm text-ink-soft">{role}</p>
        </Item>
      ))}
    </Stagger>
  )
}

function AgentsByState() {
  const byState = getAgentsByState()
  return (
    <section id="advisors-by-state" className="section bg-stone">
      <div className="container">
        <Reveal className="mb-14 max-w-[700px]">
          <p className="label-sm mb-5">Meet our trusted advisors</p>
          <h2 className="display">Local advisors, nationwide coverage.</h2>
          <p className="lead mt-5 text-ink-soft">Our advisors are spread across the country, ready to help you plan for retirement in your community.</p>
        </Reveal>
        {Object.entries(byState).map(([state, stateAgents]) => (
          <Reveal key={state} className="mb-12 last:mb-0">
            <div className="mb-6 flex items-center gap-3">
              <MapPin size={20} className="text-gold" />
              <h3 className="font-display text-2xl font-semibold text-navy">{state}</h3>
              <span className="rounded-full bg-navy/10 px-3 py-0.5 text-xs font-medium text-navy">{stateAgents.length} {stateAgents.length === 1 ? 'advisor' : 'advisors'}</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stateAgents.map((agent) => (
                <div key={agent.name} className="card flex gap-4 rounded-[20px] p-5">
                  {agent.image ? (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-platinum">
                      <Image src={agent.image} alt={agent.name} fill sizes="64px" className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy font-display text-lg font-semibold text-white">
                      {agent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display text-[15px] font-semibold text-navy">{agent.name}</h4>
                    <p className="text-xs text-gold">{agent.rank}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{agent.city}, {agent.state}</p>
                    <div className="mt-2 flex flex-col gap-1">
                      <a href={`tel:${agent.phone.replace(/\D/g, '')}`} className="flex items-center gap-1.5 text-xs text-ink hover:text-navy">
                        <Phone size={11} className="text-gold" />{agent.phone}
                      </a>
                      <a href={`mailto:${agent.email}`} className="flex items-center gap-1.5 text-xs text-ink hover:text-navy truncate">
                        <Mail size={11} className="text-gold" />{agent.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="About NXT"
        title="Built for Advisors. Built for Families. Built to Last."
        intro="NXT Financial Group is an independent marketing organization (IMO) headquartered in Malden, Massachusetts — built on the belief that financial advisors deserve real ownership and every family deserves real protection."
        image="/images/advisors.png"
        imageAlt="NXT Financial Group advisors"
      >
        <Link href="/contact" className="btn btn-primary">Work with us <ArrowRight size={16} /></Link>
      </PageHero>

      {/* Our Story */}
      <section className="section">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="label-sm mb-5">Our story</p>
            <h2 className="display">The old model was not built for the people working inside it.</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-[17px] leading-8">
            <p>NXT Financial Group was founded on a simple frustration: the financial services industry was not built for the people working inside it. Advisors were capped. Clients were confused. The old model rewarded institutions over individuals, and the people doing the hardest work — sitting across from families, asking the difficult questions, building trust one conversation at a time — had no real ownership of what they were building.</p>
            <p>We decided to change that. NXT Financial Group is a licensed Independent Marketing Organization (IMO) and Managing General Agency (MGA) appointed with 70+ top-rated U.S. carriers across life, health, annuity, and wealth products. We operate as a nationwide platform where advisors are not just producers — they are owners.</p>
            <p>On the client side, our advisors are trained to lead with education, not sales. They sit down with families, listen first, and build protection plans that make sense — clearly explained, honestly priced, and built to last.</p>
          </Reveal>
        </div>
      </section>

      {/* Vision */}
      <section className="relative overflow-hidden bg-navy py-28 md:py-36 on-dark">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container relative text-center">
          <Reveal>
            <p className="label-sm mb-8">Our Vision</p>
            <blockquote className="mx-auto max-w-4xl font-display text-[clamp(1.75rem,4.5vw,3.75rem)] font-bold leading-[1.15] tracking-tight text-white">
              To be a financial services company built on integrity and purpose — where advisors own their future and every family is protected.
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="relative overflow-hidden bg-white py-28 md:py-36">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-gold via-gold/40 to-transparent" />
        <div className="container relative text-center">
          <Reveal>
            <p className="label-sm mb-8">Our Mission</p>
            <blockquote className="mx-auto max-w-4xl font-display text-[clamp(1.75rem,4.5vw,3.75rem)] font-bold leading-[1.15] tracking-tight text-navy">
              To build careers worth having, agencies worth owning, and legacies worth leaving — while giving every family access to financial protection they can trust.
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* What Makes NXT Different */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-14 max-w-[700px]">
            <p className="label-sm mb-5">What makes NXT different</p>
            <h2 className="display">This is not the old model. This is NXT.</h2>
          </Reveal>
          <Stagger as="ul" className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map(({ icon: Icon, title, desc }) => (
              <Item as="li" key={title} className="card rounded-[24px] p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="display-sm">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{desc}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* For Advisors */}
      <section className="section bg-navy on-dark">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="label-sm mb-5">For advisors</p>
            <h2 className="display">Build your business on your terms.</h2>
            <p className="lead mt-5 text-platinum">Competitive contracts, true ownership, and a platform that works for you — not the other way around.</p>
            <Link href="/partner" className="btn btn-cta mt-8">Learn more <ArrowRight size={16} /></Link>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {ADVISOR_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-[16px] text-platinum">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-midnight">
                    <CheckCircle size={12} strokeWidth={3} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold text-gold">No production minimums. No desk fees. No mandatory meetings.</p>
          </Reveal>
        </div>
      </section>

      {/* P.R.O.T.E.C.T Values */}
      <section className="relative overflow-hidden bg-stone py-28 md:py-36">
        <div className="container">
          <Reveal className="mb-16 text-center">
            <p className="label-sm mb-6">Our Values</p>
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-navy">
              P.R.O.T.E.C.T
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Seven principles that guide every decision we make — for our advisors and for the families we serve.
            </p>
          </Reveal>

          <Stagger as="div" className="mx-auto max-w-4xl divide-y divide-navy/10">
            {PROTECT_VALUES.map(({ letter, word, desc }) => (
              <Item as="div" key={word} className="grid grid-cols-[auto_1fr] items-start gap-6 py-8 md:grid-cols-[80px_200px_1fr] md:items-center md:gap-10 md:py-10">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy font-display text-3xl font-black text-gold md:h-[72px] md:w-[72px] md:text-4xl">
                  {letter}
                </span>
                <div className="md:contents">
                  <h3 className="font-display text-2xl font-bold text-navy md:text-[1.75rem]">{word}</h3>
                  <p className="col-span-2 mt-2 text-[16px] leading-relaxed text-ink-soft md:col-span-1 md:mt-0">{desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Leadership */}
      <section id="team" className="section">
        <div className="container">
          <Reveal className="mb-12 max-w-[600px]">
            <p className="label-sm mb-5">Leadership</p>
            <h2 className="display">The people leading NXT Financial.</h2>
          </Reveal>
          <TeamGrid members={leadership} cols="md:grid-cols-4" />
        </div>
      </section>

      {/* Core Team */}
      <section className="section bg-stone">
        <div className="container">
          <Reveal className="mb-12 max-w-[600px]">
            <p className="label-sm mb-5">Core team</p>
            <h2 className="display">The people who make it happen.</h2>
          </Reveal>
          <TeamGrid members={coreTeam} cols="md:grid-cols-4" />
        </div>
      </section>

      {/* Advisors */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-12 max-w-[600px]">
            <p className="label-sm mb-5">Advisors</p>
            <h2 className="display">Seasoned advisors across insurance &amp; technology.</h2>
          </Reveal>
          <TeamGrid members={advisors} cols="md:grid-cols-4" />
        </div>
      </section>

      {/* Advisors by State */}
      <AgentsByState />

      {/* FutureFlow */}
      <section className="relative isolate overflow-hidden on-dark" style={{ background: 'linear-gradient(145deg, #0c0c0f 0%, #0e1033 40%, #1a1050 65%, #0c0c0f 100%)' }}>
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, #4353ff 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full opacity-15 blur-[100px]" style={{ background: 'radial-gradient(circle, #d5c9f8 0%, transparent 70%)' }} />

        <div className="container relative py-28 md:py-40">
          {/* Top: Logo + Badge */}
          <Reveal className="mb-16 text-center">
            <Image src="/images/futureflow.png" alt="FutureFlow" width={320} height={213} className="mx-auto mb-6 h-28 w-auto md:h-36" />
            <span className="inline-block rounded-full border border-[#4353ff]/30 bg-[#4353ff]/10 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#6b78ff]">From the NXT Family</span>
          </Reveal>

          {/* Split: Left copy + Right phone mockup */}
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_auto] lg:gap-24">
            {/* Left */}
            <Reveal>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-white">
                One app. Total financial clarity.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#9a9a9a]">
                FutureFlow replaces 4-6 separate finance apps with one AI-powered platform — tracking spending, planning retirement, managing subscriptions, and flagging coverage gaps. With an NXT advisor one tap away.
              </p>

              {/* How it works — 3 steps */}
              <div className="mt-12 space-y-8">
                {[
                  ['Connect your accounts', 'Link bank accounts and cards. FutureFlow auto-categorizes every transaction — zero manual tagging.'],
                  ['AI finds the gaps', 'Spending patterns analyzed. Subscriptions surfaced. Retirement income gaps calculated. Tax savings identified.'],
                  ['Advisor steps in', 'AI handles the day-to-day. A licensed NXT advisor steps in when the stakes are high — one tap away.'],
                ].map(([title, desc], i) => (
                  <div key={title} className="flex gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4353ff] font-display text-lg font-bold text-white">{i + 1}</div>
                    <div>
                      <h3 className="text-[17px] font-bold text-white">{title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-[#9a9a9a]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="https://joinfutureflow.com" target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #4353ff, #6b78ff)' }}>
                Explore FutureFlow <ArrowRight size={16} />
              </a>
            </Reveal>

            {/* Right — Feature Bento Cards */}
            <Reveal delay={0.2}>
              <div className="grid w-full max-w-[420px] grid-cols-2 gap-4 mx-auto lg:mx-0">
                {/* Net Worth card — spans full width */}
                <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#9a9a9a]">Net Worth Growth</p>
                    <span className="rounded-full bg-[#10b981]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#10b981]">+12.4%</span>
                  </div>
                  <p className="mb-4 text-2xl font-extrabold text-white">$124,850</p>
                  {/* Area chart SVG */}
                  <svg viewBox="0 0 360 80" className="w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="ff-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4353ff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#4353ff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,65 Q30,60 60,50 T120,42 T180,30 T240,25 T300,18 T360,8 L360,80 L0,80 Z" fill="url(#ff-area)" />
                    <path d="M0,65 Q30,60 60,50 T120,42 T180,30 T240,25 T300,18 T360,8" fill="none" stroke="#4353ff" strokeWidth="2.5" />
                  </svg>
                </div>

                {/* Spending breakdown — donut */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                  <p className="mb-3 text-xs font-semibold text-[#9a9a9a]">Spending</p>
                  <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#1a1a2e" strokeWidth="10" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#4353ff" strokeWidth="10" strokeDasharray="120 999" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 50 50)" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="60 999" strokeDashoffset="-120" strokeLinecap="round" transform="rotate(-90 50 50)" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#d5c9f8" strokeWidth="10" strokeDasharray="40 999" strokeDashoffset="-180" strokeLinecap="round" transform="rotate(-90 50 50)" />
                    <text x="50" y="48" textAnchor="middle" className="fill-white text-[11px] font-bold">$3,240</text>
                    <text x="50" y="60" textAnchor="middle" className="fill-[#9a9a9a] text-[7px]">this month</text>
                  </svg>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    <span className="flex items-center gap-1 text-[10px] text-[#9a9a9a]"><span className="inline-block h-2 w-2 rounded-full bg-[#4353ff]" />Housing</span>
                    <span className="flex items-center gap-1 text-[10px] text-[#9a9a9a]"><span className="inline-block h-2 w-2 rounded-full bg-[#10b981]" />Food</span>
                    <span className="flex items-center gap-1 text-[10px] text-[#9a9a9a]"><span className="inline-block h-2 w-2 rounded-full bg-[#d5c9f8]" />Other</span>
                  </div>
                </div>

                {/* Savings tracker — bar chart */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                  <p className="mb-3 text-xs font-semibold text-[#9a9a9a]">Savings Found</p>
                  <p className="mb-3 text-xl font-extrabold text-[#10b981]">$312<span className="text-sm font-semibold text-[#9a9a9a]">/mo</span></p>
                  <div className="space-y-2">
                    {[
                      ['Subscriptions', 47, '#fb7185'],
                      ['Bill negotiation', 156, '#4353ff'],
                      ['Tax deductions', 109, '#10b981'],
                    ].map(([label, val, color]) => (
                      <div key={label as string}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-[10px] text-[#9a9a9a]">{label}</span>
                          <span className="text-[10px] font-bold text-white">${val as number}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10">
                          <div className="h-full rounded-full" style={{ width: `${((val as number) / 156) * 100}%`, background: color as string }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Retirement gap — spans full width */}
                <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#9a9a9a]">Retirement Income Gap</p>
                      <p className="mt-1 text-lg font-extrabold text-white">$1,420<span className="text-sm font-semibold text-[#9a9a9a]">/mo gap</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-[#9a9a9a]">Goal: $5,200/mo</p>
                      <p className="text-[11px] font-bold text-[#4353ff]">Current: $3,780/mo</p>
                    </div>
                  </div>
                  <div className="mt-3 h-3 rounded-full bg-white/10">
                    <div className="h-full rounded-full" style={{ width: '72.7%', background: 'linear-gradient(90deg, #4353ff, #6b78ff)' }} />
                  </div>
                  <p className="mt-2 text-right text-[11px] font-semibold text-[#d5c9f8]">72.7% funded</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Stats row */}
          <Reveal delay={0.3}>
            <div className="mt-20 grid grid-cols-2 gap-6 border-t border-white/10 pt-12 md:grid-cols-4">
              {[
                ['12+', 'Financial tools in one app'],
                ['50', 'States covered'],
                ['24/7', 'AI monitoring'],
                ['1-Tap', 'Licensed advisor access'],
              ].map(([stat, label]) => (
                <div key={label} className="text-center">
                  <p className="font-display text-3xl font-black text-[#4353ff] md:text-4xl">{stat}</p>
                  <p className="mt-1 text-sm text-[#9a9a9a]">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
