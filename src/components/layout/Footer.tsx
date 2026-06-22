import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

const coverageLinks = [
  { to: '/insurance/life-insurance', label: 'Life Insurance' },
  { to: '/insurance/health-insurance', label: 'Health Insurance' },
  { to: '/insurance/homeowners-insurance', label: 'Homeowners Insurance' },
  { to: '/insurance/auto-insurance', label: 'Auto Insurance' },
  { to: '/insurance/commercial-general-liability', label: 'Commercial Liability' },
  { to: '/insurance/cyber-liability', label: 'Cyber Liability' },
  { to: '/insurances', label: 'All Coverage Types' },
]

const companyLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/carriers', label: 'Our Carriers' },
  { to: '/partner', label: 'Partner With Us' },
  { to: '/referral', label: 'Refer a Client' },
  { to: '/contact', label: 'Contact' },
]

const resourceLinks = [
  { to: '/blog', label: 'Blog & Insights' },
  { to: '/resources', label: 'Resources' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#1c3f39', color: '#ffffff' }}>
      <div className="container">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand column */}
          <div className="col-span-1">
            <Link
              to="/"
              aria-label="NXT Financial — Home"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ffffff',
                borderRadius: '20px',
                padding: '10px 18px',
                marginBottom: '24px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.25), 0 1px 6px rgba(0,0,0,0.15)',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35), 0 2px 10px rgba(0,0,0,0.2)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.25), 0 1px 6px rgba(0,0,0,0.15)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <img
                src="/logo.png"
                alt="NXT Financial Group"
                style={{ display: 'block', height: '64px', width: 'auto' }}
              />
            </Link>
            <p
              className="text-body"
              style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', maxWidth: '260px' }}
            >
              Independent insurance brokerage serving clients across all 50 states with 104+ top-rated carriers.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="tel:8572053333"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}
              >
                <Phone size={15} />
                857-205-3333
              </a>
              <a
                href="mailto:info@nxtfinancialgroup.com"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}
              >
                <Mail size={15} />
                info@nxtfinancialgroup.com
              </a>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                <MapPin size={15} />
                Everett, MA
              </span>
            </div>
          </div>

          {/* Coverage links */}
          <div>
            <h3
              className="text-nav"
              style={{ color: '#ffffff', marginBottom: '20px', fontSize: '16px' }}
            >
              Coverage
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {coverageLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-body"
                    style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3
              className="text-nav"
              style={{ color: '#ffffff', marginBottom: '20px', fontSize: '16px' }}
            >
              Company
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {companyLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-body"
                    style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3
              className="text-nav"
              style={{ color: '#ffffff', marginBottom: '20px', fontSize: '16px' }}
            >
              Resources
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {resourceLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-body"
                    style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FutureFlow sister brand */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '28px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <p className="text-body-sm" style={{ color: 'rgba(255,255,255,0.45)', margin: 0 }}>
            Part of the NXT Financial family:
          </p>
          <a
            href="https://joinfutureflow.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)')}
          >
            <img
              src="/futureflow-logo.png"
              alt="FutureFlow"
              style={{ height: '22px', width: 'auto', objectFit: 'contain' }}
            />
            <span className="text-body-sm" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
              AI Personal Finance App
            </span>
          </a>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '20px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p className="text-body-sm" style={{ color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            &copy; {new Date().getFullYear()} NXT Financial Group. All rights reserved. Licensed in all 50 states.
          </p>
          <p className="text-body-sm" style={{ color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            Insurance products underwritten by licensed carriers.
          </p>
        </div>
      </div>
    </footer>
  )
}
