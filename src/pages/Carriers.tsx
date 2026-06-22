import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { allCarriers, top20, getLogoPath, stateNames } from '../data/carriers'
import UsaMap from '../components/ui/UsaMap'

const FILTER_TABS = [
  { label: 'All Carriers', key: 'all' },
  { label: 'National',     key: 'national' },
  { label: 'Personal',     key: 'personal' },
  { label: 'Commercial',   key: 'commercial' },
  { label: 'Wholesale',    key: 'wholesale' },
]

export default function Carriers() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedState, setSelectedState] = useState('')

  const filteredCarriers = useMemo(() => {
    if (activeFilter === 'all')        return allCarriers
    if (activeFilter === 'national')   return top20.national
    if (activeFilter === 'personal')   return top20.personal
    if (activeFilter === 'commercial') return top20.commercial
    if (activeFilter === 'wholesale')  return top20.wholesale
    return allCarriers
  }, [activeFilter])

  return (
    <>
      <Helmet>
        <title>Carrier Network — NXT Financial Group</title>
      </Helmet>

      {/* HERO */}
      <section style={{ background: '#1c3f39', minHeight: '380px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(44,91,84,0.6) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '90px 48px' }}>
          <span className="text-body-sm" style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            Our Carrier Network
          </span>
          <h1 className="text-hero" style={{ maxWidth: '620px', marginBottom: '20px' }}>
            104+ world-class insurance carriers.
          </h1>
          <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '500px', fontSize: '18px', lineHeight: '28px' }}>
            We partner with the nation's top-rated national, regional, and specialty carriers — giving you access to the broadest possible market for every coverage line.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #d0d5dd', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {FILTER_TABS.map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveFilter(tab.key)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '32px',
                    border: activeFilter === tab.key ? '1.5px solid #2c5b54' : '1.5px solid #d0d5dd',
                    background: activeFilter === tab.key ? '#2c5b54' : '#ffffff',
                    color: activeFilter === tab.key ? '#ffffff' : '#333',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              style={{ padding: '8px 14px', borderRadius: '8px', border: '1.5px solid #d0d5dd', fontFamily: 'Inter, sans-serif', fontSize: '14px', background: '#ffffff', cursor: 'pointer', color: selectedState ? '#333' : '#888' }}
              aria-label="Filter by state"
            >
              <option value="">All States</option>
              {Object.entries(stateNames).sort((a, b) => a[1].localeCompare(b[1])).map(([abbr, name]) => (
                <option key={abbr} value={abbr}>{name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* USA MAP — centered, full width */}
      <section style={{ background: '#f7f6f2', borderBottom: '1px solid #d0d5dd', padding: '56px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 500, color: '#000', marginBottom: '8px' }}>
              Licensed in All 50 States
            </h2>
            <p className="text-body-sm" style={{ color: '#666' }}>
              Click any state on the map to confirm coverage availability
            </p>
          </div>
          {/* Map centered, max width so it doesn't stretch too wide */}
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <UsaMap selectedState={selectedState} onStateSelect={setSelectedState} />
          </div>
        </div>
      </section>

      {/* CARRIER GRID */}
      <section className="section-pad" style={{ background: '#ffffff' }}>
        <div className="container">
          <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 500, color: '#000' }}>
              {filteredCarriers.length} carriers
              {selectedState && <span style={{ color: '#2c5b54', fontSize: '16px', fontWeight: 400, marginLeft: '12px' }}>in {stateNames[selectedState]}</span>}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
            {filteredCarriers.map(carrier => (
              <div
                key={carrier}
                className="card"
                style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '3/2', transition: 'border-color 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#2c5b54')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#d0d5dd')}
                title={carrier.replace(/-/g, ' ')}
              >
                <img
                  src={getLogoPath(carrier)}
                  alt={carrier.replace(/-/g, ' ')}
                  loading="lazy"
                  style={{ maxWidth: '100%', maxHeight: '44px', objectFit: 'contain', display: 'block' }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ background: '#1c3f39' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '46px', fontWeight: 500, lineHeight: '56px', letterSpacing: '-0.92px', color: '#ffffff', marginBottom: '20px' }}>
            Want us to shop all 104 carriers for you?
          </h2>
          <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '460px', margin: '0 auto 36px', fontSize: '17px' }}>
            One conversation with an NXT Financial advisor gives you access to the entire market — at no cost to you.
          </p>
          <Link to="/contact" className="btn btn-light">Get a Free Market Quote</Link>
        </div>
      </section>
    </>
  )
}
