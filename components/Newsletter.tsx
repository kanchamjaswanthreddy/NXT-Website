'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import Swoosh from './Swoosh'

export default function Newsletter() {
  const [done, setDone] = useState(false)
  return (
    <section className="relative isolate overflow-hidden bg-navy on-dark">
      <Swoosh className="absolute -right-24 bottom-0 h-full w-[60%]" opacity={0.1} />
      <div aria-hidden="true" className="glow -left-20 top-0 h-[400px] w-[400px] bg-sunrise/20" />
      <div className="container relative grid grid-cols-1 items-center gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="label-sm mb-5">The NXT Brief</p>
          <h2 className="display">Retirement, one idea at a time.</h2>
          <p className="lead mt-5 max-w-[520px]">A short monthly note on annuity rates, Medicare deadlines and the questions our clients are asking. No selling, unsubscribe any time.</p>
          <ul className="mt-6 space-y-2 text-[15px]">{['Plain-language explanations', 'Enrollment and deadline reminders', 'What changed in the market this month'].map((t) => <li key={t} className="flex items-center gap-2.5"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-midnight"><Check size={11} strokeWidth={3} /></span>{t}</li>)}</ul>
        </div>
        <div className="glass p-8 md:p-10">
          {done ? <p className="font-display text-2xl font-semibold text-white">You&rsquo;re on the list. First note lands next month.</p> : (
            <form onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
              <label htmlFor="nl-email" className="mb-2 block text-sm font-semibold text-white">Email address</label>
              <div className="flex flex-col gap-3 sm:flex-row"><input id="nl-email" type="email" required placeholder="you@example.com" className="field flex-1 border-white/20 bg-white/10 text-white placeholder:text-silver focus:border-gold" /><button className="btn btn-cta">Subscribe <ArrowRight size={16} /></button></div>
              <p className="mono mt-4 text-xs text-silver">Free. Unsubscribe any time.</p>
            </form>
          )}
          <div className="mt-8 flex items-center gap-4 border-t border-white/15 pt-6"><Image src="/logo.png" alt="NXT Financial Group" width={110} height={49} className="h-8 w-auto brightness-0 invert opacity-80" /><p className="text-xs text-silver">Written by the advisors you would be speaking with.</p></div>
        </div>
      </div>
    </section>
  )
}
