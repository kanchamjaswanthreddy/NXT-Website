import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const COVERAGE_LINKS = [
  { label: 'Life & Retirement',    sub: 'Term life, whole life, annuities',         to: '/insurance/term-life-insurance' },
  { label: 'Health & Disability',  sub: 'Medical plans, Medicare, LTC',             to: '/insurance/individual-family-health-plans' },
  { label: 'Property & Assets',    sub: 'Home, commercial, landlord',               to: '/insurance/homeowners-renters-insurance' },
  { label: 'Casualty & Liability', sub: 'Auto, general liability, workers comp',    to: '/insurance/auto-insurance' },
  { label: 'View All Coverage',    sub: null,                                        to: '/insurances', highlight: true },
];

const RESOURCE_LINKS = [
  { label: 'Insurance Calculators', sub: 'Life, home & business estimators',        to: '/resources' },
  { label: 'Partner With Us',       sub: 'Join our independent agent network',      to: '/partner' },
  { label: 'Referral Program',      sub: 'Refer a friend, earn rewards',            to: '/referral' },
];

const DropdownPanel = ({ links, onClose }) => (
  <div style={{
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    paddingTop: '12px',
    zIndex: 2000,
  }}>
  <div style={{
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 40px rgba(10,37,64,0.14), 0 0 0 1px rgba(0,0,0,0.06)',
    padding: '8px',
    minWidth: '268px',
  }}>
    {links.map((link, i) => (
      <Link
        key={i}
        to={link.to}
        onClick={onClose}
        style={{
          display: 'block',
          padding: '10px 14px',
          borderRadius: '10px',
          textDecoration: 'none',
          background: 'transparent',
          ...(link.highlight ? { borderTop: '1px solid rgba(0,0,0,0.08)', marginTop: '4px', paddingTop: '14px' } : {}),
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#f4f7fb'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        <span style={{ display: 'block', fontWeight: 600, color: link.highlight ? 'var(--color-primary)' : '#0a2540', fontSize: '0.92rem' }}>
          {link.label}
        </span>
        {link.sub && (
          <span style={{ display: 'block', color: '#8896a4', fontSize: '0.8rem', marginTop: '2px', fontWeight: 400 }}>
            {link.sub}
          </span>
        )}
      </Link>
    ))}
  </div>
  </div>
);

const DropdownNavItem = ({ label, links }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        aria-haspopup="true"
        aria-expanded={open}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 600,
          color: '#0a2540',
          padding: '4px 0',
        }}
      >
        {label}
        <ChevronDown
          size={14}
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
        />
      </button>
      {open && <DropdownPanel links={links} onClose={() => setOpen(false)} />}
    </div>
  );
};

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const toggleMobileSection = (key) =>
    setMobileExpanded(prev => (prev === key ? null : key));

  return (
    <>
      <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '8px 0' }}>

          <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img src="/logo.svg" alt="NXT Financial Group" className="nav-logo" style={{ height: '100px', objectFit: 'contain', marginTop: '2px' }} />
          </Link>

          <div className="nav-links mobile-hide" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <DropdownNavItem label="Coverage" links={COVERAGE_LINKS} />
            <DropdownNavItem label="Resources" links={RESOURCE_LINKS} />
            <Link to="/blog">Blog</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Support</Link>
          </div>

          <div className="mobile-hide" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Link to="/contact" className="btn-primary" style={{ padding: '10px 24px', borderRadius: '9999px', fontSize: '0.95rem' }}>Get Instant Quote</Link>
          </div>

          <button
            className="mobile-only"
            style={{ background: 'transparent', padding: '10px' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={28} color="#0a2540" /> : <Menu size={28} color="#0a2540" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" style={{ position: 'fixed', top: '100px', left: 0, right: 0, bottom: 0, background: 'white', zIndex: 999, padding: '20px', display: 'flex', flexDirection: 'column', gap: '0', overflowY: 'auto' }}>

          {/* Coverage accordion */}
          <div style={{ borderBottom: '1px solid #eeeeee' }}>
            <button
              onClick={() => toggleMobileSection('coverage')}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.2rem', fontWeight: 600, padding: '15px 0', background: 'none', border: 'none', cursor: 'pointer', color: '#0a2540', fontFamily: 'inherit' }}
            >
              Coverage
              <ChevronDown size={18} style={{ transition: 'transform 0.2s', transform: mobileExpanded === 'coverage' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            {mobileExpanded === 'coverage' && (
              <div style={{ paddingBottom: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {COVERAGE_LINKS.map((link, i) => (
                  <Link key={i} to={link.to} onClick={() => setMobileMenuOpen(false)}
                    style={{ padding: '10px 12px', borderRadius: '8px', fontSize: '1rem', fontWeight: link.highlight ? 700 : 500, color: link.highlight ? 'var(--color-primary)' : '#425466', textDecoration: 'none' }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Resources accordion */}
          <div style={{ borderBottom: '1px solid #eeeeee' }}>
            <button
              onClick={() => toggleMobileSection('resources')}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.2rem', fontWeight: 600, padding: '15px 0', background: 'none', border: 'none', cursor: 'pointer', color: '#0a2540', fontFamily: 'inherit' }}
            >
              Resources
              <ChevronDown size={18} style={{ transition: 'transform 0.2s', transform: mobileExpanded === 'resources' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            {mobileExpanded === 'resources' && (
              <div style={{ paddingBottom: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {RESOURCE_LINKS.map((link, i) => (
                  <Link key={i} to={link.to} onClick={() => setMobileMenuOpen(false)}
                    style={{ padding: '10px 12px', borderRadius: '8px', fontSize: '1rem', fontWeight: 500, color: '#425466', textDecoration: 'none' }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/blog" onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1.2rem', fontWeight: 600, padding: '15px 0', borderBottom: '1px solid #eeeeee', textDecoration: 'none', color: '#0a2540' }}>
            Blog
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1.2rem', fontWeight: 600, padding: '15px 0', borderBottom: '1px solid #eeeeee', textDecoration: 'none', color: '#0a2540' }}>
            About Us
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1.2rem', fontWeight: 600, padding: '15px 0', borderBottom: '1px solid #eeeeee', textDecoration: 'none', color: '#0a2540' }}>
            Support
          </Link>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: 'auto', paddingTop: '40px' }}>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="btn-primary"
              style={{ justifyContent: 'center', width: '100%', padding: '15px', textAlign: 'center' }}>
              Get Instant Quote
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
