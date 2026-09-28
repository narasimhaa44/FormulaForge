// Complete Calculator definitions, math logic, LaTeX formulas, and SEO metadata for all 15 calculators

export const CATEGORIES = [
  { id: 'all', label: 'All Calculators', iconKey: 'Zap', slug: 'all' },
  { id: 'decision_trees', label: 'Decision Trees & Impurity', iconKey: 'TreePine', slug: 'decision-trees' },
  { id: 'classification', label: 'Classification Metrics', iconKey: 'Target', slug: 'classification' },
  { id: 'regression', label: 'Regression Metrics', iconKey: 'TrendingUp', slug: 'regression' },
];

export const CALCULATORS = [
  // 1. Entropy
  {
    id: 'entropy',
    slug: 'entropy-calculator',
    category: 'decision_trees',
    categoryName: 'Decision Tree Calculators',
    categorySlug: 'decision-trees',
    name: 'Entropy Calculator',
    shortName: 'Entropy',
    seoTitle: 'Entropy Calculator - Decision Tree Entropy',
    metaDescription: 'Calculate decision tree Shannon entropy from class counts. Enter your class sample counts to get instant entropy value, formula, and step-by-step calculation.',
    badge: 'Machine Learning',
    description: 'Calculate Shannon entropy to measure impurity or disorder in a dataset for decision trees.',
    pattern: 'class_counts',
    defaultClasses: [
      { name: 'Class A', count: 6, color: '#182830' },
      { name: 'Class B', count: 4, color: '#f87171' }
    ],
    formulaLatex: 'H(S) = -\\sum_{i=1}^{c} p_i \\log_2(p_i)',
    formulaPlain: 'H(S) = - Σ (p_i * log2(p_i))',
    formulaExplanation: 'Where p_i is the proportion of samples belonging to class i in dataset S, and c is the number of classes.',
    howToCalculate: [
      'Sum all sample counts to find total samples N: N = Σ count(i).',
      'Compute the probability for each class: p_i = count(i) / N.',
      'Multiply each probability by its base-2 logarithm: p_i × log₂(p_i).',
      'Sum all terms and take the negative value: H(S) = - Σ [p_i × log₂(p_i)].'
    ],
    faqs: [
      {
        question: 'What is Shannon Entropy in decision trees?',
        answer: 'Entropy is a measure of impurity, uncertainty, or disorder in a dataset. In decision trees (like ID3 and C4.5), it determines how mixed a node is. An entropy of 0 means the node is completely pure (all samples belong to one class).'
      },
      {
        question: 'What is the maximum value of entropy?',
        answer: 'For a dataset with c equally distributed classes, maximum entropy is log₂(c). For 2 equal classes (50/50 split), maximum entropy is log₂(2) = 1.0 bit.'
      },
      {
        question: 'Why does the formula use log base 2?',
        answer: 'Log base 2 measures information in bits (binary digits), which aligns with binary decision splitting in computer science and machine learning.'
      }
    ],
    relatedCalculators: [
      { slug: 'information-gain-calculator', name: 'Information Gain Calculator', anchorText: 'Calculate Information Gain for Decision Trees' },
      { slug: 'gini-impurity-calculator', name: 'Gini Impurity Calculator', anchorText: 'Calculate Gini Impurity (CART)' },
      { slug: 'gain-ratio-calculator', name: 'Gain Ratio Calculator', anchorText: 'Calculate Gain Ratio (C4.5)' },
      { slug: 'classification-error-calculator', name: 'Classification Error Calculator', anchorText: 'Calculate Node Classification Error' }
    ],
    calculate: (classes) => {
      const valid = classes.map(c => ({ name: c.name, count: Math.max(0, Number(c.count) || 0), color: c.color }));
      const total = valid.reduce((acc, c) => acc + c.count, 0);
      
      if (total === 0) {
        return {
          metricName: 'Entropy',
          value: '0.00000',
          total: 0,
          classes: valid.map(c => ({ ...c, prob: 0, pct: 0 })),
          steps: ['Total samples = 0. Please enter sample counts greater than 0.']
        };
      }

      let entropy = 0;
      const classDetails = valid.map(c => {
        const prob = c.count / total;
        const term = prob > 0 ? prob * Math.log2(prob) : 0;
        entropy -= term;
        return {
          name: c.name,
          count: c.count,
          color: c.color,
          prob: prob,
          pct: Math.round(prob * 1000) / 10
        };
      });

      const finalEntropy = Math.abs(entropy) < 1e-9 ? 0 : entropy;

      const steps = [
        `Total samples (N) = ${valid.map(c => c.count).join(' + ')} = ${total}`,
        ...classDetails.map(c => `P(${c.name}) = ${c.count} / ${total} = ${c.prob.toFixed(4)} (${c.pct}%)`),
        `Entropy H(S) = - [ ${classDetails.map(c => c.prob > 0 ? `(${c.prob.toFixed(4)} × log₂(${c.prob.toFixed(4)}))` : '0').join(' + ')} ]`,
        `Entropy H(S) = ${finalEntropy.toFixed(5)} bits`
      ];

      return {
        metricName: 'Entropy',
        unit: 'bits',
        value: finalEntropy.toFixed(5),
        numericValue: finalEntropy,
        total,
        classes: classDetails,
        steps
      };
    }
  },

  // 2. Information Gain
  {
    id: 'info_gain',
    slug: 'information-gain-calculator',
    category: 'decision_trees',
    categoryName: 'Decision Tree Calculators',
    categorySlug: 'decision-trees',
    name: 'Information Gain Calculator',
    shortName: 'Information Gain',
    seoTitle: 'Information Gain Calculator - Decision Tree',
    metaDescription: 'Calculate Information Gain (IG) from parent dataset and child split nodes. View parent entropy, weighted child entropy, formula, and step-by-step calculations instantly.',
    badge: 'Decision Trees',
    description: 'Calculate Information Gain (IG) from parent dataset and split child nodes.',
    pattern: 'info_gain',
    defaultData: {
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
    },
    formulaLatex: 'IG(S, A) = H(S) - \\sum_{v \\in Values(A)} \\frac{|S_v|}{|S|} H(S_v)',
    formulaPlain: 'IG(S, A) = H(Parent) - Σ (|S_v| / |S| * H(Child_v))',
    formulaExplanation: 'Where H(S) is parent entropy, |S| is total parent instances, and |S_v| is count of samples in child branch v with entropy H(S_v).',
    howToCalculate: [
      'Calculate the Shannon entropy of the parent dataset: H(S).',
      'For each child node after the split, calculate its subset entropy: H(S_v).',
      'Compute the weighted entropy of the split: Σ (|S_v| / |S|) × H(S_v).',
      'Subtract the weighted child entropy from parent entropy: IG = H(Parent) - Weighted Child Entropy.'
    ],
    faqs: [
      {
        question: 'What is Information Gain in decision trees?',
        answer: 'Information Gain measures the reduction in entropy (uncertainty) achieved by splitting a dataset on a specific attribute. Decision tree algorithms choose the split attribute that maximizes Information Gain.'
      },
      {
        question: 'Can Information Gain be negative?',
        answer: 'No, Information Gain is always non-negative (IG ≥ 0). A value of 0 means the split provided no reduction in disorder.'
      },
      {
        question: 'What is the limitation of Information Gain?',
        answer: 'Information Gain tends to favor features with many unique values (e.g., ID numbers). To solve this, C4.5 uses Gain Ratio instead.'
      }
    ],
    relatedCalculators: [
      { slug: 'entropy-calculator', name: 'Entropy Calculator', anchorText: 'Calculate Shannon Entropy' },
      { slug: 'gain-ratio-calculator', name: 'Gain Ratio Calculator', anchorText: 'Calculate C4.5 Gain Ratio' },
      { slug: 'gini-impurity-calculator', name: 'Gini Impurity Calculator', anchorText: 'Calculate Gini Impurity' },
      { slug: 'classification-error-calculator', name: 'Classification Error Calculator', anchorText: 'Calculate Classification Error' }
    ],
    calculate: (data) => {
      const calcNodeEntropy = (counts) => {
        const total = counts.reduce((acc, c) => acc + (Number(c.count) || 0), 0);
        if (total === 0) return { entropy: 0, total: 0, probs: [] };
        let h = 0;
        const probs = counts.map(c => {
          const p = (Number(c.count) || 0) / total;
          if (p > 0) h -= p * Math.log2(p);
          return { name: c.name, count: Number(c.count) || 0, prob: p };
        });
        return { entropy: Math.abs(h) < 1e-9 ? 0 : h, total, probs };
      };

      const parentRes = calcNodeEntropy(data.parent);
      const childRes = data.children.map((child, idx) => {
        const res = calcNodeEntropy(child.counts);
        return {
          name: child.name || `Child Node ${idx + 1}`,
          ...res,
          weight: parentRes.total > 0 ? res.total / parentRes.total : 0
        };
      });

      const weightedChildEntropy = childRes.reduce((acc, c) => acc + (c.weight * c.entropy), 0);
      const ig = parentRes.entropy - weightedChildEntropy;
      const finalIG = Math.abs(ig) < 1e-9 ? 0 : ig;

      const steps = [
        `Parent Total |S| = ${parentRes.total}`,
        `Parent Entropy H(S) = ${parentRes.entropy.toFixed(5)} bits`,
        ...childRes.map((c, i) => `Child ${i + 1} (${c.name}): Count = ${c.total}, Weight = ${c.total}/${parentRes.total} = ${c.weight.toFixed(4)}, Entropy H(S_${i + 1}) = ${c.entropy.toFixed(5)} bits`),
        `Weighted Child Entropy = ${childRes.map(c => `(${c.weight.toFixed(4)} × ${c.entropy.toFixed(5)})`).join(' + ')} = ${weightedChildEntropy.toFixed(5)} bits`,
        `Information Gain IG(S, A) = ${parentRes.entropy.toFixed(5)} - ${weightedChildEntropy.toFixed(5)} = ${finalIG.toFixed(5)} bits`
      ];

      return {
        metricName: 'Information Gain',
        unit: 'bits',
        value: finalIG.toFixed(5),
        numericValue: finalIG,
        parentRes,
        childRes,
        weightedChildEntropy: weightedChildEntropy.toFixed(5),
        steps
      };
    }
  },

  // 3. Gini Impurity
  {
    id: 'gini',
    slug: 'gini-impurity-calculator',
    category: 'decision_trees',
    categoryName: 'Decision Tree Calculators',
    categorySlug: 'decision-trees',
    name: 'Gini Impurity Calculator',
    shortName: 'Gini Impurity',
    seoTitle: 'Gini Impurity Calculator - Decision Tree',
    metaDescription: 'Calculate Gini Impurity from class counts for CART decision trees. Get probability distributions, formula, and step-by-step impurity calculation instantly.',
    badge: 'Machine Learning',
    description: 'Calculate Gini Impurity used by CART decision trees to measure split quality.',
    pattern: 'class_counts',
    defaultClasses: [
      { name: 'Class 1', count: 6, color: '#182830' },
      { name: 'Class 2', count: 4, color: '#f87171' }
    ],
    formulaLatex: 'Gini(S) = 1 - \\sum_{i=1}^{c} p_i^2',
    formulaPlain: 'Gini = 1 - Σ (p_i²)',
    formulaExplanation: 'Where p_i is the probability of an element being classified for a given class. Range is 0 (pure) to (1 - 1/c).',
    howToCalculate: [
      'Compute the total number of samples across all classes: N = Σ count(i).',
      'Find the proportion/probability for each class: p_i = count(i) / N.',
      'Square each class probability: (p_i)².',
      'Sum the squared probabilities and subtract from 1: Gini = 1 - Σ (p_i²).'
    ],
    faqs: [
      {
        question: 'What is Gini Impurity?',
        answer: 'Gini Impurity measures the probability of a randomly chosen sample being incorrectly labeled if it were randomly labeled according to the class distribution. CART algorithms (like Scikit-Learn DecisionTreeClassifier) use Gini as default criterion.'
      },
      {
        question: 'What is the difference between Gini Impurity and Entropy?',
        answer: 'Gini Impurity ranges between 0.0 and 0.5 (for binary classification), while Entropy ranges from 0.0 to 1.0. Gini is computationally faster because it avoids calculating logarithmic functions.'
      },
      {
        question: 'What is a good Gini Impurity score?',
        answer: 'Lower Gini values are better. A Gini of 0.0 indicates a perfectly pure node where all instances belong to the exact same class.'
      }
    ],
    relatedCalculators: [
      { slug: 'entropy-calculator', name: 'Entropy Calculator', anchorText: 'Calculate Shannon Entropy' },
      { slug: 'information-gain-calculator', name: 'Information Gain Calculator', anchorText: 'Calculate Information Gain' },
      { slug: 'classification-error-calculator', name: 'Classification Error Calculator', anchorText: 'Calculate Classification Error' },
      { slug: 'gain-ratio-calculator', name: 'Gain Ratio Calculator', anchorText: 'Calculate Gain Ratio' }
    ],
    calculate: (classes) => {
      const valid = classes.map(c => ({ name: c.name, count: Math.max(0, Number(c.count) || 0), color: c.color }));
      const total = valid.reduce((acc, c) => acc + c.count, 0);

      if (total === 0) {
        return {
          metricName: 'Gini Impurity',
          value: '0.0000',
          total: 0,
          classes: valid.map(c => ({ ...c, prob: 0, pct: 0 })),
          steps: ['Total samples = 0. Please enter counts greater than 0.']
        };
      }

      let sumSq = 0;
      const classDetails = valid.map(c => {
        const prob = c.count / total;
        sumSq += prob * prob;
        return {
          name: c.name,
          count: c.count,
          color: c.color,
          prob: prob,
          pct: Math.round(prob * 1000) / 10
        };
      });

      const gini = 1 - sumSq;
      const finalGini = Math.abs(gini) < 1e-9 ? 0 : gini;

      const steps = [
        `Total samples = ${total}`,
        ...classDetails.map(c => `P(${c.name}) = ${c.count}/${total} = ${c.prob.toFixed(4)}`),
        `Sum of squared probabilities = ${classDetails.map(c => `(${c.prob.toFixed(4)})²`).join(' + ')} = ${sumSq.toFixed(5)}`,
        `Gini = 1 - ${sumSq.toFixed(5)} = ${finalGini.toFixed(5)}`
      ];

      return {
        metricName: 'Gini Impurity',
        value: finalGini.toFixed(5),
        numericValue: finalGini,
        total,
        classes: classDetails,
        steps
      };
    }
  },

  // 4. Gain Ratio
  {
    id: 'gain_ratio',
    slug: 'gain-ratio-calculator',
    category: 'decision_trees',
    categoryName: 'Decision Tree Calculators',
    categorySlug: 'decision-trees',
    name: 'Gain Ratio Calculator',
    shortName: 'Gain Ratio',
    seoTitle: 'Gain Ratio Calculator - Decision Tree',
    metaDescription: 'Calculate Gain Ratio from Information Gain and Split Information or raw dataset branches. View C4.5 split evaluation, formula, and step-by-step math instantly.',
    badge: 'C4.5 Decision Tree',
    description: 'Calculate Gain Ratio to prevent bias towards features with many distinct values.',
    pattern: 'gain_ratio',
    defaultData: {
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
    },
    formulaLatex: 'Gain\\ Ratio = \\frac{Information\\ Gain}{Split\\ Information}',
    formulaPlain: 'Gain Ratio = Information Gain / Split Information',
    formulaExplanation: 'Where Split Information = - Σ (|S_v| / |S|) * log2(|S_v| / |S|) measures the potential information generated by splitting dataset S into subsets S_v.',
    howToCalculate: [
      'Determine the Information Gain (IG) from the split.',
      'Calculate Split Information (SI) = - Σ (|S_v|/|S|) × log₂(|S_v|/|S|).',
      'Divide Information Gain by Split Information: Gain Ratio = IG / Split Information.'
    ],
    faqs: [
      {
        question: 'Why is Gain Ratio used instead of Information Gain?',
        answer: 'Information Gain is biased toward features with many granular values (such as dates or IDs). Gain Ratio penalizes splits that create too many small branches by dividing by Split Information.'
      },
      {
        question: 'Which decision tree algorithm uses Gain Ratio?',
        answer: 'The C4.5 and C5.0 algorithms (successors to ID3) use Gain Ratio as the default attribute selection measure.'
      },
      {
        question: 'What happens if Split Information is 0?',
        answer: 'Split Information is 0 when all samples go into a single branch. In that case, Gain Ratio is undefined (division by zero).'
      }
    ],
    relatedCalculators: [
      { slug: 'information-gain-calculator', name: 'Information Gain Calculator', anchorText: 'Calculate Information Gain' },
      { slug: 'entropy-calculator', name: 'Entropy Calculator', anchorText: 'Calculate Shannon Entropy' },
      { slug: 'gini-impurity-calculator', name: 'Gini Impurity Calculator', anchorText: 'Calculate Gini Impurity' },
      { slug: 'classification-error-calculator', name: 'Classification Error Calculator', anchorText: 'Calculate Classification Error' }
    ],
    calculate: (data) => {
      let ig = Number(data.infoGain) || 0;
      let splitInfo = Number(data.splitInfo) || 0;
      let steps = [];

      if (data.mode === 'dataset') {
        const parentTotal = data.dataset.parent.reduce((acc, c) => acc + (Number(c.count) || 0), 0);
        let parentEntropy = 0;
        if (parentTotal > 0) {
          data.dataset.parent.forEach(c => {
            const p = (Number(c.count) || 0) / parentTotal;
            if (p > 0) parentEntropy -= p * Math.log2(p);
          });
        }

        let weightedChildEntropy = 0;
        let computedSplitInfo = 0;

        data.dataset.children.forEach(child => {
          const childTotal = child.counts.reduce((acc, c) => acc + (Number(c.count) || 0), 0);
          if (parentTotal > 0 && childTotal > 0) {
            const weight = childTotal / parentTotal;
            let childH = 0;
            child.counts.forEach(c => {
              const p = (Number(c.count) || 0) / childTotal;
              if (p > 0) childH -= p * Math.log2(p);
            });
            weightedChildEntropy += weight * childH;
            computedSplitInfo -= weight * Math.log2(weight);
          }
        });

        ig = parentEntropy - weightedChildEntropy;
        splitInfo = computedSplitInfo;

        steps.push(`Parent Entropy H(S) = ${parentEntropy.toFixed(5)}`);
        steps.push(`Weighted Child Entropy = ${weightedChildEntropy.toFixed(5)}`);
        steps.push(`Calculated Information Gain (IG) = ${ig.toFixed(5)}`);
        steps.push(`Calculated Split Information (SI) = ${splitInfo.toFixed(5)}`);
      }

      const ratio = splitInfo !== 0 ? ig / splitInfo : 0;

      steps.push(`Gain Ratio = IG / Split Info = ${ig.toFixed(5)} / ${splitInfo.toFixed(5)} = ${ratio.toFixed(5)}`);

      return {
        metricName: 'Gain Ratio',
        value: ratio.toFixed(5),
        numericValue: ratio,
        ig: ig.toFixed(5),
        splitInfo: splitInfo.toFixed(5),
        steps
      };
    }
  },

  // 5. Classification Error
  {
    id: 'classification_error',
    slug: 'classification-error-calculator',
    category: 'decision_trees',
    categoryName: 'Decision Tree Calculators',
    categorySlug: 'decision-trees',
    name: 'Classification Error Calculator',
    shortName: 'Classification Error',
    seoTitle: 'Classification Error Calculator',
    metaDescription: 'Calculate node classification error from class counts. Identify the majority class probability and compute impurity error 1 - max(p) with step-by-step steps instantly.',
    badge: 'Machine Learning',
    description: 'Calculate classification error (1 - max(p_i)) for dataset impurity evaluation.',
    pattern: 'class_counts',
    defaultClasses: [
      { name: 'Class 1', count: 6, color: '#182830' },
      { name: 'Class 2', count: 4, color: '#f87171' }
    ],
    formulaLatex: 'Error(S) = 1 - \\max_{i}(p_i)',
    formulaPlain: 'Classification Error = 1 - max(p_i)',
    formulaExplanation: 'Measures the misclassification rate if all samples in node S are assigned the majority class.',
    howToCalculate: [
      'Compute probabilities for each class: p_i = count(i) / N.',
      'Find the highest probability among all classes: max(p_i).',
      'Subtract max probability from 1: Error = 1 - max(p_i).'
    ],
    faqs: [
      {
        question: 'What is Classification Error impurity?',
        answer: 'Classification error measures the fraction of records that would be misclassified if assigned the majority class of the leaf node.'
      },
      {
        question: 'How does Classification Error compare to Gini and Entropy?',
        answer: 'Classification Error is less sensitive to changes in node probabilities than Gini or Entropy, making Gini and Entropy preferable for growing decision trees.'
      },
      {
        question: 'What is the range of Classification Error?',
        answer: 'For binary classification, classification error ranges from 0.0 (pure node) to 0.5 (equal 50/50 distribution).'
      }
    ],
    relatedCalculators: [
      { slug: 'gini-impurity-calculator', name: 'Gini Impurity Calculator', anchorText: 'Calculate Gini Impurity' },
      { slug: 'entropy-calculator', name: 'Entropy Calculator', anchorText: 'Calculate Shannon Entropy' },
      { slug: 'accuracy-calculator', name: 'Accuracy Calculator', anchorText: 'Calculate Classification Accuracy' },
      { slug: 'information-gain-calculator', name: 'Information Gain Calculator', anchorText: 'Calculate Information Gain' }
    ],
    calculate: (classes) => {
      const valid = classes.map(c => ({ name: c.name, count: Math.max(0, Number(c.count) || 0), color: c.color }));
      const total = valid.reduce((acc, c) => acc + c.count, 0);

      if (total === 0) {
        return {
          metricName: 'Classification Error',
          value: '0.0000',
          total: 0,
          classes: valid.map(c => ({ ...c, prob: 0, pct: 0 })),
          steps: ['Total samples = 0. Please enter positive class sample counts.']
        };
      }

      let maxProb = 0;
      let majorityClass = '';

      const classDetails = valid.map(c => {
        const prob = c.count / total;
        if (prob > maxProb) {
          maxProb = prob;
          majorityClass = c.name;
        }
        return {
          name: c.name,
          count: c.count,
          color: c.color,
          prob: prob,
          pct: Math.round(prob * 1000) / 10
        };
      });

      const error = 1 - maxProb;

      const steps = [
        `Total samples = ${total}`,
        ...classDetails.map(c => `P(${c.name}) = ${c.count}/${total} = ${c.prob.toFixed(4)} (${c.pct}%)`),
        `Majority Class = ${majorityClass} with probability max(p_i) = ${maxProb.toFixed(4)}`,
        `Classification Error = 1 - ${maxProb.toFixed(4)} = ${error.toFixed(4)}`
      ];

      return {
        metricName: 'Classification Error',
        value: error.toFixed(4),
        numericValue: error,
        total,
        majorityClass,
        maxProb: maxProb.toFixed(4),
        classes: classDetails,
        steps
      };
    }
  },

  // 6. Accuracy
  {
    id: 'accuracy',
    slug: 'accuracy-calculator',
    category: 'classification',
    categoryName: 'Classification Metrics',
    categorySlug: 'classification',
    name: 'Accuracy Calculator',
    shortName: 'Accuracy',
    seoTitle: 'Accuracy Calculator',
    metaDescription: 'Calculate classification accuracy from confusion matrix values (TP, TN, FP, FN). Get percentage score, correct predictions count, and step-by-step calculation instantly.',
    badge: 'Classification Metric',
    description: 'Calculate the proportion of correct predictions (both positive and negative) among total cases.',
    pattern: 'confusion_matrix',
    defaultMatrix: { tp: 80, tn: 90, fp: 10, fn: 20 },
    formulaLatex: 'Accuracy = \\frac{TP + TN}{TP + TN + FP + FN}',
    formulaPlain: 'Accuracy = (TP + TN) / (TP + TN + FP + FN)',
    formulaExplanation: 'Where TP is True Positives, TN is True Negatives, FP is False Positives, and FN is False Negatives.',
    howToCalculate: [
      'Sum True Positives (TP) and True Negatives (TN): Correct = TP + TN.',
      'Sum all entries to get Total Predictions: Total = TP + TN + FP + FN.',
      'Divide Correct by Total: Accuracy = (TP + TN) / Total.',
      'Multiply by 100 to get accuracy percentage.'
    ],
    faqs: [
      {
        question: 'What is classification accuracy?',
        answer: 'Accuracy is the ratio of correctly predicted observations to total observations. It provides a general overview of model performance when classes are balanced.'
      },
      {
        question: 'When is accuracy misleading (Accuracy Paradox)?',
        answer: 'Accuracy is misleading on imbalanced datasets. For example, if 99% of transactions are non-fraudulent, a model predicting "no fraud" 100% of the time achieves 99% accuracy while finding zero fraud cases.'
      },
      {
        question: 'Which metrics should be used alongside accuracy?',
        answer: 'Always evaluate Precision, Recall, and F1-Score alongside Accuracy, especially when dealing with skewed or imbalanced classes.'
      }
    ],
    relatedCalculators: [
      { slug: 'precision-calculator', name: 'Precision Calculator', anchorText: 'Calculate Model Precision' },
      { slug: 'recall-calculator', name: 'Recall Calculator', anchorText: 'Calculate Model Recall' },
      { slug: 'f1-score-calculator', name: 'F1 Score Calculator', anchorText: 'Calculate F1 Score' },
      { slug: 'specificity-calculator', name: 'Specificity Calculator', anchorText: 'Calculate Specificity' }
    ],
    calculate: (matrix) => {
      const tp = Math.max(0, Number(matrix.tp) || 0);
      const tn = Math.max(0, Number(matrix.tn) || 0);
      const fp = Math.max(0, Number(matrix.fp) || 0);
      const fn = Math.max(0, Number(matrix.fn) || 0);
      const total = tp + tn + fp + fn;
      const correct = tp + tn;
      const acc = total > 0 ? correct / total : 0;
      const pct = (acc * 100).toFixed(2);

      const steps = [
        `Correct predictions = TP + TN = ${tp} + ${tn} = ${correct}`,
        `Total predictions = TP + TN + FP + FN = ${tp} + ${tn} + ${fp} + ${fn} = ${total}`,
        `Accuracy = ${correct} / ${total} = ${acc.toFixed(4)} (${pct}%)`
      ];

      return {
        metricName: 'Accuracy',
        value: `${pct}%`,
        decimalValue: acc.toFixed(4),
        numericValue: acc,
        tp, tn, fp, fn,
        total, correct,
        steps
      };
    }
  },

  // 7. Precision
  {
    id: 'precision',
    slug: 'precision-calculator',
    category: 'classification',
    categoryName: 'Classification Metrics',
    categorySlug: 'classification',
    name: 'Precision Calculator',
    shortName: 'Precision',
    seoTitle: 'Precision Calculator',
    metaDescription: 'Calculate Precision (Positive Predictive Value) from True Positives (TP) and False Positives (FP). Get instant precision percentage, formula, and step-by-step working.',
    badge: 'Classification Metric',
    description: 'Calculate Precision (Positive Predictive Value): how many predicted positives were actually positive.',
    pattern: 'confusion_matrix',
    defaultMatrix: { tp: 80, tn: 90, fp: 20, fn: 20 },
    formulaLatex: 'Precision = \\frac{TP}{TP + FP}',
    formulaPlain: 'Precision = TP / (TP + FP)',
    formulaExplanation: 'High precision means low false positive rate. Critical in spam filters, recommendation systems.',
    howToCalculate: [
      'Count True Positives (TP): actual positives correctly predicted positive.',
      'Count False Positives (FP): actual negatives incorrectly predicted positive.',
      'Divide TP by the total predicted positives (TP + FP): Precision = TP / (TP + FP).'
    ],
    faqs: [
      {
        question: 'What does precision measure?',
        answer: 'Precision answers the question: "Of all instances the model predicted as positive, what percentage was actually positive?"'
      },
      {
        question: 'When should you optimize for precision?',
        answer: 'Optimize precision when the cost of a false positive is high (e.g., spam filtering where an important email sent to spam is unacceptable, or YouTube recommendation).'
      },
      {
        question: 'What is the difference between Precision and Recall?',
        answer: 'Precision focuses on predicted positive accuracy (TP / (TP + FP)), while Recall focuses on capturing actual positives (TP / (TP + FN)).'
      }
    ],
    relatedCalculators: [
      { slug: 'recall-calculator', name: 'Recall Calculator', anchorText: 'Calculate Recall / Sensitivity' },
      { slug: 'f1-score-calculator', name: 'F1 Score Calculator', anchorText: 'Calculate F1 Score' },
      { slug: 'accuracy-calculator', name: 'Accuracy Calculator', anchorText: 'Calculate Accuracy' },
      { slug: 'specificity-calculator', name: 'Specificity Calculator', anchorText: 'Calculate Specificity' }
    ],
    calculate: (matrix) => {
      const tp = Math.max(0, Number(matrix.tp) || 0);
      const fp = Math.max(0, Number(matrix.fp) || 0);
      const tn = Math.max(0, Number(matrix.tn) || 0);
      const fn = Math.max(0, Number(matrix.fn) || 0);
      const denom = tp + fp;
      const prec = denom > 0 ? tp / denom : 0;
      const pct = (prec * 100).toFixed(2);

      const steps = [
        `True Positives (TP) = ${tp}`,
        `False Positives (FP) = ${fp}`,
        `Total Predicted Positives = TP + FP = ${tp} + ${fp} = ${denom}`,
        `Precision = ${tp} / (${tp} + ${fp}) = ${prec.toFixed(4)} (${pct}%)`
      ];

      return {
        metricName: 'Precision',
        value: `${pct}%`,
        decimalValue: prec.toFixed(4),
        numericValue: prec,
        tp, tn, fp, fn,
        steps
      };
    }
  },

  // 8. Recall
  {
    id: 'recall',
    slug: 'recall-calculator',
    category: 'classification',
    categoryName: 'Classification Metrics',
    categorySlug: 'classification',
    name: 'Recall Calculator',
    shortName: 'Recall / Sensitivity',
    seoTitle: 'Recall Calculator',
    metaDescription: 'Calculate Recall (Sensitivity / True Positive Rate) from TP and FN counts. View detection rate, mathematical formula, and step-by-step solution instantly.',
    badge: 'Classification Metric',
    description: 'Calculate Recall (Sensitivity / True Positive Rate): proportion of actual positives successfully identified.',
    pattern: 'confusion_matrix',
    defaultMatrix: { tp: 80, tn: 90, fp: 10, fn: 20 },
    formulaLatex: 'Recall = \\frac{TP}{TP + FN}',
    formulaPlain: 'Recall = TP / (TP + FN)',
    formulaExplanation: 'High recall means low false negative rate. Critical in medical diagnosis and fraud detection.',
    howToCalculate: [
      'Count True Positives (TP): correct positive identifications.',
      'Count False Negatives (FN): positive instances incorrectly missed by the model.',
      'Divide TP by total actual positives: Recall = TP / (TP + FN).'
    ],
    faqs: [
      {
        question: 'What is Recall (Sensitivity)?',
        answer: 'Recall answers: "Out of all actual positive cases in reality, what fraction did the model find?"'
      },
      {
        question: 'When is Recall most critical?',
        answer: 'Recall is vital when missing a positive has catastrophic consequences, such as detecting cancer, Covid-19, fraud, or factory equipment failure.'
      },
      {
        question: 'Can you have 100% recall easily?',
        answer: 'Yes, predicting "positive" for every single sample yields 100% recall, but results in terrible precision and many false alarms.'
      }
    ],
    relatedCalculators: [
      { slug: 'precision-calculator', name: 'Precision Calculator', anchorText: 'Calculate Precision' },
      { slug: 'f1-score-calculator', name: 'F1 Score Calculator', anchorText: 'Calculate F1 Score' },
      { slug: 'specificity-calculator', name: 'Specificity Calculator', anchorText: 'Calculate Specificity' },
      { slug: 'accuracy-calculator', name: 'Accuracy Calculator', anchorText: 'Calculate Accuracy' }
    ],
    calculate: (matrix) => {
      const tp = Math.max(0, Number(matrix.tp) || 0);
      const fn = Math.max(0, Number(matrix.fn) || 0);
      const tn = Math.max(0, Number(matrix.tn) || 0);
      const fp = Math.max(0, Number(matrix.fp) || 0);
      const denom = tp + fn;
      const rec = denom > 0 ? tp / denom : 0;
      const pct = (rec * 100).toFixed(2);

      const steps = [
        `True Positives (TP) = ${tp}`,
        `False Negatives (FN) = ${fn}`,
        `Total Actual Positives = TP + FN = ${tp} + ${fn} = ${denom}`,
        `Recall = ${tp} / (${tp} + ${fn}) = ${rec.toFixed(4)} (${pct}%)`
      ];

      return {
        metricName: 'Recall',
        value: `${pct}%`,
        decimalValue: rec.toFixed(4),
        numericValue: rec,
        tp, tn, fp, fn,
        steps
      };
    }
  },

  // 9. F1 Score
  {
    id: 'f1_score',
    slug: 'f1-score-calculator',
    category: 'classification',
    categoryName: 'Classification Metrics',
    categorySlug: 'classification',
    name: 'F1 Score Calculator',
    shortName: 'F1 Score',
    seoTitle: 'F1 Score Calculator',
    metaDescription: 'Calculate F1 Score from Precision and Recall or confusion matrix counts (TP, TN, FP, FN). Get harmonic mean score, formula, and step-by-step calculation instantly.',
    badge: 'Classification Metric',
    description: 'Calculate F1 Score, the harmonic mean of Precision and Recall for balanced evaluation.',
    pattern: 'f1_score',
    defaultData: {
      mode: 'direct',
      precision: 0.80,
      recall: 0.75,
      matrix: { tp: 80, tn: 90, fp: 20, fn: 25 }
    },
    formulaLatex: 'F_1 = 2 \\cdot \\frac{Precision \\times Recall}{Precision + Recall}',
    formulaPlain: 'F1 = 2 * (Precision * Recall) / (Precision + Recall)',
    formulaExplanation: 'Harmonic mean gives a high score only when both Precision and Recall are reasonably high.',
    howToCalculate: [
      'Calculate or input Precision = TP / (TP + FP).',
      'Calculate or input Recall = TP / (TP + FN).',
      'Compute the harmonic mean: F1 = 2 × (Precision × Recall) / (Precision + Recall).'
    ],
    faqs: [
      {
        question: 'Why does F1 score use harmonic mean instead of arithmetic mean?',
        answer: 'Harmonic mean penalizes extreme imbalances between precision and recall. If precision is 1.0 but recall is 0.0, arithmetic average gives 0.5, while harmonic mean correctly gives 0.0.'
      },
      {
        question: 'What is a good F1 score?',
        answer: 'F1 score ranges between 0.0 and 1.0 (or 0% to 100%). Scores above 0.80 generally indicate a strong, well-balanced classifier.'
      },
      {
        question: 'When should I choose F1 score over accuracy?',
        answer: 'Use F1 score when dataset classes are imbalanced and you need a balance between false positives and false negatives.'
      }
    ],
    relatedCalculators: [
      { slug: 'precision-calculator', name: 'Precision Calculator', anchorText: 'Calculate Precision' },
      { slug: 'recall-calculator', name: 'Recall Calculator', anchorText: 'Calculate Recall' },
      { slug: 'accuracy-calculator', name: 'Accuracy Calculator', anchorText: 'Calculate Accuracy' },
      { slug: 'specificity-calculator', name: 'Specificity Calculator', anchorText: 'Calculate Specificity' }
    ],
    calculate: (data) => {
      let prec = 0;
      let rec = 0;
      let steps = [];

      if (data.mode === 'matrix') {
        const tp = Math.max(0, Number(data.matrix?.tp) || 0);
        const fp = Math.max(0, Number(data.matrix?.fp) || 0);
        const fn = Math.max(0, Number(data.matrix?.fn) || 0);
        const tn = Math.max(0, Number(data.matrix?.tn) || 0);

        prec = (tp + fp) > 0 ? tp / (tp + fp) : 0;
        rec = (tp + fn) > 0 ? tp / (tp + fn) : 0;

        steps.push(`From Confusion Matrix:`);
        steps.push(`Precision = ${tp} / (${tp} + ${fp}) = ${prec.toFixed(4)} (${(prec * 100).toFixed(1)}%)`);
        steps.push(`Recall = ${tp} / (${tp} + ${fn}) = ${rec.toFixed(4)} (${(rec * 100).toFixed(1)}%)`);
      } else {
        prec = Number(data.precision) || 0;
        rec = Number(data.recall) || 0;
        steps.push(`Given Precision = ${prec.toFixed(4)}`);
        steps.push(`Given Recall = ${rec.toFixed(4)}`);
      }

      const denom = prec + rec;
      const f1 = denom > 0 ? (2 * prec * rec) / denom : 0;
      const pct = (f1 * 100).toFixed(2);

      steps.push(`F1 = 2 × (${prec.toFixed(4)} × ${rec.toFixed(4)}) / (${prec.toFixed(4)} + ${rec.toFixed(4)})`);
      steps.push(`F1 Score = ${f1.toFixed(4)} (${pct}%)`);

      return {
        metricName: 'F1 Score',
        value: f1.toFixed(4),
        percentValue: `${pct}%`,
        numericValue: f1,
        precision: prec.toFixed(4),
        recall: rec.toFixed(4),
        steps
      };
    }
  },

  // 10. Specificity
  {
    id: 'specificity',
    slug: 'specificity-calculator',
    category: 'classification',
    categoryName: 'Classification Metrics',
    categorySlug: 'classification',
    name: 'Specificity Calculator',
    shortName: 'Specificity',
    seoTitle: 'Specificity Calculator',
    metaDescription: 'Calculate Specificity (True Negative Rate) from True Negatives (TN) and False Positives (FP). View false alarm rejection rate, formula, and step-by-step calculation.',
    badge: 'Classification Metric',
    description: 'Calculate Specificity (True Negative Rate): proportion of actual negatives correctly identified.',
    pattern: 'confusion_matrix',
    defaultMatrix: { tp: 80, tn: 90, fp: 10, fn: 20 },
    formulaLatex: 'Specificity = \\frac{TN}{TN + FP}',
    formulaPlain: 'Specificity = TN / (TN + FP)',
    formulaExplanation: 'Measures how well the model avoids false alarms (false positives) on true negative cases.',
    howToCalculate: [
      'Count True Negatives (TN): actual negatives correctly predicted as negative.',
      'Count False Positives (FP): actual negatives incorrectly predicted as positive.',
      'Divide TN by total actual negatives: Specificity = TN / (TN + FP).'
    ],
    faqs: [
      {
        question: 'What is Specificity (True Negative Rate)?',
        answer: 'Specificity measures the proportion of actual negative cases correctly identified as negative. It is the complement of the False Positive Rate (FPR = 1 - Specificity).'
      },
      {
        question: 'How is Specificity used in ROC Curves?',
        answer: 'In ROC curves, the x-axis plots (1 - Specificity) representing False Positive Rate, against Sensitivity (Recall) on the y-axis.'
      },
      {
        question: 'Why is specificity important in medical tests?',
        answer: 'High specificity ensures healthy individuals are not given stressful, expensive false-positive diagnoses.'
      }
    ],
    relatedCalculators: [
      { slug: 'recall-calculator', name: 'Recall Calculator', anchorText: 'Calculate Sensitivity / Recall' },
      { slug: 'precision-calculator', name: 'Precision Calculator', anchorText: 'Calculate Precision' },
      { slug: 'accuracy-calculator', name: 'Accuracy Calculator', anchorText: 'Calculate Accuracy' },
      { slug: 'f1-score-calculator', name: 'F1 Score Calculator', anchorText: 'Calculate F1 Score' }
    ],
    calculate: (matrix) => {
      const tn = Math.max(0, Number(matrix.tn) || 0);
      const fp = Math.max(0, Number(matrix.fp) || 0);
      const tp = Math.max(0, Number(matrix.tp) || 0);
      const fn = Math.max(0, Number(matrix.fn) || 0);
      const denom = tn + fp;
      const spec = denom > 0 ? tn / denom : 0;
      const pct = (spec * 100).toFixed(2);

      const steps = [
        `True Negatives (TN) = ${tn}`,
        `False Positives (FP) = ${fp}`,
        `Total Actual Negatives = TN + FP = ${tn} + ${fp} = ${denom}`,
        `Specificity = ${tn} / (${tn} + ${fp}) = ${spec.toFixed(4)} (${pct}%)`
      ];

      return {
        metricName: 'Specificity',
        value: `${pct}%`,
        decimalValue: spec.toFixed(4),
        numericValue: spec,
        tp, tn, fp, fn,
        steps
      };
    }
  },

  // 11. MAE
  {
    id: 'mae',
    slug: 'mae-calculator',
    category: 'regression',
    categoryName: 'Regression Metrics',
    categorySlug: 'regression',
    name: 'MAE Calculator (Mean Absolute Error)',
    shortName: 'MAE',
    seoTitle: 'MAE Calculator - Mean Absolute Error',
    metaDescription: 'Calculate Mean Absolute Error (MAE) from actual and predicted values table. View individual absolute residuals, sum, formula, and step-by-step error calculation.',
    badge: 'Regression Metric',
    description: 'Calculate Mean Absolute Error to measure average magnitude of errors without direction.',
    pattern: 'actual_predicted',
    defaultRows: [
      { actual: 10, predicted: 12 },
      { actual: 20, predicted: 18 },
      { actual: 15, predicted: 14 }
    ],
    formulaLatex: 'MAE = \\frac{1}{n}\\sum_{i=1}^{n} |y_i - \\hat{y}_i|',
    formulaPlain: 'MAE = (1/n) * Σ |y_i - ŷ_i|',
    formulaExplanation: 'Where y_i is the actual value, ŷ_i is the predicted value, and n is the total number of observations.',
    howToCalculate: [
      'Calculate the absolute difference for each pair: |y_i - ŷ_i|.',
      'Sum all absolute errors: Σ |y_i - ŷ_i|.',
      'Divide the sum by the total number of samples n: MAE = Sum / n.'
    ],
    faqs: [
      {
        question: 'What is Mean Absolute Error (MAE)?',
        answer: 'MAE is the average of all absolute differences between target actual values and model predictions. It measures error magnitude in the same unit as the original data.'
      },
      {
        question: 'When is MAE preferred over MSE or RMSE?',
        answer: 'MAE is robust to outliers because it does not square error terms. If your dataset contains noisy extreme outliers, MAE provides a more representative average error.'
      },
      {
        question: 'What is a good MAE value?',
        answer: 'MAE depends on the scale of your target variable. An MAE of 2 is great if values range from 0 to 1000, but poor if values range from 0 to 5.'
      }
    ],
    relatedCalculators: [
      { slug: 'mse-calculator', name: 'MSE Calculator', anchorText: 'Calculate Mean Squared Error (MSE)' },
      { slug: 'rmse-calculator', name: 'RMSE Calculator', anchorText: 'Calculate Root Mean Squared Error (RMSE)' },
      { slug: 'r2-score-calculator', name: 'R² Score Calculator', anchorText: 'Calculate R² Score' },
      { slug: 'mape-calculator', name: 'MAPE Calculator', anchorText: 'Calculate MAPE Percentage Error' }
    ],
    calculate: (rows) => {
      const valid = rows.filter(r => !isNaN(Number(r.actual)) && !isNaN(Number(r.predicted)))
        .map(r => ({ actual: Number(r.actual), predicted: Number(r.predicted) }));
      const n = valid.length;

      if (n === 0) {
        return {
          metricName: 'MAE',
          value: '0.000',
          n: 0,
          steps: ['Please enter at least 1 pair of actual and predicted values.']
        };
      }

      const diffs = valid.map((r, i) => {
        const absDiff = Math.abs(r.actual - r.predicted);
        return { idx: i + 1, actual: r.actual, predicted: r.predicted, diff: absDiff };
      });

      const sumAbsDiff = diffs.reduce((acc, d) => acc + d.diff, 0);
      const mae = sumAbsDiff / n;

      const steps = [
        `Number of samples (n) = ${n}`,
        `Absolute errors:`,
        ...diffs.map(d => `|${d.actual} - ${d.predicted}| = ${d.diff.toFixed(2)}`),
        `Sum of absolute errors = ${sumAbsDiff.toFixed(2)}`,
        `MAE = ${sumAbsDiff.toFixed(2)} / ${n} = ${mae.toFixed(4)}`
      ];

      return {
        metricName: 'Mean Absolute Error (MAE)',
        value: mae.toFixed(4),
        numericValue: mae,
        n,
        diffs,
        steps
      };
    }
  },

  // 12. MSE
  {
    id: 'mse',
    slug: 'mse-calculator',
    category: 'regression',
    categoryName: 'Regression Metrics',
    categorySlug: 'regression',
    name: 'MSE Calculator (Mean Squared Error)',
    shortName: 'MSE',
    seoTitle: 'MSE Calculator - Mean Squared Error',
    metaDescription: 'Calculate Mean Squared Error (MSE) from actual and predicted values. View squared residuals, sum of squares, formula, and step-by-step calculations instantly.',
    badge: 'Regression Metric',
    description: 'Calculate Mean Squared Error, heavily penalizing large prediction errors.',
    pattern: 'actual_predicted',
    defaultRows: [
      { actual: 10, predicted: 12 },
      { actual: 20, predicted: 18 },
      { actual: 15, predicted: 14 }
    ],
    formulaLatex: 'MSE = \\frac{1}{n}\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2',
    formulaPlain: 'MSE = (1/n) * Σ (y_i - ŷ_i)²',
    formulaExplanation: 'Where y_i is actual, ŷ_i is predicted. Squaring ensures positive penalty and amplifies outliers.',
    howToCalculate: [
      'Calculate the difference (residual) for each pair: (y_i - ŷ_i).',
      'Square each residual: (y_i - ŷ_i)².',
      'Sum all squared residuals: Σ (y_i - ŷ_i)².',
      'Divide the sum of squared errors by total sample count n: MSE = Sum / n.'
    ],
    faqs: [
      {
        question: 'What is Mean Squared Error (MSE)?',
        answer: 'MSE measures the average of the squares of errors. Because errors are squared before averaging, MSE gives higher weight to large mistakes.'
      },
      {
        question: 'Why is MSE widely used as a loss function in machine learning?',
        answer: 'MSE is smooth, continuously differentiable, and has convex mathematical properties, making it optimal for gradient descent optimization algorithms.'
      },
      {
        question: 'What is the unit of MSE?',
        answer: 'MSE is in squared units of the target variable (e.g., dollars squared). To return to original units, calculate RMSE.'
      }
    ],
    relatedCalculators: [
      { slug: 'rmse-calculator', name: 'RMSE Calculator', anchorText: 'Calculate RMSE' },
      { slug: 'mae-calculator', name: 'MAE Calculator', anchorText: 'Calculate MAE' },
      { slug: 'r2-score-calculator', name: 'R² Score Calculator', anchorText: 'Calculate R² Score' },
      { slug: 'mape-calculator', name: 'MAPE Calculator', anchorText: 'Calculate MAPE' }
    ],
    calculate: (rows) => {
      const valid = rows.filter(r => !isNaN(Number(r.actual)) && !isNaN(Number(r.predicted)))
        .map(r => ({ actual: Number(r.actual), predicted: Number(r.predicted) }));
      const n = valid.length;

      if (n === 0) {
        return {
          metricName: 'MSE',
          value: '0.000',
          n: 0,
          steps: ['Please enter at least 1 valid row.']
        };
      }

      const diffs = valid.map((r, i) => {
        const diff = r.actual - r.predicted;
        const sq = diff * diff;
        return { idx: i + 1, actual: r.actual, predicted: r.predicted, diff, sq };
      });

      const sumSq = diffs.reduce((acc, d) => acc + d.sq, 0);
      const mse = sumSq / n;

      const steps = [
        `Number of samples (n) = ${n}`,
        `Squared errors:`,
        ...diffs.map(d => `(${d.actual} - ${d.predicted})² = (${d.diff.toFixed(2)})² = ${d.sq.toFixed(2)}`),
        `Sum of squared errors = ${sumSq.toFixed(2)}`,
        `MSE = ${sumSq.toFixed(2)} / ${n} = ${mse.toFixed(4)}`
      ];

      return {
        metricName: 'Mean Squared Error (MSE)',
        value: mse.toFixed(4),
        numericValue: mse,
        n,
        diffs,
        steps
      };
    }
  },

  // 13. RMSE
  {
    id: 'rmse',
    slug: 'rmse-calculator',
    category: 'regression',
    categoryName: 'Regression Metrics',
    categorySlug: 'regression',
    name: 'RMSE Calculator (Root Mean Squared Error)',
    shortName: 'RMSE',
    seoTitle: 'RMSE Calculator - Root Mean Squared Error',
    metaDescription: 'Calculate Root Mean Squared Error (RMSE) from actual and predicted data points. View MSE, square root step, formula, and step-by-step regression residual calculation.',
    badge: 'Regression Metric',
    description: 'Calculate Root Mean Squared Error to measure standard deviation of residuals in original units.',
    pattern: 'actual_predicted',
    defaultRows: [
      { actual: 10, predicted: 12 },
      { actual: 20, predicted: 18 },
      { actual: 15, predicted: 14 }
    ],
    formulaLatex: 'RMSE = \\sqrt{\\frac{1}{n}\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2}',
    formulaPlain: 'RMSE = √[ (1/n) * Σ (y_i - ŷ_i)² ] = √MSE',
    formulaExplanation: 'Square root of MSE brings the metric back into the same scale as the target variable y.',
    howToCalculate: [
      'Calculate squared differences for all pairs: (y_i - ŷ_i)².',
      'Sum the squared errors and divide by sample count n to find MSE.',
      'Take the square root of MSE: RMSE = √(MSE).'
    ],
    faqs: [
      {
        question: 'What is RMSE?',
        answer: 'Root Mean Squared Error (RMSE) represents the sample standard deviation of the differences between predicted values and observed values.'
      },
      {
        question: 'How is RMSE interpreted?',
        answer: 'RMSE is expressed in the exact same units as the target variable (e.g., kilograms, dollars), making it easy to explain to stakeholders while still penalizing large errors.'
      },
      {
        question: 'Why is RMSE always greater than or equal to MAE?',
        answer: 'Because RMSE squares errors before taking the root, larger errors have a disproportionate impact. RMSE equals MAE only when all error magnitudes are identical.'
      }
    ],
    relatedCalculators: [
      { slug: 'mse-calculator', name: 'MSE Calculator', anchorText: 'Calculate MSE' },
      { slug: 'mae-calculator', name: 'MAE Calculator', anchorText: 'Calculate MAE' },
      { slug: 'r2-score-calculator', name: 'R² Score Calculator', anchorText: 'Calculate R² Score' },
      { slug: 'mape-calculator', name: 'MAPE Calculator', anchorText: 'Calculate MAPE' }
    ],
    calculate: (rows) => {
      const valid = rows.filter(r => !isNaN(Number(r.actual)) && !isNaN(Number(r.predicted)))
        .map(r => ({ actual: Number(r.actual), predicted: Number(r.predicted) }));
      const n = valid.length;

      if (n === 0) {
        return {
          metricName: 'RMSE',
          value: '0.000',
          n: 0,
          steps: ['Please enter at least 1 valid row.']
        };
      }

      const diffs = valid.map((r, i) => {
        const diff = r.actual - r.predicted;
        const sq = diff * diff;
        return { idx: i + 1, actual: r.actual, predicted: r.predicted, diff, sq };
      });

      const sumSq = diffs.reduce((acc, d) => acc + d.sq, 0);
      const mse = sumSq / n;
      const rmse = Math.sqrt(mse);

      const steps = [
        `Number of samples (n) = ${n}`,
        `Sum of squared errors = ${sumSq.toFixed(2)}`,
        `Mean Squared Error (MSE) = ${sumSq.toFixed(2)} / ${n} = ${mse.toFixed(4)}`,
        `RMSE = √(${mse.toFixed(4)}) = ${rmse.toFixed(4)}`
      ];

      return {
        metricName: 'Root Mean Squared Error (RMSE)',
        value: rmse.toFixed(4),
        numericValue: rmse,
        mse: mse.toFixed(4),
        n,
        diffs,
        steps
      };
    }
  },

  // 14. R² Score
  {
    id: 'r_squared',
    slug: 'r2-score-calculator',
    category: 'regression',
    categoryName: 'Regression Metrics',
    categorySlug: 'regression',
    name: 'R² Score Calculator (Coefficient of Determination)',
    shortName: 'R² Score',
    seoTitle: 'R² Calculator - Coefficient of Determination',
    metaDescription: 'Calculate R² (R-squared) score from actual vs predicted data or SS_res and SS_tot values. Get variance explained, formula, and step-by-step working instantly.',
    badge: 'Regression Metric',
    description: 'Calculate R² (R-squared) to evaluate how much variance in the dependent variable is explained.',
    pattern: 'r_squared',
    defaultData: {
      mode: 'table',
      ssRes: 9.0,
      ssTot: 50.0,
      rows: [
        { actual: 10, predicted: 12 },
        { actual: 20, predicted: 18 },
        { actual: 15, predicted: 14 }
      ]
    },
    formulaLatex: 'R^2 = 1 - \\frac{SS_{res}}{SS_{tot}} = 1 - \\frac{\\sum (y_i - \\hat{y}_i)^2}{\\sum (y_i - \\bar{y})^2}',
    formulaPlain: 'R² = 1 - (SS_res / SS_tot)',
    formulaExplanation: 'Where SS_res is the residual sum of squares and SS_tot is total sum of squares around the actual mean ȳ.',
    howToCalculate: [
      'Calculate the mean of actual values: ȳ = (1/n) × Σ y_i.',
      'Calculate total sum of squares: SS_tot = Σ (y_i - ȳ)².',
      'Calculate residual sum of squares: SS_res = Σ (y_i - ŷ_i)².',
      'Compute coefficient of determination: R² = 1 - (SS_res / SS_tot).'
    ],
    faqs: [
      {
        question: 'What does R² (R-squared) mean?',
        answer: 'R² indicates the proportion of variance in the dependent variable that is predictable from the independent variables. An R² of 0.85 means 85% of variance is explained by the model.'
      },
      {
        question: 'Can R² be negative?',
        answer: 'Yes, R² can be negative if the regression model performs worse than a simple horizontal line predicting the mean of the actual data.'
      },
      {
        question: 'What is the maximum R² value?',
        answer: 'The maximum possible R² is 1.0 (or 100%), which represents perfect predictions without any residual error.'
      }
    ],
    relatedCalculators: [
      { slug: 'rmse-calculator', name: 'RMSE Calculator', anchorText: 'Calculate RMSE' },
      { slug: 'mse-calculator', name: 'MSE Calculator', anchorText: 'Calculate MSE' },
      { slug: 'mae-calculator', name: 'MAE Calculator', anchorText: 'Calculate MAE' },
      { slug: 'mape-calculator', name: 'MAPE Calculator', anchorText: 'Calculate MAPE' }
    ],
    calculate: (data) => {
      let ssRes = 0;
      let ssTot = 0;
      let steps = [];

      if (data.mode === 'direct') {
        ssRes = Number(data.ssRes) || 0;
        ssTot = Number(data.ssTot) || 0;
        steps.push(`Given SS_residual (SS_res) = ${ssRes}`);
        steps.push(`Given SS_total (SS_tot) = ${ssTot}`);
      } else {
        const valid = (data.rows || []).filter(r => !isNaN(Number(r.actual)) && !isNaN(Number(r.predicted)))
          .map(r => ({ actual: Number(r.actual), predicted: Number(r.predicted) }));
        const n = valid.length;

        if (n < 2) {
          return {
            metricName: 'R² Score',
            value: '0.0000',
            steps: ['Need at least 2 data points to compute variance and R² score.']
          };
        }

        const meanActual = valid.reduce((acc, r) => acc + r.actual, 0) / n;
        ssRes = valid.reduce((acc, r) => acc + Math.pow(r.actual - r.predicted, 2), 0);
        ssTot = valid.reduce((acc, r) => acc + Math.pow(r.actual - meanActual, 2), 0);

        steps.push(`Mean of actual values (ȳ) = ${meanActual.toFixed(2)}`);
        steps.push(`SS_residual = Σ (y_i - ŷ_i)² = ${ssRes.toFixed(4)}`);
        steps.push(`SS_total = Σ (y_i - ȳ)² = ${ssTot.toFixed(4)}`);
      }

      const r2 = ssTot !== 0 ? 1 - (ssRes / ssTot) : 0;
      steps.push(`R² = 1 - (${ssRes.toFixed(4)} / ${ssTot.toFixed(4)}) = ${r2.toFixed(4)}`);

      return {
        metricName: 'R² (R-Squared)',
        value: r2.toFixed(4),
        numericValue: r2,
        ssRes: ssRes.toFixed(4),
        ssTot: ssTot.toFixed(4),
        steps
      };
    }
  },

  // 15. MAPE
  {
    id: 'mape',
    slug: 'mape-calculator',
    category: 'regression',
    categoryName: 'Regression Metrics',
    categorySlug: 'regression',
    name: 'MAPE Calculator (Mean Absolute Percentage Error)',
    shortName: 'MAPE',
    seoTitle: 'MAPE Calculator - Mean Absolute Percentage Error',
    metaDescription: 'Calculate Mean Absolute Percentage Error (MAPE) from actual and predicted values. View percentage errors, zero-division checks, formula, and step-by-step working.',
    badge: 'Regression Metric',
    description: 'Calculate MAPE to express forecast accuracy as a percentage of actual values.',
    pattern: 'actual_predicted',
    defaultRows: [
      { actual: 100, predicted: 110 },
      { actual: 200, predicted: 190 },
      { actual: 150, predicted: 160 }
    ],
    formulaLatex: 'MAPE = \\frac{100\\%}{n}\\sum_{i=1}^{n} \\left|\\frac{y_i - \\hat{y}_i}{y_i}\\right|',
    formulaPlain: 'MAPE = (100 / n) * Σ | (y_i - ŷ_i) / y_i |',
    formulaExplanation: 'Caution: MAPE encounters division-by-zero or extreme skew if any actual value y_i is 0.',
    howToCalculate: [
      'Calculate percentage error for each sample: |(y_i - ŷ_i) / y_i| × 100%.',
      'Sum all individual percentage errors: Σ |(y_i - ŷ_i) / y_i|.',
      'Divide the sum by sample count n to obtain average percentage error: MAPE = Sum / n.'
    ],
    faqs: [
      {
        question: 'What is MAPE?',
        answer: 'Mean Absolute Percentage Error (MAPE) expresses accuracy as an intuitive percentage of error relative to the actual values.'
      },
      {
        question: 'What is the major drawback of MAPE?',
        answer: 'MAPE cannot be computed if any actual value is 0 (division by zero). Also, it heavily penalizes positive errors more than negative errors.'
      },
      {
        question: 'What is a good MAPE score?',
        answer: 'In business forecasting, MAPE < 10% is considered highly accurate, 10% - 20% is good, 20% - 50% is acceptable, and > 50% is inaccurate.'
      }
    ],
    relatedCalculators: [
      { slug: 'mae-calculator', name: 'MAE Calculator', anchorText: 'Calculate MAE' },
      { slug: 'rmse-calculator', name: 'RMSE Calculator', anchorText: 'Calculate RMSE' },
      { slug: 'mse-calculator', name: 'MSE Calculator', anchorText: 'Calculate MSE' },
      { slug: 'r2-score-calculator', name: 'R² Score Calculator', anchorText: 'Calculate R² Score' }
    ],
    calculate: (rows) => {
      const valid = rows.filter(r => !isNaN(Number(r.actual)) && !isNaN(Number(r.predicted)))
        .map(r => ({ actual: Number(r.actual), predicted: Number(r.predicted) }));
      const n = valid.length;

      if (n === 0) {
        return {
          metricName: 'MAPE',
          value: '0.00%',
          n: 0,
          steps: ['Please enter at least 1 row with non-zero actual values.']
        };
      }

      let hasZeroActual = false;
      const diffs = valid.map((r, i) => {
        if (r.actual === 0) {
          hasZeroActual = true;
          return { idx: i + 1, actual: r.actual, predicted: r.predicted, pctError: null };
        }
        const pctError = Math.abs((r.actual - r.predicted) / r.actual) * 100;
        return { idx: i + 1, actual: r.actual, predicted: r.predicted, pctError };
      });

      if (hasZeroActual) {
        return {
          metricName: 'MAPE',
          value: 'Undefined (Division by 0)',
          warning: '⚠️ Cannot calculate MAPE because one or more actual values (y_i) are 0.',
          n,
          diffs,
          steps: ['⚠️ Division by zero error: Actual value cannot be 0 in MAPE calculation.']
        };
      }

      const sumPct = diffs.reduce((acc, d) => acc + d.pctError, 0);
      const mape = sumPct / n;

      const steps = [
        `Number of samples (n) = ${n}`,
        `Individual Percentage Errors:`,
        ...diffs.map(d => `|(${d.actual} - ${d.predicted}) / ${d.actual}| × 100% = ${d.pctError.toFixed(2)}%`),
        `Sum of percentage errors = ${sumPct.toFixed(2)}%`,
        `MAPE = ${sumPct.toFixed(2)}% / ${n} = ${mape.toFixed(2)}%`
      ];

      return {
        metricName: 'Mean Absolute Percentage Error (MAPE)',
        value: `${mape.toFixed(2)}%`,
        numericValue: mape,
        n,
        diffs,
        steps
      };
    }
  }
];

export const CLASS_COLORS = [
  '#182830', // Deep slate
  '#f87171', // Coral
  '#a855f7', // Purple
  '#38bdf8', // Sky blue
  '#fbbf24', // Amber
  '#34d399', // Emerald
  '#ec4899', // Pink
  '#818cf8', // Indigo
];

// Helper to look up calculator by slug or id
export const getCalculatorBySlugOrId = (identifier) => {
  if (!identifier) return CALCULATORS[0];
  const normalized = identifier.toLowerCase().trim();
  return CALCULATORS.find(c => c.slug === normalized || c.id === normalized) || CALCULATORS[0];
};
