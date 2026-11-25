import Image from 'next/image'
import { allCarriers, whiteLogos } from '@/lib/carriers'

/** Carrier marks, quiet in grey until hovered. */
export default function CarrierWall({ limit = 18 }: { limit?: number }) {
  return (
    <ul className="logo-wall grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6 lg:gap-y-14">
      {allCarriers.slice(0, limit).map((c) => (
        <li key={c.slug} className="flex items-center justify-center px-2">
          {c.logo ? <Image src={c.logo} alt={c.name} width={180} height={64} className={`h-auto max-h-[52px] w-full max-w-[132px] object-contain${whiteLogos.has(c.slug) ? ' invert' : ''}`} unoptimized /> : <span className="wordmark text-center leading-tight">{c.name}</span>}
        </li>
      ))}
    </ul>
  )
}
