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
      <section className="relative isolate overflow-hidden bg-midnight on-dark">
        <Image src="/images/team-meeting.png" alt="" fill sizes="100vw" className="object-cover opacity-20" style={{ filter: 'saturate(0.4)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-midnight/90 to-navy/60" />
        <div className="container relative py-28 md:py-36">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Image src="/images/futureflow.png" alt="FutureFlow" width={220} height={147} className="mx-auto mb-8 h-24 w-auto rounded-2xl bg-white/10 p-4 backdrop-blur-sm" />
            <p className="label-sm mb-5">From the NXT family</p>
            <h2 className="display">AI personal finance with an advisor behind it.</h2>
            <p className="lead mx-auto mt-6 max-w-2xl text-platinum">FutureFlow tracks your spending, plans your retirement and flags coverage gaps in real time — with an NXT advisor one tap away whenever you need a human.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
              {[
                ['Spending intelligence', 'Every transaction categorized. Patterns surfaced. Blind spots flagged before they become problems.'],
                ['Retirement gap analysis', 'See exactly how much guaranteed income you have, how much you need, and what closes the gap.'],
                ['Advisor on demand', 'AI handles the day-to-day. A licensed NXT advisor steps in when the stakes are high.'],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h3 className="font-display text-lg font-semibold text-white">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 text-center">
            <a href="https://joinfutureflow.com" target="_blank" rel="noopener noreferrer" className="btn btn-cta">Explore FutureFlow</a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
