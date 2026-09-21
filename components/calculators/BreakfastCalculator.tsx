'use client'
import { useState, useMemo } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
import CalcChart from './CalcChart'

export default function BreakfastCalculator() {
  const [daily, setDaily] = useState(12)
  const [homemade, setHomemade] = useState(3)
  const [years, setYears] = useState(20)

  const savings = Math.max(0, daily - homemade)
  const annualSpend = daily * 260
  const annualSave = savings * 260
  const totalSpent = annualSpend * years
  const r = 0.07 / 12
  const n = years * 12
  const monthlySave = annualSave / 12
  const invested = Math.round(monthlySave * ((Math.pow(1 + r, n) - 1) / r))

  const chartData = useMemo(() => {
    const points = []
    for (let y = 0; y <= years; y++) {
      const months = y * 12
      const cumSpent = Math.round(annualSpend * y)
      const cumSaved = monthlySave > 0 ? Math.round(monthlySave * ((Math.pow(1 + r, months) - 1) / r)) : 0
      points.push({ year: y, spent: cumSpent, invested: cumSaved })
    }
    return points
  }, [daily, homemade, years, annualSpend, monthlySave, r])

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="card rounded-[24px] p-7 md:p-8">
        <h3 className="display-sm">Breakfast savings</h3>
        <p className="mb-6 mt-1 text-[15px] text-ink-soft">What buying breakfast costs you versus making it at home, and what the difference could become.</p>
        <div className="space-y-5">
          <Slider id="bf-daily" label="Daily breakfast spend" value={daily} display={usd(daily)} min={5} max={25} step={1} onChange={setDaily} minLabel="$5" maxLabel="$25" />
          <Slider id="bf-home" label="Homemade cost" value={homemade} display={usd(homemade)} min={1} max={10} step={0.5} onChange={setHomemade} minLabel="$1" maxLabel="$10" />
          <Slider id="bf-yrs" label="Years" value={years} display={`${years} yrs`} min={5} max={40} step={1} onChange={setYears} minLabel="5" maxLabel="40" />
        </div>
        <dl className="mono mt-6 grid grid-cols-2 gap-4 text-sm">
          <div><dt className="text-ink-soft">Annual spend (eating out)</dt><dd className="text-navy">{usd(annualSpend)}</dd></div>
          <div><dt className="text-ink-soft">Annual savings</dt><dd className="text-navy">{usd(annualSave)}</dd></div>
        </dl>
        <Result label="Savings invested at 7% instead" value={usd(invested)} note={`You spend ${usd(totalSpent)} on breakfast over ${years} years. Switching to homemade saves ${usd(savings)}/day — invested monthly at 7%, that grows to ${usd(invested)}.`} />
      </div>
      <CalcChart
        type="dual-area"
        data={chartData}
        xKey="year"
        xLabel="Years"
        series={[
          { key: 'spent', label: 'Cumulative spend', color: '#E85D3A' },
          { key: 'invested', label: 'If savings invested', color: '#C8A951' },
        ]}
      />
    </div>
  )
}
