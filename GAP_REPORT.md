# Gap Report

| Feature | Current status | Problem | Required fix | Priority |
|---|---|---|---|---|
| **Backend & API** | Missing | No Node/Express backend. Frontend uses static data. | Implement an Express server with routes that return dynamic, generated mock data. | CRITICAL |
| **Data Generation** | Insufficient | Master data count is too low, transactions are too few. | Create robust mock data generators for BP, Materials, Orders, etc. | CRITICAL |
| **Engines** | Missing | Priority, Risk, Readiness are statically hardcoded. | Build deterministic rule engine functions (calculateRisk, calculatePriority, etc.) | CRITICAL |
| **Demo Mode** | Missing | No guided tour. | Add Demo Mode feature. | HIGH |
| **Analytics & Risk Radar** | Placeholder | Charts do not render dynamic data. | Implement Recharts for Risk Radar and Process Intelligence. | HIGH |
| **Audit Trail** | Missing | Actions don't log to a viewable audit trail. | Implement audit logger and view. | MEDIUM |
| **SAP Pages** | Missing | SAP Architecture and Glossary pages do not exist. | Create pages and add to Router. | LOW |
