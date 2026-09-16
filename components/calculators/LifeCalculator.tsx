'use client'
import { useState } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
export default function LifeCalculator() {
  const [income, setIncome] = useState(90000); const [years, setYears] = useState(20); const [debt, setDebt] = useState(40000); const [mortgage, setMortgage] = useState(300000); const [edu, setEdu] = useState(100000)
  const total = income * years + debt + mortgage + edu
  return (
    <div className="card rounded-[24px] p-7 md:p-8">
      <h3 className="display-sm">Life insurance needs</h3><p className="mb-6 mt-1 text-[15px] text-ink-soft">The DIME method: Debt, Income, Mortgage, Education.</p>
      <div className="space-y-5">
        <Slider id="lc-inc" label="Annual income to replace" value={income} display={usd(income)} min={25000} max={500000} step={5000} onChange={setIncome} minLabel="$25k" maxLabel="$500k" />
        <Slider id="lc-yrs" label="Years of replacement" value={years} display={`${years} yrs`} min={5} max={40} step={1} onChange={setYears} minLabel="5" maxLabel="40" />
        <Slider id="lc-debt" label="Debts (excluding mortgage)" value={debt} display={usd(debt)} min={0} max={500000} step={5000} onChange={setDebt} minLabel="$0" maxLabel="$500k" />
        <Slider id="lc-mort" label="Mortgage balance" value={mortgage} display={usd(mortgage)} min={0} max={1500000} step={10000} onChange={setMortgage} minLabel="$0" maxLabel="$1.5M" />
        <Slider id="lc-edu" label="Education to fund" value={edu} display={usd(edu)} min={0} max={600000} step={10000} onChange={setEdu} minLabel="$0" maxLabel="$600k" />
      </div>
      <Result label="Suggested coverage" value={usd(total)} note="Subtract existing coverage and liquid assets from this figure. Illustrative only; underwriting determines what is available and at what price." />
    </div>
  )
}
