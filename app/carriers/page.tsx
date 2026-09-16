import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import CarriersByLine from '@/components/CarriersByLine'
export const metadata: Metadata = { title: 'Carrier Partners', description: 'The A-rated annuity, life, long-term care, Medicare and disability carriers NXT Financial Group represents, organized by solution.' }
export default function CarriersPage() {
  return (<><PageHero eyebrow="Carrier partners" title="The carriers behind the guarantees, organized by solution." intro="A promise to pay is only as good as the company making it. We represent carriers rated A- or better by AM Best, and we compare them for you." /><CarriersByLine /></>)
}
