import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const inputStyle = {
  padding: '16px 20px', 
  borderRadius: '12px', 
  border: '1px solid var(--glass-border)', 
  fontSize: '1.05rem', 
  outline: 'none', 
  background: 'var(--glass-bg)', 
  backdropFilter: 'var(--glass-blur)', 
  WebkitBackdropFilter: 'var(--glass-blur)',
  color: 'var(--color-heading)',
  width: '100%',
  boxSizing: 'border-box'
};

const labelStyle = { 
  fontWeight: 600, 
  color: 'var(--color-heading)', 
  marginBottom: '8px',
  display: 'block'
};

const Referral = () => {
  return (
    <PageTransition>
      <SEO
        title="Referral Program | Share the Protection"
        description="Refer your friends and family to NXT Financial Group. Help them find better insurance coverage — and receive a thank you gift from us when they connect with an advisor."
        canonical="/referral"
      />
      <main style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', paddingBottom: '100px', paddingTop: '140px' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="referral-card"
            style={{
              padding: '60px',
              maxWidth: '800px',
              margin: '0 auto', 
              boxShadow: 'var(--glass-shadow)',
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px'
            }}
          >
            <span style={{ textAlign: "center", display: 'block', color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
              REFERRAL PROGRAM
            </span>
            <h1 style={{ fontSize: '3rem', textAlign: 'center', lineHeight: 1.2, color: 'var(--color-heading)', marginBottom: '24px' }}>
              Share the Protection.
            </h1>
            <p style={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.1rem', color: '#425466', lineHeight: 1.6 }}>
              Referring us to your friends and family means you’re helping them too. We will compare insurance prices and look for potential coverage gaps to ensure they have the best protection. Have them fill out this form or do it for them, and make sure they mention your name so we can send you a thank you gift!
            </p>
            
            <form action="https://formsubmit.co/shiv@nxtfinancialgroup.com" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <input type="hidden" name="_subject" value="New Referral from NXT Financial Website" />
              <input type="hidden" name="_template" value="table" />
              
              <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={labelStyle}>Your Name (Referrer)</label>
                  <input type="text" name="referrer_name" placeholder="John Doe" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Your Email</label>
                  <input type="email" name="referrer_email" placeholder="john@example.com" required style={inputStyle} />
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '16px 0' }} />
              
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-heading)', margin: 0 }}>Who are you referring?</h3>
              
              <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={labelStyle}>Friend's Name</label>
                  <input type="text" name="referral_name" placeholder="Jane Smith" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Friend's Phone</label>
                  <input type="tel" name="referral_phone" placeholder="(555) 123-4567" required style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Friend's Email</label>
                <input type="email" name="referral_email" placeholder="jane@example.com" required style={inputStyle} />
              </div>
              
              <div>
                <label style={labelStyle}>Additional Notes / Type of Insurance</label>
                <textarea 
                  name="message"
                  rows="4" 
                  placeholder="Jane is looking for better home and auto policies..." 
                  style={{ ...inputStyle, resize: 'vertical' }} 
                />
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '16px', padding: '18px', fontSize: '1.1rem' }}>
                Submit Referral
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Referral;
