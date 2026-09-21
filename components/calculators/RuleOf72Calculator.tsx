'use client'
import { useState, useMemo } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
import CalcDashboard, { Kpi, MiniArea, MiniBar, ChartBlock, fmt } from './CalcChart'

export default function RuleOf72Calculator() {
  const [rate, setRate] = useState(7)
  const [investment, setInvestment] = useState(50000)
  const yearsToDouble = Math.round((72 / rate) * 10) / 10
  const doubled = investment * 2
  const quadrupled = investment * 4
  const octupled = investment * 8

  const areaData = useMemo(() => {
    const maxYears = Math.ceil(yearsToDouble * 3.5)
    const points = []
    for (let y = 0; y <= maxYears; y++) {
      points.push({ year: y, value: Math.round(investment * Math.pow(1 + rate / 100, y)) })
    }
    return points
  }, [rate, investment, yearsToDouble])

  const doublingData = useMemo(() => [
    { name: '1st double', value: doubled, years: Math.round(yearsToDouble) },
    { name: '2nd double', value: quadrupled, years: Math.round(yearsToDouble * 2) },
    { name: '3rd double', value: octupled, years: Math.round(yearsToDouble * 3) },
  ], [doubled, quadrupled, octupled, yearsToDouble])

  const kpis: Kpi[] = [
    { label: 'Years to double', value: `${yearsToDouble} yrs`, icon: 'clock', color: 'gold' },
    { label: '1st doubling', value: fmt(doubled), icon: 'trending', color: 'navy', sub: `~${Math.round(yearsToDouble)} yrs` },
    { label: '2nd doubling', value: fmt(quadrupled), icon: 'trending', color: 'green', sub: `~${Math.round(yearsToDouble * 2)} yrs` },
    { label: '3rd doubling', value: fmt(octupled), icon: 'trending', color: 'sunrise', sub: `~${Math.round(yearsToDouble * 3)} yrs` },
  ]

  const progress = [
    { label: `1st double (~${Math.round(yearsToDouble)} yrs)`, value: doubled, max: octupled, color: '#0B1D3A', displayValue: fmt(doubled) },
    { label: `2nd double (~${Math.round(yearsToDouble * 2)} yrs)`, value: quadrupled, max: octupled, color: '#C8A951', displayValue: fmt(quadrupled) },
    { label: `3rd double (~${Math.round(yearsToDouble * 3)} yrs)`, value: octupled, max: octupled, color: '#2FA84F', displayValue: fmt(octupled) },
  ]

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="card rounded-[24px] p-7 md:p-8">
        <h3 className="display-sm">Rule of 72</h3>
        <p className="mb-6 mt-1 text-[15px] text-ink-soft">A quick way to estimate how long it takes your money to double.</p>
        <div className="space-y-5">
          <Slider id="r72-rate" label="Annual return rate" value={rate} display={`${rate}%`} min={1} max={20} step={0.5} onChange={setRate} minLabel="1%" maxLabel="20%" />
          <Slider id="r72-inv" label="Initial investment" value={investment} display={usd(investment)} min={1000} max={1000000} step={1000} onChange={setInvestment} minLabel="$1k" maxLabel="$1M" />
        </div>
        <Result label="Years to double your money" value={`${yearsToDouble} yrs`} note={`At ${rate}% annual return, ${usd(investment)} becomes ${usd(octupled)} after three doublings (~${Math.round(yearsToDouble * 3)} years). Assumes compounding with no withdrawals.`} />
      </div>
      <CalcDashboard kpis={kpis} progress={progress}>
        <ChartBlock title="Exponential growth">
          <MiniArea data={areaData} xKey="year" series={[{ key: 'value', label: 'Investment value', color: '#C8A951' }]} />
        </ChartBlock>
        <ChartBlock title="Doubling milestones">
          <MiniBar data={doublingData} xKey="name" series={[{ key: 'value', label: 'Value', color: '#0B1D3A' }]} />
        </ChartBlock>
      </CalcDashboard>
    </div>
  )
}
