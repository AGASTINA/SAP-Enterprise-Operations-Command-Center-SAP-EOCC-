import React, { useEffect, useState } from 'react';
import { getKPIs } from '../services/api';

export default function Finance() {
  const [kpis, setKpis] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getKPIs().then(setKpis).catch(e => setError(e.message));
  }, []);

  if (error) return <div className="card" style={{ color: 'red' }}>API Error: {error}</div>;
  if (!kpis) return <div className="card">Loading Finance Data...</div>;

  const totalRevenue = kpis.totalRevenue || 0;
  const totalCost = kpis.totalCost || 0;
  const totalMargin = totalRevenue - totalCost;
  const marginPct = totalRevenue > 0 ? ((totalMargin / totalRevenue) * 100).toFixed(1) : 0;
  const totalOutstanding = kpis.totalOutstanding || 0;

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Finance & Controlling</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div className="card">
          <div style={{ color: '#666', fontSize: '13px' }}>Total Revenue</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold' }}>₹{(totalRevenue / 100000).toFixed(1)}L</div>
        </div>
        <div className="card">
          <div style={{ color: '#666', fontSize: '13px' }}>Total Cost</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold' }}>₹{(totalCost / 100000).toFixed(1)}L</div>
        </div>
        <div className="card">
          <div style={{ color: '#666', fontSize: '13px' }}>Margin</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: totalMargin >= 0 ? 'var(--risk-low)' : 'var(--risk-critical)' }}>{marginPct}%</div>
        </div>
        <div className="card">
          <div style={{ color: '#666', fontSize: '13px' }}>Outstanding Amount</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--priority-2)' }}>₹{(totalOutstanding / 100000).toFixed(1)}L</div>
        </div>
      </div>
      <div className="card">
        <h2 className="card-title">Financial Exposure from Exceptions</h2>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--priority-1)' }}>₹{(kpis.financialExposure / 100000).toFixed(1)}L</div>
        <p style={{ color: '#666', marginTop: '8px' }}>Combined financial exposure from all active O2C, P2P, and Service exceptions.</p>
      </div>

    </div>
  );
}
