import React, { useEffect, useState } from 'react';
import { getAuditLogs } from '../services/api';

export default function Audit() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getAuditLogs().then(setLogs).catch(console.error);
  }, []);

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Audit & Decision Trace</h1>
      <div className="card">
        {logs.length === 0 ? (
          <p>No audit logs generated yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User / Role</th>
                <th>Object ID</th>
                <th>Action</th>
                <th>Status Change</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.user} ({log.role})</td>
                  <td>{log.objectId}</td>
                  <td><strong>{log.action}</strong></td>
                  <td>{log.previousStatus} &rarr; {log.newStatus}</td>
                  <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
