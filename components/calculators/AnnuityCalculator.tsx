'use client'
import { useState, useMemo } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
import CalcDashboard, { Kpi, MiniArea, MiniDonut, ChartBlock, fmt } from './CalcChart'

export default function AnnuityCalculator() {
  const [investment, setInvestment] = useState(250000)
  const [rate, setRate] = useState(5)
  const [payout, setPayout] = useState(20)
  const [deferral, setDeferral] = useState(5)
  const accumulated = investment * Math.pow(1 + rate / 100, deferral)
  const r = rate / 100 / 12
  const n = payout * 12
  const monthly = r > 0 ? Math.round(accumulated * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) : Math.round(accumulated / n)
  const totalPayouts = monthly * n
  const growthGain = Math.round(accumulated - investment)
  const growthMultiple = Math.round((accumulated / investment) * 100) / 100

  const areaData = useMemo(() => {
    const points = []
    for (let y = 0; y <= deferral; y++) {
      points.push({ year: y, balance: Math.round(investment * Math.pow(1 + rate / 100, y)) })
    }
    let balance = Math.round(accumulated)
    for (let y = 1; y <= payout; y++) {
      const withdrawn = monthly * 12
      balance = Math.round(balance * (1 + rate / 100) - withdrawn)
      if (balance < 0) balance = 0
      points.push({ year: deferral + y, balance })
    }
    return points
  }, [investment, rate, payout, deferral, accumulated, monthly])

  const donutData = useMemo(() => [
    { name: 'Original investment', value: investment },
    { name: 'Growth during deferral', value: growthGain },
  ], [investment, growthGain])

  const kpis: Kpi[] = [
    { label: 'Monthly payout', value: usd(monthly), icon: 'dollar', color: 'gold', trend: 'up' },
    { label: 'Accumulated value', value: fmt(Math.round(accumulated)), icon: 'trending', color: 'navy', sub: `${growthMultiple}x growth` },
    { label: 'Total payouts', value: fmt(totalPayouts), icon: 'piggy', color: 'green' },
    { label: 'Growth earned', value: fmt(growthGain), icon: 'percent', color: 'sunrise', sub: `over ${deferral} yrs` },
  ]

  const progress = [
    { label: 'Initial investment', value: investment, max: Math.round(accumulated), color: '#0B1D3A', displayValue: fmt(investment) },
    { label: 'Growth during deferral', value: growthGain, max: Math.round(accumulated), color: '#C8A951', displayValue: fmt(growthGain) },
  ]

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
        <Result label="Estimated monthly payout" value={usd(monthly)} note="Assumes fixed annual growth compounded monthly during payout. Actual annuity rates vary by carrier, age, and contract type; an advisor will quote exact figures." />
      </div>
      <CalcDashboard kpis={kpis} progress={progress} comparisons={[
        { label: 'Investment', value: fmt(investment), color: '#0B1D3A' },
        { label: 'Total payouts', value: fmt(totalPayouts), color: '#C8A951' },
      ]}>
        <ChartBlock title="Balance over time">
          <MiniArea data={areaData} xKey="year" series={[{ key: 'balance', label: 'Account balance', color: '#C8A951' }]} />
        </ChartBlock>
        <ChartBlock title="Investment vs growth">
          <MiniDonut data={donutData} series={[
            { key: 'investment', label: 'Investment', color: '#0B1D3A' },
            { key: 'growth', label: 'Growth', color: '#C8A951' },
          ]} />
        </ChartBlock>
      </CalcDashboard>
    </div>
  )
}
