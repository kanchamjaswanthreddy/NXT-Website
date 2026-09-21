'use client'
import { useState, useMemo } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
import CalcChart from './CalcChart'

export default function AnnuityCalculator() {
  const [investment, setInvestment] = useState(250000)
  const [rate, setRate] = useState(5)
  const [payout, setPayout] = useState(20)
  const [deferral, setDeferral] = useState(5)
  const accumulated = investment * Math.pow(1 + rate / 100, deferral)
  const r = rate / 100 / 12
  const n = payout * 12
  const monthly = r > 0 ? Math.round(accumulated * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) : Math.round(accumulated / n)

  const chartData = useMemo(() => {
    const points = []
    // Accumulation phase
    for (let y = 0; y <= deferral; y++) {
      points.push({ year: y, balance: Math.round(investment * Math.pow(1 + rate / 100, y)), phase: 'Growth' })
    }
    // Payout phase
    let balance = Math.round(accumulated)
    for (let y = 1; y <= payout; y++) {
      const withdrawn = monthly * 12
      balance = Math.round(balance * (1 + rate / 100) - withdrawn)
      if (balance < 0) balance = 0
      points.push({ year: deferral + y, balance, phase: 'Payout' })
    }
    return points
  }, [investment, rate, payout, deferral, accumulated, monthly])

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="card rounded-[24px] p-7 md:p-8">
        <h3 className="display-sm">Annuity payout estimator</h3>
        <p className="mb-6 mt-1 text-[15px] text-ink-soft">See how deferral and growth rate affect your monthly retirement income.</p>
        <div className="space-y-5">
          <Slider id="an-inv" label="Initial investment" value={investment} display={usd(investment)} min={50000} max={2000000} step={10000} onChange={setInvestment} minLabel="$50k" maxLabel="$2M" />
          <Slider id="an-rate" label="Annual growth rate" value={rate} display={`${rate}%`} min={3} max={8} step={0.5} onChange={setRate} minLabel="3%" maxLabel="8%" />
          <Slider id="an-pay" label="Payout period" value={payout} display={`${payout} yrs`} min={10} max={30} step={1} onChange={setPayout} minLabel="10" maxLabel="30" />
          <Slider id="an-def" label="Deferral years" value={deferral} display={`${deferral} yrs`} min={0} max={20} step={1} onChange={setDeferral} minLabel="0" maxLabel="20" />
        </div>
        <dl className="mono mt-6 grid grid-cols-2 gap-4 text-sm">
          <div><dt className="text-ink-soft">Accumulated value</dt><dd className="text-navy">{usd(Math.round(accumulated))}</dd></div>
          <div><dt className="text-ink-soft">Total payouts</dt><dd className="text-navy">{usd(monthly * n)}</dd></div>
        </dl>
        <Result label="Estimated monthly payout" value={usd(monthly)} note="Assumes fixed annual growth compounded monthly during payout. Actual annuity rates vary by carrier, age, and contract type; an advisor will quote exact figures." />
      </div>
      <CalcChart
        type="dual-area"
        data={chartData}
        xKey="year"
        xLabel="Year"
        series={[{ key: 'balance', label: 'Account balance', color: '#C8A951' }]}
      />
    </div>
  )
}
