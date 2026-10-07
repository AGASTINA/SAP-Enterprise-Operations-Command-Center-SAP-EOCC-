import React, { useEffect, useState } from 'react';
import { getServiceOrders } from '../services/api';

export default function ServiceOperations() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    getServiceOrders().then(d => { setOrders(d); setLoading(false); }).catch(console.error);
  }, []);

  const handleSort = (field) => {
    const isAsc = sortField === field ? !sortAsc : true;
    setSortField(field);
    setSortAsc(isAsc);
    
    const sorted = [...orders].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? -1 : 1;
      if (a[field] > b[field]) return isAsc ? 1 : -1;
      return 0;
    });
    setOrders(sorted);
  };

  const sortIcon = (field) => sortField === field ? (sortAsc ? ' ▲' : ' ▼') : '';

  if(loading) return <div className="card">Loading Service Orders...</div>;

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Service Operations</h1>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('priority')}>Priority{sortIcon('priority')}</th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('slaRemainingHours')}>SLA{sortIcon('slaRemainingHours')}</th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('financialExposure')}>Exposure{sortIcon('financialExposure')}</th>
              <th>Tech Skill</th>
              <th>Parts</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.serviceOrderId}>
                <td>{o.serviceOrderId}</td>
                <td>{o.customerName}</td>
                <td><strong style={{color: o.priority === 'P1' ? 'red' : 'inherit'}}>{o.priority}</strong></td>
                <td>{o.slaRemainingHours}h</td>
                <td>₹{(o.financialExposure/100000).toFixed(1)}L</td>
                <td>{o.technicianSkillLevel}/{o.requiredSkillLevel}</td>
                <td>{o.partsAvailable ? 'Yes' : 'No'}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
