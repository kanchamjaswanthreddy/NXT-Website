import React from 'react';
import { Link } from 'react-router-dom';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.22 8.22 0 0 0 4.82 1.55V6.79a4.85 4.85 0 0 1-1.05-.1z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="footer-root" style={{ background: '#0a2540', color: '#ffffff', padding: '80px 40px 40px 40px', borderTop: '4px solid #00d4ff' }}>
      <div className="container" style={{ padding: '0' }}>
        <div className="footer-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '60px' }}>

          <div className="footer-brand" style={{ maxWidth: '400px' }}>
            <img src="/Logof.png" alt="NXT Financial" style={{ height: '140px', width: 'auto', marginBottom: '24px', objectFit: 'contain' }} />
            <p style={{ fontSize: '1.05rem', color: '#adbdcc', lineHeight: 1.6 }}>
              Comprehensive insurance coverage for the modern era. We partner with the world's leading carriers to deliver tailored solutions for your unique lifestyle and business needs.
            </p>
            <p style={{ fontSize: '1.05rem', color: '#adbdcc', lineHeight: 1.6, marginTop: '16px' }}>
              <a href="mailto:info@nxtfinancialgroup.com" style={{ color: '#00d4ff', textDecoration: 'none', fontWeight: 500 }}>info@nxtfinancialgroup.com</a>
            </p>
            <p style={{ fontSize: '1.05rem', color: '#adbdcc', lineHeight: 1.6, marginTop: '8px' }}>
              <a href="tel:8572053333" style={{ color: '#00d4ff', textDecoration: 'none', fontWeight: 500 }}>857-205-3333</a>
            </p>
            <p style={{ fontSize: '1.05rem', color: '#adbdcc', lineHeight: 1.6, marginTop: '8px' }}>
              Everett, MA USA
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <a href="#" aria-label="Facebook" style={{ color: '#adbdcc', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#00d4ff'} onMouseLeave={e => e.currentTarget.style.color='#adbdcc'}>
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Instagram" style={{ color: '#adbdcc', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#00d4ff'} onMouseLeave={e => e.currentTarget.style.color='#adbdcc'}>
                <InstagramIcon />
              </a>
              <a href="#" aria-label="LinkedIn" style={{ color: '#adbdcc', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#00d4ff'} onMouseLeave={e => e.currentTarget.style.color='#adbdcc'}>
                <LinkedInIcon />
              </a>
              <a href="#" aria-label="TikTok" style={{ color: '#adbdcc', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#00d4ff'} onMouseLeave={e => e.currentTarget.style.color='#adbdcc'}>
                <TikTokIcon />
              </a>
            </div>
          </div>

          <div className="footer-cols" style={{ flex: '1', minWidth: '400px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' }}>
            <div style={{ minWidth: '150px' }}>
              <h4 style={{ color: '#ffffff', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Insurance</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li><Link to="/insurances" style={{ color: '#adbdcc', fontSize: '1rem', textDecoration: 'none' }}>Life & Health</Link></li>
                <li><Link to="/insurances" style={{ color: '#adbdcc', fontSize: '1rem', textDecoration: 'none' }}>Property Insurance</Link></li>
                <li><Link to="/insurances" style={{ color: '#adbdcc', fontSize: '1rem', textDecoration: 'none' }}>Casualty & Liability</Link></li>
                <li><Link to="/carriers" style={{ color: '#adbdcc', fontSize: '1rem', textDecoration: 'none' }}>Our Elite Network</Link></li>
              </ul>
            </div>
            <div style={{ minWidth: '150px' }}>
              <h4 style={{ color: '#ffffff', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li><Link to="/about" style={{ color: '#adbdcc', fontSize: '1rem', textDecoration: 'none' }}>About Us</Link></li>
                <li><Link to="/contact" style={{ color: '#adbdcc', fontSize: '1rem', textDecoration: 'none' }}>Contact</Link></li>
                <li><Link to="/partner" style={{ color: '#adbdcc', fontSize: '1rem', textDecoration: 'none' }}>Partner With Us</Link></li>
                <li><Link to="/referral" style={{ color: '#adbdcc', fontSize: '1rem', textDecoration: 'none' }}>Referral Program</Link></li>
              </ul>
            </div>
            <div style={{ minWidth: '150px' }}>
              <h4 style={{ color: '#ffffff', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Resources</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li><Link to="/resources" style={{ color: '#adbdcc', fontSize: '1rem', textDecoration: 'none' }}>Help Center</Link></li>
                <li><Link to="/contact" style={{ color: '#adbdcc', fontSize: '1rem', textDecoration: 'none' }}>Get a Quote</Link></li>
                <li><a href="https://shivthakur.exprealty.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#adbdcc', fontSize: '1rem', textDecoration: 'none' }}>Real Estate Guidance</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div style={{ marginTop: '80px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <p style={{ margin: 0, color: '#adbdcc', fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} NXT Financial. All Rights Reserved.
          </p>
          <div style={{ display: 'flex', gap: '30px' }}>
            <Link to="/privacy-policy" style={{ color: '#adbdcc', fontSize: '0.9rem', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: '#adbdcc', fontSize: '0.9rem', textDecoration: 'none' }}>Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
