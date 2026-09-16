import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import ReferralForm from '@/components/ReferralForm'
import { Reveal, Stagger, Item } from '@/components/motion'
export const metadata: Metadata = { title: 'Refer a Friend', description: 'Refer friends and family to NXT Financial Group. We shop the market for them and thank you when their policy binds.' }
const STEPS = [['Send the referral', 'Their name, contact details and what they are thinking about.'], ['We reach out', 'An advisor contacts them within one business day for a no-cost review.'], ['You get thanked', 'When their plan is in place, you receive a referral thank-you from us.']]
export default function ReferralPage() {
  return (
    <>
      <PageHero eyebrow="Referrals" title="Know someone turning 65, or retiring?" intro="Send them our way. We take care of them the way we took care of you." />
      <section className="section"><div className="container">
        <Stagger as="ol" className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">{STEPS.map(([t, b], i) => <Item as="li" key={t} className="relative border-t-2 border-platinum pt-6"><span aria-hidden="true" className="absolute -top-0.5 left-0 h-0.5 w-14 bg-gold" /><span className="mono mb-3 block text-sm text-gold">Step {i + 1}</span><h2 className="h2 mb-2">{t}</h2><p className="text-[15px] text-ink-soft">{b}</p></Item>)}</Stagger>
        <Reveal className="mx-auto max-w-[800px]"><ReferralForm /></Reveal>
      </div></section>
    </>
  )
}
