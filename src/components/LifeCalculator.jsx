import React, { useState } from 'react';

const LifeCalculator = () => {
  const [income, setIncome] = useState(50000);
  const [years, setYears] = useState(10);
  const [debt, setDebt] = useState(20000);
  const [education, setEducation] = useState(0);

  const totalNeeds = (Number(income) * Number(years)) + Number(debt) + Number(education);

  return (
    <div className="card-solid" style={{ padding: '40px', background: '#f6f9fc' }}>
      <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Life Insurance Needs Calculator</h3>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '30px' }}>
        Estimate how much life insurance coverage you need to fully protect your loved ones.
      </p>

      <div style={{ display: 'grid', gap: '24px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Annual Income ($)</label>
          <input 
            type="number" 
            value={income} 
            onChange={(e) => setIncome(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', background: 'white', fontSize: '1.1rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Years To Replace Income</label>
          <input 
            type="number" 
            value={years} 
            onChange={(e) => setYears(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', background: 'white', fontSize: '1.1rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Total Debt / Mortgages ($)</label>
          <input 
            type="number" 
            value={debt} 
            onChange={(e) => setDebt(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', background: 'white', fontSize: '1.1rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Future Education Costs ($)</label>
          <input 
            type="number" 
            value={education} 
            onChange={(e) => setEducation(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', background: 'white', fontSize: '1.1rem' }}
          />
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '24px', background: 'white', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)', boxShadow: 'var(--shadow-md)' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>Estimated Target Coverage</h4>
        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0a2540', marginTop: '10px' }}>
          ${Math.max(0, totalNeeds).toLocaleString()}
        </div>
      </div>
      
      <button className="btn-primary" style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}>
        Discuss My Results With An Expert
      </button>
    </div>
  );
};

export default LifeCalculator;
