'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IncomeGapCalculator from './calculators/IncomeGapCalculator'
import LifeCalculator from './calculators/LifeCalculator'
import CareCostCalculator from './calculators/CareCostCalculator'
import { Reveal } from './motion'
const TABS = [{ id: 'income', label: 'Retirement income gap', C: IncomeGapCalculator }, { id: 'life', label: 'Life insurance needs', C: LifeCalculator }, { id: 'care', label: 'Long-term care cost', C: CareCostCalculator }]
export default function PlanningTools() {
  const [tab, setTab] = useState('income'); const Active = TABS.find((t) => t.id === tab)!.C
  return (
    <section className="section">
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-32"><Reveal><p className="label-sm mb-5">Planning tools</p><h2 className="display">Rough, honest numbers.</h2><p className="lead mt-5 text-ink-soft">Each tool states its own assumptions. None of them is a quote, and all of them are a good place to start the conversation.</p></Reveal>
          <div role="tablist" aria-label="Tools" className="mt-8 flex flex-col gap-1 border-l border-platinum">{TABS.map(({ id, label }) => <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`-ml-px border-l-2 py-3 pl-5 text-left text-[15px] font-medium transition-colors ${tab === id ? 'border-gold text-navy' : 'border-transparent text-ink-soft hover:text-navy'}`}>{label}</button>)}</div></div>
        <AnimatePresence mode="wait"><motion.div key={tab} role="tabpanel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}><Active /></motion.div></AnimatePresence>
      </div>
    </section>
  )
}
