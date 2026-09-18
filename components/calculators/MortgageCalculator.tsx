'use client'
import { useState } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
export default function MortgageCalculator() {
  const [price, setPrice] = useState(400000); const [down, setDown] = useState(20); const [rate, setRate] = useState(6.5); const [term, setTerm] = useState(30)
  const loan = price * (1 - down / 100); const r = rate / 100 / 12; const n = term * 12
  const monthly = r > 0 ? Math.round(loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) : Math.round(loan / n)
  const totalPaid = monthly * n; const totalInterest = totalPaid - loan
  return (
    <div className="card rounded-[24px] p-7 md:p-8">
      <h3 className="display-sm">Mortgage payment</h3><p className="mb-6 mt-1 text-[15px] text-ink-soft">Estimate your monthly principal & interest and total cost over the life of the loan.</p>
      <div className="mb-5"><label htmlFor="mc-term" className="field-label">Loan term</label><select id="mc-term" value={term} onChange={(e) => setTerm(Number(e.target.value))} className="field"><option value={15}>15 years</option><option value={30}>30 years</option></select></div>
      <div className="space-y-5">
        <Slider id="mc-price" label="Home price" value={price} display={usd(price)} min={100000} max={2000000} step={10000} onChange={setPrice} minLabel="$100k" maxLabel="$2M" />
        <Slider id="mc-down" label="Down payment" value={down} display={`${down}%`} min={0} max={30} step={1} onChange={setDown} minLabel="0%" maxLabel="30%" />
        <Slider id="mc-rate" label="Interest rate" value={rate} display={`${rate}%`} min={2} max={10} step={0.125} onChange={setRate} minLabel="2%" maxLabel="10%" />
      </div>
      <dl className="mono mt-6 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-ink-soft">Loan amount</dt><dd className="text-navy">{usd(Math.round(loan))}</dd></div><div><dt className="text-ink-soft">Total interest</dt><dd className="text-navy">{usd(totalInterest)}</dd></div></dl>
      <Result label="Monthly payment (P&I)" value={usd(monthly)} note={`Total cost over ${term} years: ${usd(totalPaid)}. Does not include taxes, insurance, or PMI. Rates change daily; an advisor or lender will lock your actual rate.`} />
    </div>
  )
}
