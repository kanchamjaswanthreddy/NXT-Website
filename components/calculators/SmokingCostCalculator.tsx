'use client'
import { useState, useMemo } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
import CalcChart from './CalcChart'

export default function SmokingCostCalculator() {
  const [packs, setPacks] = useState(1)
  const [price, setPrice] = useState(10)
  const [years, setYears] = useState(20)
  const annual = packs * price * 365
  const totalSpent = Math.round(annual * years)
  const r = 0.07 / 12
  const n = years * 12
  const monthlyContrib = annual / 12
  const invested = Math.round(monthlyContrib * ((Math.pow(1 + r, n) - 1) / r))

  const chartData = useMemo(() => {
    const points = []
    for (let y = 0; y <= years; y++) {
      const months = y * 12
      const cumSpent = Math.round(annual * y)
      const cumInvested = Math.round(monthlyContrib * ((Math.pow(1 + r, months) - 1) / r))
      points.push({ year: y, spent: cumSpent, invested: cumInvested })
    }
    return points
  }, [annual, years, monthlyContrib, r])

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="card rounded-[24px] p-7 md:p-8">
        <h3 className="display-sm">Cost of smoking</h3>
        <p className="mb-6 mt-1 text-[15px] text-ink-soft">What your smoking habit costs outright, and what that money could become if invested instead.</p>
        <div className="space-y-5">
          <Slider id="sc-pk" label="Packs per day" value={packs} display={`${packs}`} min={0.5} max={3} step={0.5} onChange={setPacks} minLabel="0.5" maxLabel="3" />
          <Slider id="sc-pr" label="Price per pack" value={price} display={usd(price)} min={5} max={20} step={0.5} onChange={setPrice} minLabel="$5" maxLabel="$20" />
          <Slider id="sc-yr" label="Years of smoking" value={years} display={`${years} yrs`} min={1} max={40} step={1} onChange={setYears} minLabel="1" maxLabel="40" />
        </div>
        <dl className="mono mt-6 grid grid-cols-2 gap-4 text-sm">
          <div><dt className="text-ink-soft">Total spent</dt><dd className="text-navy">{usd(totalSpent)}</dd></div>
          <div><dt className="text-ink-soft">Daily cost</dt><dd className="text-navy">{usd(packs * price)}</dd></div>
        </dl>
        <Result label="If invested at 7% instead" value={usd(invested)} note={`That's ${usd(totalSpent)} in direct spending alone. Invested monthly at a 7% average return, the same money could have grown to ${usd(invested)}. Does not include health-related savings.`} />
      </div>
      <CalcChart
        type="dual-area"
        data={chartData}
        xKey="year"
        xLabel="Years"
        series={[
          { key: 'spent', label: 'Cumulative spend', color: '#E85D3A' },
          { key: 'invested', label: 'If invested at 7%', color: '#C8A951' },
        ]}
      />
    </div>
  )
}
