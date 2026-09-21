'use client'
import { useState, useMemo } from 'react'
import Slider, { usd } from './Slider'
import Result from './Result'
import CalcDashboard, { Kpi, MiniArea, MiniDonut, ChartBlock, fmt } from './CalcChart'

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
  const growthEarned = Math.max(0, future - totalContrib - totalMatch)

  const areaData = useMemo(() => {
    const points = []
    for (let y = 0; y <= years; y++) {
      const months = y * 12
      const bal = Math.round(balance * Math.pow(1 + r, months) + monthlyContrib * ((Math.pow(1 + r, months) - 1) / r))
      const contributed = Math.round(balance + salary * (contrib / 100) * y + salary * (Math.min(match, contrib) / 100) * y)
      points.push({ year: age + y, balance: bal, contributions: contributed })
    }
    return points
  }, [age, years, balance, monthlyContrib, salary, contrib, match, r])

  const donutData = useMemo(() => [
    { name: 'Your contributions', value: totalContrib },
    { name: 'Employer match', value: totalMatch },
    { name: 'Investment growth', value: growthEarned },
  ], [totalContrib, totalMatch, growthEarned])

  const kpis: Kpi[] = [
    { label: 'Projected balance', value: fmt(future), icon: 'trending', color: 'gold', trend: 'up' },
    { label: 'Your contributions', value: fmt(totalContrib), icon: 'dollar', color: 'navy' },
    { label: 'Employer match', value: fmt(totalMatch), icon: 'piggy', color: 'green', sub: `${Math.min(match, contrib)}% effective` },
    { label: 'Growth earned', value: fmt(growthEarned), icon: 'percent', color: 'sunrise', sub: `over ${years} yrs` },
  ]

  const progress = [
    { label: 'Your contributions', value: totalContrib, max: future, color: '#0B1D3A', displayValue: fmt(totalContrib) },
    { label: 'Employer match', value: totalMatch, max: future, color: '#2FA84F', displayValue: fmt(totalMatch) },
    { label: 'Investment growth', value: growthEarned, max: future, color: '#C8A951', displayValue: fmt(growthEarned) },
  ]

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
        <Result label="Projected balance at retirement" value={usd(future)} note="Assumes 7% average annual return compounded monthly with constant salary. Actual returns vary; does not account for contribution limits, raises, or taxes." />
      </div>
      <CalcDashboard kpis={kpis} progress={progress} comparisons={[
        { label: 'Total invested', value: fmt(totalContrib + totalMatch), color: '#0B1D3A' },
        { label: 'Projected value', value: fmt(future), color: '#C8A951' },
      ]}>
        <ChartBlock title="Growth over time">
          <MiniArea data={areaData} xKey="year" series={[
            { key: 'balance', label: 'Projected balance', color: '#C8A951' },
            { key: 'contributions', label: 'Total contributed', color: '#0B1D3A' },
          ]} />
        </ChartBlock>
        <ChartBlock title="Where the money comes from">
          <MiniDonut data={donutData} series={[
            { key: 'yours', label: 'Your contributions', color: '#0B1D3A' },
            { key: 'match', label: 'Employer match', color: '#2FA84F' },
            { key: 'growth', label: 'Investment growth', color: '#C8A951' },
          ]} />
        </ChartBlock>
      </CalcDashboard>
    </div>
  )
}
