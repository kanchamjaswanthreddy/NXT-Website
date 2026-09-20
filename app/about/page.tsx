import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, Stagger, Item } from '@/components/motion'
import { leadership, coreTeam, advisors } from '@/lib/team'
import { getAgentsByState } from '@/lib/agents'
export const metadata: Metadata = { title: 'About', description: 'NXT Financial Group is an independent retirement and protection planning agency founded in Malden, Massachusetts, serving clients in all 50 states.' }
const PRINCIPLES = [['Earned', 'Track records, not promises. Specifics over generalities. We speak from what we have placed, not what we hope to.'], ['Forward', 'Clear paths and measurable next steps. Every plan we build has a date on it.'], ['Precise', 'Exact rates, exact riders, exact carriers. Approximations and "up to" are not part of our vocabulary.'], ['Elevated', 'Professional, aspirational and grounded in financial literacy. Never salesy, never casual with your money.']]

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
  return (<>
    <PageHero eyebrow="About NXT" title="Specialists in the five decisions that shape retirement." intro="Founded in Malden, Massachusetts. Independent, licensed in all 50 states, and deliberately narrow in what we do so we can be excellent at it." image="/images/advisors.png" imageAlt="NXT advisors in a planning meeting"><Link href="/contact" className="btn btn-primary">Work with us <ArrowRight size={16} /></Link></PageHero>
    <section className="section"><div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20"><Reveal><p className="label-sm mb-5">Our mission</p><h2 className="display">Make retirement decisions clear enough to make with confidence.</h2></Reveal><Reveal delay={0.1} className="space-y-5 text-[17px] leading-8"><p>Annuities, life insurance, long-term care, Medicare and disability income are the products people buy once, keep for decades and rarely fully understand. NXT Financial was founded on a simple belief: clients deserve an advisor who explains every option in plain language, compares the whole market on their behalf, and stays reachable for the life of the plan.</p><p>We are an independent agency. We hold appointments with carriers rated A- or better by AM Best, we carry no quota with any of them, and we are paid by the carrier that earns your business, never by you.</p></Reveal></div></section>
    <section id="why-nxt" className="section bg-stone"><div className="container"><Reveal className="mb-12 max-w-[640px]"><p className="label-sm mb-5">How we sound</p><h2 className="display">Four words we hold ourselves to.</h2></Reveal><Stagger as="ul" className="grid grid-cols-1 gap-5 md:grid-cols-2">{PRINCIPLES.map(([t, b]) => <Item as="li" key={t} className="card rounded-[24px] p-8"><h3 className="display-sm">{t}</h3><p className="mt-3 text-[15px] text-ink-soft">{b}</p></Item>)}</Stagger></div></section>

    {/* Leadership */}
    <section id="team" className="section"><div className="container"><Reveal className="mb-12 max-w-[600px]"><p className="label-sm mb-5">Leadership</p><h2 className="display">The people leading NXT Financial.</h2></Reveal><TeamGrid members={leadership} cols="md:grid-cols-5" /></div></section>

    {/* Core Team */}
    <section className="section bg-stone"><div className="container"><Reveal className="mb-12 max-w-[600px]"><p className="label-sm mb-5">Core team</p><h2 className="display">The people who make it happen.</h2></Reveal><TeamGrid members={coreTeam} cols="md:grid-cols-4" /></div></section>

    {/* Advisors */}
    <section className="section"><div className="container"><Reveal className="mb-12 max-w-[600px]"><p className="label-sm mb-5">Advisors</p><h2 className="display">Seasoned advisors across insurance &amp; technology.</h2></Reveal><TeamGrid members={advisors} cols="md:grid-cols-4" /></div></section>

    {/* Advisors by State */}
    <AgentsByState />

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
  </>)
}
