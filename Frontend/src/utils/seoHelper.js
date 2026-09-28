// SEO Metadata Manager: Title, Meta Description, Canonical URLs, Open Graph, and JSON-LD Structured Data

export const updatePageSEO = ({
  title,
  description,
  canonicalUrl,
  breadcrumbs = [],
  faqs = [],
  calculatorName = ''
}) => {
  if (typeof document === 'undefined') return;

  // 1. Page Title
  document.title = title;

  // Helper to set or create meta tags
  const setMetaTag = (attrName, attrValue, content) => {
    let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content || '');
  };

  // 2. Standard Meta Description & Robots
  setMetaTag('name', 'description', description);
  setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // 3. Open Graph Metadata
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:site_name', 'Calcify');

  // 4. Twitter / X Metadata
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', title);
  setMetaTag('name', 'twitter:description', description);

  // 5. Self-referencing Canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // 6. JSON-LD Structured Data
  // Remove existing JSON-LD scripts injected by Calcify
  const existingScripts = document.querySelectorAll('script[data-seo="calcify-jsonld"]');
  existingScripts.forEach(el => el.remove());

  // Construct schemas
  const schemas = [];

  // Schema: WebSite & WebPage
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: canonicalUrl,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Calcify — ML & Statistics Calculators',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://calcify.dev'
    }
  });

  // Schema: BreadcrumbList
  if (breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((b, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: b.name,
        item: b.url
      }))
    });
  }

  // Schema: FAQPage (only when page contains actual visible FAQs)
  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  // Inject Script
  schemas.forEach(schemaObj => {
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo', 'calcify-jsonld');
    script.textContent = JSON.stringify(schemaObj);
    document.head.appendChild(script);
  });
};
