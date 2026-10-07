import React from 'react';

export default function Glossary() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>SAP Concepts / Glossary</h1>
      <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h3>S/4HANA</h3>
          <p>SAP's enterprise resource planning suite built on the HANA in-memory database, providing real-time data processing and analytics.</p>
          
          <h3>Business Partner (BP)</h3>
          <p>A unified master data object in S/4HANA that replaces separate customer and vendor masters. A BP can hold multiple roles.</p>

          <h3>Sales Order</h3>
          <p>The core O2C transaction document confirming a customer's request for goods or services, triggering availability checks and delivery.</p>

          <h3>Purchase Order</h3>
          <p>The core P2P transaction document sent to a supplier to procure goods/services at an agreed price.</p>

          <h3>Service Order</h3>
          <p>The core Service transaction detailing work to be done, technicians required, parts needed, and SLA commitments.</p>

          <h3>SAP Fiori</h3>
          <p>SAP's user experience (UX) design language and framework, providing role-based, responsive apps.</p>
        </div>
        <div>
          <h3>SAP BTP (Business Technology Platform)</h3>
          <p>A unified environment for application development, integration, and analytics that allows side-by-side extensibility without modifying the S/4HANA core.</p>

          <h3>OData</h3>
          <p>Open Data Protocol, a standardized REST-based protocol used extensively by SAP to expose business objects to front-end applications like Fiori or custom React apps.</p>

          <h3>First-Time Fix (FTF)</h3>
          <p>A critical service KPI measuring whether a technician successfully resolved the issue on their first visit without requiring a follow-up.</p>

          <h3>SLA (Service Level Agreement)</h3>
          <p>Contractual timeframe to resolve an issue. In this Command Center, SLA remaining hours directly affect Priority.</p>

          <h3>Exception Management</h3>
          <p>A paradigm shift from reviewing standard lists to only surfacing transactions that violate a deterministic business rule (e.g. overdue delivery, SLA risk).</p>
        </div>
      </div>
    </div>
  );
}
