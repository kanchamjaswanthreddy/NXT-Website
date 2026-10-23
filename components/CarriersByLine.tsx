'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { carrierGroups, stateNames, whiteLogos } from '@/lib/carriers'
import UsaMap from './UsaMap'

export default function CarriersByLine() {
  const [q, setQ] = useState('')
  const [state, setState] = useState('')
  return (
    <>
      <div className="sticky top-[84px] z-30 border-b border-platinum bg-white/92 backdrop-blur">
        <div className="container flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Solutions" className="no-scrollbar flex gap-6 overflow-x-auto text-sm font-medium">{carrierGroups.map((g) => <a key={g.key} href={`#${g.key}`} className="shrink-0 py-2 text-ink hover:text-navy">{g.title}</a>)}</nav>
          <div className="flex gap-2"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search carriers" aria-label="Search carriers" className="field w-full md:w-52" /><select value={state} onChange={(e) => setState(e.target.value)} aria-label="State" className="field w-44"><option value="">All states</option>{Object.entries(stateNames).sort((a, b) => a[1].localeCompare(b[1])).map(([a, n]) => <option key={a} value={a}>{n}</option>)}</select></div>
        </div>
      </div>
      <section className="py-16 md:py-20 bg-stone">
        <div className="container grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div><p className="label-sm mb-5">Licensed nationwide</p><h2 className="display">Across the United States{state && <>, including <span className="text-gold">{stateNames[state]}</span></>}.</h2><p className="lead mt-5 text-ink-soft">Select a state to confirm availability. Carrier appointments and plan availability vary by state and are confirmed at quote.</p></div>
          <UsaMap selected={state} onSelect={setState} />
        </div>
      </section>
      {carrierGroups.map((g) => {
        const list = g.carriers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))
        return (
          <section key={g.key} id={g.key} className="scroll-mt-40 py-16 md:py-20" style={{ background: 'linear-gradient(135deg, #fdf8ef 0%, #faf3e2 50%, #f7efd8 100%)' }}>
            <div className="container">
              <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mono text-sm text-gold">{list.length} carriers</p>
                  <h2 className="display-sm mt-2">{g.title}</h2>
                </div>
                <Link href={`/solutions/${g.solution}`} className="link text-sm">About {g.title.toLowerCase()} <ArrowUpRight size={15} /></Link>
              </div>
              <div className="rounded-[20px] bg-white p-6 shadow-soft md:p-10">
                <AnimatePresence mode="popLayout">
                  {list.length ? (
                    <motion.ul layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {list.map((c) => (
                        <motion.li layout key={c.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-xl border border-platinum/60 bg-stone/40 transition-shadow hover:shadow-soft">
                          {c.logo ? <Image src={c.logo} alt={c.name} fill className={`object-contain p-2${whiteLogos.has(c.slug) ? ' invert' : ''}`} sizes="(min-width:1024px) 200px, (min-width:768px) 25vw, 50vw" unoptimized /> : <span className="text-center font-semibold leading-tight text-navy">{c.name}</span>}
                        </motion.li>
                      ))}
                    </motion.ul>
                  ) : <p className="text-ink-soft">No {g.title.toLowerCase()} carriers match &ldquo;{q}&rdquo;.</p>}
                </AnimatePresence>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
