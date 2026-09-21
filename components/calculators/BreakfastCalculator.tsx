'use client'
import { useState, useMemo } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
import CalcDashboard, { Kpi, MiniArea, MiniBar, ChartBlock, fmt } from './CalcChart'

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
  const totalSaved = annualSave * years

  const areaData = useMemo(() => {
    const points = []
    for (let y = 0; y <= years; y++) {
      const months = y * 12
      const cumSpent = Math.round(annualSpend * y)
      const cumSaved = monthlySave > 0 ? Math.round(monthlySave * ((Math.pow(1 + r, months) - 1) / r)) : 0
      points.push({ year: y, spent: cumSpent, invested: cumSaved })
    }
    return points
  }, [years, annualSpend, monthlySave, r])

  const milestoneData = useMemo(() => {
    const milestones = [5, 10, 20].filter(y => y <= years || y === 5)
    return milestones.map(y => {
      const m = y * 12
      return {
        name: `${y} yrs`,
        spent: Math.round(annualSpend * y),
        saved: monthlySave > 0 ? Math.round(monthlySave * ((Math.pow(1 + r, m) - 1) / r)) : 0,
      }
    })
  }, [years, annualSpend, monthlySave, r])

  const kpis: Kpi[] = [
    { label: 'Annual savings', value: usd(annualSave), icon: 'coffee', color: 'gold', trend: savings > 0 ? 'up' : 'neutral' },
    { label: 'If invested at 7%', value: fmt(invested), icon: 'trending', color: 'green', trend: 'up' },
    { label: 'Annual spend (out)', value: usd(annualSpend), icon: 'dollar', color: 'red' },
    { label: 'Daily savings', value: usd(savings), icon: 'piggy', color: 'navy', sub: `${260} workdays/yr` },
  ]

  const progress = [
    { label: 'Total eating out', value: totalSpent, max: Math.max(totalSpent, invested), color: '#E85D3A', displayValue: fmt(totalSpent) },
    { label: 'Total saved (raw)', value: totalSaved, max: Math.max(totalSpent, invested), color: '#0B1D3A', displayValue: fmt(totalSaved) },
    { label: 'Invested value', value: invested, max: Math.max(totalSpent, invested), color: '#C8A951', displayValue: fmt(invested) },
  ]

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
        <Result label="Savings invested at 7% instead" value={usd(invested)} note={`You spend ${usd(totalSpent)} on breakfast over ${years} years. Switching to homemade saves ${usd(savings)}/day — invested monthly at 7%, that grows to ${usd(invested)}.`} />
      </div>
      <CalcDashboard kpis={kpis} progress={progress} comparisons={[
        { label: 'Total spent eating out', value: fmt(totalSpent), color: '#E85D3A' },
        { label: 'Invested savings', value: fmt(invested), color: '#C8A951' },
      ]}>
        <ChartBlock title="Spending vs investing over time">
          <MiniArea data={areaData} xKey="year" series={[
            { key: 'spent', label: 'Cumulative spend', color: '#E85D3A' },
            { key: 'invested', label: 'If savings invested', color: '#C8A951' },
          ]} />
        </ChartBlock>
        <ChartBlock title="Milestone comparison">
          <MiniBar data={milestoneData} xKey="name" series={[
            { key: 'spent', label: 'Spent eating out', color: '#E85D3A' },
            { key: 'saved', label: 'Invested savings', color: '#C8A951' },
          ]} />
        </ChartBlock>
      </CalcDashboard>
    </div>
  )
}
