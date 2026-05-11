import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { Shield, UserCheck, Store, FileEdit, LayoutGrid, CheckCircle2, ArrowRight } from 'lucide-react';

import { allLogos } from '../logosData';

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: 'NXT Financial Group',
  url: 'https://www.nxtfinancialgroup.com',
  logo: 'https://www.nxtfinancialgroup.com/Logo.jpeg',
  description:
    'NXT Financial Group is a fiercely independent insurance brokerage partnering with the nation\'s top carriers to deliver tailored life, health, casualty, and property insurance.',
  email: 'info@nxtfinancialgroup.com',
  sameAs: [],
  areaServed: { '@type': 'Country', name: 'United States' },
  serviceType: ['Life Insurance', 'Health Insurance', 'Property Insurance', 'Casualty Insurance'],
};

const Home = () => {
  return (
    <PageTransition>
      <SEO
        title="Independent Insurance Brokerage"
        description="NXT Financial Group partners with the nation's top carriers to deliver tailored life, health, casualty, and property insurance to individuals and enterprises. Get a free audit today."
        canonical="/"
        schema={homeSchema}
      />
      <main style={{ overflowX: 'hidden', position: 'relative' }}>
        <div className="stripe-bg"></div>

        {/* HERO SECTION */}
        <section className="home-hero-section" style={{ paddingTop: '120px', paddingBottom: '120px', position: 'relative' }}>
          <div className="container grid-2" style={{ alignItems: 'center', gap: '60px' }}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.04em', color: '#0a2540' }}>
                Comprehensive insurance coverage for the modern era.
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#425466', fontWeight: 500, maxWidth: '540px', marginBottom: '40px', lineHeight: 1.6 }}>
                NXT Financial partners with the world's leading carriers to deliver tailored life, health, casualty, and property insurance to individuals and enterprises.
              </p>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link to="/insurances" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem', gap: '8px' }}>
                  Start now <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-outline" style={{ padding: '14px 28px', fontSize: '1.05rem', color: '#0a2540' }}>
                  Contact sales <ArrowRight size={18}/>
                </Link>
              </div>
            </motion.div>

            {/* Abstract Graphic Right Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(142,0,56,0.1) 0%, rgba(255,255,255,0) 70%)', zIndex: -1 }}></div>
              <img src="/home_hero_new_office.png" alt="Corporate Office" style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', border: '1px solid rgba(0,0,0,0.05)' }} />
              
              {/* Floating Element */}
              <motion.div
                className="home-floating-card"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: 'absolute', bottom: '-20px', left: '-40px', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', padding: '20px', borderRadius: '12px', boxShadow: 'var(--glass-shadow)', display: 'flex', gap: '15px', alignItems: 'center' }}
              >
                <div style={{ background: '#eefaee', color: '#12a454', padding: '10px', borderRadius: '50%' }}>
                  <Shield size={24} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, margin: 0, color: '#0a2540' }}>Coverage Active</p>
                  <p style={{ fontSize: '0.85rem', color: '#425466', margin: 0 }}>$2M Commercial General</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section style={{ padding: '60px 0', borderBottom: '1px solid var(--color-border)', position: 'relative', background: 'transparent' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#425466', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Partnering with the nation's top carriers</span>
          </div>
          <Link to="/carriers" style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}>
            <div className="marquee-container" style={{ margin: 0, padding: '20px 0' }}>
              <div className="marquee-content" style={{ animationDuration: '350s' }}>
                {allLogos.concat(allLogos).map((logoFile, idx) => (
                  <div key={idx} className="marquee-logo" style={{ padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px' }}>
                    <img src={`/logos/${logoFile}`} alt={`Logo`} style={{ maxHeight: '40px', maxWidth: '140px', width: 'auto', flexShrink: 0, objectFit: 'contain', display: 'block' }} onError={(e) => { e.currentTarget.parentNode.style.display = 'none'; }} />
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </section>

        {/* FEATURE PLATFORM */}
        <section className="section-pad" style={{ background: 'transparent' }}>
          <div className="container">
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '16px', display: 'block' }}>Comprehensive coverage</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '24px', maxWidth: '600px', lineHeight: 1.2 }}>
              A complete portfolio of robust insurance products.
            </h2>
            <p className="text-large" style={{ maxWidth: '700px', marginBottom: '64px' }}>
              We negotiate with our vast network of partners to secure the exact coverage you need. From protecting your family's future with life and health insurance, to safeguarding your commercial property and casualty risks, NXT offers holistic solutions perfectly aligned with your goals.
            </p>

            <div className="grid-3" style={{ rowGap: '64px' }}>
              <div>
                <UserCheck color="var(--color-primary)" size={32} style={{ marginBottom: '20px' }} strokeWidth={1.5} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Life & Health</h3>
                <p style={{ color: '#425466', marginBottom: '16px' }}>Protect your family's future and well-being with robust life insurance policies and comprehensive health, medical, and dental coverage.</p>
                <Link to="/insurances" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>Explore <ArrowRight size={14} /></Link>
              </div>
              <div>
                <Store color="var(--color-primary)" size={32} style={{ marginBottom: '20px' }} strokeWidth={1.5} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Property Insurance</h3>
                <p style={{ color: '#425466', marginBottom: '16px' }}>Safeguard your most valuable physical assets, whether it's your personal home or large-scale commercial real estate and inventory.</p>
                <Link to="/insurances" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>Explore <ArrowRight size={14} /></Link>
              </div>
              <div>
                <Shield color="var(--color-primary)" size={32} style={{ marginBottom: '20px' }} strokeWidth={1.5} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Casualty & Liability</h3>
                <p style={{ color: '#425466', marginBottom: '16px' }}>Defend against fundamental risks like customer injuries, professional errors, and unforeseen business interruptions intertwined in your operations.</p>
                <Link to="/insurances" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>Explore <ArrowRight size={14} /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* SLANTED DARK SECTION */}
        <section className="home-dark-section" style={{ background: '#0a2540', color: 'white', padding: '160px 0', transform: 'skewY(-6deg)', transformOrigin: '0', position: 'relative', marginTop: '100px', zIndex: 1 }}>
          <div className="container" style={{ transform: 'skewY(6deg)' }}>
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div>
                <span style={{ color: '#00d4ff', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '16px', display: 'block' }}>Expert Brokerage</span>
                <h2 style={{ fontSize: '3rem', marginBottom: '24px', color: 'white', lineHeight: 1.1 }}>
                  We partner with the best, to give you the best.
                </h2>
                <p style={{ fontSize: '1.15rem', color: '#adbdcc', marginBottom: '40px', lineHeight: 1.6, maxWidth: '500px' }}>
                  Our independent status allows us to shop your risk profile directly across dozens of top-rated carriers. This means you skip the bias of single-company agents and secure truly uncompromising coverage.
                </p>
                <Link to="/contact" className="btn-primary" style={{ backgroundColor: '#00d4ff', color: '#0a2540', boxShadow: 'none' }}>
                  Get a Free Audit
                </Link>
              </div>
              
              <div style={{ background: '#112f4c', borderRadius: '16px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <CheckCircle2 color="#00d4ff" size={28} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: 'white', fontSize: '1.2rem', margin: 0, marginBottom: '8px' }}>Unbiased Selection</h4>
                    <p style={{ color: '#adbdcc', margin: 0, fontSize: '1rem', lineHeight: 1.5 }}>Because we aren't tied to any single carrier, we have the freedom to choose policies that genuinely benefit you.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <CheckCircle2 color="#00d4ff" size={28} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: 'white', fontSize: '1.2rem', margin: 0, marginBottom: '8px' }}>Customized Portfolios</h4>
                    <p style={{ color: '#adbdcc', margin: 0, fontSize: '1rem', lineHeight: 1.5 }}>We mix and match life, health, property, and casualty insurance to perfectly align with your exact goals.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <CheckCircle2 color="#00d4ff" size={28} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: 'white', fontSize: '1.2rem', margin: 0, marginBottom: '8px' }}>Expert Claim Support</h4>
                    <p style={{ color: '#adbdcc', margin: 0, fontSize: '1rem', lineHeight: 1.5 }}>When disaster strikes, we fight in your corner, negotiating directly with the carriers so you don't have to.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="section-pad" style={{ background: 'transparent', marginTop: '100px' }}>
          <div className="container grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '24px', lineHeight: 1.2 }}>Ready to start?</h2>
              <p style={{ fontSize: '1.25rem', color: '#425466', marginBottom: '40px' }}>
                Explore NXT Financial, or create an account instantly and start managing your risk profile. You can also contact us to design a custom package for your business.
              </p>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link to="/insurances" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem', gap: '8px' }}>
                  Start now <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-outline" style={{ padding: '14px 28px', fontSize: '1.05rem', color: '#0a2540' }}>
                  Contact sales <ArrowRight size={18}/>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </PageTransition>
  );
};

export default Home;
