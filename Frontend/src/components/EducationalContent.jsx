import React from 'react';
import { HelpCircle, GitBranch, Split, Sparkles, Target, TreePine, TrendingUp } from './Icons';

const EducationalContent = ({ calculator, onSelectCalculator, onSelectCategory }) => {
  if (!calculator) return null;

  return (
    <article style={{
      width: '95%',
      maxWidth: '1240px',
      marginTop: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      padding: '32px 36px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      boxSizing: 'border-box'
    }}>
      {/* Section 1: How to Calculate */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            backgroundColor: '#e2f9ee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0d9488'
          }}>
            <Sparkles size={16} color="#0d9488" />
          </span>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.4rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: 0
          }}>
            How to Calculate {calculator.name}
          </h2>
        </div>

        <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
          {calculator.description} Follow these steps to compute the result:
        </p>

        <ol style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          paddingLeft: '20px',
          margin: '4px 0 0 0',
          fontSize: '0.88rem',
          color: '#334155',
          lineHeight: 1.5
        }}>
          {calculator.howToCalculate?.map((step, idx) => (
            <li key={idx} style={{ paddingLeft: '4px' }}>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Section 2: Related Calculators (Internal Linking) */}
      <section style={{
        backgroundColor: '#fafbfd',
        borderRadius: '16px',
        padding: '20px 24px',
        border: '1px solid #f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            backgroundColor: '#e0f2fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0284c7'
          }}>
            <GitBranch size={15} color="#0284c7" />
          </span>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: 0
          }}>
            Related Machine Learning Calculators
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px'
        }}>
          {calculator.relatedCalculators?.map((rel, idx) => (
            <a
              key={idx}
              href={`/calculators/${rel.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectCalculator(rel.slug);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                border: '1.5px solid #e2e8f0',
                textDecoration: 'none',
                color: '#0f172a',
                fontSize: '0.85rem',
                fontWeight: 700,
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0d9488';
                e.currentTarget.style.backgroundColor = '#f0fdfa';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>{rel.anchorText}</span>
              <span style={{ color: '#0d9488', fontSize: '1.1rem' }}>→</span>
            </a>
          ))}
        </div>

        <div style={{ marginTop: '4px', fontSize: '0.82rem', color: '#64748b' }}>
          Explore all metric tools in the{' '}
          <a
            href={`/machine-learning-calculators/${calculator.categorySlug}`}
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory(calculator.category);
            }}
            style={{ color: '#0d9488', fontWeight: 700, textDecoration: 'underline' }}
          >
            {calculator.categoryName}
          </a>{' '}
          collection.
        </div>
      </section>

      {/* Section 3: Frequently Asked Questions (FAQ) */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            backgroundColor: '#fef3c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#b45309'
          }}>
            <Target size={16} color="#b45309" />
          </span>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.35rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: 0
          }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {calculator.faqs?.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '12px 16px',
                transition: 'all 0.2s'
              }}
            >
              <summary style={{
                cursor: 'pointer',
                fontWeight: 700,
                color: '#0f172a',
                fontSize: '0.92rem',
                outline: 'none',
                userSelect: 'none'
              }}>
                <h3 style={{
                  display: 'inline',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  margin: 0
                }}>
                  {faq.question}
                </h3>
              </summary>
              <p style={{
                margin: '10px 0 2px 0',
                fontSize: '0.86rem',
                color: '#475569',
                lineHeight: 1.55
              }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
};

export default EducationalContent;
