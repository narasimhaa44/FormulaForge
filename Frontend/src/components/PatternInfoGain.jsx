import React from 'react';
import { GitBranch, Split, Plus, Trash2 } from './Icons';

const PatternInfoGain = ({ data, onChangeParent, onChangeChild, onAddChild, onRemoveChild, onAddChildClass }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
      {/* Parent Dataset Card */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1.5px solid #e2e8f0',
        borderRadius: '12px',
        padding: '14px'
      }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitBranch size={16} color="#0d9488" />
          <span>Parent Dataset (Before Split)</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {data.parent.map((cls, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569' }}>
                {cls.name || `Class ${idx + 1}`} Count:
              </label>
              <input
                type="number"
                min="0"
                value={cls.count}
                onChange={(e) => onChangeParent(idx, e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Child Nodes Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Split size={15} color="#0d9488" />
            <span>Child Nodes (After Split)</span>
          </span>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
            {data.children.length} Branches
          </span>
        </div>

        {data.children.map((child, childIdx) => (
          <div
            key={childIdx}
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0d9488' }}>
                {child.name || `Child Node ${childIdx + 1}`}
              </span>
              {data.children.length > 2 && (
                <button
                  type="button"
                  onClick={() => onRemoveChild(childIdx)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={13} />
                  <span>Remove</span>
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {child.counts.map((cls, clsIdx) => (
                <div key={clsIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                    {cls.name || `Class ${clsIdx + 1}`}:
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={cls.count}
                    onChange={(e) => onChangeChild(childIdx, clsIdx, e.target.value)}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add Child Node Button */}
        {data.children.length < 5 && (
          <button
            type="button"
            onClick={onAddChild}
            style={{
              padding: '8px 14px',
              backgroundColor: '#f8fafc',
              border: '1.5px dashed #cbd5e1',
              borderRadius: '10px',
              color: '#0f172a',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            <Plus size={15} />
            <span>Add Child Node</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PatternInfoGain;
