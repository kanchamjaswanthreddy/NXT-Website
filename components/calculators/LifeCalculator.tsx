'use client'
import { useState, useMemo } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
import CalcDashboard, { Kpi, MiniBar, MiniDonut, ChartBlock, fmt } from './CalcChart'

export default function LifeCalculator() {
  const [income, setIncome] = useState(90000)
  const [years, setYears] = useState(20)
  const [debt, setDebt] = useState(40000)
  const [mortgage, setMortgage] = useState(300000)
  const [edu, setEdu] = useState(100000)

  const incomeReplace = income * years
  const total = incomeReplace + debt + mortgage + edu

  const barData = useMemo(() => [
    { name: 'Income', value: incomeReplace },
    { name: 'Mortgage', value: mortgage },
    { name: 'Education', value: edu },
    { name: 'Debt', value: debt },
  ], [incomeReplace, mortgage, edu, debt])

  const donutData = useMemo(() => [
    { name: 'Income replacement', value: incomeReplace },
    { name: 'Mortgage', value: mortgage },
    { name: 'Education', value: edu },
    { name: 'Other debt', value: debt },
  ], [incomeReplace, mortgage, edu, debt])

  const kpis: Kpi[] = [
    { label: 'Total coverage', value: fmt(total), icon: 'shield', color: 'navy' },
    { label: 'Income portion', value: fmt(incomeReplace), icon: 'dollar', color: 'gold', sub: `${Math.round((incomeReplace / total) * 100)}% of total` },
    { label: 'Debt + mortgage', value: fmt(debt + mortgage), icon: 'home', color: 'sunrise' },
    { label: 'Education fund', value: fmt(edu), icon: 'grad', color: 'green' },
  ]

  const progress = [
    { label: 'Income replacement', value: incomeReplace, max: total, color: '#0B1D3A', displayValue: fmt(incomeReplace) },
    { label: 'Mortgage balance', value: mortgage, max: total, color: '#C8A951', displayValue: fmt(mortgage) },
    { label: 'Education fund', value: edu, max: total, color: '#2FA84F', displayValue: fmt(edu) },
    { label: 'Other debt', value: debt, max: total, color: '#E85D3A', displayValue: fmt(debt) },
  ]

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="card rounded-[24px] p-7 md:p-8">
        <h3 className="display-sm">Life insurance needs</h3>
        <p className="mb-6 mt-1 text-[15px] text-ink-soft">The DIME method: Debt, Income, Mortgage, Education.</p>
        <div className="space-y-5">
          <Slider id="lc-inc" label="Annual income to replace" value={income} display={usd(income)} min={25000} max={500000} step={5000} onChange={setIncome} minLabel="$25k" maxLabel="$500k" />
          <Slider id="lc-yrs" label="Years of replacement" value={years} display={`${years} yrs`} min={5} max={40} step={1} onChange={setYears} minLabel="5" maxLabel="40" />
          <Slider id="lc-debt" label="Debts (excluding mortgage)" value={debt} display={usd(debt)} min={0} max={500000} step={5000} onChange={setDebt} minLabel="$0" maxLabel="$500k" />
          <Slider id="lc-mort" label="Mortgage balance" value={mortgage} display={usd(mortgage)} min={0} max={1500000} step={10000} onChange={setMortgage} minLabel="$0" maxLabel="$1.5M" />
          <Slider id="lc-edu" label="Education to fund" value={edu} display={usd(edu)} min={0} max={600000} step={10000} onChange={setEdu} minLabel="$0" maxLabel="$600k" />
        </div>
        <Result label="Suggested coverage" value={usd(total)} note="Subtract existing coverage and liquid assets from this figure. Illustrative only; underwriting determines what is available and at what price." />
      </div>
      <CalcDashboard kpis={kpis} progress={progress}>
        <ChartBlock title="Coverage by category">
          <MiniBar data={barData} xKey="name" series={[{ key: 'value', label: 'Amount', color: '#0B1D3A' }]} layout="vertical" />
        </ChartBlock>
        <ChartBlock title="DIME breakdown">
          <MiniDonut data={donutData} series={[
            { key: 'income', label: 'Income', color: '#0B1D3A' },
            { key: 'mortgage', label: 'Mortgage', color: '#C8A951' },
            { key: 'education', label: 'Education', color: '#2FA84F' },
            { key: 'debt', label: 'Debt', color: '#E85D3A' },
          ]} />
        </ChartBlock>
      </CalcDashboard>
    </div>
  )
}
