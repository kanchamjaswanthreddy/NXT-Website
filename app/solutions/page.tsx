import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SolutionsIndex from '@/components/SolutionsIndex'
import { Reveal } from '@/components/motion'
export const metadata: Metadata = { title: 'Solutions', description: 'Annuities, life insurance, care planning, Medicare planning, disability income and home & auto insurance from NXT Financial Group.' }
export default function SolutionsPage() {
  return (<><PageHero eyebrow="Solutions" title="Six disciplines that protect what matters. One place to plan them all." intro="From retirement income to your front door — we cover the decisions that shape your financial life, and we do them for a living." /><section className="section pt-0"><div className="container"><Reveal><SolutionsIndex /></Reveal></div></section></>)
}
