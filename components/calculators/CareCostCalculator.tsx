'use client'
import { useState, useMemo } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
import CalcChart from './CalcChart'

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

  const chartData = useMemo(() => {
    const points = []
    for (let y = 0; y <= 30; y++) {
      const cost = Math.round(monthlyToday * Math.pow(1.035, y))
      points.push({
        year: y,
        monthly: cost,
        ...(y === horizon ? { marker: cost } : {}),
      })
    }
    return points
  }, [monthlyToday, horizon])

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
        <dl className="mono mt-6 grid grid-cols-2 gap-4 text-sm">
          <div><dt className="text-ink-soft">Monthly cost today</dt><dd className="text-navy">{usd(monthlyToday)}</dd></div>
          <div><dt className="text-ink-soft">Monthly cost in {horizon} yrs</dt><dd className="text-navy">{usd(Math.round(inflated))}</dd></div>
        </dl>
        <Result label="Projected total cost of care" value={usd(total)} note="National median costs, inflated at 3.5% per year. Local costs vary widely; an advisor will use figures for your area." />
      </div>
      <CalcChart
        type="dual-area"
        data={chartData}
        xKey="year"
        xLabel="Years from now"
        series={[{ key: 'monthly', label: 'Monthly cost', color: '#E85D3A' }]}
      />
    </div>
  )
}
