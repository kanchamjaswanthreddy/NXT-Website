'use client'
import { useState } from 'react'
import FormSuccess from './FormSuccess'
const TYPES = ['Independent Insurance Agent', 'Financial Advisor / Planner', 'Real Estate Professional', 'Mortgage Broker', 'Other']
export default function PartnerForm() {
  const [f, setF] = useState({ name: '', company: '', email: '', phone: '', type: '', message: '' })
  const [done, setDone] = useState(false)
  const on = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF((p) => ({ ...p, [e.target.name]: e.target.value }))
  if (done) return <FormSuccess title="Application received." body="A partnership specialist will reach out within two business days." />
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true) }} className="card rounded-[24px] p-7 md:p-10">
      <h2 className="display-sm mb-1">Partner application</h2><p className="mb-8 text-[15px] text-ink-soft">Tell us about your practice and we will follow up with next steps.</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div><label className="field-label" htmlFor="p-name">Full name</label><input id="p-name" name="name" required value={f.name} onChange={on} className="field" /></div>
        <div><label className="field-label" htmlFor="p-company">Company or agency</label><input id="p-company" name="company" value={f.company} onChange={on} className="field" /></div>
        <div><label className="field-label" htmlFor="p-email">Email</label><input id="p-email" name="email" type="email" required value={f.email} onChange={on} className="field" /></div>
        <div><label className="field-label" htmlFor="p-phone">Phone</label><input id="p-phone" name="phone" type="tel" value={f.phone} onChange={on} className="field" /></div>
        <div className="sm:col-span-2"><label className="field-label" htmlFor="p-type">Partner type</label><select id="p-type" name="type" required value={f.type} onChange={on} className="field"><option value="">Choose one</option>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
        <div className="sm:col-span-2"><label className="field-label" htmlFor="p-msg">About your business</label><textarea id="p-msg" name="message" rows={4} value={f.message} onChange={on} className="field" placeholder="Lines you write today, states you're licensed in, what you're looking for…" /></div>
      </div>
      <button type="submit" className="btn btn-primary mt-8 w-full sm:w-auto">Submit application</button>
    </form>
  )
}
