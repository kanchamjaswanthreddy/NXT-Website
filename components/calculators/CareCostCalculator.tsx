'use client'
import { useState, useMemo } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
import CalcDashboard, { Kpi, MiniArea, MiniBar, ChartBlock, fmt } from './CalcChart'

const SETTINGS: Record<string, number> = {
  'Home health aide (44 hrs/wk)': 6300,
  'Assisted living': 5900,
  'Nursing home, semi-private': 9200,
  'Nursing home, private room': 10600,
}

export default function CareCostCalculator() {
  const [setting, setSetting] = useState('Assisted living')
  const [years, setYears] = useState(3)
  const [horizon, setHorizon] = useState(15)
  const monthlyToday = SETTINGS[setting]
  const inflated = monthlyToday * Math.pow(1.035, horizon)
  const total = Math.round(inflated * 12 * years)
  const inflationMultiple = Math.round((inflated / monthlyToday) * 100) / 100

  const areaData = useMemo(() => {
    const points = []
    for (let y = 0; y <= 30; y++) {
      const cost = Math.round(monthlyToday * Math.pow(1.035, y))
      points.push({ year: y, monthly: cost })
    }
    return points
  }, [monthlyToday])

  const compareData = useMemo(() =>
    Object.entries(SETTINGS).map(([name, cost]) => ({
      name: name.split('(')[0].trim(),
      today: cost,
      future: Math.round(cost * Math.pow(1.035, horizon)),
    }))
  , [horizon])

  const kpis: Kpi[] = [
    { label: 'Monthly cost today', value: usd(Math.round(monthlyToday)), icon: 'dollar', color: 'navy' },
    { label: `Monthly in ${horizon} yrs`, value: usd(Math.round(inflated)), icon: 'trending', color: 'red', trend: 'up' },
    { label: 'Total projected cost', value: fmt(total), icon: 'heart', color: 'sunrise' },
    { label: 'Inflation multiplier', value: `${inflationMultiple}x`, icon: 'flame', color: 'gold', sub: 'at 3.5%/yr' },
  ]

  const progress = [
    { label: 'Current monthly cost', value: monthlyToday, max: 15000, color: '#0B1D3A', displayValue: usd(monthlyToday) },
    { label: `Projected in ${horizon} yrs`, value: Math.round(inflated), max: 15000, color: '#E85D3A', displayValue: usd(Math.round(inflated)) },
  ]

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="card rounded-[24px] p-7 md:p-8">
        <h3 className="display-sm">Long-term care cost</h3>
        <p className="mb-6 mt-1 text-[15px] text-ink-soft">What a care event could cost by the time it happens.</p>
        <div className="mb-5">
          <label htmlFor="cc-set" className="field-label">Care setting</label>
          <select id="cc-set" value={setting} onChange={(e) => setSetting(e.target.value)} className="field">
            {Object.keys(SETTINGS).map((k) => <option key={k}>{k}</option>)}
          </select>
        </div>
        <div className="space-y-5">
          <Slider id="cc-h" label="Years until care might be needed" value={horizon} display={`${horizon} yrs`} min={0} max={30} step={1} onChange={setHorizon} minLabel="Now" maxLabel="30" />
          <Slider id="cc-y" label="Length of care" value={years} display={`${years} yrs`} min={1} max={6} step={1} onChange={setYears} minLabel="1" maxLabel="6" />
        </div>
        <Result label="Projected total cost of care" value={usd(total)} note="National median costs, inflated at 3.5% per year. Local costs vary widely; an advisor will use figures for your area." />
      </div>
      <CalcDashboard kpis={kpis} progress={progress} comparisons={[
        { label: 'Cost today', value: usd(Math.round(monthlyToday * 12 * years)), color: '#0B1D3A' },
        { label: `Cost in ${horizon} yrs`, value: usd(total), color: '#E85D3A' },
      ]}>
        <ChartBlock title="Monthly cost over time (3.5% inflation)">
          <MiniArea data={areaData} xKey="year" series={[{ key: 'monthly', label: 'Monthly cost', color: '#E85D3A' }]} />
        </ChartBlock>
        <ChartBlock title="Compare care settings">
          <MiniBar data={compareData} xKey="name" series={[
            { key: 'today', label: 'Today', color: '#0B1D3A' },
            { key: 'future', label: `In ${horizon} yrs`, color: '#E85D3A' },
          ]} />
        </ChartBlock>
      </CalcDashboard>
    </div>
  )
}
