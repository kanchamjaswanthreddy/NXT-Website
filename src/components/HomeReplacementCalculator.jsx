import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HomeReplacementCalculator = () => {
  const [sqft, setSqft] = useState(2500);
  const [buildQuality, setBuildQuality] = useState("Standard");
  const [regionModifier, setRegionModifier] = useState(1.1); // e.g. Coastal vs Inland
  const [hasPool, setHasPool] = useState(false);

  // Construction cost constants (Price per Sq Ft) - highly realistic for modern post-inflation costs
  const costs = {
    "Standard": 175,
    "Semi-Custom": 235,
    "Luxury": 340,
    "Ultra-High End": 550
  };

  const calculateDwelling = () => {
    let base = sqft * costs[buildQuality] * regionModifier;
    
    // Add debris removal & inflation buffer (standard Coverage A padding)
    let recommendedCoverage = base * 1.25; 
    return Math.round(recommendedCoverage / 1000) * 1000;
  };

  const calculateOtherStructures = () => {
    // Standard Coverage B is 10% of Dwelling, but pool pushes it up
    let base = calculateDwelling() * 0.1;
    if (hasPool) {
       base += 45000; 
    }
    return Math.round(base / 1000) * 1000;
  };

  const dwellingCoverage = calculateDwelling();
  const otherStructures = calculateOtherStructures();
  // Standard Coverage C (Personal Property) is usually 50% of Coverage A
  const personalProperty = Math.round((dwellingCoverage * 0.5) / 1000) * 1000;

  return (
    <div className="card-solid" style={{ padding: '40px', background: '#f6f9fc', borderTop: '4px solid var(--color-primary)' }}>
      <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Dwelling Replacement Estimator</h3>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '30px' }}>
        Avoid catastrophic under-insurance. Calculate the true reconstruction cost of your home (Coverage A) based on current local building costs, not market value.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Total Square Footage</label>
          <input 
            type="number" 
            value={sqft} 
            onChange={(e) => setSqft(Number(e.target.value))}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', background: 'white', fontSize: '1.1rem' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Build Quality & Finishes</label>
          <select 
            value={buildQuality} 
            onChange={(e) => setBuildQuality(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', background: 'white', fontSize: '1.1rem' }}
          >
            {Object.keys(costs).map(quality => (
              <option key={quality} value={quality}>{quality}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Building Geographic Region</label>
          <select 
            value={regionModifier} 
            onChange={(e) => setRegionModifier(Number(e.target.value))}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', background: 'white', fontSize: '1.1rem' }}
          >
            <option value={1.0}>Inland / Low Risk (Midwest, Plains)</option>
            <option value={1.15}>Suburban Corridors / Metropolitan (Avg)</option>
            <option value={1.35}>Coastal Region (East Coast, Gulf)</option>
            <option value={1.5}>High Market Cost (CA, NY, High-Elevation)</option>
          </select>
        </div>

        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', padding: '16px', background: 'white', borderRadius: '6px', border: '1px solid #ccc' }}>
          <input 
            type="checkbox" 
            id="pool"
            checked={hasPool} 
            onChange={(e) => setHasPool(e.target.checked)}
            style={{ width: '22px', height: '22px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
          />
          <label htmlFor="pool" style={{ fontWeight: 600, cursor: 'pointer', fontSize: '1.05rem', color: '#0a2540' }}>Include additional Coverage B estimation for an In-Ground Pool or Heavy Hardscaping</label>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '24px', background: 'white', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)', boxShadow: 'var(--shadow-md)' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>Estimated Reconstruction Cost (Coverage A)</h4>
        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0a2540', marginTop: '5px', marginBottom: '20px' }}>
          ${dwellingCoverage.toLocaleString()}
        </div>
        
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>Other Structures (Coverage B)</h4>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0a2540', marginTop: '5px' }}>
              ${otherStructures.toLocaleString()}
            </div>
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>Personal Property (Coverage C)</h4>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0a2540', marginTop: '5px' }}>
              ${personalProperty.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary" 
        style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}
      >
        Request High-Value Home Quote
      </motion.button>
    </div>
  );
};

export default HomeReplacementCalculator;
