'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IncomeGapCalculator from './calculators/IncomeGapCalculator'
import LifeCalculator from './calculators/LifeCalculator'
import CareCostCalculator from './calculators/CareCostCalculator'
import AnnuityCalculator from './calculators/AnnuityCalculator'
import FourOhOneKCalculator from './calculators/FourOhOneKCalculator'
import RuleOf72Calculator from './calculators/RuleOf72Calculator'
import MortgageCalculator from './calculators/MortgageCalculator'
import SmokingCostCalculator from './calculators/SmokingCostCalculator'
import BreakfastCalculator from './calculators/BreakfastCalculator'

const TABS = [
  { id: 'income', label: 'Retirement gap', C: IncomeGapCalculator },
  { id: 'life', label: 'Life insurance', C: LifeCalculator },
  { id: 'care', label: 'Care cost', C: CareCostCalculator },
  { id: 'annuity', label: 'Annuity', C: AnnuityCalculator },
  { id: '401k', label: '401(k)', C: FourOhOneKCalculator },
  { id: 'rule72', label: 'Rule of 72', C: RuleOf72Calculator },
  { id: 'mortgage', label: 'Mortgage', C: MortgageCalculator },
  { id: 'smoking', label: 'Smoking cost', C: SmokingCostCalculator },
  { id: 'breakfast', label: 'Breakfast savings', C: BreakfastCalculator },
] as const

function getInitialTab(): string {
  if (typeof window === 'undefined') return 'income'
  const hash = window.location.hash.replace('#', '')
  const match = TABS.find((t) => t.id === hash)
  return match ? match.id : 'income'
}

export default function CalculatorTabs() {
  const [tab, setTab] = useState('income')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTab(getInitialTab())
    function onHashChange() {
      const hash = window.location.hash.replace('#', '')
      const match = TABS.find((t) => t.id === hash)
      if (match) setTab(match.id)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function selectTab(id: string) {
    setTab(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  const Active = TABS.find((t) => t.id === tab)!.C

  return (
    <section className="section">
      <div className="container">
        {/* Sticky horizontal tab bar */}
        <div className="sticky top-[84px] z-30 -mx-4 border-b border-platinum bg-white/92 px-4 backdrop-blur md:-mx-0 md:px-0">
          <div ref={scrollRef} role="tablist" aria-label="Calculators" className="no-scrollbar flex gap-1 overflow-x-auto py-3">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => selectTab(id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  tab === id
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-ink-soft hover:bg-stone hover:text-navy'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Calculator + Chart — each calculator renders its own two-column grid */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              role="tabpanel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <Active />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
