const API_URL = import.meta.env.VITE_API_URL || '/api';

export const getServiceOrders = () => fetch(`${API_URL}/service-orders`).then(res => res.json());
export const getSalesOrders = () => fetch(`${API_URL}/sales-orders`).then(res => res.json());
export const getPurchaseOrders = () => fetch(`${API_URL}/purchase-orders`).then(res => res.json());
export const getExceptions = () => fetch(`${API_URL}/exceptions`).then(res => res.json());
export const getKPIs = () => fetch(`${API_URL}/kpis`).then(res => res.json());
export const getTechnicians = () => fetch(`${API_URL}/technicians`).then(res => res.json());
export const getBusinessPartners = () => fetch(`${API_URL}/business-partners`).then(res => res.json());
export const getMaterials = () => fetch(`${API_URL}/materials`).then(res => res.json());
export const postAction = (data) => fetch(`${API_URL}/action`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(res => res.json());

export const simulateWhatIf = (data) => fetch(`${API_URL}/simulate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(res => res.json());

export const getAuditLogs = () => fetch(`${API_URL}/audit`).then(res => res.json());
