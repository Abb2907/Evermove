import React, { useState, useEffect } from 'react';
import AdaptiveNudge from './AdaptiveNudge';
import { Activity, Moon, Calendar, Zap, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [activeUser, setActiveUser] = useState('user_101');
  const [userData, setUserData] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = window.location.hostname === 'localhost' && window.location.port === '5173' 
    ? 'http://localhost:4000' 
    : '';

  const fetchEverything = async (userId) => {
    setLoading(true);
    try {
      // 1. Fetch the static user profile
      const statusRes = await fetch(`${API_BASE}/api/engine/status/${userId}`);
      const statusJson = await statusRes.json();
      if (statusJson.success) setUserData(statusJson.user);

      // 2. Fetch the dynamic daily evaluation (simulates the morning sync)
      const evalRes = await fetch(`${API_BASE}/api/engine/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const evalJson = await evalRes.json();
      if (evalJson.success) setEvaluation(evalJson.data);
      
    } catch (err) {
      console.error("Error connecting to Engine API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEverything(activeUser);
  }, [activeUser]);

  return (
    <div className="dashboard-container slide-up">
      <div className="profile-selector">
        <button 
          className={`btn ${activeUser === 'user_101' ? 'active' : ''}`}
          onClick={() => setActiveUser('user_101')}
        >
          Mock: Alex (High Stress)
        </button>
        <button 
          className={`btn ${activeUser === 'user_102' ? 'active' : ''}`}
          onClick={() => setActiveUser('user_102')}
        >
          Mock: Sam (Optimal)
        </button>
      </div>

      <div className="dashboard-grid">
        {/* Left Column: Context telemetry visualization */}
        <div className="glass-panel">
          <h2 style={{fontSize: "1.25rem", marginBottom: "1.5rem", color: "var(--text-secondary)"}}>
            Morning Telemetry Sync
          </h2>
          
          {loading ? (
             <div style={{display: 'flex', justifyContent: 'center', margin: '3rem 0'}}><div className="loader"></div></div>
          ) : (
            <>
              {userData && (
                <div className="stat-group" style={{ marginBottom: "2.5rem"}}>
                  <span className="stat-label">Motivation Anchor</span>
                  <span className="stat-value" style={{fontSize: "1.125rem", color: "var(--accent-purple)"}}>
                    "{userData.motivationAnchor}"
                  </span>
                </div>
              )}

              {evaluation && evaluation.status === "STRESSED" && (
                <>
                  <div className="stat-group">
                    <span className="stat-label"><Moon size={16} /> Sleep Efficiency</span>
                    <span className="stat-value" style={{color: "#f43f5e"}}>55%</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label"><Activity size={16} /> HRV Status</span>
                    <span className="stat-value" style={{color: "#f43f5e"}}>Low (45ms)</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label"><Calendar size={16} /> Calendar Load</span>
                    <span className="stat-value" style={{color: "#f43f5e"}}>6 Meetings</span>
                  </div>
                </>
              )}

              {evaluation && evaluation.status === "OPTIMAL" && (
                 <>
                  <div className="stat-group">
                    <span className="stat-label"><Moon size={16} /> Sleep Efficiency</span>
                    <span className="stat-value" style={{color: "var(--accent-emerald)"}}>85%</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label"><Activity size={16} /> HRV Status</span>
                    <span className="stat-value" style={{color: "var(--accent-emerald)"}}>Optimal (65ms)</span>
                  </div>
                  <div className="stat-group">
                    <span className="stat-label"><Calendar size={16} /> Calendar Load</span>
                    <span className="stat-value" style={{color: "var(--accent-emerald)"}}>Light</span>
                  </div>
                 </>
              )}
            </>
          )}

          <div style={{marginTop: '3rem'}}>
           <button onClick={() => fetchEverything(activeUser)} className="btn" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
             <RefreshCw size={16}/> Resync Engine
           </button>
          </div>
        </div>

        {/* Right Column: The Nudge Payload UI */}
        <div className="payload-area">
          {loading ? (
             <div className="glass-panel" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px'}}>
               <div className="loader"></div>
             </div>
          ) : (
            evaluation && <AdaptiveNudge evalData={evaluation} userData={userData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
