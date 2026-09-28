import React, { useState, useMemo, useEffect, useCallback } from 'react';
import styles from './HomePage.module.css';
import { CALCULATORS, CATEGORIES, CLASS_COLORS, getCalculatorBySlugOrId } from '../utils/calculatorData';
import { updatePageSEO } from '../utils/seoHelper';
import {
  Calculator,
  Brain,
  Zap,
  TreePine,
  Target,
  TrendingUp,
  Sparkles,
  ChevronDown
} from './Icons';

// Sub-components
import Breadcrumbs from './Breadcrumbs';
import DonutChart from './DonutChart';
import ConfusionMatrixView from './ConfusionMatrixView';
import ResidualView from './ResidualView';
import FormulaCard from './FormulaCard';
import StepByStep from './StepByStep';
import EducationalContent from './EducationalContent';

// Pattern input components
import PatternAClassCounts from './PatternAClassCounts';
import PatternBConfusionMatrix from './PatternBConfusionMatrix';
import PatternCActualPredicted from './PatternCActualPredicted';
import PatternInfoGain from './PatternInfoGain';
import PatternGainRatio from './PatternGainRatio';
import PatternF1 from './PatternF1';
import PatternRSquared from './PatternRSquared';

const CATEGORY_ICONS = {
  Zap: Zap,
  TreePine: TreePine,
  Target: Target,
  TrendingUp: TrendingUp,
};

const CATEGORY_COLORS = {
  Zap: '#f59e0b',
  TreePine: '#10b981',
  Target: '#f43f5e',
  TrendingUp: '#38bdf8',
};

const HomePage = () => {
  // Determine initial calculator from current URL path
  const getInitialCalc = () => {
    if (typeof window === 'undefined') return CALCULATORS[0];
    const path = window.location.pathname;
    const match = path.match(/\/calculators\/([a-z0-9-]+)/i);
    if (match && match[1]) {
      const found = CALCULATORS.find(c => c.slug === match[1] || c.id === match[1]);
      if (found) return found;
    }
    return CALCULATORS[0];
  };

  const initialCalc = getInitialCalc();
  const [activeCategory, setActiveCategory] = useState(initialCalc.category || 'all');
  const [selectedCalcSlug, setSelectedCalcSlug] = useState(initialCalc.slug);

  // 1. Class Counts (for Entropy, Gini, Classification Error)
  const [classCountsState, setClassCountsState] = useState({
    entropy: [
      { name: 'Class A', count: 6, color: '#182830' },
      { name: 'Class B', count: 4, color: '#f87171' }
    ],
    gini: [
      { name: 'Class 1', count: 6, color: '#182830' },
      { name: 'Class 2', count: 4, color: '#f87171' }
    ],
    classification_error: [
      { name: 'Class 1', count: 6, color: '#182830' },
      { name: 'Class 2', count: 4, color: '#f87171' }
    ]
  });

  // 2. Confusion Matrix State
  const [confusionMatrixState, setConfusionMatrixState] = useState({
    tp: 80,
    tn: 90,
    fp: 10,
    fn: 20
  });

  // 3. Regression Table State
  const [regressionRowsState, setRegressionRowsState] = useState({
    mae: [
      { actual: 10, predicted: 12 },
      { actual: 20, predicted: 18 },
      { actual: 15, predicted: 14 }
    ],
    mse: [
      { actual: 10, predicted: 12 },
      { actual: 20, predicted: 18 },
      { actual: 15, predicted: 14 }
    ],
    rmse: [
      { actual: 10, predicted: 12 },
      { actual: 20, predicted: 18 },
      { actual: 15, predicted: 14 }
    ],
    mape: [
      { actual: 100, predicted: 110 },
      { actual: 200, predicted: 190 },
      { actual: 150, predicted: 160 }
    ]
  });

  // 4. Information Gain state
  const [infoGainState, setInfoGainState] = useState({
    parent: [
      { name: 'Class 1', count: 6 },
      { name: 'Class 2', count: 4 }
    ],
    children: [
      {
        name: 'Child Node 1 (Left)',
        counts: [{ name: 'Class 1', count: 4 }, { name: 'Class 2', count: 1 }]
      },
      {
        name: 'Child Node 2 (Right)',
        counts: [{ name: 'Class 1', count: 2 }, { name: 'Class 2', count: 3 }]
      }
    ]
  });

  // 5. Gain Ratio state
  const [gainRatioState, setGainRatioState] = useState({
    mode: 'direct',
    infoGain: 0.3219,
    splitInfo: 0.9709,
    dataset: {
      parent: [{ name: 'Class 1', count: 6 }, { name: 'Class 2', count: 4 }],
      children: [
        { name: 'Branch 1', counts: [{ name: 'Class 1', count: 4 }, { name: 'Class 2', count: 1 }] },
        { name: 'Branch 2', counts: [{ name: 'Class 1', count: 2 }, { name: 'Class 2', count: 3 }] }
      ]
    }
  });

  // 6. F1 Score state
  const [f1State, setF1State] = useState({
    mode: 'direct',
    precision: 0.80,
    recall: 0.75,
    matrix: { tp: 80, tn: 90, fp: 20, fn: 25 }
  });

  // 7. R² Score state
  const [r2State, setR2State] = useState({
    mode: 'table',
    ssRes: 9.0,
    ssTot: 50.0,
    rows: [
      { actual: 10, predicted: 12 },
      { actual: 20, predicted: 18 },
      { actual: 15, predicted: 14 }
    ]
  });

  const [calcCounter, setCalcCounter] = useState(0);

  const activeCalc = useMemo(() => {
    return CALCULATORS.find(c => c.slug === selectedCalcSlug || c.id === selectedCalcSlug) || CALCULATORS[0];
  }, [selectedCalcSlug]);

  const filteredCalculators = useMemo(() => {
    if (activeCategory === 'all') return CALCULATORS;
    return CALCULATORS.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  // Navigate to calculator and update browser URL
  const navigateToCalculator = useCallback((slugOrId, pushHistory = true) => {
    const target = getCalculatorBySlugOrId(slugOrId);
    setSelectedCalcSlug(target.slug);
    if (activeCategory !== 'all' && target.category !== activeCategory) {
      setActiveCategory(target.category);
    }
    if (pushHistory && typeof window !== 'undefined') {
      const newPath = `/calculators/${target.slug}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({ slug: target.slug }, '', newPath);
      }
    }
  }, [activeCategory]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const current = getInitialCalc();
      setSelectedCalcSlug(current.slug);
      setActiveCategory(current.category);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync SEO metadata whenever active calculator changes
  useEffect(() => {
    if (!activeCalc) return;

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://calcify.dev';
    const canonicalUrl = `${origin}/calculators/${activeCalc.slug}`;

    const breadcrumbs = [
      { name: 'Home', url: `${origin}/` },
      { name: 'Machine Learning Calculators', url: `${origin}/machine-learning-calculators` },
      { name: activeCalc.categoryName, url: `${origin}/machine-learning-calculators/${activeCalc.categorySlug}` },
      { name: activeCalc.name, url: canonicalUrl }
    ];

    updatePageSEO({
      title: activeCalc.seoTitle,
      description: activeCalc.metaDescription,
      canonicalUrl: canonicalUrl,
      breadcrumbs: breadcrumbs,
      faqs: activeCalc.faqs || [],
      calculatorName: activeCalc.name
    });
  }, [activeCalc]);

  // Compute calculation results
  const result = useMemo(() => {
    if (!activeCalc) return null;

    switch (activeCalc.pattern) {
      case 'class_counts': {
        const classes = classCountsState[activeCalc.id] || [
          { name: 'Class A', count: 6, color: '#182830' },
          { name: 'Class B', count: 4, color: '#f87171' }
        ];
        return activeCalc.calculate(classes);
      }
      case 'confusion_matrix':
      case 'confusion_matrix_all': {
        return activeCalc.calculate(confusionMatrixState);
      }
      case 'actual_predicted': {
        const rows = regressionRowsState[activeCalc.id] || [];
        return activeCalc.calculate(rows);
      }
      case 'info_gain': {
        return activeCalc.calculate(infoGainState);
      }
      case 'gain_ratio': {
        return activeCalc.calculate(gainRatioState);
      }
      case 'f1_score': {
        return activeCalc.calculate(f1State);
      }
      case 'r_squared': {
        return activeCalc.calculate(r2State);
      }
      default:
        return null;
    }
  }, [activeCalc, classCountsState, confusionMatrixState, regressionRowsState, infoGainState, gainRatioState, f1State, r2State, calcCounter]);

  // Handlers
  const handleClassCountChange = (index, field, value) => {
    setClassCountsState(prev => {
      const currentList = prev[activeCalc.id] || [];
      const updated = currentList.map((c, i) => i === index ? { ...c, [field]: value } : c);
      return { ...prev, [activeCalc.id]: updated };
    });
  };

  const handleAddClass = () => {
    setClassCountsState(prev => {
      const currentList = prev[activeCalc.id] || [];
      const nextIdx = currentList.length;
      const charCode = String.fromCharCode(65 + nextIdx);
      const newClass = {
        name: `Class ${charCode}`,
        count: 2,
        color: CLASS_COLORS[nextIdx % CLASS_COLORS.length]
      };
      return { ...prev, [activeCalc.id]: [...currentList, newClass] };
    });
  };

  const handleRemoveClass = (index) => {
    setClassCountsState(prev => {
      const currentList = prev[activeCalc.id] || [];
      if (currentList.length <= 2) return prev;
      return { ...prev, [activeCalc.id]: currentList.filter((_, i) => i !== index) };
    });
  };

  const handleMatrixChange = (key, value) => {
    setConfusionMatrixState(prev => ({
      ...prev,
      [key]: value === '' ? '' : Math.max(0, Number(value))
    }));
  };

  const handleRowChange = (index, field, value) => {
    setRegressionRowsState(prev => {
      const currentList = prev[activeCalc.id] || [];
      const updated = currentList.map((r, i) => i === index ? { ...r, [field]: value } : r);
      return { ...prev, [activeCalc.id]: updated };
    });
  };

  const handleAddRow = () => {
    setRegressionRowsState(prev => {
      const currentList = prev[activeCalc.id] || [];
      return { ...prev, [activeCalc.id]: [...currentList, { actual: '', predicted: '' }] };
    });
  };

  const handleRemoveRow = (index) => {
    setRegressionRowsState(prev => {
      const currentList = prev[activeCalc.id] || [];
      return { ...prev, [activeCalc.id]: currentList.filter((_, i) => i !== index) };
    });
  };

  const handleSetPreset = (presetRows) => {
    setRegressionRowsState(prev => ({
      ...prev,
      [activeCalc.id]: presetRows
    }));
  };

  return (
    <div className={styles.pageContainer}>
      {/* Top Navbar with Calcify Brand & Category Switcher */}
      <header className={styles.topNav}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <Calculator size={22} color="#ffffff" />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>Calcify</span>
            <span className={styles.brandSubtitle}>ML & Statistics Calculators</span>
          </div>
        </div>

        {/* Categories Bar */}
        <nav className={styles.categoryBar} aria-label="Calculator Categories">
          {CATEGORIES.map(cat => {
            const IconComp = CATEGORY_ICONS[cat.iconKey] || Zap;
            const iconColor = CATEGORY_COLORS[cat.iconKey] || '#10b981';
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`${styles.catBtn} ${isActive ? styles.catBtnActive : ''}`}
                aria-pressed={isActive}
              >
                <IconComp size={16} color={isActive ? '#ffffff' : iconColor} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Accessible Breadcrumbs */}
      <Breadcrumbs
        categoryName={activeCalc.categoryName}
        categorySlug={activeCalc.categorySlug}
        calculatorName={activeCalc.name}
        onNavigateHome={() => {
          setActiveCategory('all');
          navigateToCalculator('entropy-calculator');
        }}
        onNavigateCategory={(catSlug) => {
          const foundCat = CATEGORIES.find(c => c.slug === catSlug);
          if (foundCat) setActiveCategory(foundCat.id);
        }}
      />

      {/* Main Glassmorphism Card */}
      <main className={styles.mainCard}>
        {/* Left Panel: Inputs and Calculator Actions */}
        <section className={styles.leftPanel} aria-labelledby="calc-heading">
          {/* Header Metadata with exactly one H1 */}
          <div className={styles.headerMeta}>
            <div className={styles.badge}>
              <Brain size={14} color="#065f46" />
              <span>{activeCalc.badge}</span>
            </div>
            <h1 id="calc-heading" className={styles.calcTitle}>{activeCalc.name}</h1>
            <p className={styles.calcDesc}>{activeCalc.description}</p>
          </div>

          {/* Quick Calculator Selector Pills */}
          <div className={styles.selectorContainer}>
            <span className={styles.selectorLabel}>Select Calculator:</span>
            <div className={styles.calcPillsList}>
              {filteredCalculators.map(c => (
                <button
                  key={c.id}
                  onClick={() => navigateToCalculator(c.slug)}
                  className={`${styles.calcPill} ${activeCalc.slug === c.slug ? styles.calcPillActive : ''}`}
                >
                  {c.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Pattern Input Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {activeCalc.pattern === 'class_counts' && (
              <PatternAClassCounts
                classes={classCountsState[activeCalc.id] || activeCalc.defaultClasses}
                onChange={handleClassCountChange}
                onAddClass={handleAddClass}
                onRemoveClass={handleRemoveClass}
              />
            )}

            {(activeCalc.pattern === 'confusion_matrix' || activeCalc.pattern === 'confusion_matrix_all') && (
              <PatternBConfusionMatrix
                matrix={confusionMatrixState}
                onChange={handleMatrixChange}
                activeMetric={activeCalc.id}
              />
            )}

            {activeCalc.pattern === 'actual_predicted' && (
              <PatternCActualPredicted
                rows={regressionRowsState[activeCalc.id] || activeCalc.defaultRows}
                onChange={handleRowChange}
                onAddRow={handleAddRow}
                onRemoveRow={handleRemoveRow}
                onSetPreset={handleSetPreset}
              />
            )}

            {activeCalc.pattern === 'info_gain' && (
              <PatternInfoGain
                data={infoGainState}
                onChangeParent={(idx, val) => {
                  setInfoGainState(prev => {
                    const newParent = [...prev.parent];
                    newParent[idx] = { ...newParent[idx], count: val };
                    return { ...prev, parent: newParent };
                  });
                }}
                onChangeChild={(cIdx, clsIdx, val) => {
                  setInfoGainState(prev => {
                    const newChildren = [...prev.children];
                    const newCounts = [...newChildren[cIdx].counts];
                    newCounts[clsIdx] = { ...newCounts[clsIdx], count: val };
                    newChildren[cIdx] = { ...newChildren[cIdx], counts: newCounts };
                    return { ...prev, children: newChildren };
                  });
                }}
                onAddChild={() => {
                  setInfoGainState(prev => ({
                    ...prev,
                    children: [
                      ...prev.children,
                      {
                        name: `Child Node ${prev.children.length + 1}`,
                        counts: [{ name: 'Class 1', count: 1 }, { name: 'Class 2', count: 1 }]
                      }
                    ]
                  }));
                }}
                onRemoveChild={(cIdx) => {
                  setInfoGainState(prev => ({
                    ...prev,
                    children: prev.children.filter((_, i) => i !== cIdx)
                  }));
                }}
              />
            )}

            {activeCalc.pattern === 'gain_ratio' && (
              <PatternGainRatio
                data={gainRatioState}
                onChangeMode={(mode) => setGainRatioState(prev => ({ ...prev, mode }))}
                onChangeDirect={(field, val) => setGainRatioState(prev => ({ ...prev, [field]: val }))}
                onDatasetChange={(type, ...args) => {
                  if (type === 'parent') {
                    const [idx, _, val] = args;
                    setGainRatioState(prev => {
                      const newParent = [...prev.dataset.parent];
                      newParent[idx] = { ...newParent[idx], count: val };
                      return { ...prev, dataset: { ...prev.dataset, parent: newParent } };
                    });
                  } else if (type === 'child') {
                    const [cIdx, clsIdx, val] = args;
                    setGainRatioState(prev => {
                      const newChildren = [...prev.dataset.children];
                      const newCounts = [...newChildren[cIdx].counts];
                      newCounts[clsIdx] = { ...newCounts[clsIdx], count: val };
                      newChildren[cIdx] = { ...newChildren[cIdx], counts: newCounts };
                      return { ...prev, dataset: { ...prev.dataset, children: newChildren } };
                    });
                  } else if (type === 'addChild') {
                    setGainRatioState(prev => ({
                      ...prev,
                      dataset: {
                        ...prev.dataset,
                        children: [
                          ...prev.dataset.children,
                          {
                            name: `Branch ${prev.dataset.children.length + 1}`,
                            counts: [{ name: 'Class 1', count: 1 }, { name: 'Class 2', count: 1 }]
                          }
                        ]
                      }
                    }));
                  } else if (type === 'removeChild') {
                    const [cIdx] = args;
                    setGainRatioState(prev => ({
                      ...prev,
                      dataset: {
                        ...prev.dataset,
                        children: prev.dataset.children.filter((_, i) => i !== cIdx)
                      }
                    }));
                  }
                }}
              />
            )}

            {activeCalc.pattern === 'f1_score' && (
              <PatternF1
                data={f1State}
                onChangeMode={(mode) => setF1State(prev => ({ ...prev, mode }))}
                onChangeDirect={(field, val) => setF1State(prev => ({ ...prev, [field]: val }))}
                onChangeMatrix={(field, val) => setF1State(prev => ({
                  ...prev,
                  matrix: { ...prev.matrix, [field]: val }
                }))}
              />
            )}

            {activeCalc.pattern === 'r_squared' && (
              <PatternRSquared
                data={r2State}
                onChangeMode={(mode) => setR2State(prev => ({ ...prev, mode }))}
                onChangeDirect={(field, val) => setR2State(prev => ({ ...prev, [field]: val }))}
                onRowChange={(idx, field, val) => {
                  setR2State(prev => {
                    const newRows = [...prev.rows];
                    newRows[idx] = { ...newRows[idx], [field]: val };
                    return { ...prev, rows: newRows };
                  });
                }}
                onAddRow={() => setR2State(prev => ({ ...prev, rows: [...prev.rows, { actual: '', predicted: '' }] }))}
                onRemoveRow={(idx) => setR2State(prev => ({ ...prev, rows: prev.rows.filter((_, i) => i !== idx) }))}
                onSetPreset={(presetRows) => setR2State(prev => ({ ...prev, rows: presetRows }))}
              />
            )}
          </div>

          {/* Primary Calculate CTA Button */}
          <button
            type="button"
            className={styles.calculateBtn}
            onClick={() => setCalcCounter(c => c + 1)}
          >
            <Calculator size={20} color="#ffffff" />
            <span>Calculate {activeCalc.shortName}</span>
          </button>
        </section>

        {/* Right Panel: Result & Formula Cards */}
        <section className={styles.rightPanel}>
          {/* Result Card with semantic H2 */}
          <div className={styles.resultCard}>
            <div className={styles.resultTitleWrapper}>
              <h2 className={styles.resultTitle}>{activeCalc.shortName} Result</h2>
              <div className={styles.titleAccentLine} />
            </div>

            <div className={styles.resultGrid}>
              {/* Left Column: Metric Highlight */}
              <div className={styles.metricBoxContainer}>
                <span className={styles.metricLabel}>{result?.metricName || activeCalc.shortName}</span>
                <div className={styles.metricValueBadge}>
                  {result?.value ?? '0.000'}
                </div>
                {result?.unit && (
                  <span className={styles.metricExtra}>Unit: {result.unit}</span>
                )}
                {result?.majorityClass && (
                  <span className={styles.metricExtra}>Majority: {result.majorityClass}</span>
                )}
                {result?.accuracy !== undefined && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px', fontSize: '0.78rem', color: '#334155', fontWeight: 600 }}>
                    <div>🎯 Acc: <strong>{result.accuracy}%</strong></div>
                    <div>⚡ Prec: <strong>{result.precision}%</strong></div>
                    <div>📡 Rec: <strong>{result.recall}%</strong></div>
                    <div>🛡️ Spec: <strong>{result.specificity}%</strong></div>
                  </div>
                )}
              </div>

              {/* Right Column: Visual Graphic */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {activeCalc.pattern === 'class_counts' && (
                  <DonutChart
                    classes={result?.classes || []}
                    total={result?.total || 0}
                    size={170}
                  />
                )}

                {(activeCalc.pattern === 'confusion_matrix' || activeCalc.pattern === 'confusion_matrix_all') && (
                  <ConfusionMatrixView
                    tp={Number(confusionMatrixState.tp) || 0}
                    tn={Number(confusionMatrixState.tn) || 0}
                    fp={Number(confusionMatrixState.fp) || 0}
                    fn={Number(confusionMatrixState.fn) || 0}
                    activeMetric={activeCalc.id}
                  />
                )}

                {activeCalc.pattern === 'f1_score' && f1State.mode === 'matrix' && (
                  <ConfusionMatrixView
                    tp={Number(f1State.matrix.tp) || 0}
                    tn={Number(f1State.matrix.tn) || 0}
                    fp={Number(f1State.matrix.fp) || 0}
                    fn={Number(f1State.matrix.fn) || 0}
                    activeMetric="f1"
                  />
                )}

                {activeCalc.pattern === 'f1_score' && f1State.mode === 'direct' && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    width: '100%',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Harmonic Mean Components</div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '4px' }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: '#0d9488', fontWeight: 700 }}>Precision</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{result?.precision}</div>
                      </div>
                      <div style={{ borderLeft: '1px solid #e2e8f0' }} />
                      <div>
                        <div style={{ fontSize: '0.72rem', color: '#0d9488', fontWeight: 700 }}>Recall</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{result?.recall}</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeCalc.pattern === 'actual_predicted' && (
                  <ResidualView
                    diffs={result?.diffs || []}
                    metricType={activeCalc.id}
                  />
                )}

                {activeCalc.pattern === 'info_gain' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', fontSize: '0.78rem' }}>
                    <div style={{ backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ color: '#64748b', fontWeight: 600 }}>Parent Entropy</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{result?.parentRes?.entropy?.toFixed(4)} bits</div>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ color: '#64748b', fontWeight: 600 }}>Weighted Child Entropy</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{result?.weightedChildEntropy} bits</div>
                    </div>
                  </div>
                )}

                {activeCalc.pattern === 'gain_ratio' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', fontSize: '0.78rem' }}>
                    <div style={{ backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ color: '#64748b', fontWeight: 600 }}>Info Gain (Numerator)</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{result?.ig}</div>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ color: '#64748b', fontWeight: 600 }}>Split Info (Denominator)</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{result?.splitInfo}</div>
                    </div>
                  </div>
                )}

                {activeCalc.pattern === 'r_squared' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', fontSize: '0.78rem' }}>
                    <div style={{ backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ color: '#64748b', fontWeight: 600 }}>SS_residual</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{result?.ssRes ?? '0'}</div>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ color: '#64748b', fontWeight: 600 }}>SS_total</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{result?.ssTot ?? '0'}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step-by-Step calculation */}
            <StepByStep steps={result?.steps || []} />
          </div>

          {/* Formula Card */}
          <FormulaCard
            formulaLatex={activeCalc.formulaLatex}
            formulaPlain={activeCalc.formulaPlain}
            formulaExplanation={activeCalc.formulaExplanation}
          />
        </section>
      </main>

      {/* Crawlable, Indexable Educational Content Section with H2s, Cross-Links & FAQs */}
      <EducationalContent
        calculator={activeCalc}
        onSelectCalculator={(slug) => navigateToCalculator(slug)}
        onSelectCategory={(catId) => setActiveCategory(catId)}
      />

      {/* Footer with semantic copyright and quick links */}
      <footer style={{
        marginTop: '32px',
        padding: '16px 20px',
        color: '#94a3b8',
        fontSize: '0.78rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div>
          Calcify &copy; {new Date().getFullYear()} — Machine Learning &amp; Statistics Calculators.
        </div>
        <div>
          Calculators for Decision Trees, Classification Performance Metrics, and Regression Analysis.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;