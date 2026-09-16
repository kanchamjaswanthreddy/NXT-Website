import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SolutionsIndex from '@/components/SolutionsIndex'
import { Reveal } from '@/components/motion'
export const metadata: Metadata = { title: 'Solutions', description: 'Annuities, life insurance, care planning, Medicare planning and disability income from NXT Financial Group.' }
export default function SolutionsPage() {
  return (<><PageHero eyebrow="Solutions" title="Five decisions that shape retirement. One place to make them well." intro="We do not sell auto or home insurance. We do these five things, and we do them for a living." /><section className="section pt-0"><div className="container"><Reveal><SolutionsIndex /></Reveal></div></section></>)
}
