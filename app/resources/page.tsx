import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/PageHero'
import PlanningTools from '@/components/PlanningTools'
import { Reveal, Stagger, Item } from '@/components/motion'
export const metadata: Metadata = { title: 'Planning Tools', description: 'Retirement income gap, life insurance needs and long-term care cost calculators from NXT Financial Group.' }
const GUIDES = [['Turning 65: your Medicare enrollment timeline', 'The seven-month window, what happens if you miss it, and how employer coverage changes the rules.', 'Medicare'], ['Reading an annuity illustration', 'Caps, participation rates, spreads and rider fees, explained line by line.', 'Annuities'], ['The annual protection review', 'A one-page checklist to run every year so coverage keeps pace with your life.', 'Planning'], ['Own-occupation, explained', 'Why the definition of disability matters more than the monthly benefit.', 'Disability income']]
export default function ResourcesPage() {
  return (<><PageHero eyebrow="Planning tools" title="Know roughly where you stand before we talk." intro="Three calculators and a set of short guides, written by the advisors you would be speaking with." image="/images/desk.png" /><PlanningTools />
    <section className="section bg-stone"><div className="container"><Reveal className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><p className="label-sm mb-5">Guides</p><h2 className="display">Read before you decide.</h2></div><Link href="/insights" className="link">All insights <ArrowRight size={16} /></Link></Reveal>
      <Stagger as="ul" className="grid grid-cols-1 gap-5 md:grid-cols-2">{GUIDES.map(([t, d, c]) => <Item as="li" key={t}><Link href="/insights" className="card card-hover block h-full rounded-[20px] p-7"><p className="mono mb-3 text-xs text-gold">{c}</p><h3 className="display-sm text-[1.5rem]">{t}</h3><p className="mt-2 text-[15px] text-ink-soft">{d}</p></Link></Item>)}</Stagger></div></section></>)
}
