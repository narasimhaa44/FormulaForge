import React, { useState } from 'react';
import { FileText, Copy, Check } from './Icons';

const FormulaCard = ({ formulaLatex, formulaPlain, formulaExplanation }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = formulaPlain || formulaLatex || '';
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #f1f5f9',
      borderRadius: '16px',
      padding: '16px 20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} color="#0d9488" />
          <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>Formula</span>
        </div>
        
        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: copied ? '#059669' : '#475569',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#cbd5e1';
            e.currentTarget.style.backgroundColor = '#f8fafc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.backgroundColor = '#ffffff';
          }}
        >
          {copied ? (
            <>
              <Check size={14} color="#059669" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} color="#64748b" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Math container */}
      <div style={{
        backgroundColor: '#eefaf7',
        borderRadius: '12px',
        padding: '16px 20px',
        textAlign: 'center',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '1.15rem',
        fontWeight: 600,
        color: '#0f172a',
        letterSpacing: '0.2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60px',
        border: '1px solid #dcf2ec',
        overflowX: 'auto'
      }}>
        {formulaPlain}
      </div>

      {formulaExplanation && (
        <div style={{
          fontSize: '0.78rem',
          color: '#64748b',
          lineHeight: 1.45,
          marginTop: '-2px'
        }}>
          {formulaExplanation}
        </div>
      )}
    </div>
  );
};

export default FormulaCard;
