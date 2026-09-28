import React from 'react';
import PatternCActualPredicted from './PatternCActualPredicted';

const PatternRSquared = ({ data, onChangeMode, onChangeDirect, onRowChange, onAddRow, onRemoveRow, onSetPreset }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
      {/* Mode Selector */}
      <div style={{
        display: 'flex',
        backgroundColor: '#f1f5f9',
        padding: '3px',
        borderRadius: '10px'
      }}>
        <button
          type="button"
          onClick={() => onChangeMode('table')}
          style={{
            flex: 1,
            padding: '8px 12px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            backgroundColor: data.mode === 'table' ? '#ffffff' : 'transparent',
            color: data.mode === 'table' ? '#0f172a' : '#64748b',
            boxShadow: data.mode === 'table' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          Mode 1: Actual vs Predicted Table
        </button>
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
          Mode 2: SS_res & SS_tot Direct
        </button>
      </div>

      {data.mode === 'table' ? (
        <PatternCActualPredicted
          rows={data.rows}
          onChange={onRowChange}
          onAddRow={onAddRow}
          onRemoveRow={onRemoveRow}
          onSetPreset={onSetPreset}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
              Residual Sum of Squares (SS_res):
            </label>
            <input
              type="number"
              step="any"
              value={data.ssRes}
              onChange={(e) => onChangeDirect('ssRes', e.target.value)}
              placeholder="e.g. 9.0"
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
              Total Sum of Squares (SS_tot):
            </label>
            <input
              type="number"
              step="any"
              value={data.ssTot}
              onChange={(e) => onChangeDirect('ssTot', e.target.value)}
              placeholder="e.g. 50.0"
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
      )}
    </div>
  );
};

export default PatternRSquared;
