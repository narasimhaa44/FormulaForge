import React, { useState } from 'react';
import { ChevronDown, Sparkles } from './Icons';

const StepByStep = ({ steps = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!steps || steps.length === 0) return null;

  return (
    <div style={{
      marginTop: '10px',
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.2s ease'
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#334155',
          textAlign: 'left',
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="#0d9488" />
          <span>Step-by-Step Mathematical Calculation</span>
        </span>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          color: '#64748b',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          <ChevronDown size={16} />
        </span>
      </button>

      {isOpen && (
        <div style={{
          padding: '8px 14px 14px 14px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          backgroundColor: '#ffffff'
        }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.78rem',
                color: '#1e293b',
                backgroundColor: '#f1f5f9',
                padding: '6px 10px',
                borderRadius: '6px',
                lineHeight: 1.45,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {step}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepByStep;
