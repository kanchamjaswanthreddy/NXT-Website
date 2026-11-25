import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SolutionCards from '@/components/SolutionCards'

export const metadata: Metadata = {
  title: 'Insurance Solutions — 6 Disciplines',
  description: 'Annuities, life insurance, care planning, Medicare planning, disability income and home & auto insurance. Six disciplines, 70+ carriers, one IMO.',
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

      <section className="section bg-white">
        <div className="container">
          <SolutionCards />
        </div>
      </section>

    </>
  )
}
