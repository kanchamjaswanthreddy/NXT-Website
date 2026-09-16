'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FormSuccess from './FormSuccess'

const COVERAGE = ['Annuities / retirement income', 'Life insurance', 'Care planning (long-term care)', 'Medicare planning', 'Disability income', 'A full review / not sure']
const MAP: Record<string, string> = {}

export default function ContactForm() {
  const sp = useSearchParams()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', zip: sp.get('zip') ?? '', coverageType: MAP[sp.get('line') ?? ''] ?? '', message: '' })
  const [done, setDone] = useState(false)
  const on = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  if (done) return <FormSuccess title="Request received." body="An NXT advisor will reach out within one business day to schedule." />
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true) }} className="card rounded-[24px] p-7 md:p-10">
      <h2 className="display-sm mb-1">Book a consultation</h2><p className="mb-8 text-[15px] text-ink-soft">Forty-five minutes, no cost, no obligation.</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div><label className="field-label" htmlFor="firstName">First name</label><input id="firstName" name="firstName" required value={form.firstName} onChange={on} className="field" autoComplete="given-name" /></div>
        <div><label className="field-label" htmlFor="lastName">Last name</label><input id="lastName" name="lastName" required value={form.lastName} onChange={on} className="field" autoComplete="family-name" /></div>
        <div><label className="field-label" htmlFor="email">Email</label><input id="email" name="email" type="email" required value={form.email} onChange={on} className="field" autoComplete="email" /></div>
        <div><label className="field-label" htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" value={form.phone} onChange={on} className="field" autoComplete="tel" /></div>
        <div><label className="field-label" htmlFor="zip">ZIP code</label><input id="zip" name="zip" inputMode="numeric" value={form.zip} onChange={on} className="field" autoComplete="postal-code" /></div>
        <div><label className="field-label" htmlFor="coverageType">What would you like to discuss?</label><select id="coverageType" name="coverageType" required value={form.coverageType} onChange={on} className="field"><option value="">Choose one</option>{COVERAGE.map((o) => <option key={o}>{o}</option>)}</select></div>
        <div className="sm:col-span-2"><label className="field-label" htmlFor="message">Anything we should know</label><textarea id="message" name="message" rows={4} value={form.message} onChange={on} className="field" placeholder="Retirement date, current policies, what prompted the call…" /></div>
      </div>
      <button type="submit" className="btn btn-primary mt-8 w-full sm:w-auto">Request my consultation</button>
      <p className="mono mt-4 text-xs text-ink-soft">We only use your details to schedule and prepare for your consultation.</p>
    </form>
  )
}
