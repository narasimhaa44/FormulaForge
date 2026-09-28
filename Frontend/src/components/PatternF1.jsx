import React from 'react';
import PatternBConfusionMatrix from './PatternBConfusionMatrix';

const PatternF1 = ({ data, onChangeMode, onChangeDirect, onChangeMatrix }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
      {/* Mode Tabs */}
      <div style={{
        display: 'flex',
        backgroundColor: '#f1f5f9',
        padding: '3px',
        borderRadius: '10px'
      }}>
        <button
          type="button"
          onClick={() => onChangeMode('direct')}
          style={{
            flex: 1,
            padding: '8px 12px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            backgroundColor: data.mode === 'direct' ? '#ffffff' : 'transparent',
            color: data.mode === 'direct' ? '#0f172a' : '#64748b',
            boxShadow: data.mode === 'direct' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          Option A: Precision + Recall
        </button>
        <button
          type="button"
          onClick={() => onChangeMode('matrix')}
          style={{
            flex: 1,
            padding: '8px 12px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            backgroundColor: data.mode === 'matrix' ? '#ffffff' : 'transparent',
            color: data.mode === 'matrix' ? '#0f172a' : '#64748b',
            boxShadow: data.mode === 'matrix' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          Option B: Confusion Matrix
        </button>
      </div>

      {data.mode === 'direct' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
              Precision (0.0 to 1.0):
            </label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={data.precision}
              onChange={(e) => onChangeDirect('precision', e.target.value)}
              placeholder="e.g. 0.80"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1.5px solid #e2e8f0',
                fontSize: '1rem',
                fontWeight: 600
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
              Recall (0.0 to 1.0):
            </label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={data.recall}
              onChange={(e) => onChangeDirect('recall', e.target.value)}
              placeholder="e.g. 0.75"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1.5px solid #e2e8f0',
                fontSize: '1rem',
                fontWeight: 600
              }}
            />
          </div>
        </div>
      ) : (
        <PatternBConfusionMatrix
          matrix={data.matrix}
          onChange={onChangeMatrix}
          activeMetric="f1"
        />
      )}
    </div>
  );
};

export default PatternF1;
