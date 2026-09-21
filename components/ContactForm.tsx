'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SuccessCard from '@/components/SuccessCard'

const COVERAGE_TYPES = [
  'Annuities / retirement income',
  'Life insurance',
  'Care planning (long-term care)',
  'Medicare planning',
  'Disability income',
  'A full review / not sure',
]

export default function ContactForm() {
  const params = useSearchParams()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zip: params.get('zip') ?? '',
    coverageType: params.get('line') ?? '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  if (submitted) {
    return <SuccessCard title="Request received." body="An NXT advisor will reach out within one business day to schedule." />
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="card rounded-[24px] p-7 md:p-10">
      <h2 className="display-sm mb-1">Book a consultation</h2>
      <p className="mb-8 text-[15px] text-ink-soft">Forty-five minutes, no cost, no obligation.</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div><label className="field-label" htmlFor="firstName">First name</label><input id="firstName" name="firstName" required value={form.firstName} onChange={update} className="field" autoComplete="given-name" /></div>
        <div><label className="field-label" htmlFor="lastName">Last name</label><input id="lastName" name="lastName" required value={form.lastName} onChange={update} className="field" autoComplete="family-name" /></div>
        <div><label className="field-label" htmlFor="email">Email</label><input id="email" name="email" type="email" required value={form.email} onChange={update} className="field" autoComplete="email" /></div>
        <div><label className="field-label" htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" value={form.phone} onChange={update} className="field" autoComplete="tel" /></div>
        <div><label className="field-label" htmlFor="zip">ZIP code</label><input id="zip" name="zip" inputMode="numeric" value={form.zip} onChange={update} className="field" autoComplete="postal-code" /></div>
        <div><label className="field-label" htmlFor="coverageType">What would you like to discuss?</label><select id="coverageType" name="coverageType" required value={form.coverageType} onChange={update} className="field"><option value="">Choose one</option>{COVERAGE_TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
        <div className="sm:col-span-2"><label className="field-label" htmlFor="message">Anything we should know</label><textarea id="message" name="message" rows={4} value={form.message} onChange={update} className="field" placeholder="Retirement date, current policies, what prompted the call…" /></div>
      </div>
      <button type="submit" className="btn btn-primary mt-8 w-full sm:w-auto">Request my consultation</button>
      <p className="mono mt-4 text-xs text-ink-soft">We only use your details to schedule and prepare for your consultation.</p>
    </form>
  )
}
