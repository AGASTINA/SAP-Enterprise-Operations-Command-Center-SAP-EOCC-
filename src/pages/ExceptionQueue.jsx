import React, { useEffect, useState } from 'react';
import { getExceptions } from '../services/api';
import { Link } from 'react-router-dom';

export default function ExceptionQueue() {
  const [exceptions, setExceptions] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    getExceptions().then(data => {
      setExceptions(data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  const handleSort = (field) => {
    const isAsc = sortField === field ? !sortAsc : true;
    setSortField(field);
    setSortAsc(isAsc);
    
    const sorted = [...exceptions].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? -1 : 1;
      if (a[field] > b[field]) return isAsc ? 1 : -1;
      return 0;
    });
    setExceptions(sorted);
  };

  const sortIcon = (field) => sortField === field ? (sortAsc ? ' ▲' : ' ▼') : '';

  if (loading) return <div className="card">Loading Queue...</div>;

  const filteredExceptions = exceptions.filter(ex => 
    filter === 'All' ? true : ex.process === filter
  );

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Exception Command Center</h1>
      <div className="card">
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--sap-border)' }}>
            <option value="All">All Processes</option>
            <option value="Service">Service</option>
            <option value="P2P">Procure-to-Pay</option>
            <option value="O2C">Order-to-Cash</option>
          </select>
        </div>
        
        {filteredExceptions.length === 0 ? (
          <div>No exceptions found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('priority')}>Priority{sortIcon('priority')}</th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('severity')}>Risk{sortIcon('severity')}</th>
                <th>Process</th>
                <th>Object ID</th>
                <th>Customer / Supplier</th>
                <th>Category</th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('financialImpact')}>Financial Exposure{sortIcon('financialImpact')}</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExceptions.map((ex, i) => (
                <tr key={i}>
                  <td>
                    <span style={{ 
                      background: ex.priority === 'P1' ? 'var(--priority-1)' : (ex.priority === 'P2' ? 'var(--priority-2)' : 'var(--priority-3)'),
                      color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold'
                    }}>
                      {ex.priority}
                    </span>
                  </td>
                  <td style={{ color: ex.severity === 'Critical' ? 'var(--risk-critical)' : 'inherit' }}>{ex.severity}</td>
                  <td>{ex.process}</td>
                  <td>{ex.objectId}</td>
                  <td>{ex.customerName}</td>
                  <td>{ex.category}</td>
                  <td>₹{(ex.financialImpact/100000).toFixed(1)}L</td>
                  <td>
                    <Link to={`/exceptions/${ex.objectId}`}>
                      <button className="primary">Review</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
