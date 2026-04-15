import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#0a2540', color: '#ffffff', padding: '80px 40px 40px 40px', borderTop: '4px solid #00d4ff' }}>
      <div className="container" style={{ padding: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '60px' }}>
          
          <div style={{ maxWidth: '400px' }}>
            <img src="/Logof.png" alt="NXT Financial" style={{ height: '140px', width: 'auto', marginBottom: '24px', objectFit: 'contain' }} />
            <p style={{ fontSize: '1.05rem', color: '#adbdcc', lineHeight: 1.6 }}>
              Comprehensive insurance coverage for the modern era. We partner with the world's leading carriers to deliver tailored solutions for your unique lifestyle and business needs.
            </p>
            <p style={{ fontSize: '1.05rem', color: '#adbdcc', lineHeight: 1.6, marginTop: '20px' }}>
              <a href="mailto:info@nxtfinancialgroup.com" style={{ color: '#00d4ff', textDecoration: 'none', fontWeight: 500 }}>info@nxtfinancialgroup.com</a>
            </p>
          </div>

          <div style={{ flex: '1', minWidth: '400px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' }}>
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
