export function generateAllData() {
  const customers = [
    { customerId: 'BP-100', customerName: 'Northfield University', criticality: 'Critical', region: 'NA', industry: 'Education', creditStatus: 'Good', slaTier: 'Platinum' },
    { customerId: 'BP-101', customerName: 'Bharat Engineering Works', criticality: 'High', region: 'APJ', industry: 'Manufacturing', creditStatus: 'Blocked', slaTier: 'Gold' },
    { customerId: 'BP-102', customerName: 'Southern Medical Systems', criticality: 'Critical', region: 'NA', industry: 'Healthcare', creditStatus: 'Good', slaTier: 'Platinum' },
    { customerId: 'BP-103', customerName: 'Bharat Industrial Systems', criticality: 'High', region: 'APJ', industry: 'Manufacturing', creditStatus: 'Good', slaTier: 'Silver' },
    { customerId: 'BP-104', customerName: 'Kaveri Power Solutions', criticality: 'Medium', region: 'APJ', industry: 'Energy', creditStatus: 'Good', slaTier: 'Gold' },
    { customerId: 'BP-105', customerName: 'Nordic Automation AG', criticality: 'High', region: 'EU', industry: 'Manufacturing', creditStatus: 'Good', slaTier: 'Gold' },
    { customerId: 'BP-106', customerName: 'Greenfield Hospitals', criticality: 'Critical', region: 'NA', industry: 'Healthcare', creditStatus: 'Good', slaTier: 'Platinum' },
    { customerId: 'BP-107', customerName: 'Metro Rail Corporation', criticality: 'High', region: 'APJ', industry: 'Transport', creditStatus: 'Good', slaTier: 'Gold' },
    { customerId: 'BP-108', customerName: 'Pinnacle Retail Group', criticality: 'Medium', region: 'EMEA', industry: 'Retail', creditStatus: 'Good', slaTier: 'Standard' },
    { customerId: 'BP-109', customerName: 'Sahara Logistics', criticality: 'Medium', region: 'EMEA', industry: 'Logistics', creditStatus: 'Good', slaTier: 'Standard' },
    { customerId: 'BP-110', customerName: 'Tidewater Marine Services', criticality: 'High', region: 'NA', industry: 'Marine', creditStatus: 'Good', slaTier: 'Gold' },
    { customerId: 'BP-111', customerName: 'Eastern Pharma Ltd', criticality: 'Critical', region: 'APJ', industry: 'Pharma', creditStatus: 'Good', slaTier: 'Platinum' },
    { customerId: 'BP-112', customerName: 'Alpine Construction', criticality: 'Medium', region: 'EU', industry: 'Construction', creditStatus: 'Blocked', slaTier: 'Silver' },
    { customerId: 'BP-113', customerName: 'Clearwater Foods', criticality: 'Low', region: 'NA', industry: 'Food', creditStatus: 'Good', slaTier: 'Standard' },
    { customerId: 'BP-114', customerName: 'Delta Aerospace', criticality: 'High', region: 'NA', industry: 'Aerospace', creditStatus: 'Good', slaTier: 'Gold' }
  ];

  const suppliers = [
    { supplierId: 'SU-200', supplierName: 'Chennai Precision Components', rating: 'C', region: 'APJ', averageDeliveryDays: 14, onTimeDeliveryRate: 60, riskLevel: 'High' },
    { supplierId: 'SU-201', supplierName: 'Apex Industrial Systems', rating: 'A', region: 'EU', averageDeliveryDays: 5, onTimeDeliveryRate: 98, riskLevel: 'Low' },
    { supplierId: 'SU-202', supplierName: 'Kaveri Manufacturing', rating: 'B', region: 'APJ', averageDeliveryDays: 10, onTimeDeliveryRate: 85, riskLevel: 'Medium' },
    { supplierId: 'SU-203', supplierName: 'Sterling Metal Works', rating: 'A', region: 'EU', averageDeliveryDays: 6, onTimeDeliveryRate: 96, riskLevel: 'Low' },
    { supplierId: 'SU-204', supplierName: 'Pacific Fasteners Inc', rating: 'B', region: 'NA', averageDeliveryDays: 7, onTimeDeliveryRate: 90, riskLevel: 'Low' },
    { supplierId: 'SU-205', supplierName: 'Rajasthan Polymers', rating: 'C', region: 'APJ', averageDeliveryDays: 12, onTimeDeliveryRate: 70, riskLevel: 'Medium' },
    { supplierId: 'SU-206', supplierName: 'Yangtze Electronics', rating: 'B', region: 'APJ', averageDeliveryDays: 9, onTimeDeliveryRate: 88, riskLevel: 'Low' },
    { supplierId: 'SU-207', supplierName: 'Rhine Valley Tools', rating: 'A', region: 'EU', averageDeliveryDays: 4, onTimeDeliveryRate: 99, riskLevel: 'Low' },
    { supplierId: 'SU-208', supplierName: 'Great Lakes Bearings', rating: 'B', region: 'NA', averageDeliveryDays: 8, onTimeDeliveryRate: 91, riskLevel: 'Low' },
    { supplierId: 'SU-209', supplierName: 'Coimbatore Castings', rating: 'C', region: 'APJ', averageDeliveryDays: 15, onTimeDeliveryRate: 65, riskLevel: 'High' }
  ];

  const businessPartners = [...customers, ...suppliers].map(c => ({
    businessPartnerId: c.customerId || c.supplierId,
    name: c.customerName || c.supplierName,
    type: c.customerId ? 'Customer' : 'Supplier',
    customerOrSupplier: c.customerId ? 'Customer' : 'Supplier',
    criticality: c.criticality || c.riskLevel,
    region: c.region,
    industry: c.industry || 'General'
  }));

  const plants = [
    { plantId: '1101', plantName: 'HQ Manufacturing Plant', region: 'NA', companyCode: '1000' },
    { plantId: '1102', plantName: 'EU Distribution Hub', region: 'EU', companyCode: '1100' },
    { plantId: '1103', plantName: 'APJ Manufacturing Centre', region: 'APJ', companyCode: '1200' },
    { plantId: '1104', plantName: 'NA Service Centre', region: 'NA', companyCode: '1000' },
    { plantId: '1105', plantName: 'EMEA Service Centre', region: 'EMEA', companyCode: '1100' }
  ];

  const materials = [
    { materialId: 'M-101', materialDescription: 'HVAC Compressor Unit', materialType: 'FERT', plant: '1104', availableStock: 0, reorderLevel: 10, unitPrice: 150000, criticality: 'High' },
    { materialId: 'M-102', materialDescription: 'Precision Gear Assembly', materialType: 'HALB', plant: '1101', availableStock: 500, reorderLevel: 100, unitPrice: 2500, criticality: 'Medium' },
    { materialId: 'M-103', materialDescription: 'Hydraulic Pump', materialType: 'FERT', plant: '1103', availableStock: 25, reorderLevel: 15, unitPrice: 45000, criticality: 'High' },
    { materialId: 'M-104', materialDescription: 'Control Board PCB', materialType: 'ROH', plant: '1102', availableStock: 200, reorderLevel: 50, unitPrice: 8000, criticality: 'Medium' },
    { materialId: 'M-105', materialDescription: 'Industrial Bearing Set', materialType: 'ROH', plant: '1101', availableStock: 1000, reorderLevel: 200, unitPrice: 1200, criticality: 'Low' },
    { materialId: 'M-106', materialDescription: 'Stainless Steel Flange', materialType: 'ROH', plant: '1103', availableStock: 350, reorderLevel: 100, unitPrice: 3500, criticality: 'Low' },
    { materialId: 'M-107', materialDescription: 'Temperature Sensor', materialType: 'FERT', plant: '1104', availableStock: 80, reorderLevel: 30, unitPrice: 5000, criticality: 'Medium' },
    { materialId: 'M-108', materialDescription: 'Servo Motor Drive', materialType: 'HALB', plant: '1102', availableStock: 15, reorderLevel: 10, unitPrice: 75000, criticality: 'High' },
    { materialId: 'M-109', materialDescription: 'Copper Wire Bundle 500m', materialType: 'ROH', plant: '1101', availableStock: 120, reorderLevel: 40, unitPrice: 6000, criticality: 'Low' },
    { materialId: 'M-110', materialDescription: 'Air Filter Cartridge', materialType: 'FERT', plant: '1104', availableStock: 400, reorderLevel: 100, unitPrice: 800, criticality: 'Low' },
    { materialId: 'M-111', materialDescription: 'PLC Module', materialType: 'FERT', plant: '1102', availableStock: 30, reorderLevel: 10, unitPrice: 120000, criticality: 'High' },
    { materialId: 'M-112', materialDescription: 'Pneumatic Cylinder', materialType: 'HALB', plant: '1103', availableStock: 50, reorderLevel: 20, unitPrice: 18000, criticality: 'Medium' },
    { materialId: 'M-113', materialDescription: 'Safety Valve Assembly', materialType: 'FERT', plant: '1101', availableStock: 75, reorderLevel: 25, unitPrice: 22000, criticality: 'High' },
    { materialId: 'M-114', materialDescription: 'Insulation Sheet Roll', materialType: 'ROH', plant: '1105', availableStock: 600, reorderLevel: 150, unitPrice: 1500, criticality: 'Low' },
    { materialId: 'M-115', materialDescription: 'Transformer Core', materialType: 'HALB', plant: '1103', availableStock: 10, reorderLevel: 5, unitPrice: 95000, criticality: 'High' },
    { materialId: 'M-116', materialDescription: 'LED Display Panel', materialType: 'FERT', plant: '1102', availableStock: 150, reorderLevel: 50, unitPrice: 12000, criticality: 'Medium' },
    { materialId: 'M-117', materialDescription: 'Rubber Gasket Set', materialType: 'ROH', plant: '1101', availableStock: 2000, reorderLevel: 500, unitPrice: 300, criticality: 'Low' },
    { materialId: 'M-118', materialDescription: 'Aluminium Housing', materialType: 'HALB', plant: '1103', availableStock: 40, reorderLevel: 15, unitPrice: 35000, criticality: 'Medium' },
    { materialId: 'M-119', materialDescription: 'Power Supply Unit', materialType: 'FERT', plant: '1102', availableStock: 60, reorderLevel: 20, unitPrice: 28000, criticality: 'Medium' },
    { materialId: 'M-120', materialDescription: 'Cooling Fan Assembly', materialType: 'FERT', plant: '1104', availableStock: 90, reorderLevel: 30, unitPrice: 4500, criticality: 'Low' }
  ];

  const technicians = [
    { technicianId: 'T-101', name: 'Rajesh Menon', plant: '1104', region: 'NA', skills: ['HVAC'], skillLevel: 2, availability: 1, currentWorkload: 4, firstTimeFixRate: 72, averageResolutionTime: 4.5, status: 'Active' },
    { technicianId: 'T-102', name: 'Arun Kumar', plant: '1104', region: 'NA', skills: ['HVAC', 'Electrical'], skillLevel: 3, availability: 4, currentWorkload: 2, firstTimeFixRate: 94, averageResolutionTime: 3.0, status: 'Active' },
    { technicianId: 'T-103', name: 'Priya Sharma', plant: '1101', region: 'NA', skills: ['General', 'Mechanical'], skillLevel: 2, availability: 6, currentWorkload: 1, firstTimeFixRate: 88, averageResolutionTime: 4.0, status: 'Active' },
    { technicianId: 'T-104', name: 'Mike Johnson', plant: '1104', region: 'NA', skills: ['HVAC', 'Plumbing'], skillLevel: 4, availability: 2, currentWorkload: 3, firstTimeFixRate: 96, averageResolutionTime: 2.5, status: 'Active' },
    { technicianId: 'T-105', name: 'Sarah Connor', plant: '1101', region: 'NA', skills: ['Medical Equip', 'Electrical'], skillLevel: 3, availability: 8, currentWorkload: 1, firstTimeFixRate: 91, averageResolutionTime: 3.5, status: 'Active' },
    { technicianId: 'T-106', name: 'Hans Mueller', plant: '1102', region: 'EU', skills: ['General', 'Automation'], skillLevel: 3, availability: 6, currentWorkload: 2, firstTimeFixRate: 89, averageResolutionTime: 4.0, status: 'Active' },
    { technicianId: 'T-107', name: 'Li Wei', plant: '1103', region: 'APJ', skills: ['General', 'Mechanical'], skillLevel: 2, availability: 5, currentWorkload: 3, firstTimeFixRate: 82, averageResolutionTime: 5.0, status: 'Active' },
    { technicianId: 'T-108', name: 'Anita Desai', plant: '1103', region: 'APJ', skills: ['Electrical', 'Automation'], skillLevel: 3, availability: 4, currentWorkload: 2, firstTimeFixRate: 90, averageResolutionTime: 3.5, status: 'Active' },
    { technicianId: 'T-109', name: 'Carlos Rivera', plant: '1105', region: 'EMEA', skills: ['General'], skillLevel: 1, availability: 8, currentWorkload: 0, firstTimeFixRate: 78, averageResolutionTime: 6.0, status: 'Active' },
    { technicianId: 'T-110', name: 'Emily Zhang', plant: '1101', region: 'NA', skills: ['General', 'HVAC'], skillLevel: 2, availability: 3, currentWorkload: 3, firstTimeFixRate: 85, averageResolutionTime: 4.5, status: 'Active' },
    { technicianId: 'T-111', name: 'David Park', plant: '1102', region: 'EU', skills: ['Automation', 'Electrical'], skillLevel: 4, availability: 7, currentWorkload: 1, firstTimeFixRate: 97, averageResolutionTime: 2.0, status: 'Active' },
    { technicianId: 'T-112', name: 'Fatima Al-Said', plant: '1105', region: 'EMEA', skills: ['General', 'Mechanical'], skillLevel: 2, availability: 5, currentWorkload: 2, firstTimeFixRate: 84, averageResolutionTime: 5.0, status: 'Active' },
    { technicianId: 'T-113', name: 'Vikram Singh', plant: '1103', region: 'APJ', skills: ['General', 'Plumbing'], skillLevel: 2, availability: 6, currentWorkload: 1, firstTimeFixRate: 80, averageResolutionTime: 5.5, status: 'Active' },
    { technicianId: 'T-114', name: 'Thomas Wright', plant: '1104', region: 'NA', skills: ['HVAC', 'Mechanical'], skillLevel: 3, availability: 3, currentWorkload: 2, firstTimeFixRate: 92, averageResolutionTime: 3.0, status: 'Active' },
    { technicianId: 'T-115', name: 'Nadia Petrov', plant: '1102', region: 'EU', skills: ['General', 'Electrical'], skillLevel: 2, availability: 4, currentWorkload: 2, firstTimeFixRate: 86, averageResolutionTime: 4.5, status: 'Active' }
  ];

  const serviceTypes = ['Break-Fix', 'Preventive', 'Corrective', 'Installation', 'Inspection'];
  const serviceStatuses = ['New', 'Planning', 'Assigned', 'Parts Pending', 'Dispatched', 'In Progress', 'Resolved', 'Closed'];

  const serviceOrders = [
    // High-priority HVAC service case

    {
      serviceRequestId: 'SR-10452', serviceOrderId: 'SO-10452', businessPartnerId: 'BP-100',
      customerName: 'Northfield University', plant: '1104', region: 'NA', assetId: 'ASSET-HVAC-01',
      serviceType: 'Break-Fix', priority: 'P1', createdAt: new Date(Date.now() - 48*3600000).toISOString(),
      slaHours: 4, slaRemainingHours: 2, requiredSkill: 'HVAC', requiredSkillLevel: 3,
      technicianId: 'T-101', technicianName: 'Rajesh Menon', technicianSkillLevel: 2,
      partsRequired: ['M-101'], partsAvailable: false, firstTimeFixHistory: 72,
      previousServiceCount: 3, recurrenceRate: 15, estimatedResolutionHours: 6,
      orderValue: 840000, financialExposure: 840000, status: 'Parts Pending', owner: 'Service Desk'
    },
    // Generate 24 more realistic service orders
    ...generateServiceOrders(24, customers, technicians)
  ];

  const purchaseOrders = [
    // Overdue PO case

    {
      purchaseRequisitionId: 'PR-20341', purchaseOrderId: 'PO-20341', supplierId: 'SU-200',
      supplierName: 'Chennai Precision Components', companyCode: '1000', plant: '1104',
      materialId: 'M-101', quantity: 5, poValue: 1200000,
      orderDate: new Date(Date.now() - 20*86400000).toISOString(),
      expectedDeliveryDate: new Date(Date.now() - 5*86400000).toISOString(),
      actualDeliveryDate: null, goodsReceiptStatus: 'Pending', invoiceStatus: 'Pending',
      invoiceAmount: 0, priceVariance: 0, supplierRisk: 'High', ageingDays: 5, owner: 'Procurement'
    },
    ...generatePurchaseOrders(19, suppliers, materials)
  ];

  const salesOrders = [
    // Blocked sales order case

    {
      salesOrderId: 'SO-30452', customerId: 'BP-103', customerName: 'Bharat Industrial Systems',
      companyCode: '1000', salesOrganization: 'SORG1', distributionChannel: 'WH', plant: '1101',
      materialId: 'M-102', quantity: 5000, orderValue: 520000,
      orderDate: new Date(Date.now() - 2*86400000).toISOString(),
      requestedDeliveryDate: new Date(Date.now() + 2*86400000).toISOString(),
      actualDeliveryDate: null, stockAvailable: false, deliveryStatus: 'Blocked',
      billingStatus: 'Pending', paymentStatus: 'Pending', customerCriticality: 'High',
      slaHours: 48, ageingHours: 24, owner: 'Sales Desk'
    },
    ...generateSalesOrders(19, customers, materials)
  ];

  // Finance records linked to transactions
  const financeRecords = generateFinanceRecords(serviceOrders, salesOrders, purchaseOrders);

  return {
    customers, suppliers, businessPartners, plants, materials, technicians,
    serviceOrders, purchaseOrders, salesOrders, financeRecords,
    exceptions: [], auditLogs: []
  };
}

function generateServiceOrders(count, customers, technicians) {
  const skills = ['HVAC', 'Electrical', 'Mechanical', 'General', 'Automation', 'Plumbing'];
  const types = ['Break-Fix', 'Preventive', 'Corrective', 'Installation', 'Inspection'];
  const statuses = ['New', 'Planning', 'Assigned', 'Parts Pending', 'Dispatched', 'In Progress', 'Resolved', 'Closed'];
  const plants = ['1101', '1102', '1103', '1104', '1105'];
  const regions = ['NA', 'EU', 'APJ', 'EMEA'];
  const orders = [];
  for (let i = 0; i < count; i++) {
    const cust = customers[i % customers.length];
    const tech = technicians[i % technicians.length];
    const reqSkillLevel = 1 + (i % 3);
    const slaRemaining = 4 + (i * 3) % 48;
    const partsAvail = i % 4 !== 0;
    orders.push({
      serviceRequestId: `SR-200${String(i).padStart(2,'0')}`,
      serviceOrderId: `SO-200${String(i).padStart(2,'0')}`,
      businessPartnerId: cust.customerId,
      customerName: cust.customerName,
      plant: plants[i % plants.length],
      region: regions[i % regions.length],
      assetId: `ASSET-${100 + i}`,
      serviceType: types[i % types.length],
      priority: 'P3',
      createdAt: new Date(Date.now() - (i + 1) * 86400000).toISOString(),
      slaHours: 24 + (i % 3) * 24,
      slaRemainingHours: slaRemaining,
      requiredSkill: skills[i % skills.length],
      requiredSkillLevel: reqSkillLevel,
      technicianId: tech.technicianId,
      technicianName: tech.name,
      technicianSkillLevel: tech.skillLevel,
      partsRequired: partsAvail ? [] : [`M-1${String((i % 20) + 1).padStart(2,'0')}`],
      partsAvailable: partsAvail,
      firstTimeFixHistory: 70 + (i * 3) % 30,
      previousServiceCount: i % 4,
      recurrenceRate: (i * 2) % 20,
      estimatedResolutionHours: 2 + (i % 5),
      orderValue: 50000 + (i * 15000),
      financialExposure: partsAvail ? 0 : 50000 + (i * 15000),
      status: statuses[i % statuses.length],
      owner: 'Service Desk'
    });
  }
  return orders;
}

function generatePurchaseOrders(count, suppliers, materials) {
  const orders = [];
  for (let i = 0; i < count; i++) {
    const sup = suppliers[i % suppliers.length];
    const mat = materials[i % materials.length];
    const ageing = i % 5 === 0 ? (3 + i % 7) : 0;
    orders.push({
      purchaseRequisitionId: `PR-300${String(i).padStart(2,'0')}`,
      purchaseOrderId: `PO-300${String(i).padStart(2,'0')}`,
      supplierId: sup.supplierId,
      supplierName: sup.supplierName,
      companyCode: ['1000', '1100', '1200'][i % 3],
      plant: ['1101', '1102', '1103', '1104', '1105'][i % 5],
      materialId: mat.materialId,
      quantity: 10 + i * 5,
      poValue: 50000 + i * 25000,
      orderDate: new Date(Date.now() - (10 + i) * 86400000).toISOString(),
      expectedDeliveryDate: new Date(Date.now() + (ageing > 0 ? -ageing : 5) * 86400000).toISOString(),
      actualDeliveryDate: null,
      goodsReceiptStatus: ageing > 0 ? 'Pending' : 'Received',
      invoiceStatus: ageing > 0 ? 'Pending' : 'Processed',
      invoiceAmount: ageing > 0 ? 0 : 50000 + i * 25000,
      priceVariance: i % 7 === 0 ? 5000 : 0,
      supplierRisk: sup.riskLevel,
      ageingDays: ageing,
      owner: 'Procurement'
    });
  }
  return orders;
}

function generateSalesOrders(count, customers, materials) {
  const orders = [];
  for (let i = 0; i < count; i++) {
    const cust = customers[i % customers.length];
    const mat = materials[i % materials.length];
    const stockAvail = i % 5 !== 0;
    orders.push({
      salesOrderId: `SL-400${String(i).padStart(2,'0')}`,
      customerId: cust.customerId,
      customerName: cust.customerName,
      companyCode: ['1000', '1100', '1200'][i % 3],
      salesOrganization: 'SORG1',
      distributionChannel: 'WH',
      plant: ['1101', '1102', '1103'][i % 3],
      materialId: mat.materialId,
      quantity: 10 + i * 3,
      orderValue: 25000 + i * 20000,
      orderDate: new Date(Date.now() - (i + 1) * 86400000).toISOString(),
      requestedDeliveryDate: new Date(Date.now() + (3 + i % 7) * 86400000).toISOString(),
      actualDeliveryDate: null,
      stockAvailable: stockAvail,
      deliveryStatus: stockAvail ? 'In Progress' : 'Blocked',
      billingStatus: 'Pending',
      paymentStatus: 'Pending',
      customerCriticality: cust.criticality,
      slaHours: 48 + (i % 4) * 24,
      ageingHours: i * 4,
      owner: 'Sales Desk'
    });
  }
  return orders;
}

function generateFinanceRecords(serviceOrders, salesOrders, purchaseOrders) {
  const records = [];
  let id = 1;

  salesOrders.forEach(so => {
    records.push({
      documentId: `FI-${String(id++).padStart(4,'0')}`,
      documentType: 'Revenue',
      companyCode: so.companyCode,
      costCentre: `CC-${so.companyCode}`,
      profitCentre: `PC-${so.plant || '1101'}`,
      referenceObject: so.salesOrderId,
      revenue: so.orderValue,
      cost: Math.round(so.orderValue * 0.7),
      margin: Math.round(so.orderValue * 0.3),
      outstandingAmount: so.paymentStatus === 'Pending' ? so.orderValue : 0,
      financialExposure: so.stockAvailable ? 0 : so.orderValue,
      postingDate: so.orderDate,
      status: so.stockAvailable ? 'Posted' : 'Blocked'
    });
  });

  purchaseOrders.forEach(po => {
    records.push({
      documentId: `FI-${String(id++).padStart(4,'0')}`,
      documentType: 'Cost',
      companyCode: po.companyCode,
      costCentre: `CC-${po.companyCode}`,
      profitCentre: `PC-${po.plant}`,
      referenceObject: po.purchaseOrderId,
      revenue: 0,
      cost: po.poValue,
      margin: -po.poValue,
      outstandingAmount: po.invoiceStatus === 'Pending' ? po.poValue : 0,
      financialExposure: po.ageingDays > 0 ? po.poValue : 0,
      postingDate: po.orderDate,
      status: po.ageingDays > 0 ? 'Open' : 'Cleared'
    });
  });

  serviceOrders.forEach(so => {
    records.push({
      documentId: `FI-${String(id++).padStart(4,'0')}`,
      documentType: 'Service Revenue',
      companyCode: '1000',
      costCentre: `CC-1000`,
      profitCentre: `PC-${so.plant}`,
      referenceObject: so.serviceOrderId,
      revenue: so.orderValue,
      cost: Math.round(so.orderValue * 0.6),
      margin: Math.round(so.orderValue * 0.4),
      outstandingAmount: so.status !== 'Closed' ? so.orderValue : 0,
      financialExposure: so.financialExposure,
      postingDate: so.createdAt,
      status: so.status === 'Closed' ? 'Cleared' : 'Open'
    });
  });

  return records;
}
