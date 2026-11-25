'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { QA } from '@/lib/faq'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <ul className="divide-y divide-midnight/10 border-y border-midnight/10">
      {QA.map(([q, a], i) => (
        <li key={q}>
          <h3>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={`faq-${i}`} className="flex w-full items-center justify-between gap-6 py-6 text-left md:py-7">
              <span className="text-[1.1875rem] font-semibold tracking-[-.025em] text-midnight md:text-[1.375rem]">{q}</span>
              <motion.span aria-hidden="true" animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-midnight/[.06] text-midnight"><Plus size={18} /></motion.span>
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                <p className="max-w-[620px] pb-7 text-ink-soft">{a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  )
}
