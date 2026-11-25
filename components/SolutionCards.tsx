import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { solutions } from '@/lib/solutions'
import { CHAPTER_MEDIA, small } from '@/lib/media'
import { Stagger, Item } from './motion'

/** Every solution as a photograph with its name and one line (used on the Solutions page). */
export default function SolutionCards() {
  return (
    <Stagger as="ul" className="grid grid-cols-1 gap-x-7 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
      {solutions.map((s) => (
        <Item as="li" key={s.slug}>
          <Link href={`/solutions/${s.slug}`} className="group block">
            <div className="tile aspect-[5/4]">
              <Image src={small(CHAPTER_MEDIA[s.slug]?.src ?? s.image)} alt={CHAPTER_MEDIA[s.slug]?.alt ?? ''} fill sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" />
            </div>
            <h2 className="display-sm mt-6">{s.title}</h2>
            <p className="mt-2 text-ink-soft">{s.short}</p>
            <p className="mt-3 text-[1.0625rem] text-ink-soft">{s.sub.map((p) => p.name).join(', ')}.</p>
            <span className="link mt-4">See {s.title} <ChevronRight size={17} /></span>
          </Link>
        </Item>
      ))}
    </Stagger>
  )
}
