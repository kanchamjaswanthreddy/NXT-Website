import { useState } from 'react'

export default function LifeCalculator() {
  const [income, setIncome] = useState(75000)
  const [years, setYears] = useState(20)
  const [debt, setDebt] = useState(50000)
  const [mortgage, setMortgage] = useState(250000)

  const coverage = income * years + debt + mortgage

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <div className="card" style={{ padding: '40px', background: '#ffffff' }}>
      <h3 className="text-card-heading" style={{ marginBottom: '8px', color: '#000000' }}>
        Life Insurance Calculator
      </h3>
      <p className="text-body" style={{ color: '#666', marginBottom: '32px' }}>
        Estimate how much life insurance coverage your family needs.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
        {/* Annual income */}
        <div style={{ background: '#e8e5d6', borderRadius: '8px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label className="text-body" style={{ fontWeight: 600 }}>Annual Income</label>
            <span className="text-body" style={{ color: '#2c5b54', fontWeight: 700 }}>{formatCurrency(income)}</span>
          </div>
          <input
            type="range"
            min={25000}
            max={500000}
            step={5000}
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#2c5b54' }}
            aria-label="Annual income"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-body-sm" style={{ color: '#666' }}>$25k</span>
            <span className="text-body-sm" style={{ color: '#666' }}>$500k</span>
          </div>
        </div>

        {/* Years of support */}
        <div style={{ background: '#e8e5d6', borderRadius: '8px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label className="text-body" style={{ fontWeight: 600 }}>Years of Income Replacement</label>
            <span className="text-body" style={{ color: '#2c5b54', fontWeight: 700 }}>{years} yrs</span>
          </div>
          <input
            type="range"
            min={5}
            max={40}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#2c5b54' }}
            aria-label="Years of income replacement"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-body-sm" style={{ color: '#666' }}>5 yrs</span>
            <span className="text-body-sm" style={{ color: '#666' }}>40 yrs</span>
          </div>
        </div>

        {/* Other debt */}
        <div style={{ background: '#e8e5d6', borderRadius: '8px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label className="text-body" style={{ fontWeight: 600 }}>Other Debts</label>
            <span className="text-body" style={{ color: '#2c5b54', fontWeight: 700 }}>{formatCurrency(debt)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={300000}
            step={5000}
            value={debt}
            onChange={(e) => setDebt(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#2c5b54' }}
            aria-label="Other debts"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-body-sm" style={{ color: '#666' }}>$0</span>
            <span className="text-body-sm" style={{ color: '#666' }}>$300k</span>
          </div>
        </div>

        {/* Mortgage */}
        <div style={{ background: '#e8e5d6', borderRadius: '8px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label className="text-body" style={{ fontWeight: 600 }}>Mortgage Balance</label>
            <span className="text-body" style={{ color: '#2c5b54', fontWeight: 700 }}>{formatCurrency(mortgage)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1000000}
            step={10000}
            value={mortgage}
            onChange={(e) => setMortgage(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#2c5b54' }}
            aria-label="Mortgage balance"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-body-sm" style={{ color: '#666' }}>$0</span>
            <span className="text-body-sm" style={{ color: '#666' }}>$1M</span>
          </div>
        </div>
      </div>

      {/* Result bar */}
      <div
        style={{
          background: '#2c5b54',
          borderRadius: '12px',
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <p className="text-body-sm" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '4px' }}>
            Recommended Coverage
          </p>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: 500, color: '#ffffff', margin: 0 }}>
            {formatCurrency(coverage)}
          </p>
        </div>
        <a href="/contact" className="btn btn-light" style={{ padding: '12px 28px', fontSize: '16px' }}>
          Get a Quote
        </a>
      </div>
    </div>
  )
}
