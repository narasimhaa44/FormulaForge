import React from 'react';
import styles from './HomePage.module.css';

const Breadcrumbs = ({ categoryName, categorySlug, calculatorName, onNavigateHome, onNavigateCategory }) => {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '12px', width: '95%', maxWidth: '1240px' }}>
      <ol style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '6px',
        listStyle: 'none',
        padding: '6px 14px',
        margin: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        fontSize: '0.78rem',
        fontWeight: 600,
        color: '#64748b'
      }}>
        <li>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            style={{ color: '#0d9488', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            Home
          </a>
        </li>
        <li aria-hidden="true" style={{ color: '#cbd5e1' }}>/</li>
        <li>
          <a
            href="/machine-learning-calculators"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            style={{ color: '#0d9488', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            Machine Learning Calculators
          </a>
        </li>
        {categoryName && (
          <>
            <li aria-hidden="true" style={{ color: '#cbd5e1' }}>/</li>
            <li>
              <a
                href={`/machine-learning-calculators/${categorySlug || 'all'}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateCategory(categorySlug);
                }}
                style={{ color: '#0d9488', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                {categoryName}
              </a>
            </li>
          </>
        )}
        <li aria-hidden="true" style={{ color: '#cbd5e1' }}>/</li>
        <li aria-current="page" style={{ color: '#0f172a', fontWeight: 700 }}>
          {calculatorName}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
