'use client'
import { useState, useMemo } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
import CalcDashboard, { Kpi, MiniArea, MiniDonut, ChartBlock, fmt } from './CalcChart'

export default function MortgageCalculator() {
  const [price, setPrice] = useState(400000)
  const [down, setDown] = useState(20)
  const [rate, setRate] = useState(6.5)
  const [term, setTerm] = useState(30)
  const loan = price * (1 - down / 100)
  const downAmt = price * (down / 100)
  const r = rate / 100 / 12
  const n = term * 12
  const monthly = r > 0 ? Math.round(loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) : Math.round(loan / n)
  const totalPaid = monthly * n
  const totalInterest = totalPaid - loan
  const interestPct = Math.round((totalInterest / totalPaid) * 100)

  const donutData = useMemo(() => [
    { name: 'Principal', value: Math.round(loan) },
    { name: 'Interest', value: Math.round(totalInterest) },
  ], [loan, totalInterest])

  const amortData = useMemo(() => {
    const points = []
    let remaining = loan
    for (let y = 0; y <= term; y++) {
      points.push({ year: y, balance: Math.round(remaining), paid: Math.round(loan - remaining) })
      const yearlyInterest = remaining * (rate / 100)
      const yearlyPayment = monthly * 12
      remaining = Math.max(0, remaining - (yearlyPayment - yearlyInterest))
    }
    return points
  }, [loan, term, rate, monthly])

  const kpis: Kpi[] = [
    { label: 'Monthly payment', value: usd(monthly), icon: 'home', color: 'gold' },
    { label: 'Loan amount', value: fmt(Math.round(loan)), icon: 'dollar', color: 'navy' },
    { label: 'Total interest', value: fmt(Math.round(totalInterest)), icon: 'percent', color: 'red', sub: `${interestPct}% of payments` },
    { label: 'Down payment', value: fmt(Math.round(downAmt)), icon: 'piggy', color: 'green', sub: `${down}%` },
  ]

  const progress = [
    { label: 'Principal', value: Math.round(loan), max: totalPaid, color: '#0B1D3A', displayValue: fmt(Math.round(loan)) },
    { label: 'Interest', value: Math.round(totalInterest), max: totalPaid, color: '#E85D3A', displayValue: fmt(Math.round(totalInterest)) },
  ]

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="card rounded-[24px] p-7 md:p-8">
        <h3 className="display-sm">Mortgage payment</h3>
        <p className="mb-6 mt-1 text-[15px] text-ink-soft">Estimate your monthly principal & interest and total cost over the life of the loan.</p>
        <div className="mb-5">
          <label htmlFor="mc-term" className="field-label">Loan term</label>
          <select id="mc-term" value={term} onChange={(e) => setTerm(Number(e.target.value))} className="field">
            <option value={15}>15 years</option>
            <option value={30}>30 years</option>
          </select>
        </div>
        <div className="space-y-5">
          <Slider id="mc-price" label="Home price" value={price} display={usd(price)} min={100000} max={2000000} step={10000} onChange={setPrice} minLabel="$100k" maxLabel="$2M" />
          <Slider id="mc-down" label="Down payment" value={down} display={`${down}%`} min={0} max={30} step={1} onChange={setDown} minLabel="0%" maxLabel="30%" />
          <Slider id="mc-rate" label="Interest rate" value={rate} display={`${rate}%`} min={2} max={10} step={0.125} onChange={setRate} minLabel="2%" maxLabel="10%" />
        </div>
        <Result label="Monthly payment (P&I)" value={usd(monthly)} note={`Total cost over ${term} years: ${usd(totalPaid)}. Does not include taxes, insurance, or PMI. Rates change daily; an advisor or lender will lock your actual rate.`} />
      </div>
      <CalcDashboard kpis={kpis} progress={progress} comparisons={[
        { label: 'Total paid', value: fmt(totalPaid), color: '#0B1D3A' },
        { label: 'Interest cost', value: fmt(Math.round(totalInterest)), color: '#E85D3A' },
      ]}>
        <ChartBlock title="Principal vs interest">
          <MiniDonut data={donutData} series={[
            { key: 'principal', label: 'Principal', color: '#0B1D3A' },
            { key: 'interest', label: 'Interest', color: '#E85D3A' },
          ]} />
        </ChartBlock>
        <ChartBlock title="Loan balance over time">
          <MiniArea data={amortData} xKey="year" series={[
            { key: 'balance', label: 'Remaining balance', color: '#E85D3A' },
            { key: 'paid', label: 'Principal paid', color: '#0B1D3A' },
          ]} />
        </ChartBlock>
      </CalcDashboard>
    </div>
  )
}
