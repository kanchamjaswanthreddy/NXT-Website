import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import PageHero from '@/components/PageHero'
import PartnerForm from '@/components/PartnerForm'
import { Reveal, Stagger, Item } from '@/components/motion'
export const metadata: Metadata = { title: 'Partner With Us — IMO Agent Network', description: 'Join the NXT Financial Group IMO partner network: 70+ top-rated carriers, competitive commissions, case design support and back-office services for independent agents and advisors.' }
const BENEFITS = ['Appointments with A-rated annuity, life, LTC, Medicare and DI carriers', 'Transparent, structured compensation, every level earned through production', 'Case design and advanced planning support', 'Certified training modules plus weekly live coaching', 'Back-office, contracting and compliance support', 'Co-branded marketing and lead programs']
export default function PartnerPage() {
  return (
    <>
      <PageHero eyebrow="For advisors" title="Your production is your promotion." intro="We provide the platform, the products and the people. You build the business. NXT partners with independent agents and financial professionals who want an annuity, life, care, Medicare and disability platform behind them." image="/images/team.png" />
      <section className="section"><div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <div className="lg:sticky lg:top-28"><Reveal><p className="label-sm mb-5">What partners get</p><h2 className="display mb-5">A structured arrangement, every level of it earned.</h2></Reveal>
          <Stagger as="ul" className="mt-8 space-y-3">{BENEFITS.map((b) => <Item as="li" key={b} className="flex items-start gap-3 text-[16px]"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-white"><Check size={13} strokeWidth={3} /></span>{b}</Item>)}</Stagger></div>
        <Reveal delay={0.1}><PartnerForm /></Reveal>
      </div></section>
    </>
  )
}
