'use client'
import { useState } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
export default function IncomeGapCalculator() {
  const [essentials, setEssentials] = useState(5000)
  const [ss, setSs] = useState(2400)
  const [pension, setPension] = useState(0)
  const gap = Math.max(0, essentials - ss - pension)
  const premium = Math.round((gap * 12) / 0.055)
  return (
    <div className="card rounded-[24px] p-7 md:p-8">
      <h3 className="display-sm">Retirement income gap</h3><p className="mb-6 mt-1 text-[15px] text-ink-soft">How much of your essential spending is guaranteed, and what an annuity would need to cover the rest.</p>
      <div className="space-y-5">
        <Slider id="ig-ess" label="Essential monthly expenses" value={essentials} display={usd(essentials)} min={1500} max={15000} step={100} onChange={setEssentials} minLabel="$1.5k" maxLabel="$15k" />
        <Slider id="ig-ss" label="Social Security (monthly, household)" value={ss} display={usd(ss)} min={0} max={8000} step={50} onChange={setSs} minLabel="$0" maxLabel="$8k" />
        <Slider id="ig-pen" label="Pension or other guaranteed income" value={pension} display={usd(pension)} min={0} max={8000} step={50} onChange={setPension} minLabel="$0" maxLabel="$8k" />
      </div>
      <dl className="mono mt-6 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-ink-soft">Monthly gap</dt><dd className="text-navy">{usd(gap)}</dd></div><div><dt className="text-ink-soft">Guaranteed share</dt><dd className="text-navy">{Math.min(100, Math.round(((ss + pension) / essentials) * 100))}%</dd></div></dl>
      <Result label="Approximate annuity premium to close the gap" value={usd(premium)} note="Assumes a 5.5% lifetime payout rate at age 65, a mid-range figure. Actual payout rates depend on age, carrier and contract; an advisor will run exact numbers." />
    </div>
  )
}
