import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import LifeCalculator from '../components/LifeCalculator';
import CommercialLiabilityCalculator from '../components/CommercialLiabilityCalculator';
import HomeReplacementCalculator from '../components/HomeReplacementCalculator';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  })
};

const Resources = () => {
  const [activeCalculator, setActiveCalculator] = useState('life');

  return (
    <PageTransition>
      <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f9fbfd', paddingTop: '120px', paddingBottom: '100px' }}>
        <div className="container">
          
          {/* HEADER */}
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="eyebrow" style={{ color: "var(--color-primary)" }}>ACTUARIAL ESTIMATES</span>
            <h1 style={{ maxWidth: '1000px', margin: '0 auto', fontSize: '3.5rem', lineHeight: 1.2, color: '#0a2540' }}>
              Strategic Coverage Calculators
            </h1>
            <p className="text-large" style={{ maxWidth: '900px', margin: '20px auto', lineHeight: 1.6, color: '#425466' }}>
              True protection is built on math, not guesswork. Utilize our internal estimation algorithms below to discover exactly how much coverage you physically need across your life, your home, and your business. 
            </p>
          </motion.div>

          {/* TAB SYSTEM */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            custom={1} 
            variants={fadeUp}
            style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px', flexWrap: 'wrap' }}
          >
            <button 
              onClick={() => setActiveCalculator('life')}
              style={{
                padding: '14px 28px',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '8px',
                cursor: 'pointer',
                border: activeCalculator === 'life' ? '2px solid var(--color-primary)' : '2px solid transparent',
                background: activeCalculator === 'life' ? 'white' : '#e6eaf0',
                color: activeCalculator === 'life' ? 'var(--color-primary)' : '#425466',
                transition: 'all 0.3s ease',
                boxShadow: activeCalculator === 'life' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Life Insurance
            </button>
            <button 
              onClick={() => setActiveCalculator('home')}
              style={{
                padding: '14px 28px',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '8px',
                cursor: 'pointer',
                border: activeCalculator === 'home' ? '2px solid var(--color-primary)' : '2px solid transparent',
                background: activeCalculator === 'home' ? 'white' : '#e6eaf0',
                color: activeCalculator === 'home' ? 'var(--color-primary)' : '#425466',
                transition: 'all 0.3s ease',
                boxShadow: activeCalculator === 'home' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              High-Value Home Property
            </button>
            <button 
              onClick={() => setActiveCalculator('business')}
              style={{
                padding: '14px 28px',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '8px',
                cursor: 'pointer',
                border: activeCalculator === 'business' ? '2px solid var(--color-primary)' : '2px solid transparent',
                background: activeCalculator === 'business' ? 'white' : '#e6eaf0',
                color: activeCalculator === 'business' ? 'var(--color-primary)' : '#425466',
                transition: 'all 0.3s ease',
                boxShadow: activeCalculator === 'business' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Commercial General Liability
            </button>
          </motion.div>

          {/* CALCULATOR DISPLAY */}
          <div style={{ maxWidth: '1000px', margin: '0 auto', minHeight: '600px' }}>
            <AnimatePresence mode="wait">
              {activeCalculator === 'life' && (
                <motion.div
                  key="life"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <LifeCalculator />
                </motion.div>
              )}
              {activeCalculator === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <HomeReplacementCalculator />
                </motion.div>
              )}
              {activeCalculator === 'business' && (
                <motion.div
                  key="business"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <CommercialLiabilityCalculator />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#0a2540' }}>Need an expert interpretation?</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto 30px', fontSize: '1.2rem', color: '#425466', lineHeight: 1.6 }}>
              Our executive partners can cross-reference these mathematical baselines against actual local carrier data and strict underwriting guidelines to find the absolute lowest premium for the limits you need.
            </p>
            <Link to="/contact" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              Schedule a Strategic Deep Dive
            </Link>
          </div>

        </div>
      </main>
    </PageTransition>
  );
};

export default Resources;
