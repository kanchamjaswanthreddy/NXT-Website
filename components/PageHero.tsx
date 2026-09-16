import Image from 'next/image'
import type { ReactNode } from 'react'
import { Reveal } from './motion'

interface Props { eyebrow?: string; title: string; intro?: string; image?: string; imageAlt?: string; children?: ReactNode; numeral?: string }

/** Light editorial page opener: text left, photograph right. */
export default function PageHero({ eyebrow, title, intro, image, imageAlt = '', children, numeral }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-stone"><div aria-hidden="true" className="glow -right-32 -top-32 h-[480px] w-[480px] bg-sunrise/20" />
      <div className={`container grid grid-cols-1 gap-10 pb-16 pt-32 md:pt-40 ${image ? 'lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:pb-0' : 'lg:pb-24'}`}>
        <div className={image ? 'lg:pb-20' : 'max-w-[860px]'}>
          {eyebrow && <Reveal><p className="label-sm mb-6">{eyebrow}</p></Reveal>}
          {numeral && <Reveal><p className="numeral mb-2 text-5xl">{numeral}</p></Reveal>}
          <Reveal delay={0.08}><h1 className="display-xl text-navy">{title}</h1></Reveal>
          {intro && <Reveal delay={0.16}><p className="lead mt-7 max-w-[600px] text-ink-soft">{intro}</p></Reveal>}
          {children && <Reveal delay={0.24}><div className="mt-9">{children}</div></Reveal>}
        </div>
        {image && (
          <Reveal delay={0.2} className="arch frame-gold relative mb-12 aspect-[4/3] lg:mb-16 lg:aspect-[5/4]">
            <div className="photo"><Image src={image} alt={imageAlt} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" style={{ filter: 'saturate(0.85)' }} /></div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
