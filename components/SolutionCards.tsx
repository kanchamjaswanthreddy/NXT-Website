import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { solutions } from '@/lib/solutions'
import { Stagger, Item } from './motion'

export default function SolutionCards() {
  const [first, ...rest] = solutions
  return (
    <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
      <Item className="md:col-span-2 lg:row-span-2">
        <Link href={`/solutions/${first.slug}`} className="card card-hover group relative block h-full min-h-[420px] overflow-hidden rounded-[28px]">
          <Image src={first.image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/45 to-transparent" />
          <div className="on-dark absolute inset-x-0 bottom-0 p-8 md:p-10">
            <h3 className="display text-white">{first.title}</h3>
            <p className="mt-3 max-w-[460px] text-[15px]">{first.short} {first.sub.map((s) => s.name).slice(0, 3).join(' · ')}.</p>
            <span className="link mt-5 text-sunrise">Explore {first.title.toLowerCase()} <ArrowUpRight size={16} /></span>
          </div>
        </Link>
      </Item>
      {rest.map((s) => (
        <Item key={s.slug}>
          <Link href={`/solutions/${s.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden rounded-[24px]">
            <div className="relative aspect-[16/10] bg-stone"><Image src={s.image} alt="" fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" style={{ filter: 'saturate(0.85)' }} /></div>
            <div className="flex flex-1 flex-col p-6"><h3 className="display-sm text-[1.4rem]">{s.title}</h3><p className="mt-2 flex-1 text-[14px] text-ink-soft">{s.short}</p><span className="link mt-4 text-sm">Learn more <ArrowUpRight size={15} /></span></div>
          </Link>
        </Item>
      ))}
    </Stagger>
  )
}
