import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SolutionsIndex from '@/components/SolutionsIndex'
import FutureFlowSection from '@/components/FutureFlowSection'
import { Reveal } from '@/components/motion'

export const metadata: Metadata = {
  title: 'Insurance Solutions — 6 Disciplines + FutureFlow',
  description: 'Annuities, life insurance, care planning, Medicare planning, disability income, home & auto insurance, and FutureFlow — AI-powered personal finance. Six disciplines, 70+ carriers, one IMO.',
  alternates: { canonical: 'https://www.nxtfinancialgroup.com/solutions' },
}

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Six disciplines that protect what matters. One place to plan them all."
        intro="From retirement income to your front door — we cover the decisions that shape your financial life, and we do them for a living."
      />

      <section className="section pt-0">
        <div className="container">
          <Reveal>
            <SolutionsIndex />
          </Reveal>
        </div>
      </section>

      <FutureFlowSection />
    </>
  )
}
