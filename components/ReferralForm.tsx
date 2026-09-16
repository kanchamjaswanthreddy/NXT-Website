'use client'
import { useState } from 'react'
import FormSuccess from './FormSuccess'
const COVERAGE = ['Not sure / a full review', 'Annuities / retirement income', 'Life insurance', 'Care planning', 'Medicare planning', 'Disability income']
export default function ReferralForm() {
  const [f, setF] = useState({ yourName: '', yourEmail: '', refName: '', refEmail: '', refPhone: '', coverage: COVERAGE[0], notes: '' })
  const [done, setDone] = useState(false)
  const on = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF((p) => ({ ...p, [e.target.name]: e.target.value }))
  if (done) return <FormSuccess title="Referral sent." body="We will reach out to them within one business day and keep you posted." />
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true) }} className="card rounded-[24px] p-7 md:p-10">
      <h2 className="display-sm mb-8">Submit a referral</h2>
      <fieldset className="mb-8"><legend className="h3 mb-4">About you</legend><div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><div><label className="field-label" htmlFor="yn">Your name</label><input id="yn" name="yourName" required value={f.yourName} onChange={on} className="field" /></div><div><label className="field-label" htmlFor="ye">Your email</label><input id="ye" name="yourEmail" type="email" required value={f.yourEmail} onChange={on} className="field" /></div></div></fieldset>
      <fieldset><legend className="h3 mb-4">About the person you are referring</legend><div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><div><label className="field-label" htmlFor="rn">Their name</label><input id="rn" name="refName" required value={f.refName} onChange={on} className="field" /></div><div><label className="field-label" htmlFor="rp">Their phone</label><input id="rp" name="refPhone" type="tel" value={f.refPhone} onChange={on} className="field" /></div><div><label className="field-label" htmlFor="re">Their email</label><input id="re" name="refEmail" type="email" value={f.refEmail} onChange={on} className="field" /></div><div><label className="field-label" htmlFor="rc">What they are thinking about</label><select id="rc" name="coverage" value={f.coverage} onChange={on} className="field">{COVERAGE.map((c) => <option key={c}>{c}</option>)}</select></div><div className="sm:col-span-2"><label className="field-label" htmlFor="rnotes">Notes</label><textarea id="rnotes" name="notes" rows={3} value={f.notes} onChange={on} className="field" placeholder="Best time to reach them, current situation…" /></div></div></fieldset>
      <button type="submit" className="btn btn-primary mt-8 w-full sm:w-auto">Send referral</button>
      <p className="mono mt-4 text-xs text-ink-soft">Please make sure they are happy to hear from us before you send.</p>
    </form>
  )
}
