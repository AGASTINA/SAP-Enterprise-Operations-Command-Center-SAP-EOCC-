import React from 'react';

export default function SAPArchitecture() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>SAP Architecture</h1>
      <div className="card">
        <div style={{ textAlign: 'center', margin: '40px 0', fontFamily: 'monospace', fontSize: '18px', lineHeight: '2' }}>
          <div style={{ background: '#f4f4f4', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>SAP S/4HANA (Digital Core)</div>
          <div>↓</div>
          <div style={{ background: '#e9ecef', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>OData V4 / REST APIs</div>
          <div>↓</div>
          <div style={{ background: '#e0e7ff', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>SAP Integration Suite / BTP</div>
          <div>↓</div>
          <div style={{ background: '#dbeafe', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>CAP / Deterministic Business Rules Engine</div>
          <div>↓</div>
          <div style={{ background: '#bfdbfe', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>AI-Ready Decision Intelligence Layer</div>
          <div>↓</div>
          <div style={{ background: '#93c5fd', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', color: 'black' }}>React / Fiori User Interface</div>
        </div>
        

      </div>
    </div>
  );
}
