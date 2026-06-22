import { useState } from 'react'

export default function HomeCalculator() {
  const [homeValue, setHomeValue] = useState(400000)
  const [age, setAge] = useState(15)
  const [sqft, setSqft] = useState(2000)

  const REBUILD_RATE_PER_SQFT = 150
  const buildingCoverage = sqft * REBUILD_RATE_PER_SQFT
  const personalProp = buildingCoverage * 0.5
  const liability = 300000
  const ageDiscount = age < 5 ? 1.0 : age < 15 ? 0.95 : 0.9
  const estimatedAnnualPremium = Math.round((buildingCoverage / 1000) * 3.5 * ageDiscount)

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <div className="card" style={{ padding: '40px', background: '#ffffff' }}>
      <h3 className="text-card-heading" style={{ marginBottom: '8px', color: '#000000' }}>
        Home Insurance Estimator
      </h3>
      <p className="text-body" style={{ color: '#666', marginBottom: '32px' }}>
        Get a rough estimate of your homeowners insurance coverage and premium.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
        {/* Home value */}
        <div style={{ background: '#e8e5d6', borderRadius: '8px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label className="text-body" style={{ fontWeight: 600 }}>Home Market Value</label>
            <span className="text-body" style={{ color: '#2c5b54', fontWeight: 700 }}>{formatCurrency(homeValue)}</span>
          </div>
          <input
            type="range"
            min={100000}
            max={2000000}
            step={25000}
            value={homeValue}
            onChange={(e) => setHomeValue(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#2c5b54' }}
            aria-label="Home market value"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-body-sm" style={{ color: '#666' }}>$100k</span>
            <span className="text-body-sm" style={{ color: '#666' }}>$2M</span>
          </div>
        </div>

        {/* Square footage */}
        <div style={{ background: '#e8e5d6', borderRadius: '8px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label className="text-body" style={{ fontWeight: 600 }}>Square Footage</label>
            <span className="text-body" style={{ color: '#2c5b54', fontWeight: 700 }}>{sqft.toLocaleString()} sq ft</span>
          </div>
          <input
            type="range"
            min={500}
            max={8000}
            step={100}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#2c5b54' }}
            aria-label="Square footage"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-body-sm" style={{ color: '#666' }}>500</span>
            <span className="text-body-sm" style={{ color: '#666' }}>8,000</span>
          </div>
        </div>

        {/* Age of home */}
        <div style={{ background: '#e8e5d6', borderRadius: '8px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label className="text-body" style={{ fontWeight: 600 }}>Age of Home</label>
            <span className="text-body" style={{ color: '#2c5b54', fontWeight: 700 }}>{age} years</span>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#2c5b54' }}
            aria-label="Age of home"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-body-sm" style={{ color: '#666' }}>New</span>
            <span className="text-body-sm" style={{ color: '#666' }}>100 yrs</span>
          </div>
        </div>
      </div>

      {/* Coverage breakdown */}
      <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { label: 'Dwelling Coverage', value: buildingCoverage },
          { label: 'Personal Property', value: personalProp },
          { label: 'Personal Liability', value: liability },
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
            Estimated Annual Premium
          </p>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: 500, color: '#ffffff', margin: 0 }}>
            {formatCurrency(estimatedAnnualPremium)}<span style={{ fontSize: '16px', opacity: 0.75 }}>/yr</span>
          </p>
        </div>
        <a href="/contact" className="btn btn-light" style={{ padding: '12px 28px', fontSize: '16px' }}>
          Get Exact Quote
        </a>
      </div>
      <p className="text-body-sm" style={{ color: '#999', marginTop: '12px', textAlign: 'center' }}>
        Estimate only. Actual rates vary by location, claims history, and carrier.
      </p>
    </div>
  )
}
