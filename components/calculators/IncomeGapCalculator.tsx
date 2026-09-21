'use client'
import { useState, useMemo } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
import CalcDashboard, { Kpi, MiniBar, MiniDonut, ChartBlock, fmt } from './CalcChart'

export default function IncomeGapCalculator() {
  const [essentials, setEssentials] = useState(5000)
  const [ss, setSs] = useState(2400)
  const [pension, setPension] = useState(0)
  const gap = Math.max(0, essentials - ss - pension)
  const guaranteed = ss + pension
  const guaranteedPct = Math.min(100, Math.round((guaranteed / essentials) * 100))
  const premium = Math.round((gap * 12) / 0.055)

  const barData = useMemo(() => [
    { name: 'Social Security', value: ss },
    { name: 'Pension', value: pension },
    { name: 'Income gap', value: gap },
  ], [ss, pension, gap])

  const donutData = useMemo(() => [
    { name: 'Guaranteed', value: guaranteed },
    { name: 'Gap', value: gap },
  ], [guaranteed, gap])

  const kpis: Kpi[] = [
    { label: 'Monthly gap', value: usd(gap), icon: 'trending', color: gap > 0 ? 'red' : 'green', trend: gap > 0 ? 'down' : 'up' },
    { label: 'Guaranteed share', value: `${guaranteedPct}%`, icon: 'shield', color: guaranteedPct >= 80 ? 'green' : 'gold' },
    { label: 'Annuity premium', value: fmt(premium), icon: 'dollar', color: 'navy' },
    { label: 'Total guaranteed', value: usd(guaranteed), icon: 'piggy', color: 'green', sub: '/month' },
  ]

  const progress = [
    { label: 'Social Security', value: ss, max: essentials, color: '#C8A951', displayValue: usd(ss) },
    { label: 'Pension', value: pension, max: essentials, color: '#0B1D3A', displayValue: usd(pension) },
    { label: 'Income gap', value: gap, max: essentials, color: '#E85D3A', displayValue: usd(gap) },
  ]

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="card rounded-[24px] p-7 md:p-8">
        <h3 className="display-sm">Retirement income gap</h3>
        <p className="mb-6 mt-1 text-[15px] text-ink-soft">How much of your essential spending is guaranteed, and what an annuity would need to cover the rest.</p>
        <div className="space-y-5">
          <Slider id="ig-ess" label="Essential monthly expenses" value={essentials} display={usd(essentials)} min={1500} max={15000} step={100} onChange={setEssentials} minLabel="$1.5k" maxLabel="$15k" />
          <Slider id="ig-ss" label="Social Security (monthly, household)" value={ss} display={usd(ss)} min={0} max={8000} step={50} onChange={setSs} minLabel="$0" maxLabel="$8k" />
          <Slider id="ig-pen" label="Pension or other guaranteed income" value={pension} display={usd(pension)} min={0} max={8000} step={50} onChange={setPension} minLabel="$0" maxLabel="$8k" />
        </div>
        <Result label="Approximate annuity premium to close the gap" value={usd(premium)} note="Assumes a 5.5% lifetime payout rate at age 65, a mid-range figure. Actual payout rates depend on age, carrier and contract; an advisor will run exact numbers." />
      </div>
      <CalcDashboard kpis={kpis} progress={progress} comparisons={[
        { label: 'Guaranteed income', value: usd(guaranteed), color: '#C8A951' },
        { label: 'Remaining gap', value: usd(gap), color: '#E85D3A' },
      ]}>
        <ChartBlock title="Income sources">
          <MiniBar data={barData} xKey="name" series={[{ key: 'value', label: 'Monthly income', color: '#C8A951' }]} />
        </ChartBlock>
        <ChartBlock title="Coverage breakdown">
          <MiniDonut data={donutData} series={[
            { key: 'guaranteed', label: 'Guaranteed', color: '#C8A951' },
            { key: 'gap', label: 'Gap', color: '#E85D3A' },
          ]} />
        </ChartBlock>
      </CalcDashboard>
    </div>
  )
}
