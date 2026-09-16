'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { solutions } from '@/lib/solutions'

/** Editorial index: five solution lines as a list; the hovered line's photograph appears alongside. */
export default function SolutionsIndex() {
  const [active, setActive] = useState(0)
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px] lg:gap-20">
      <ol className="hairline">
        {solutions.map((s, i) => (
          <li key={s.slug} className="border-b border-platinum" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
            <Link href={`/solutions/${s.slug}`} className="group grid grid-cols-[56px_1fr_auto] items-center gap-4 py-7 md:py-9">
              <span className="numeral text-3xl">{s.index}</span>
              <span><span className={`display-sm block transition-colors ${active === i ? 'text-navy' : 'text-ink'}`}>{s.title}</span><span className="mt-1 block text-[15px] text-ink-soft">{s.short}</span></span>
              <span className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${active === i ? 'border-navy bg-navy text-white' : 'border-platinum text-navy'}`}><ArrowUpRight size={18} /></span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[28px] bg-stone lg:block lg:sticky lg:top-32 lg:self-start">
        <AnimatePresence mode="wait">
          <motion.div key={solutions[active].slug} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }} className="absolute inset-0">
            <Image src={solutions[active].image} alt="" fill sizes="420px" className="object-cover" style={{ filter: 'saturate(0.85)' }} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/80 to-transparent p-7 on-dark"><p className="font-display text-2xl font-semibold text-white">{solutions[active].headline}</p></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
