// Custom Font Override - Content Script
// Injects CSS to override fonts on web pages

(function() {
  'use strict';

  // Default font settings
  const DEFAULT_SETTINGS = {
    enabled: true,
    normalFont: 'Noto Sans JP',
    codeFont: 'Cascade Mono',
    mathFont: 'Cambria Math'
  };

  // CSS selectors for different font categories
  const SELECTORS = {
    // Normal text elements
    normal: [
      'body',
      'p',
      'span',
      'div',
      'a',
      'li',
      'td',
      'th',
      'label',
      'button',
      'input',
      'textarea',
      'select',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'article',
      'section',
      'header',
      'footer',
      'nav',
      'aside',
      'main'
    ].join(', '),

    // Code elements
    code: [
      'code',
      'pre',
      'kbd',
      'samp',
      'var',
      'tt',
      '.hljs',
      '.highlight',
      '.CodeMirror',
      '.monaco-editor',
      '.ace_editor',
      '[class*="code"]',
      '[class*="Code"]',
      '[class*="monospace"]',
      '[class*="Monospace"]'
    ].join(', '),

    // Math elements (MathJax, KaTeX, etc.)
    math: [
      '.MathJax',
      '.MathJax_Display',
      '.MathJax_Preview',
      '.mjx-chtml',
      '.mjx-math',
      '.katex',
      '.katex-html',
      '.katex-display',
      'math',
      'mrow',
      'mi',
      'mn',
      'mo',
      'ms',
      'mtext',
      '[class*="math"]',
      '[class*="Math"]',
      '[class*="equation"]',
      '[class*="Equation"]'
    ].join(', ')
  };

  // Create and inject style element
  function injectStyles(settings) {
    // Remove existing style if present
    const existingStyle = document.getElementById('custom-font-override-style');
    if (existingStyle) {
      existingStyle.remove();
    }

    if (!settings.enabled) {
      return;
    }

    const css = `
      /* Custom Font Override - Normal Text */
      ${SELECTORS.normal} {
        font-family: "${settings.normalFont}", sans-serif !important;
      }

      /* Custom Font Override - Code Blocks */
      ${SELECTORS.code} {
        font-family: "${settings.codeFont}", monospace !important;
      }

      /* Custom Font Override - Math Formulas */
      ${SELECTORS.math} {
        font-family: "${settings.mathFont}", serif !important;
      }
    `;

    const style = document.createElement('style');
    style.id = 'custom-font-override-style';
    style.textContent = css;

    // Insert at the end of head to ensure high priority
    if (document.head) {
      document.head.appendChild(style);
    } else {
      // If head doesn't exist yet, wait for it
      document.addEventListener('DOMContentLoaded', () => {
        document.head.appendChild(style);
      });
    }
  }

  // Load settings and apply styles
  function loadAndApply() {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
      injectStyles(settings);
    });
  }

  // Listen for settings changes
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
      chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
        injectStyles(settings);
      });
    }
  });

  // Initial load
  loadAndApply();

  // Re-apply after DOM is fully loaded (for dynamic content)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAndApply);
  }

  // Also observe for dynamically added content (e.g., SPA navigation)
  const observer = new MutationObserver((mutations) => {
    // Check if our style element was removed
    if (!document.getElementById('custom-font-override-style')) {
      loadAndApply();
    }
  });

  // Start observing when DOM is ready
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
})();
