import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/insurances', label: 'Insurance' },
  { to: '/carriers', label: 'Carriers' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const textColor = '#000000'
  const bgStyle: React.CSSProperties = { background: '#ffffff', borderBottom: '1px solid #d0d5dd' }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s ease, border-color 0.3s ease',
        ...bgStyle,
      }}
      role="banner"
    >
      <div className="container">
        <nav
          aria-label="Main navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Logo */}
          <Link to="/" aria-label="NXT Financial — Home">
            <img
              src="/logo.png"
              alt="NXT Financial Group"
              style={{
                height: '68px',
                width: 'auto',
                display: 'block',
              }}
            />
          </Link>

          {/* Desktop nav */}
          <ul
            style={{
              display: 'flex',
              gap: '36px',
              listStyle: 'none',
              alignItems: 'center',
              margin: 0,
              padding: 0,
            }}
            className="nav-desktop-links"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className="text-nav"
                  style={({ isActive }) => ({
                    color: textColor,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    paddingBottom: '2px',
                    borderBottom: isActive ? `2px solid #2c5b54` : '2px solid transparent',
                    opacity: isActive ? 1 : 0.85,
                  })}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="nav-desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="btn btn-teal"
              style={{ padding: '10px 28px', fontSize: '16px' }}
            >
              Get a Quote
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="nav-mobile-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: textColor,
                padding: '4px',
              }}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: '#ffffff',
            borderTop: '1px solid #d0d5dd',
            padding: '16px 0 24px',
          }}
        >
          <div className="container">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className="text-nav"
                    style={({ isActive }) => ({
                      display: 'block',
                      padding: '12px 0',
                      color: isActive ? '#2c5b54' : '#000000',
                      textDecoration: 'none',
                      borderBottom: '1px solid #f0f0f0',
                    })}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li style={{ marginTop: '16px' }}>
                <button
                  type="button"
                  className="btn btn-teal"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => { navigate('/contact'); setMenuOpen(false) }}
                >
                  Get a Quote
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop-links { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
        @media (max-width: 640px) {
          .nav-desktop-cta .btn:not(.nav-mobile-toggle) { display: none; }
        }
      `}</style>
    </header>
  )
}
