import React from 'react';
import { ShieldAlert, Zap, Repeat } from 'lucide-react';

const AdaptiveNudge = ({ evalData, userData }) => {
  const isIntercept = evalData.action === "INTERCEPT";

  return (
    <div className={`glass-panel nudge-card slide-up ${isIntercept ? 'intercept' : 'proceed'}`} style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
          {isIntercept ? 
             <ShieldAlert color="#f43f5e" size={28} /> : 
             <Zap color="#10b981" size={28} />
          }
           <h2 style={{fontSize: '1.5rem', margin: 0}}>
             {isIntercept ? 'Adaptive Intervention' : 'Optimal Capacity'}
           </h2>
        </div>
        <div style={{
          padding: '4px 12px', 
          borderRadius: '20px', 
          backgroundColor: isIntercept ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
          color: isIntercept ? '#f43f5e' : '#10b981',
           fontWeight: 600,
           fontSize: '0.85rem'
        }}>
          {evalData.status}
        </div>
      </div>

      <div style={{flex: 1}}>
        <h3 style={{fontSize: '2rem', marginBottom: '1rem', lineHeight: '1.2'}}>
          {evalData.nudgePayload.title}
        </h3>
        
        <p style={{fontSize: '1.125rem', color: '#d4d4d8', lineHeight: '1.6', marginBottom: '2.5rem'}}>
          {evalData.nudgePayload.body}
        </p>

        {isIntercept ? (
           <div style={{
             background: 'rgba(0,0,0,0.3)', 
             borderRadius: '16px', 
             padding: '1.5rem',
             border: '1px solid rgba(244, 63, 94, 0.2)'
           }}>
             <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)'}}>
                <span>Scheduled</span>
                <span style={{textDecoration: 'line-through'}}>{evalData.originalWorkout.label}</span>
             </div>
             <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#c084fc'}}>
                <Repeat size={18} />
             </div>
             <div style={{display: 'flex', justifyContent: 'space-between', color: '#f8fafc', fontWeight: 600, fontSize: '1.125rem'}}>
                <span>New Target</span>
                <span>{evalData.newWorkout.label}</span>
             </div>
           </div>
        ) : (
          <div style={{
             background: 'rgba(16, 185, 129, 0.1)', 
             borderRadius: '16px', 
             padding: '2rem',
             border: '1px solid rgba(16, 185, 129, 0.2)',
             textAlign: 'center'
           }}>
             <div style={{fontSize: '1.5rem', fontWeight: 700, color: '#10b981', marginBottom: '0.5rem'}}>
               {evalData.workout.label}
             </div>
             <div style={{color: 'var(--text-secondary)'}}>
               {evalData.workout.duration} Minutes
             </div>
           </div>
        )}
      </div>

      <button className="btn" style={{marginTop: '2rem', width: '100%', padding: '1rem', fontSize: '1.125rem', color: 'var(--bg-core)', background: 'var(--text-primary)'}}>
        Acknowledge & Begin
      </button>

    </div>
  );
};

export default AdaptiveNudge;
