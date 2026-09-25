import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import CalculatorTabs from '@/components/CalculatorTabs'

export const metadata: Metadata = {
  title: 'Financial Calculators — Free Planning Tools',
  description: 'Free financial calculators from NXT Financial Group: retirement income, life insurance needs, long-term care costs, annuity comparison, 401(k) growth, Rule of 72, mortgage, smoking cost and breakfast savings.',
  alternates: { canonical: 'https://www.nxtfinancialgroup.com/calculators' },
}

export default function CalculatorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculators"
        title="Run the numbers before you decide."
        intro="Nine interactive calculators with live charts to help you understand your financial picture. All estimates are illustrative — an advisor will run exact numbers."
        image="/images/desk.png"
      />
      <CalculatorTabs />
    </>
  )
}
