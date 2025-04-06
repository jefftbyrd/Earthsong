'use client';

import React, { useEffect } from 'react';

const MobileFullscreen = ({ children }) => {
  useEffect(() => {
    // Function to hide the URL bar
    const hideUrlBar = () => {
      if (typeof window !== 'undefined') {
        // Wait for page to load
        setTimeout(() => {
          // iOS devices need scrollTo(0,1)
          if (window.scrollY === 0) {
            window.scrollTo(0, 1);
          }
        }, 300);
      }
    };

    // Add meta tags for iOS
    const addMetaTags = () => {
      if (typeof document !== 'undefined') {
        // Check if these meta tags already exist
        if (
          !document.querySelector('meta[name="apple-mobile-web-app-capable"]')
        ) {
          const metaCapable = document.createElement('meta');
          metaCapable.name = 'apple-mobile-web-app-capable';
          metaCapable.content = 'yes';
          document.head.appendChild(metaCapable);
        }

        if (
          !document.querySelector(
            'meta[name="apple-mobile-web-app-status-bar-style"]',
          )
        ) {
          const metaStatusBar = document.createElement('meta');
          metaStatusBar.name = 'apple-mobile-web-app-status-bar-style';
          metaStatusBar.content = 'black-translucent';
          document.head.appendChild(metaStatusBar);
        }
      }
    };

    // Add event listeners
    window.addEventListener('load', hideUrlBar);
    window.addEventListener('resize', hideUrlBar);
    window.addEventListener('orientationchange', hideUrlBar);

    // Initial setup
    addMetaTags();
    hideUrlBar();

    // Cleanup
    return () => {
      window.removeEventListener('load', hideUrlBar);
      window.removeEventListener('resize', hideUrlBar);
      window.removeEventListener('orientationchange', hideUrlBar);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        /* 100vh + 1px forces mobile browsers to hide address bar */
        height: 'calc(100vh + 1px)',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};

export default MobileFullscreen;
