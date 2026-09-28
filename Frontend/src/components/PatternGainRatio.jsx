import React from 'react';
import PatternInfoGain from './PatternInfoGain';

const PatternGainRatio = ({ data, onChangeMode, onChangeDirect, onDatasetChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
      {/* Mode Selector Tabs */}
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
          Mode 1: Direct Values
        </button>
        <button
          type="button"
          onClick={() => onChangeMode('dataset')}
          style={{
            flex: 1,
            padding: '8px 12px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            backgroundColor: data.mode === 'dataset' ? '#ffffff' : 'transparent',
            color: data.mode === 'dataset' ? '#0f172a' : '#64748b',
            boxShadow: data.mode === 'dataset' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          Mode 2: From Dataset Splits
        </button>
      </div>

      {data.mode === 'direct' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
              Information Gain (IG):
            </label>
            <input
              type="number"
              step="any"
              value={data.infoGain}
              onChange={(e) => onChangeDirect('infoGain', e.target.value)}
              placeholder="e.g. 0.3219"
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
              Split Information (Split Info):
            </label>
            <input
              type="number"
              step="any"
              value={data.splitInfo}
              onChange={(e) => onChangeDirect('splitInfo', e.target.value)}
              placeholder="e.g. 0.9709"
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
        <PatternInfoGain
          data={data.dataset}
          onChangeParent={(idx, val) => onDatasetChange('parent', idx, 0, val)}
          onChangeChild={(cIdx, clsIdx, val) => onDatasetChange('child', cIdx, clsIdx, val)}
          onAddChild={() => onDatasetChange('addChild')}
          onRemoveChild={(cIdx) => onDatasetChange('removeChild', cIdx)}
        />
      )}
    </div>
  );
};

export default PatternGainRatio;
