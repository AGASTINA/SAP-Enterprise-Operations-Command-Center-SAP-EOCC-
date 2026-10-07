import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('Operations Manager');

  const permissions = {
    'Executive': ['VIEW_ONLY'],
    'Operations Manager': ['VIEW', 'ASSIGN', 'ESCALATE', 'HOLD'],
    'Service Manager': ['VIEW', 'ASSIGN', 'REASSIGN', 'RESOLVE'],
    'Procurement Manager': ['VIEW', 'SUPPLIER_ACTION', 'PO_ACTION'],
    'Finance Manager': ['VIEW', 'FINANCE_REVIEW']
  };

  const hasPermission = (permission) => {
    return permissions[role]?.includes(permission);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, hasPermission }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
