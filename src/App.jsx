import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ExceptionQueue from './pages/ExceptionQueue';
import ExceptionDetail from './pages/ExceptionDetail';
import ProcessIntelligence from './pages/ProcessIntelligence';
import Audit from './pages/Audit';
import Glossary from './pages/Glossary';
import OrderToCash from './pages/OrderToCash';
import ProcureToPay from './pages/ProcureToPay';
import ServiceOperations from './pages/ServiceOperations';
import Finance from './pages/Finance';
import SAPArchitecture from './pages/SAPArchitecture';
import { RoleProvider, useRole } from './context/RoleContext';
import { Settings, AlertTriangle, Activity, Briefcase, DollarSign, Wrench, Shield, LayoutDashboard, BookOpen, Layers } from 'lucide-react';

function Sidebar() {
  const location = useLocation();
  const { role, setRole } = useRole();
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Executive Overview' },
    { path: '/exceptions', icon: AlertTriangle, label: 'Exception Command Center' },
    { path: '/o2c', icon: DollarSign, label: 'Order-to-Cash' },
    { path: '/p2p', icon: Briefcase, label: 'Procure-to-Pay' },
    { path: '/service', icon: Wrench, label: 'Service Operations' },
    { path: '/finance', icon: Activity, label: 'Finance & Controlling' },
    { path: '/analytics', icon: Activity, label: 'Process Intelligence' },
    { path: '/audit', icon: Shield, label: 'Audit & Decision Trace' },
    { path: '/architecture', icon: Layers, label: 'SAP Architecture' },
    { path: '/glossary', icon: BookOpen, label: 'SAP Glossary' }
  ];

  return (
    <div style={{ width: '260px', background: 'var(--sap-dark)', color: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #2c425a' }}>
        SAP EOCC
      </div>
      <nav style={{ flex: 1, padding: '10px 0', overflowY: 'auto' }}>
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex', alignItems: 'center', padding: '12px 20px', color: '#cbd5e1',
              textDecoration: 'none', gap: '12px',
              background: location.pathname === item.path ? '#2c425a' : 'transparent',
              borderLeft: location.pathname === item.path ? '4px solid var(--sap-blue)' : '4px solid transparent'
            }}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div style={{ padding: '20px', borderTop: '1px solid #2c425a', fontSize: '14px' }}>
        <div style={{ color: '#8b9caa', marginBottom: '8px' }}>Current Role:</div>
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '8px', background: '#2c425a', color: 'white', border: 'none', borderRadius: '4px' }}>
          <option>Executive</option>
          <option>Operations Manager</option>
          <option>Service Manager</option>
          <option>Procurement Manager</option>
          <option>Finance Manager</option>
        </select>
      </div>
    </div>
  );
}

function Header() {
  const { role } = useRole();

  return (
    <div style={{ height: '60px', background: 'var(--sap-blue)', color: 'white', display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '18px', fontWeight: '500' }}>SAP Enterprise Operations Command Center</div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '14px' }}>
        <input type="text" placeholder="Global Search..." style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }} onChange={(e) => {
          if (e.target.value === 'SO-10452' || e.target.value === 'PO-20341' || e.target.value === 'SO-30452') {
            alert(`Global Search: Found ${e.target.value}`);
          }
        }} />
        <span>User: {role}</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <RoleProvider>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="page-content" style={{ position: 'relative' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/exceptions" element={<ExceptionQueue />} />
              <Route path="/exceptions/:id" element={<ExceptionDetail />} />
              <Route path="/o2c" element={<OrderToCash />} />
              <Route path="/p2p" element={<ProcureToPay />} />
              <Route path="/service" element={<ServiceOperations />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/analytics" element={<ProcessIntelligence />} />
              <Route path="/audit" element={<Audit />} />
              <Route path="/architecture" element={<SAPArchitecture />} />
              <Route path="/glossary" element={<Glossary />} />
            </Routes>
          </div>
        </div>
      </div>
    </RoleProvider>
  );
}

export default App;
