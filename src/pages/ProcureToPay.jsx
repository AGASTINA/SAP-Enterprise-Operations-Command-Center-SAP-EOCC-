import React, { useEffect, useState } from 'react';
import { getPurchaseOrders, postAction } from '../services/api';
import { useRole } from '../context/RoleContext';

export default function ProcureToPay() {
  const [orders, setOrders] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const { hasPermission } = useRole();

  useEffect(() => {
    getPurchaseOrders().then(setOrders).catch(console.error);
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

  const escalate = async (id) => {
    if(!hasPermission('SUPPLIER_ACTION')) return;
    await postAction({ objectId: id, action: 'Escalate Supplier', reason: 'Supplier Risk' });
  };

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Procure-to-Pay</h1>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>PO ID</th>
              <th>Supplier</th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('poValue')}>Value{sortIcon('poValue')}</th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('ageingDays')}>Ageing{sortIcon('ageingDays')}</th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('supplierRisk')}>Risk{sortIcon('supplierRisk')}</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.purchaseOrderId}>
                <td>{o.purchaseOrderId}</td>
                <td>{o.supplierName}</td>
                <td>₹{(o.poValue/100000).toFixed(1)}L</td>
                <td>{o.ageingDays} days</td>
                <td style={{color: o.supplierRisk === 'High' ? 'red' : 'inherit'}}>{o.supplierRisk}</td>
                <td>
                  {hasPermission('SUPPLIER_ACTION') && (
                    <button onClick={() => escalate(o.purchaseOrderId)}>Escalate</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
