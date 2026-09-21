'use client'
import { useState, useMemo } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
import CalcChart from './CalcChart'

export default function FourOhOneKCalculator() {
  const [age, setAge] = useState(30)
  const [retireAge, setRetireAge] = useState(65)
  const [salary, setSalary] = useState(80000)
  const [contrib, setContrib] = useState(10)
  const [match, setMatch] = useState(4)
  const [balance, setBalance] = useState(25000)

  const years = Math.max(0, retireAge - age)
  const monthlyContrib = (salary * (contrib + Math.min(match, contrib)) / 100) / 12
  const r = 0.07 / 12
  const n = years * 12
  const future = Math.round(balance * Math.pow(1 + r, n) + monthlyContrib * ((Math.pow(1 + r, n) - 1) / r))
  const totalContrib = Math.round(balance + salary * (contrib / 100) * years)
  const totalMatch = Math.round(salary * (Math.min(match, contrib) / 100) * years)

  const chartData = useMemo(() => {
    const points = []
    for (let y = 0; y <= years; y++) {
      const months = y * 12
      const bal = Math.round(balance * Math.pow(1 + r, months) + monthlyContrib * ((Math.pow(1 + r, months) - 1) / r))
      const contributed = Math.round(balance + salary * (contrib / 100) * y + salary * (Math.min(match, contrib) / 100) * y)
      points.push({ year: age + y, balance: bal, contributions: contributed })
    }
    return points
  }, [age, years, balance, monthlyContrib, salary, contrib, match, r])

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="card rounded-[24px] p-7 md:p-8">
        <h3 className="display-sm">401(k) projector</h3>
        <p className="mb-6 mt-1 text-[15px] text-ink-soft">Estimate your balance at retirement with employer matching.</p>
        <div className="space-y-5">
          <Slider id="4k-age" label="Current age" value={age} display={`${age}`} min={22} max={60} step={1} onChange={setAge} minLabel="22" maxLabel="60" />
          <Slider id="4k-ret" label="Retirement age" value={retireAge} display={`${retireAge}`} min={55} max={70} step={1} onChange={setRetireAge} minLabel="55" maxLabel="70" />
          <Slider id="4k-sal" label="Annual salary" value={salary} display={usd(salary)} min={30000} max={500000} step={5000} onChange={setSalary} minLabel="$30k" maxLabel="$500k" />
          <Slider id="4k-con" label="Your contribution" value={contrib} display={`${contrib}%`} min={1} max={25} step={1} onChange={setContrib} minLabel="1%" maxLabel="25%" />
          <Slider id="4k-mat" label="Employer match" value={match} display={`${match}%`} min={0} max={10} step={0.5} onChange={setMatch} minLabel="0%" maxLabel="10%" />
          <Slider id="4k-bal" label="Current balance" value={balance} display={usd(balance)} min={0} max={2000000} step={5000} onChange={setBalance} minLabel="$0" maxLabel="$2M" />
        </div>
        <dl className="mono mt-6 grid grid-cols-2 gap-4 text-sm">
          <div><dt className="text-ink-soft">Your contributions</dt><dd className="text-navy">{usd(totalContrib)}</dd></div>
          <div><dt className="text-ink-soft">Employer match total</dt><dd className="text-navy">{usd(totalMatch)}</dd></div>
        </dl>
        <Result label="Projected balance at retirement" value={usd(future)} note="Assumes 7% average annual return compounded monthly with constant salary. Actual returns vary; does not account for contribution limits, raises, or taxes." />
      </div>
      <CalcChart
        type="dual-area"
        data={chartData}
        xKey="year"
        xLabel="Age"
        series={[
          { key: 'balance', label: 'Projected balance', color: '#C8A951' },
          { key: 'contributions', label: 'Total contributed', color: '#0B1D3A' },
        ]}
      />
    </div>
  )
}
