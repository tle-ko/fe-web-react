import React, { useEffect, useRef } from 'react';

const MathJax = ({ math }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;

    script.onload = () => {
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']]
        },
        startup: {
          ready: () => {
            console.log('MathJax is loaded');
            window.MathJax.startup.defaultReady();
            window.MathJax.typeset([nodeRef.current]);
          }
        }
      };
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window.MathJax && window.MathJax.typeset) {
      window.MathJax.typeset([nodeRef.current]);
    }
  }, [math]);

  return <span ref={nodeRef}>{math}</span>;
};

export default MathJax;