import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateAllData } from './dataGenerator.js';
import { evaluateExceptions, calculatePriorityAndRisk, calculateReadiness, evaluateTechnician } from './engines.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const db = generateAllData();
evaluateExceptions(db);

// Compute KPIs dynamically from dataset
app.get('/api/kpis', (req, res) => {
  const openExceptions = db.exceptions.length;
  const p1Critical = db.exceptions.filter(e => e.priority === 'P1').length;
  const financialExposure = db.exceptions.reduce((sum, e) => sum + e.financialImpact, 0);
  const slaRisk = db.exceptions.filter(e => e.reason.includes('SLA')).length;

  // Calculate avg resolution time from service orders
  const resolvedOrders = db.serviceOrders.filter(s => s.status === 'Resolved' || s.status === 'Closed');
  const avgResolutionTime = resolvedOrders.length > 0
    ? resolvedOrders.reduce((sum, s) => sum + (s.estimatedResolutionHours || 0), 0) / resolvedOrders.length
    : db.serviceOrders.reduce((sum, s) => sum + (s.estimatedResolutionHours || 0), 0) / db.serviceOrders.length;

  // Calculate FTF rate from service orders
  const eligibleServiceOrders = db.serviceOrders.filter(s => s.firstTimeFixHistory !== undefined);
  const ftfRate = eligibleServiceOrders.length > 0
    ? Math.round(eligibleServiceOrders.reduce((sum, s) => sum + s.firstTimeFixHistory, 0) / eligibleServiceOrders.length)
    : 0;

  // Process efficiency = percentage of non-exception orders
  const totalTransactions = db.serviceOrders.length + db.salesOrders.length + db.purchaseOrders.length;
  const processEfficiency = totalTransactions > 0
    ? Math.round(((totalTransactions - openExceptions) / totalTransactions) * 100)
    : 0;

  // Recurrence rate from service orders
  const recurrenceRate = eligibleServiceOrders.length > 0
    ? Math.round(eligibleServiceOrders.reduce((sum, s) => sum + (s.recurrenceRate || 0), 0) / eligibleServiceOrders.length)
    : 0;

  res.json({
    openExceptions,
    p1Critical,
    financialExposure,
    slaRisk,
    avgResolutionTime: Math.round(avgResolutionTime * 10) / 10,
    ftfRate,
    processEfficiency,
    recurrenceRate,
    crossProcessRisk: db.crossProcessRisk || [],
    // Finance summary derived from data
    totalRevenue: db.financeRecords.reduce((s, r) => s + (r.revenue || 0), 0),
    totalCost: db.financeRecords.reduce((s, r) => s + (r.cost || 0), 0),
    totalOutstanding: db.financeRecords.reduce((s, r) => s + (r.outstandingAmount || 0), 0)
  });
});

app.get('/api/business-partners', (req, res) => res.json(db.businessPartners));
app.get('/api/materials', (req, res) => res.json(db.materials));
app.get('/api/plants', (req, res) => res.json(db.plants));
app.get('/api/technicians', (req, res) => res.json(db.technicians));
app.get('/api/suppliers', (req, res) => res.json(db.suppliers));
app.get('/api/customers', (req, res) => res.json(db.customers));
app.get('/api/sales-orders', (req, res) => res.json(db.salesOrders));
app.get('/api/purchase-orders', (req, res) => res.json(db.purchaseOrders));
app.get('/api/service-orders', (req, res) => res.json(db.serviceOrders));
app.get('/api/finance-records', (req, res) => res.json(db.financeRecords));
app.get('/api/exceptions', (req, res) => res.json(db.exceptions));
app.get('/api/audit', (req, res) => res.json(db.auditLogs));

app.post('/api/action', (req, res) => {
  const { objectId, action, user, role, previousStatus, newStatus, reason } = req.body;
  const log = {
    timestamp: new Date().toISOString(),
    user: user || 'Unknown',
    role: role || 'Unknown',
    objectId,
    previousStatus,
    newStatus,
    action,
    reason
  };
  db.auditLogs.push(log);
  res.json({ success: true, log });
});

app.post('/api/simulate', (req, res) => {
  const { originalOrder, simulatedValues } = req.body;
  const simSo = { ...originalOrder, ...simulatedValues };

  const cust = db.customers.find(c => c.customerId === simSo.businessPartnerId) || { criticality: 'Medium' };
  const isCriticalCust = cust.criticality === 'Critical';

  const { priority, risk, reason } = calculatePriorityAndRisk(simSo, isCriticalCust);
  const readiness = calculateReadiness(simSo);
  const techRecommendation = evaluateTechnician(simSo, db.technicians);

  res.json({
    priority,
    risk,
    reason,
    readiness,
    techRecommendation
  });
});

// Serve static frontend in production
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Export for Vercel serverless function
export default app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`SAP EOCC running on port ${PORT}`);
  });
}
