import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CommercialLiabilityCalculator = () => {
  const [revenue, setRevenue] = useState(500000);
  const [employees, setEmployees] = useState(10);
  const [riskFactor, setRiskFactor] = useState(1.5); // 1 = Low (Office), 1.5 = Med (Retail), 2.5 = High (Construction)
  const [propertyValue, setPropertyValue] = useState(100000);

  // Real-world heuristic:
  // General Liability base = 1,000,000 minimum
  // Add 500k for every 1M in revenue above 1M
  // Add 100k per employee if risk is high
  const calculateGL = () => {
    let gl = 1000000;
    if (revenue > 1000000) {
      gl += Math.floor((revenue - 1000000) / 1000000) * 500000;
    }
    gl += employees * 50000 * riskFactor;
    // Cap minimum to standard industry tiers
    if (gl <= 1000000) return 1000000;
    if (gl <= 2000000) return 2000000;
    return Math.ceil(gl / 1000000) * 1000000; // Round to nearest million
  };

  const calculateProperty = () => {
    return propertyValue * 1.25; // 25% buffer for replacement cost / debris removal
  };

  const recommendedGL = calculateGL();
  const recommendedProperty = calculateProperty();

  return (
    <div className="card-solid" style={{ padding: '40px', background: '#f6f9fc', borderTop: '4px solid var(--color-primary)' }}>
      <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Commercial Liability Estimator</h3>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '30px' }}>
        A data-driven assessment for General Liability and Business Personal Property coverage limits based on standard underwriting algorithms.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Industry Risk Class</label>
          <select 
            value={riskFactor} 
            onChange={(e) => setRiskFactor(Number(e.target.value))}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', background: 'white', fontSize: '1.1rem' }}
          >
            <option value={1}>Low Hazard (Office, Consulting, Tech)</option>
            <option value={1.5}>Medium Hazard (Retail, Restaurants, Services)</option>
            <option value={2.5}>High Hazard (Construction, Manufacturing, Transportation)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Annual Projected Revenue ($)</label>
          <input 
            type="number" 
            value={revenue} 
            onChange={(e) => setRevenue(Number(e.target.value))}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', background: 'white', fontSize: '1.1rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Total Employee Count</label>
          <input 
            type="number" 
            value={employees} 
            onChange={(e) => setEmployees(Number(e.target.value))}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', background: 'white', fontSize: '1.1rem' }}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Business Physical Assets Value ($)</label>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#666' }}>(Inventory, specialized equipment, custom build-outs)</p>
          <input 
            type="number" 
            value={propertyValue} 
            onChange={(e) => setPropertyValue(Number(e.target.value))}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', background: 'white', fontSize: '1.1rem' }}
          />
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '24px', background: 'white', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)', boxShadow: 'var(--shadow-md)' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>Estimated General Liability Limit (Aggregate)</h4>
        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0a2540', marginTop: '5px', marginBottom: '20px' }}>
          ${recommendedGL.toLocaleString()}
        </div>
        
        <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>Target Business Property Limit</h4>
        <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0a2540', marginTop: '5px' }}>
          ${recommendedProperty.toLocaleString()}
        </div>
      </div>
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary" 
        style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}
      >
        Request Commercial Quote
      </motion.button>
    </div>
  );
};

export default CommercialLiabilityCalculator;
