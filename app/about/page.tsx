import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, ShieldCheck, Building2, BookOpen, Eye, Globe, HeartHandshake, Handshake, CheckCircle, Crown, Lock, GraduationCap, Target, Heart } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, Stagger, Item } from '@/components/motion'
import { leadership } from '@/lib/team'
import { getAgentsByState } from '@/lib/agents'

export const metadata: Metadata = {
  title: 'About — IMO Built for Advisors & Families',
  description: 'NXT Financial Group is an Independent Marketing Organization (IMO) headquartered in Malden, Massachusetts. 70+ carrier appointments, 6 insurance disciplines, serving advisors and families across all 50 states.',
  openGraph: { title: 'About NXT Financial Group — Independent Marketing Organization', description: 'Meet the IMO built for advisors and families. 70+ carriers, 6 disciplines, all 50 states.' },
  alternates: { canonical: 'https://www.nxtfinancialgroup.com/about' },
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
      {members.map(({ name, role, image, link }) => (
        <Item as="li" key={name}>
          {link ? (
            <Link href={link} className="group block">
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-[20px] bg-stone">
                <Image src={image} alt={name} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <h3 className="h3 group-hover:text-command transition-colors">{name}</h3>
              <p className="text-sm text-ink-soft">{role}</p>
              <span className="mt-1 inline-block text-xs font-medium text-gold">Read story →</span>
            </Link>
          ) : (
            <>
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-[20px] bg-stone">
                <Image src={image} alt={name} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover object-[center_20%]" />
              </div>
              <h3 className="h3">{name}</h3>
              <p className="text-sm text-ink-soft">{role}</p>
            </>
          )}
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
                    <h4 className="font-display text-[17px] font-semibold text-navy">{agent.name}</h4>
                    <p className="text-xs text-gold">{agent.rank}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{agent.city}, {agent.state}</p>
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
        image="/media/advisors.jpg"
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
          <Reveal delay={0.1} className="space-y-5 text-[19px] leading-8">
            <p>NXT Financial Group was founded on a simple frustration: the financial services industry was not built for the people working inside it. Advisors were capped. Clients were confused. The old model rewarded institutions over individuals, and the people doing the hardest work — sitting across from families, asking the difficult questions, building trust one conversation at a time — had no real ownership of what they were building.</p>
            <p>We decided to change that. NXT Financial Group is a licensed Independent Marketing Organization (IMO) appointed with 70+ top-rated U.S. carriers across life, health, annuity, and wealth products. We operate as a nationwide platform where advisors are not just producers — they are owners.</p>
            <p>On the client side, our advisors are trained to lead with education, not sales. They sit down with families, listen first, and build protection plans that make sense — clearly explained, honestly priced, and built to last.</p>
            <Link href="/nxt-life/shiv-thakur-founder-story" className="link mt-4 inline-flex items-center gap-2 text-sm font-semibold">Read the Founder&apos;s Story <ArrowRight size={15} /></Link>
          </Reveal>
        </div>
      </section>

      {/* Vision */}
      <section className="section on-dark bg-midnight text-center">
        <div className="container">
          <Reveal>
            <p className="chip mb-8">Our Vision</p>
            <blockquote className="mx-auto max-w-[22em] text-[clamp(1.75rem,4.2vw,3.5rem)] font-semibold leading-[1.1] tracking-[-.04em] text-white">
              To be a financial services company built on integrity and purpose — where advisors own their future and every family is protected.
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-white text-center">
        <div className="container">
          <Reveal>
            <p className="chip mb-8">Our Mission</p>
            <blockquote className="mx-auto max-w-[22em] text-[clamp(1.75rem,4.2vw,3.5rem)] font-semibold leading-[1.1] tracking-[-.04em] text-midnight">
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
                <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">{desc}</p>
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
                <li key={benefit} className="flex gap-3 text-[18px] text-platinum">
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
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-navy">
              P.R.O.T.E.C.T
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Seven principles that guide every decision we make — for our advisors and for the families we serve.
            </p>
          </Reveal>

          <Stagger as="div" className="mx-auto max-w-4xl divide-y divide-navy/10">
            {PROTECT_VALUES.map(({ letter, word, desc }) => (
              <Item as="div" key={word} className="grid grid-cols-[auto_1fr] items-start gap-6 py-8 md:grid-cols-[80px_200px_1fr] md:items-center md:gap-10 md:py-10">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-midnight text-2xl font-semibold text-white md:h-16 md:w-16 md:text-[1.75rem]">
                  {letter}
                </span>
                <div className="md:contents">
                  <h3 className="font-display text-2xl font-semibold text-navy md:text-[1.75rem]">{word}</h3>
                  <p className="col-span-2 mt-2 text-[18px] leading-relaxed text-ink-soft md:col-span-1 md:mt-0">{desc}</p>
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

      {/* Advisors by State */}
      <AgentsByState />

    </>
  )
}
