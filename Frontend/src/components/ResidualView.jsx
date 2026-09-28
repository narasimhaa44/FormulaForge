import React from 'react';

const ResidualView = ({ diffs = [], metricType = 'mae' }) => {
  if (!diffs || diffs.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      <div style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: '#64748b',
        letterSpacing: '0.5px'
      }}>
        Sample Error Breakdown (Top {Math.min(diffs.length, 5)})
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        maxHeight: '140px',
        overflowY: 'auto',
        paddingRight: '4px'
      }}>
        {diffs.slice(0, 6).map((d) => {
          let errorBadge = '';
          if (metricType === 'mape') {
            errorBadge = d.pctError !== null ? `${d.pctError.toFixed(2)}%` : 'Err';
          } else if (metricType === 'mse' || metricType === 'rmse') {
            errorBadge = `Sq: ${d.sq?.toFixed(2) || (d.diff * d.diff).toFixed(2)}`;
          } else {
            errorBadge = `Diff: ${d.diff?.toFixed(2)}`;
          }

          return (
            <div
              key={d.idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 10px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                fontSize: '0.78rem',
                border: '1px solid #f1f5f9'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 700, color: '#94a3b8' }}>#{d.idx}</span>
                <span>
                  y = <strong>{d.actual}</strong>, ŷ = <strong>{d.predicted}</strong>
                </span>
              </div>
              <span style={{
                backgroundColor: '#fee2e2',
                color: '#991b1b',
                padding: '2px 8px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.75rem'
              }}>
                {errorBadge}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResidualView;
