'use client'
import { useState } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
export default function RuleOf72Calculator() {
  const [rate, setRate] = useState(7); const [investment, setInvestment] = useState(50000)
  const yearsToDouble = Math.round((72 / rate) * 10) / 10
  const doubled = investment * 2; const tripled = investment * 8
  return (
    <div className="card rounded-[24px] p-7 md:p-8">
      <h3 className="display-sm">Rule of 72</h3><p className="mb-6 mt-1 text-[15px] text-ink-soft">A quick way to estimate how long it takes your money to double.</p>
      <div className="space-y-5">
        <Slider id="r72-rate" label="Annual return rate" value={rate} display={`${rate}%`} min={1} max={20} step={0.5} onChange={setRate} minLabel="1%" maxLabel="20%" />
        <Slider id="r72-inv" label="Initial investment" value={investment} display={usd(investment)} min={1000} max={1000000} step={1000} onChange={setInvestment} minLabel="$1k" maxLabel="$1M" />
      </div>
      <dl className="mono mt-6 grid grid-cols-3 gap-4 text-sm"><div><dt className="text-ink-soft">1st doubling</dt><dd className="text-navy">{usd(doubled)}</dd></div><div><dt className="text-ink-soft">2nd doubling</dt><dd className="text-navy">{usd(doubled * 2)}</dd></div><div><dt className="text-ink-soft">3rd doubling</dt><dd className="text-navy">{usd(tripled)}</dd></div></dl>
      <Result label="Years to double your money" value={`${yearsToDouble} yrs`} note={`At ${rate}% annual return, ${usd(investment)} becomes ${usd(tripled)} after three doublings (~${Math.round(yearsToDouble * 3)} years). Assumes compounding with no withdrawals.`} />
    </div>
  )
}
