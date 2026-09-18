'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IncomeGapCalculator from './calculators/IncomeGapCalculator'
import LifeCalculator from './calculators/LifeCalculator'
import CareCostCalculator from './calculators/CareCostCalculator'
import AnnuityCalculator from './calculators/AnnuityCalculator'
import FourOhOneKCalculator from './calculators/FourOhOneKCalculator'
import RuleOf72Calculator from './calculators/RuleOf72Calculator'
import MortgageCalculator from './calculators/MortgageCalculator'
import SmokingCostCalculator from './calculators/SmokingCostCalculator'
import { Reveal } from './motion'

const TABS = [
  { id: 'income', label: 'Retirement income gap', C: IncomeGapCalculator },
  { id: 'life', label: 'Life insurance needs', C: LifeCalculator },
  { id: 'care', label: 'Long-term care cost', C: CareCostCalculator },
  { id: 'annuity', label: 'Annuity accumulation', C: AnnuityCalculator },
  { id: '401k', label: '401(k) projection', C: FourOhOneKCalculator },
  { id: 'rule72', label: 'Rule of 72', C: RuleOf72Calculator },
  { id: 'mortgage', label: 'Mortgage payment', C: MortgageCalculator },
  { id: 'smoking', label: 'Cost of smoking', C: SmokingCostCalculator },
] as const

function getInitialTab(): string {
  if (typeof window === 'undefined') return 'income'
  const hash = window.location.hash.replace('#', '')
  const match = TABS.find((t) => t.id === hash)
  return match ? match.id : 'income'
}

export default function CalculatorTabs() {
  const [tab, setTab] = useState('income')

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
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <Reveal>
            <p className="label-sm mb-5">All calculators</p>
            <h2 className="display-sm">Pick a calculator.</h2>
            <p className="lead mt-5 text-ink-soft">
              Each tool states its own assumptions. None of them is a quote, and
              all of them are a good place to start the conversation.
            </p>
          </Reveal>
          <div
            role="tablist"
            aria-label="Calculators"
            className="mt-8 flex flex-col gap-1 border-l border-platinum"
          >
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => selectTab(id)}
                className={`-ml-px border-l-2 py-3 pl-5 text-left text-[15px] font-medium transition-colors ${
                  tab === id
                    ? 'border-gold text-navy'
                    : 'border-transparent text-ink-soft hover:text-navy'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Active />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
