import React, { useEffect, useState } from 'react';
import { getSalesOrders } from '../services/api';

export default function OrderToCash() {
  const [orders, setOrders] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    getSalesOrders().then(setOrders).catch(console.error);
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

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Order-to-Cash</h1>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('orderValue')}>Value{sortIcon('orderValue')}</th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('slaHours')}>SLA{sortIcon('slaHours')}</th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('ageingHours')}>Ageing{sortIcon('ageingHours')}</th>
              <th>Stock</th>
              <th>Delivery Status</th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('customerCriticality')}>Criticality{sortIcon('customerCriticality')}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.salesOrderId}>
                <td>{o.salesOrderId}</td>
                <td>{o.customerName}</td>
                <td>₹{(o.orderValue/100000).toFixed(1)}L</td>
                <td>{o.slaHours}h</td>
                <td>{o.ageingHours}h</td>
                <td style={{color: o.stockAvailable ? 'green' : 'red'}}>{o.stockAvailable ? 'Available' : 'Shortage'}</td>
                <td>{o.deliveryStatus}</td>
                <td>{o.customerCriticality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
