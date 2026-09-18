import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, Stagger, Item } from '@/components/motion'
import { leadership, coreTeam, advisors } from '@/lib/team'
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

    <section className="relative isolate overflow-hidden bg-midnight on-dark"><Image src="/images/team-meeting.png" alt="" fill sizes="100vw" className="object-cover opacity-25" style={{ filter: 'saturate(0.5)' }} /><div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/85 to-midnight/40" /><div className="container relative grid grid-cols-1 gap-10 py-24 md:grid-cols-2 md:items-center"><Reveal><p className="label-sm mb-5">From the NXT family</p><h2 className="display">FutureFlow: AI personal finance with an advisor behind it.</h2><p className="lead mt-5">NXT is the planning partner inside FutureFlow, an app that tracks spending, plans retirement and flags coverage gaps, with an NXT advisor one tap away.</p></Reveal><Reveal delay={0.1} className="glass p-8"><Image src="/images/futureflow.png" alt="FutureFlow" width={220} height={147} className="mb-6 h-14 w-auto rounded-lg bg-white p-2" /><dl className="grid grid-cols-3 gap-4 border-t border-white/15 pt-6">{[['Spending', 'Tracked live'], ['Retirement', 'Gap analysis'], ['Advisors', 'One tap away']].map(([t, d]) => <div key={t}><dt className="text-sm font-semibold text-white">{t}</dt><dd className="text-sm text-silver">{d}</dd></div>)}</dl></Reveal></div></section>
  </>)
}
