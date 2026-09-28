import React from 'react';

const ConfusionMatrixView = ({ tp = 0, tn = 0, fp = 0, fn = 0, activeMetric = null }) => {
  const actualPos = tp + fn;
  const actualNeg = fp + tn;
  const predPos = tp + fp;
  const predNeg = fn + tn;
  const total = tp + tn + fp + fn;

  const isHighlighted = (cell) => {
    if (!activeMetric) return false;
    if (activeMetric === 'accuracy') return cell === 'tp' || cell === 'tn';
    if (activeMetric === 'precision') return cell === 'tp' || cell === 'fp';
    if (activeMetric === 'recall') return cell === 'tp' || cell === 'fn';
    if (activeMetric === 'specificity') return cell === 'tn' || cell === 'fp';
    return false;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      <div style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: '#64748b',
        letterSpacing: '0.5px',
        textAlign: 'center'
      }}>
        Confusion Matrix Layout
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 1fr 60px',
        gap: '4px',
        fontSize: '0.78rem',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Top Header */}
        <div></div>
        <div style={{ fontWeight: 700, color: '#0d9488', padding: '4px' }}>Pred Pos</div>
        <div style={{ fontWeight: 700, color: '#64748b', padding: '4px' }}>Pred Neg</div>
        <div style={{ fontWeight: 700, color: '#94a3b8', fontSize: '0.7rem' }}>Total</div>

        {/* Row 1: Actual Positive */}
        <div style={{ fontWeight: 700, color: '#0d9488', textAlign: 'right', paddingRight: '8px' }}>
          Act Pos
        </div>
        <div style={{
          backgroundColor: isHighlighted('tp') ? '#dcfce7' : '#f0fdf4',
          border: isHighlighted('tp') ? '2px solid #22c55e' : '1px solid #bbf7d0',
          borderRadius: '8px',
          padding: '10px 4px',
          fontWeight: 800,
          color: '#15803d',
          transition: 'all 0.2s'
        }}>
          <div style={{ fontSize: '0.68rem', color: '#166534', fontWeight: 600 }}>TP</div>
          <div style={{ fontSize: '1.15rem' }}>{tp}</div>
        </div>

        <div style={{
          backgroundColor: isHighlighted('fn') ? '#fee2e2' : '#fef2f2',
          border: isHighlighted('fn') ? '2px solid #ef4444' : '1px solid #fecaca',
          borderRadius: '8px',
          padding: '10px 4px',
          fontWeight: 800,
          color: '#b91c1c',
          transition: 'all 0.2s'
        }}>
          <div style={{ fontSize: '0.68rem', color: '#991b1b', fontWeight: 600 }}>FN</div>
          <div style={{ fontSize: '1.15rem' }}>{fn}</div>
        </div>

        <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem' }}>
          {actualPos}
        </div>

        {/* Row 2: Actual Negative */}
        <div style={{ fontWeight: 700, color: '#64748b', textAlign: 'right', paddingRight: '8px' }}>
          Act Neg
        </div>
        <div style={{
          backgroundColor: isHighlighted('fp') ? '#fee2e2' : '#fef2f2',
          border: isHighlighted('fp') ? '2px solid #ef4444' : '1px solid #fecaca',
          borderRadius: '8px',
          padding: '10px 4px',
          fontWeight: 800,
          color: '#b91c1c',
          transition: 'all 0.2s'
        }}>
          <div style={{ fontSize: '0.68rem', color: '#991b1b', fontWeight: 600 }}>FP</div>
          <div style={{ fontSize: '1.15rem' }}>{fp}</div>
        </div>

        <div style={{
          backgroundColor: isHighlighted('tn') ? '#dcfce7' : '#f0fdf4',
          border: isHighlighted('tn') ? '2px solid #22c55e' : '1px solid #bbf7d0',
          borderRadius: '8px',
          padding: '10px 4px',
          fontWeight: 800,
          color: '#15803d',
          transition: 'all 0.2s'
        }}>
          <div style={{ fontSize: '0.68rem', color: '#166534', fontWeight: 600 }}>TN</div>
          <div style={{ fontSize: '1.15rem' }}>{tn}</div>
        </div>

        <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem' }}>
          {actualNeg}
        </div>

        {/* Total Footer Row */}
        <div style={{ fontWeight: 700, color: '#94a3b8', textAlign: 'right', paddingRight: '8px', fontSize: '0.7rem' }}>
          Total
        </div>
        <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem' }}>{predPos}</div>
        <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem' }}>{predNeg}</div>
        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{total}</div>
      </div>
    </div>
  );
};

export default ConfusionMatrixView;
