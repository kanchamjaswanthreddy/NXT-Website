import { useState } from 'react'
import { Link } from 'react-router-dom'
import LifeCalculator from '../components/calculators/LifeCalculator'
import HomeCalculator from '../components/calculators/HomeCalculator'
import CommercialCalculator from '../components/calculators/CommercialCalculator'

const TABS = [
  { id: 'life', label: 'Life Insurance Calculator' },
  { id: 'home', label: 'Home Insurance Estimator' },
  { id: 'commercial', label: 'Business Insurance Estimator' },
]

const GUIDES = [
  {
    title: 'Understanding Your Declarations Page',
    description: 'Every insurance policy has a declarations page that summarizes your coverage. Learn how to read it so you know exactly what you\'re protected against.',
    href: '/blog',
    category: 'Personal Lines',
  },
  {
    title: 'The Annual Insurance Review Checklist',
    description: 'Your life changes. Your coverage should too. Use this checklist every year to ensure your policies keep pace with your evolving risk profile.',
    href: '/blog',
    category: 'Planning',
  },
  {
    title: 'Filing a Claim: Step by Step',
    description: 'When you need to file a claim, time and documentation matter. This guide walks you through the process from first call to final settlement.',
    href: '/blog',
    category: 'Claims',
  },
  {
    title: 'Business Insurance 101',
    description: 'Every business faces unique risks. This primer covers the essential commercial insurance coverages every small business owner should understand.',
    href: '/blog',
    category: 'Commercial',
  },
]

export default function Resources() {
  const [activeTab, setActiveTab] = useState('life')

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="resources-hero-heading"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=85&fit=crop"
          alt=""
          aria-hidden="true"
          width={1920}
          height={600}
          fetchPriority="high"
          loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '90px 48px' }}>
          <span
            className="text-body-sm"
            style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}
          >
            Tools & Guides
          </span>
          <h1 id="resources-hero-heading" className="text-hero" style={{ maxWidth: '580px', marginBottom: '20px' }}>
            Insurance Resources
          </h1>
          <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '480px', fontSize: '18px', lineHeight: '28px' }}>
            Calculators, guides, and educational resources to help you make informed insurance decisions.
          </p>
        </div>
      </section>

      {/* ── CALCULATORS ───────────────────────────────────────── */}
      <section aria-labelledby="calc-section-heading" className="section-pad" style={{ background: '#f7f6f2' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <h2 id="calc-section-heading" className="text-h2-md" style={{ marginBottom: '20px' }}>
                Insurance Calculators
              </h2>
              <p className="text-body" style={{ color: '#555', fontSize: '17px', lineHeight: '27px', marginBottom: '24px' }}>
                Our calculators give you an instant estimate of your coverage needs or potential premium costs. These are starting points — speak with an advisor for a precise quote.
              </p>
              <p className="text-body" style={{ color: '#555', fontSize: '17px', lineHeight: '27px' }}>
                All calculators use industry-standard actuarial inputs and are updated regularly to reflect current market conditions.
              </p>
            </div>
            <div
              style={{
                background: '#2c5b54',
                borderRadius: '12px',
                padding: '28px',
                color: '#ffffff',
              }}
            >
              <h3 className="text-card-heading" style={{ color: '#fff', marginBottom: '12px', fontSize: '18px' }}>
                Want an exact quote?
              </h3>
              <p className="text-body-sm" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }}>
                Our calculators are estimates. For a real quote shopped across 104+ carriers, speak with an advisor — it's free and takes 10 minutes.
              </p>
              <Link to="/contact" className="btn btn-light" style={{ padding: '12px 28px', fontSize: '16px' }}>
                Talk to an Advisor
              </Link>
            </div>
          </div>

          {/* Tab navigation */}
          <div style={{ borderBottom: '1px solid #d0d5dd', marginBottom: '36px', display: 'flex', gap: '0' }}>
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                style={{
                  padding: '12px 24px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === id ? '2px solid #2c5b54' : '2px solid transparent',
                  color: activeTab === id ? '#2c5b54' : '#666',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Calculator display */}
          <div style={{ maxWidth: '680px' }}>
            {activeTab === 'life' && <LifeCalculator />}
            {activeTab === 'home' && <HomeCalculator />}
            {activeTab === 'commercial' && <CommercialCalculator />}
          </div>
        </div>
      </section>

      {/* ── GUIDES ────────────────────────────────────────────── */}
      <section aria-labelledby="guides-heading" className="section-pad" style={{ background: '#ffffff' }}>
        <div className="container">
          <h2 id="guides-heading" className="text-h2-lg" style={{ marginBottom: '16px' }}>
            Insurance Guides
          </h2>
          <p className="text-body" style={{ color: '#555', marginBottom: '48px', fontSize: '17px' }}>
            Plain-language guides to help you understand your coverage and make better insurance decisions.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {GUIDES.map(({ title, description, href, category }) => (
              <Link key={title} to={href} style={{ textDecoration: 'none' }}>
                <div
                  className="card"
                  style={{
                    padding: '28px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: '32px',
                      background: '#f7f6f2',
                      color: '#2c5b54',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      marginBottom: '14px',
                    }}
                  >
                    {category}
                  </span>
                  <h3 className="text-card-heading" style={{ fontSize: '18px', lineHeight: '26px', color: '#000', marginBottom: '10px' }}>
                    {title}
                  </h3>
                  <p className="text-body-sm" style={{ color: '#666', flex: 1 }}>{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
