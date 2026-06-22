import { useState } from 'react'

const INDUSTRY_RATES: Record<string, number> = {
  'Retail': 0.8,
  'Restaurant / Food Service': 1.4,
  'Construction': 2.1,
  'Technology / IT': 0.6,
  'Healthcare': 1.8,
  'Professional Services': 0.7,
  'Manufacturing': 1.6,
  'Transportation': 2.3,
}

export default function CommercialCalculator() {
  const [revenue, setRevenue] = useState(500000)
  const [employees, setEmployees] = useState(10)
  const [industry, setIndustry] = useState('Professional Services')

  const rate = INDUSTRY_RATES[industry] ?? 1.0
  const glPremium = Math.round((revenue / 1000) * rate * 0.45)
  const propPremium = Math.round(employees * 80)
  const wcPremium = Math.round((revenue / 100) * (rate * 0.18))
  const totalPremium = glPremium + propPremium + wcPremium

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <div className="card" style={{ padding: '40px', background: '#ffffff' }}>
      <h3 className="text-card-heading" style={{ marginBottom: '8px', color: '#000000' }}>
        Business Insurance Estimator
      </h3>
      <p className="text-body" style={{ color: '#666', marginBottom: '32px' }}>
        Estimate your commercial insurance package cost.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
        {/* Industry */}
        <div style={{ background: '#e8e5d6', borderRadius: '8px', padding: '20px' }}>
          <label className="text-body" style={{ fontWeight: 600, display: 'block', marginBottom: '12px' }}>
            Industry
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #d0d5dd',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              background: '#ffffff',
              cursor: 'pointer',
            }}
            aria-label="Industry type"
          >
            {Object.keys(INDUSTRY_RATES).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        {/* Annual revenue */}
        <div style={{ background: '#e8e5d6', borderRadius: '8px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label className="text-body" style={{ fontWeight: 600 }}>Annual Revenue</label>
            <span className="text-body" style={{ color: '#2c5b54', fontWeight: 700 }}>{formatCurrency(revenue)}</span>
          </div>
          <input
            type="range"
            min={50000}
            max={5000000}
            step={50000}
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#2c5b54' }}
            aria-label="Annual revenue"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-body-sm" style={{ color: '#666' }}>$50k</span>
            <span className="text-body-sm" style={{ color: '#666' }}>$5M</span>
          </div>
        </div>

        {/* Employees */}
        <div style={{ background: '#e8e5d6', borderRadius: '8px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label className="text-body" style={{ fontWeight: 600 }}>Number of Employees</label>
            <span className="text-body" style={{ color: '#2c5b54', fontWeight: 700 }}>{employees}</span>
          </div>
          <input
            type="range"
            min={1}
            max={200}
            step={1}
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#2c5b54' }}
            aria-label="Number of employees"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-body-sm" style={{ color: '#666' }}>1</span>
            <span className="text-body-sm" style={{ color: '#666' }}>200</span>
          </div>
        </div>
      </div>

      {/* Coverage breakdown */}
      <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { label: 'General Liability', value: glPremium },
          { label: 'Commercial Property', value: propPremium },
          { label: "Workers' Compensation", value: wcPremium },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e8e5d6' }}>
            <span className="text-body" style={{ color: '#666' }}>{label}</span>
            <span className="text-body" style={{ fontWeight: 600 }}>{formatCurrency(value)}</span>
          </div>
        ))}
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
            Estimated Annual Package
          </p>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: 500, color: '#ffffff', margin: 0 }}>
            {formatCurrency(totalPremium)}<span style={{ fontSize: '16px', opacity: 0.75 }}>/yr</span>
          </p>
        </div>
        <a href="/contact" className="btn btn-light" style={{ padding: '12px 28px', fontSize: '16px' }}>
          Get Exact Quote
        </a>
      </div>
      <p className="text-body-sm" style={{ color: '#999', marginTop: '12px', textAlign: 'center' }}>
        Estimate only. Actual rates depend on risk profile, location, and claims history.
      </p>
    </div>
  )
}
