# Project Documentation

## 1. Business Problem
Lack of unified operational visibility across O2C, P2P, and Service processes.

## 2. Proposed Solution
An integrated Command Center that applies rules to detect exceptions and provide AI-driven decision briefs based on deterministic evidence.

## 3. SAP Process Mapping
- O2C: Sales Order to Billing
- P2P: Purchase Requisition to Payment
- Service: Request to First-Time Fix

## 4. Architecture
Uses a standard React frontend built with Vite. Assumes a backend providing SAP OData V4 APIs via SAP Integration Suite / BTP.

## 5. Exception Engine & AI Decision Brief
Exceptions are generated when business conditions (e.g. SLA breach + Parts unavailability) meet deterministic criteria. The UI explains *why* a priority is assigned, *what* evidence supports it, and suggests the *next-best action*.
