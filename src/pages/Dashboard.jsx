import React, { useEffect, useState } from 'react';
import { getKPIs, getExceptions } from '../services/api';
import { Link } from 'react-router-dom';
import { AlertCircle, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [exceptions, setExceptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getKPIs().then(setKpis).catch(e => setError(e.message));
    getExceptions().then(setExceptions).catch(e => setError(e.message));
  }, []);

  if (error) return <div className="card" style={{ color: 'red' }}>API Error: {error}. Ensure the backend is running on port 3001.</div>;
  if (!kpis) return <div className="card">Loading Dashboard...</div>;

  return (
    <div>
      <h1 style={{ marginTop: 0, color: 'var(--sap-dark)' }}>Executive Overview</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card" style={{ borderTop: '4px solid var(--sap-blue)', position: 'relative' }}>
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>Open Exceptions</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{kpis.openExceptions}</div>
          <AlertCircle size={24} style={{ color: 'var(--sap-blue)', position: 'absolute', right: '16px', top: '16px' }} />
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--priority-1)', position: 'relative' }}>
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>P1 Critical</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--priority-1)' }}>{kpis.p1Critical}</div>
          <AlertTriangle size={24} style={{ color: 'var(--priority-1)', position: 'absolute', right: '16px', top: '16px' }} />
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--sap-blue)', position: 'relative' }}>
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>Financial Exposure</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>₹{(kpis.financialExposure / 100000).toFixed(1)}L</div>
          <TrendingUp size={24} style={{ color: 'var(--sap-blue)', position: 'absolute', right: '16px', top: '16px' }} />
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--priority-2)', position: 'relative' }}>
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>SLA Risk</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--priority-2)' }}>{kpis.slaRisk}</div>
          <Clock size={24} style={{ color: 'var(--priority-2)', position: 'absolute', right: '16px', top: '16px' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card"><div style={{ color: '#666', fontSize: '13px' }}>Avg Resolution Time</div><div style={{ fontSize: '22px', fontWeight: 'bold' }}>{kpis.avgResolutionTime}h</div></div>
        <div className="card"><div style={{ color: '#666', fontSize: '13px' }}>First-Time-Fix Rate</div><div style={{ fontSize: '22px', fontWeight: 'bold' }}>{kpis.ftfRate}%</div></div>
        <div className="card"><div style={{ color: '#666', fontSize: '13px' }}>Process Efficiency</div><div style={{ fontSize: '22px', fontWeight: 'bold' }}>{kpis.processEfficiency}%</div></div>
        <div className="card"><div style={{ color: '#666', fontSize: '13px' }}>Recurrence Rate</div><div style={{ fontSize: '22px', fontWeight: 'bold' }}>{kpis.recurrenceRate}%</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card">
          <h2 className="card-title">Process Overview</h2>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <th style={{ padding: '8px 0' }}>Process</th>
                <th style={{ padding: '8px 0' }}>Active Exceptions</th>
                <th style={{ padding: '8px 0' }}>Financial Exposure</th>
              </tr>
            </thead>
            <tbody>
              {['Service', 'P2P', 'O2C'].map(proc => {
                const procExs = exceptions.filter(e => e.process === proc);
                return (
                  <tr key={proc} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px 0', fontWeight: '500' }}>
                      <Link to={proc === 'Service' ? '/service' : proc === 'P2P' ? '/p2p' : '/o2c'}>
                        {proc === 'Service' ? 'Service-to-Resolution' : proc === 'P2P' ? 'Procure-to-Pay' : 'Order-to-Cash'}
                      </Link>
                    </td>
                    <td>{procExs.length}</td>
                    <td>₹{(procExs.reduce((s, e) => s + e.financialImpact, 0) / 100000).toFixed(1)}L</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2 className="card-title">Cross-Process Intelligence</h2>
          {kpis.crossProcessRisk && kpis.crossProcessRisk.length > 0 ? (
            kpis.crossProcessRisk.map((cpr, i) => (
              <div key={i} style={{ background: '#fff3cd', border: '1px solid #ffeeba', padding: '16px', borderRadius: '4px', color: '#856404', marginBottom: '8px' }}>
                <strong>⚠ CROSS-PROCESS ALERT:</strong> {cpr.message}<br/>
                <strong>Business Partner:</strong> {cpr.customerId} ({cpr.count} active exceptions across processes)
                <Link to="/exceptions" style={{ display: 'inline-block', marginTop: '12px', color: '#0056b3', textDecoration: 'none', fontWeight: 'bold' }}>
                  Investigate Queue →
                </Link>
              </div>
            ))
          ) : (
            <div style={{ color: '#666' }}>No cross-process risks detected.</div>
          )}
        </div>
      </div>
    </div>
  );
}
