import React from 'react';
import { Brain, Plus, Trash2 } from './Icons';
import { CLASS_COLORS } from '../utils/calculatorData';

const PatternAClassCounts = ({ classes, onChange, onAddClass, onRemoveClass }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
      {classes.map((cls, index) => {
        const charCode = String.fromCharCode(65 + index); // A, B, C, D...
        const color = cls.color || CLASS_COLORS[index % CLASS_COLORS.length];

        return (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    backgroundColor: `${color}18`,
                    color: color,
                  }}
                >
                  <Brain size={16} color={color} />
                </span>
                <span>Number of {cls.name || `Class ${charCode}`} samples</span>
              </label>

              {classes.length > 2 && (
                <button
                  type="button"
                  onClick={() => onRemoveClass(index)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                  <Trash2 size={13} />
                  <span>Remove</span>
                </button>
              )}
            </div>

            <input
              type="number"
              min="0"
              step="1"
              value={cls.count}
              onChange={(e) => onChange(index, 'count', e.target.value)}
              placeholder="e.g. 6"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 16px',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#0f172a',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '12px',
                outline: 'none',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#0d9488';
                e.target.style.boxShadow = '0 0 0 3px rgba(13, 148, 136, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        );
      })}

      {/* Add Class Button */}
      {classes.length < 8 && (
        <button
          type="button"
          onClick={onAddClass}
          style={{
            marginTop: '4px',
            padding: '10px 16px',
            backgroundColor: '#f8fafc',
            border: '1.5px dashed #cbd5e1',
            borderRadius: '12px',
            color: '#0f172a',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
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
          <span>Add Class</span>
        </button>
      )}
    </div>
  );
};

export default PatternAClassCounts;
