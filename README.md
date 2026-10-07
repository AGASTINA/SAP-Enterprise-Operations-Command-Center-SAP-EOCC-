# SAP ENTERPRISE OPERATIONS COMMAND CENTER

## Problem Statement
Enterprises running SAP S/4HANA often lack a unified, cross-process operational view that prioritizes exceptions and provides actionable intelligence based on deterministic business rules.

## Business Objective
Provide a decision-support layer around SAP business processes that consumes enterprise transaction data, applies deterministic business rules, identifies exceptions, calculates risk, explains evidence, and recommends the next-best action.

## SAP Process Coverage
1. Order-to-Cash (O2C)
2. Procure-to-Pay (P2P)
3. Service-to-Resolution

## Architecture
- Frontend: React + Vite
- Data: Simulated OData API layer (mocked for prototype)

## Important Limitation Statement
This project is a SAP-aligned prototype using simulated enterprise transaction data. It does not connect to a production SAP S/4HANA system. The architecture is designed to support production integration through authorized SAP APIs/OData services.

## How to Run
```bash
npm install
npm run dev
```

## Build for Production
```bash
npm run build
```
