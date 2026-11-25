'use client'
import { useState } from 'react'

export default function Newsletter() {
  const [done, setDone] = useState(false)
  return (
    <section aria-labelledby="brief-h" className="pb-[clamp(3rem,6vw,5rem)] pt-[clamp(4.5rem,10vw,9rem)]">
      <div className="container">
        <div className="tile grid grid-cols-1 !bg-white gap-10 px-7 py-12 md:px-14 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
          <div>
            <p className="chip mb-4">The NXT Brief</p>
            <h2 id="brief-h" className="display">Retirement, one idea at a time.</h2>
            <p className="lead mt-5 max-w-[520px] text-ink-soft">A short monthly note on annuity rates, Medicare deadlines and the questions our clients are asking. No selling, unsubscribe any time.</p>
          </div>
          <div>
            {done ? (
              <p role="status" className="text-[1.375rem] font-semibold tracking-[-.03em] text-midnight">You&rsquo;re on the list. First note lands next month.</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
                <label htmlFor="nl-email" className="field-label">Email address</label>
                <div className="flex flex-col gap-3 sm:flex-row"><input id="nl-email" type="email" required autoComplete="email" placeholder="you@example.com" className="field flex-1" /><button className="btn btn-primary">Subscribe</button></div>
              </form>
            )}
            <ul className="mt-6 space-y-1.5 text-[1.0625rem] text-ink-soft">
              {['Plain-language explanations', 'Enrollment and deadline reminders', 'What changed in the market this month'].map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
