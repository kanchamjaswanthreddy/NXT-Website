'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const QA = [
  ['Does it cost anything to work with NXT?', 'No. We are compensated by the carrier that issues your policy or contract. You never pay us a fee, and our compensation does not change the rate you receive.'],
  ['Are you tied to one insurance company?', 'No. We are independent and hold appointments with many carriers rated A- or better by AM Best. We carry no quota with any of them, so the recommendation is the one that fits.'],
  ['I am turning 65. When should I call?', 'Ideally three to six months before your birthday. Your initial enrollment window opens three months before the month you turn 65 and closes three months after.'],
  ['Can you review policies I already own?', 'Yes. A policy review is often the most useful first meeting: we look at what you have, what it costs and whether it still does the job.'],
  ['Where are you licensed?', 'Our headquarters is in Everett, Massachusetts, and we are licensed to serve clients in all 50 states.'],
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <ul className="divide-y divide-platinum border-y border-platinum">
      {QA.map(([q, a], i) => (
        <li key={q}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-6 text-left">
            <span className="display-sm text-[1.35rem]">{q}</span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${open === i ? 'bg-navy text-white' : 'bg-stone text-navy'}`}><Plus size={18} /></motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"><p className="max-w-[640px] pb-6 text-[16px] text-ink-soft">{a}</p></motion.div>}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  )
}
