import React, { useEffect, useState } from 'react';
import { getExceptions } from '../services/api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';

export default function ProcessIntelligence() {
  const [exceptions, setExceptions] = useState([]);

  useEffect(() => {
    getExceptions().then(setExceptions).catch(console.error);
  }, []);

  const riskData = exceptions.map(ex => {
    let riskScore = ex.severity === 'Critical' ? 90 : (ex.severity === 'High' ? 70 : 40);
    return {
      id: ex.exceptionId,
      exposure: ex.financialImpact,
      risk: riskScore,
      priority: ex.priority,
      name: ex.customerName || ex.objectId
    };
  });

  const getPriorityColor = (p) => {
    if(p === 'P1') return 'var(--priority-1)';
    if(p === 'P2') return 'var(--priority-2)';
    if(p === 'P3') return 'var(--priority-3)';
    return 'var(--priority-4)';
  };

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Process Intelligence & Risk Radar</h1>
      <div className="card">
        <h2 className="card-title">Risk Radar (Financial Exposure vs Operational Risk)</h2>
        <div style={{ height: '400px', width: '100%', position: 'relative' }}>
          {/* Quadrant backgrounds */}
          <div style={{position: 'absolute', top: 0, left: '50%', width: '50%', height: '50%', background: 'rgba(255,0,0,0.05)', pointerEvents: 'none'}}><span style={{position:'absolute', top:10, right:10, color:'#999', fontSize:'12px'}}>CRITICAL</span></div>
          <div style={{position: 'absolute', top: '50%', left: '50%', width: '50%', height: '50%', background: 'rgba(255,165,0,0.05)', pointerEvents: 'none'}}><span style={{position:'absolute', bottom:10, right:10, color:'#999', fontSize:'12px'}}>ACTION REQUIRED</span></div>
          <div style={{position: 'absolute', top: 0, left: 0, width: '50%', height: '50%', background: 'rgba(255,255,0,0.05)', pointerEvents: 'none'}}><span style={{position:'absolute', top:10, left:10, color:'#999', fontSize:'12px'}}>MONITOR</span></div>
          <div style={{position: 'absolute', top: '50%', left: 0, width: '50%', height: '50%', background: 'rgba(0,128,0,0.05)', pointerEvents: 'none'}}><span style={{position:'absolute', bottom:10, left:10, color:'#999', fontSize:'12px'}}>LOW PRIORITY</span></div>
          
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="exposure" name="Financial Exposure (INR)" />
              <YAxis type="number" dataKey="risk" name="Operational Risk" domain={[0, 100]} />
              <ZAxis type="number" range={[100, 300]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name) => [value, name === 'exposure' ? '₹' + value : 'Risk/100']} />
              <Scatter name="Exceptions" data={riskData} fill="#8884d8">
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getPriorityColor(entry.priority)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
