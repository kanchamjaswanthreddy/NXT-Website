import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import CarriersByLine from '@/components/CarriersByLine'
import LifeProductTable from '@/components/LifeProductTable'
export const metadata: Metadata = { title: 'Carrier Partners — 70+ Appointed Carriers', description: 'See every A-rated insurance carrier NXT Financial Group represents — annuities, life insurance, long-term care, Medicare, disability income and home & auto, organized by solution line.' }
export default function CarriersPage() {
  return (<><PageHero eyebrow="Carrier partners" title="The carriers behind the guarantees, organized by solution." intro="A promise to pay is only as good as the company making it. We represent carriers rated A- or better by AM Best, and we compare them for you." /><CarriersByLine /><LifeProductTable /></>)
}
