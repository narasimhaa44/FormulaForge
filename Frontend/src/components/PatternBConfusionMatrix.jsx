import React from 'react';
import { CheckCircle2, ShieldCheck, AlertTriangle, XCircle } from './Icons';

const PatternBConfusionMatrix = ({ matrix, onChange, activeMetric }) => {
  const fields = [
    { key: 'tp', label: 'True Positives (TP)', icon: CheckCircle2, color: '#16a34a', bg: '#f0fdf4', desc: 'Actual Positives predicted correctly' },
    { key: 'tn', label: 'True Negatives (TN)', icon: ShieldCheck, color: '#0d9488', bg: '#f0fdfa', desc: 'Actual Negatives predicted correctly' },
    { key: 'fp', label: 'False Positives (FP)', icon: AlertTriangle, color: '#ea580c', bg: '#fff7ed', desc: 'Type I Error: False alarms' },
    { key: 'fn', label: 'False Negatives (FN)', icon: XCircle, color: '#dc2626', bg: '#fef2f2', desc: 'Type II Error: Missed detections' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', width: '100%' }}>
      {fields.map(({ key, label, icon: IconComponent, color, bg, desc }) => {
        const isHighlighted =
          (activeMetric === 'accuracy') ||
          (activeMetric === 'precision' && (key === 'tp' || key === 'fp')) ||
          (activeMetric === 'recall' && (key === 'tp' || key === 'fn')) ||
          (activeMetric === 'specificity' && (key === 'tn' || key === 'fp'));

        return (
          <div
            key={key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '12px',
              border: isHighlighted ? `2px solid ${color}` : '1.5px solid #e2e8f0',
              transition: 'border-color 0.2s, transform 0.15s'
            }}
          >
            <label style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: bg,
                  }}
                >
                  <IconComponent size={15} color={color} />
                </span>
                <span>{label}</span>
              </span>
            </label>

            <input
              type="number"
              min="0"
              step="1"
              value={matrix[key] ?? 0}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder="0"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '10px 14px',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#0f172a',
                backgroundColor: bg,
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                outline: 'none',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = color;
                e.target.style.boxShadow = `0 0 0 3px ${color}22`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.boxShadow = 'none';
              }}
            />
            <span style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>{desc}</span>
          </div>
        );
      })}
    </div>
  );
};

export default PatternBConfusionMatrix;
