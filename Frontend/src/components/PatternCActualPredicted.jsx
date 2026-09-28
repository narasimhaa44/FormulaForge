import React from 'react';
import { Plus, Trash2, TableIcon } from './Icons';

const PatternCActualPredicted = ({ rows, onChange, onAddRow, onRemoveRow, onSetPreset }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {/* Quick Presets */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TableIcon size={14} color="#64748b" />
          <span>Quick Presets:</span>
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => onSetPreset([
              { actual: 10, predicted: 12 },
              { actual: 20, predicted: 18 },
              { actual: 15, predicted: 14 }
            ])}
            style={{
              padding: '4px 10px',
              fontSize: '0.74rem',
              fontWeight: 600,
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#334155',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            Standard (3 pts)
          </button>
          <button
            type="button"
            onClick={() => onSetPreset([
              { actual: 100, predicted: 110 },
              { actual: 200, predicted: 190 },
              { actual: 150, predicted: 160 }
            ])}
            style={{
              padding: '4px 10px',
              fontSize: '0.74rem',
              fontWeight: 600,
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#334155',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            Scale 100s (MAPE)
          </button>
          <button
            type="button"
            onClick={() => onSetPreset([
              { actual: 12, predicted: 11.5 },
              { actual: 15, predicted: 16.0 },
              { actual: 22, predicted: 20.0 },
              { actual: 28, predicted: 29.5 },
              { actual: 35, predicted: 33.0 }
            ])}
            style={{
              padding: '4px 10px',
              fontSize: '0.74rem',
              fontWeight: 600,
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#334155',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            5 Data Points
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '40px 1fr 1fr 40px',
        gap: '8px',
        padding: '6px 8px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        fontSize: '0.78rem',
        fontWeight: 700,
        color: '#475569',
        textAlign: 'center'
      }}>
        <div>#</div>
        <div>Actual (y)</div>
        <div>Predicted (ŷ)</div>
        <div>Action</div>
      </div>

      {/* Table Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
        {rows.map((row, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 1fr 40px',
              gap: '8px',
              alignItems: 'center'
            }}
          >
            <div style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8' }}>
              {index + 1}
            </div>

            <input
              type="number"
              step="any"
              value={row.actual}
              onChange={(e) => onChange(index, 'actual', e.target.value)}
              placeholder="Actual y"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '8px 12px',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#0f172a',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '8px',
                outline: 'none',
                textAlign: 'center',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
              onFocus={(e) => (e.target.style.borderColor = '#0d9488')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            />

            <input
              type="number"
              step="any"
              value={row.predicted}
              onChange={(e) => onChange(index, 'predicted', e.target.value)}
              placeholder="Predicted ŷ"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '8px 12px',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#0f172a',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '8px',
                outline: 'none',
                textAlign: 'center',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
              onFocus={(e) => (e.target.style.borderColor = '#0d9488')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            />

            <button
              type="button"
              onClick={() => onRemoveRow(index)}
              disabled={rows.length <= 1}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: rows.length <= 1 ? '#f1f5f9' : '#fee2e2',
                color: rows.length <= 1 ? '#cbd5e1' : '#dc2626',
                cursor: rows.length <= 1 ? 'not-allowed' : 'pointer',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto'
              }}
              title="Delete row"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Row Button */}
      <button
        type="button"
        onClick={onAddRow}
        style={{
          padding: '10px 16px',
          backgroundColor: '#f8fafc',
          border: '1.5px dashed #cbd5e1',
          borderRadius: '10px',
          color: '#0f172a',
          fontWeight: 700,
          fontSize: '0.85rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '4px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f1f5f9';
          e.currentTarget.style.borderColor = '#94a3b8';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f8fafc';
          e.currentTarget.style.borderColor = '#cbd5e1';
        }}
      >
        <Plus size={16} />
        <span>Add Row</span>
      </button>
    </div>
  );
};

export default PatternCActualPredicted;
