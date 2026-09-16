import { allCarriers } from '@/lib/carriers'
export default function CarrierTicker() {
  const items = [...allCarriers, ...allCarriers]
  return (
    <div className="marquee overflow-hidden py-2" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
      <ul className="marquee-track flex w-max items-center">
        {items.map((c, i) => <li key={`${c.slug}-${i}`} className="wordmark flex items-center whitespace-nowrap px-7 text-[1.35rem]">{c.name}<span aria-hidden="true" className="ml-14 h-1.5 w-1.5 rounded-full bg-gold" /></li>)}
      </ul>
    </div>
  )
}
