import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import CalculatorTabs from '@/components/CalculatorTabs'

export const metadata: Metadata = {
  title: 'Calculators',
  description: 'Financial calculators for retirement income, life insurance, long-term care, annuities, 401(k), Rule of 72, mortgage, smoking cost and breakfast savings from NXT Financial Group.',
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
