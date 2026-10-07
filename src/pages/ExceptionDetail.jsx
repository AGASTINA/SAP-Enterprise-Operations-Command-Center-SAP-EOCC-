import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExceptions, getServiceOrders, postAction, simulateWhatIf } from '../services/api';
import { useRole } from '../context/RoleContext';

export default function ExceptionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role, hasPermission } = useRole();
  const [exception, setException] = useState(null);
  const [details, setDetails] = useState(null);
  
  const [simSla, setSimSla] = useState(2);
  const [simParts, setSimParts] = useState(false);
  const [simSkill, setSimSkill] = useState(2);
  const [simResult, setSimResult] = useState(null);

  useEffect(() => {
    getExceptions().then(data => {
      const ex = data.find(e => e.exceptionId === id || e.objectId === id);
      setException(ex);
      if (ex && ex.process === 'Service') fetchDetails(ex.objectId);
    });
  }, [id]);

  const fetchDetails = (objId) => {
    getServiceOrders().then(orders => {
      const so = orders.find(o => o.serviceOrderId === objId);
      setDetails(so);
      if (so) {
        setSimSla(so.slaRemainingHours);
        setSimParts(so.partsAvailable);
        setSimSkill(so.technicianSkillLevel);
      }
    });
  };

  useEffect(() => {
    if (details) {
      // Call true deterministic engine via API
      simulateWhatIf({
        originalOrder: details,
        simulatedValues: {
          slaRemainingHours: simSla,
          partsAvailable: simParts,
          technicianSkillLevel: simSkill
        }
      }).then(res => setSimResult(res)).catch(console.error);
    }
  }, [simSla, simParts, simSkill, details]);

  if (!exception) return <div className="card">Loading exception...</div>;

  const handleAction = async (action) => {
    await postAction({
      objectId: exception.objectId,
      action,
      user: role,
      role: role,
      previousStatus: exception.status,
      newStatus: action === 'Resolve' ? 'Resolved' : exception.status,
      reason: 'User triggered action from UI'
    });
    navigate('/audit');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Exception Detail: {exception.objectId}</h1>
        <button onClick={() => navigate('/exceptions')}>Back to Queue</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div>
          <div className="card">
            <h2 className="card-title">Exception Context ({exception.process})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <strong>Customer:</strong> {exception.customerName}<br/>
                <strong>Category:</strong> {exception.category}<br/>
                <strong>Financial Exposure:</strong> ₹{(exception.financialImpact/100000).toFixed(1)}L
              </div>
              <div>
                <strong>Priority:</strong> <span style={{ background: 'var(--priority-1)', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>{exception.priority}</span><br/>
                <strong>Risk:</strong> {exception.severity}<br/>
                <strong>Owner:</strong> {exception.owner}<br/>
                <strong>Status:</strong> {exception.status}
              </div>
            </div>
            {exception.process === 'Service' && exception.techRecommendation && (
              <div style={{ marginTop: '16px', padding: '12px', background: '#f8f9fa', borderLeft: '4px solid #2b7c2b' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Technician Recommendation Engine</h3>
                <strong>Recommended:</strong> {exception.techRecommendation.recommendedTechnician} (Confidence: {exception.techRecommendation.dispatchConfidence}/100)<br/>
                <strong>WHY:</strong> {exception.techRecommendation.reasons.join(', ')}<br/>
                <strong>WHY NOT ALTERNATIVES:</strong> {exception.techRecommendation.whyNotAlternatives}
              </div>
            )}
            {exception.process === 'Service' && exception.readiness && (
              <div style={{ marginTop: '16px', padding: '12px', background: '#f8f9fa', borderLeft: '4px solid #2b7c2b' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Resolution Readiness Score</h3>
                <strong>Overall: {exception.readiness.score}/100</strong><br/>
                Skill Match: {exception.readiness.breakdown.skillMatch}/25<br/>
                Parts Readiness: {exception.readiness.breakdown.partsReadiness}/25<br/>
                SLA Feasibility: {exception.readiness.breakdown.slaFeasibility}/20<br/>
                FTF History: {exception.readiness.breakdown.ftfHistory}/15<br/>
                Service History: {exception.readiness.breakdown.serviceHistory}/15
              </div>
            )}
          </div>

          <div className="card" style={{ borderLeft: '4px solid #6366f1' }}>
            <h2 className="card-title">AI Decision Brief</h2>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>WHY</h3>
              <p style={{ margin: 0 }}>{exception.reason}</p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>EVIDENCE</h3>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {exception.process === 'Service' && details && (
                  <>
                    <li>SLA remaining: {details.slaRemainingHours}h</li>
                    <li>Parts availability: {details.partsAvailable ? 'Available' : 'Unavailable'}</li>
                    <li>Required skill: {details.requiredSkill}</li>
                  </>
                )}
                <li>Financial exposure: ₹{(exception.financialImpact/100000).toFixed(1)}L</li>
              </ul>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>NEXT-BEST ACTION</h3>
              <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--sap-blue)' }}>{exception.recommendedAction}</p>
            </div>
          </div>
        </div>

        <div>
          {exception.process === 'Service' && details && simResult && (
            <div className="card" style={{ background: '#f0f4f8', border: '1px solid var(--sap-blue)' }}>
              <h2 className="card-title">What-If Simulation</h2>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>SLA Remaining (Hours)</label>
                <input type="range" min="0" max="24" value={simSla} onChange={e => setSimSla(Number(e.target.value))} style={{ width: '100%' }} />
                <div style={{ textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>{simSla}h</div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>Parts Expedited</label>
                <select value={simParts} onChange={e => setSimParts(e.target.value === 'true')} style={{ width: '100%', padding: '4px' }}>
                  <option value={false}>Unavailable</option>
                  <option value={true}>Available</option>
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>Simulated Tech Skill</label>
                <select value={simSkill} onChange={e => setSimSkill(Number(e.target.value))} style={{ width: '100%', padding: '4px' }}>
                  <option value={1}>Level 1</option>
                  <option value={2}>Level 2</option>
                  <option value={3}>Level 3</option>
                </select>
              </div>
              
              <div style={{ borderTop: '1px solid #ccc', paddingTop: '16px' }}>
                <h3 style={{ fontSize: '14px', margin: '0 0 8px 0' }}>CURRENT vs SIMULATED</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Priority:</span>
                  <span>{exception.priority} &rarr; <strong style={{ color: simResult.priority === 'P1' ? 'var(--priority-1)' : 'var(--priority-2)' }}>{simResult.priority}</strong></span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Risk:</span>
                  <span>{exception.severity} &rarr; <strong>{simResult.risk}</strong></span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Readiness:</span>
                  <span>{exception.readiness?.score ?? '—'} &rarr; <strong>{simResult.readiness?.score ?? 0}/100</strong></span>
                </div>
                
                <div style={{ marginTop: '12px', fontSize: '12px', background: 'white', padding: '8px', border: '1px solid #ccc' }}>
                  <strong>WHAT CHANGED?</strong><br/>
                  {simParts !== details.partsAvailable && `Parts availability changed to ${simParts ? 'Available' : 'Unavailable'}. `}
                  {simSla !== details.slaRemainingHours && `SLA Remaining changed to ${simSla}h. `}
                  {simSkill !== details.technicianSkillLevel && `Simulated technician skill changed to Level ${simSkill}. `}
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <h2 className="card-title">Action Panel</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {hasPermission('ESCALATE') && <button className="primary" onClick={() => handleAction('Escalate & Expedite')}>Accept Next-Best Action</button>}
              {hasPermission('HOLD') && <button onClick={() => handleAction('Hold')}>Put on Hold</button>}
              {hasPermission('REASSIGN') && <button onClick={() => handleAction('Reassign')}>Reassign</button>}
              {hasPermission('RESOLVE') && <button className="primary" onClick={() => handleAction('Resolve')}>Resolve Issue</button>}
              {!hasPermission('ESCALATE') && !hasPermission('HOLD') && <div style={{ color: 'red', fontSize: '12px' }}>Role '{role}' is VIEW_ONLY for these actions.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
