import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '8px 0' }}>

          <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img src="/logo.svg" alt="NXT Financial Group" className="nav-logo" style={{ height: '100px', objectFit: 'contain', marginTop: '2px' }} />
          </Link>

          <div className="nav-links mobile-hide" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link to="/insurances" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Coverage <span style={{ fontSize: '0.6rem' }}>▼</span></Link>
            <Link to="/carriers" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Carriers</Link>
            <Link to="/resources" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Resources <span style={{ fontSize: '0.6rem' }}>▼</span></Link>
            <Link to="/partner" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Partner with Us</Link>
            <Link to="/about" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>About Us</Link>
            <Link to="/contact" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Support</Link>
          </div>

          <div className="mobile-hide" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Link to="/contact" className="btn-primary" style={{ padding: '10px 24px', borderRadius: '9999px', fontSize: '0.95rem' }}>Get Instant Quote</Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="mobile-only"
            style={{ background: 'transparent', padding: '10px' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} color="#0a2540" /> : <Menu size={28} color="#0a2540" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" style={{ position: 'fixed', top: '100px', left: 0, right: 0, bottom: 0, background: 'white', zIndex: 999, padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto' }}>
          <Link to="/insurances" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 600, padding: '15px 0', borderBottom: '1px solid #eeeeee' }}>Coverage</Link>
          <Link to="/carriers" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 600, padding: '15px 0', borderBottom: '1px solid #eeeeee' }}>Carriers</Link>
          <Link to="/resources" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 600, padding: '15px 0', borderBottom: '1px solid #eeeeee' }}>Resources</Link>
          <Link to="/partner" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 600, padding: '15px 0', borderBottom: '1px solid #eeeeee' }}>Partner with Us</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 600, padding: '15px 0', borderBottom: '1px solid #eeeeee' }}>About Us</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 600, padding: '15px 0', borderBottom: '1px solid #eeeeee' }}>Support</Link>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: 'auto', paddingTop: '40px' }}>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="btn-primary" style={{ justifyContent: 'center', width: '100%', padding: '15px' }}>Get Instant Quote</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
