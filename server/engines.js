export function calculateReadiness(so) {
  let skillMatch = so.technicianSkillLevel >= so.requiredSkillLevel ? 25 : 10;
  let partsReadiness = so.partsAvailable ? 25 : 0;
  let slaFeasibility = so.slaRemainingHours > (so.estimatedResolutionHours || 0) ? 20 : 5;
  let ftfHistory = so.firstTimeFixHistory > 80 ? 15 : (so.firstTimeFixHistory > 50 ? 10 : 5);
  let serviceHistory = (so.previousServiceCount || 0) > 0 ? 10 : 15;
  
  return {
    score: skillMatch + partsReadiness + slaFeasibility + ftfHistory + serviceHistory,
    breakdown: { skillMatch, partsReadiness, slaFeasibility, ftfHistory, serviceHistory }
  };
}

export function evaluateTechnician(so, techs) {
  let bestTech = null;
  let bestScore = -1;
  let reasons = [];

  techs.forEach(t => {
    let score = 0;
    let r = [];
    if (t.skills && t.skills.includes(so.requiredSkill)) { score += 30; r.push('Skill match'); }
    if (t.skillLevel >= so.requiredSkillLevel) { score += 20; r.push('Skill level adequate'); }
    if (t.availability > (so.estimatedResolutionHours || 0)) { score += 15; r.push('Available for duration'); }
    if (t.currentWorkload < 3) { score += 10; r.push('Low workload'); }
    if (t.firstTimeFixRate > 80) { score += 10; r.push('High FTF rate'); }

    if (score > bestScore) {
      bestScore = score;
      bestTech = t;
      reasons = r;
    }
  });

  return {
    recommendedTechnician: bestTech ? bestTech.name : 'None',
    dispatchConfidence: bestScore,
    reasons,
    whyNotAlternatives: 'Other technicians lack skill match or are over capacity.'
  };
}

export function calculatePriorityAndRisk(so, isCriticalCust) {
    let p = 'P4';
    let risk = 'Low';
    let reason = '';
    
    if (isCriticalCust && so.slaRemainingHours <= 4 && !so.partsAvailable) {
      p = 'P1';
      risk = 'Critical';
      reason = 'RULE-004: Customer Criticality + SLA Risk + Parts. Customer is critical, SLA <= 4h, and parts are unavailable.';
    } else if (so.slaRemainingHours <= 4) {
      p = 'P2';
      risk = 'High';
      reason = 'SLA Risk. Order is nearing SLA breach.';
    } else if (isCriticalCust && !so.partsAvailable) {
      p = 'P2';
      risk = 'High';
      reason = 'Parts unavailable for critical customer.';
    } else {
      p = 'P3';
      risk = 'Medium';
      reason = 'Standard processing.';
    }

    return { priority: p, risk, reason };
}

export function evaluateExceptions(db) {
  db.exceptions = [];
  const bpRisk = {};

  db.serviceOrders.forEach(so => {
    const cust = db.customers.find(c => c.customerId === so.businessPartnerId);
    const isCriticalCust = cust?.criticality === 'Critical';

    const { priority, risk, reason } = calculatePriorityAndRisk(so, isCriticalCust);

    if (priority === 'P1' || priority === 'P2') {
      bpRisk[so.businessPartnerId] = (bpRisk[so.businessPartnerId] || 0) + 1;
      db.exceptions.push({
        exceptionId: `EX-${Math.floor(Math.random()*10000)}`,
        process: 'Service',
        objectId: so.serviceOrderId,
        category: !so.partsAvailable ? 'PARTS' : 'SLA',
        severity: risk,
        priority: priority,
        reason,
        financialImpact: so.financialExposure || so.orderValue,
        createdAt: new Date().toISOString(),
        status: 'Open',
        owner: so.owner,
        customerName: so.customerName,
        recommendedAction: priority === 'P1' ? 'Escalate service order, assign high-level tech, initiate urgent parts sourcing.' : 'Monitor SLA closely.',
        readiness: calculateReadiness(so),
        techRecommendation: evaluateTechnician(so, db.technicians)
      });
    }
  });

  db.purchaseOrders.forEach(po => {
    if (po.ageingDays > 0 && po.supplierRisk === 'High') {
      db.exceptions.push({
        exceptionId: `EX-${Math.floor(Math.random()*10000)}`,
        process: 'P2P',
        objectId: po.purchaseOrderId,
        category: 'DELIVERY',
        severity: 'Critical',
        priority: 'P1',
        reason: 'Supplier delay + High Risk. PO is overdue and supplier is high risk.',
        financialImpact: po.poValue,
        createdAt: new Date().toISOString(),
        status: 'Open',
        owner: po.owner,
        customerName: po.supplierName,
        recommendedAction: 'Supplier escalation + alternate sourcing.'
      });
    }
  });

  db.salesOrders.forEach(so => {
    if (!so.stockAvailable && so.customerCriticality === 'High') {
      bpRisk[so.customerId] = (bpRisk[so.customerId] || 0) + 1;
      db.exceptions.push({
        exceptionId: `EX-${Math.floor(Math.random()*10000)}`,
        process: 'O2C',
        objectId: so.salesOrderId,
        category: 'STOCK',
        severity: 'High',
        priority: 'P2',
        reason: 'Insufficient stock for high criticality customer.',
        financialImpact: so.orderValue,
        createdAt: new Date().toISOString(),
        status: 'Open',
        owner: so.owner,
        customerName: so.customerName,
        recommendedAction: 'Stock reallocation / Procurement trigger / Customer communication.'
      });
    }
  });

  db.crossProcessRisk = Object.keys(bpRisk).filter(bp => bpRisk[bp] > 1).map(bp => {
    return {
      customerId: bp,
      message: "Multiple active processes are affecting the same critical customer.",
      count: bpRisk[bp]
    };
  });
}
