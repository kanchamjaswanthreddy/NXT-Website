import Image from 'next/image'
import { allCarriers } from '@/lib/carriers'
import { Stagger, Item } from './motion'

export default function CarrierWall({ limit = 18 }: { limit?: number }) {
  return (
    <Stagger as="ul" className="grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
      {allCarriers.slice(0, limit).map((c) => (
        <Item as="li" key={c.slug} className="flex items-center justify-center px-2 py-3">
          {c.logo ? <Image src={c.logo} alt={c.name} width={180} height={64} className="h-auto w-full max-w-[140px] object-contain" unoptimized /> : <span className="wordmark text-base leading-tight text-navy">{c.name}</span>}
        </Item>
      ))}
    </Stagger>
  )
}
