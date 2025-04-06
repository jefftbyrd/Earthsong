// components/HideUrlBar.jsx
'use client';

import { useEffect } from 'react';

export default function HideUrlBar() {
  useEffect(() => {
    // Function to hide the URL bar
    const hideUrlBar = () => {
      if (
        typeof window !== 'undefined' &&
        window.innerHeight > window.innerWidth
      ) {
        // Only in portrait mode
        // Force the page to be tall enough to scroll
        document.body.style.height = window.innerHeight + 100 + 'px';

        setTimeout(() => {
          window.scrollTo(0, 1);
          // Reset the body height
          setTimeout(() => {
            document.body.style.height = window.innerHeight + 'px';
          }, 100);
        }, 0);
      }
    };

    // Run when page loads
    hideUrlBar();

    // Run when orientation changes or on resize
    window.addEventListener('resize', hideUrlBar);
    window.addEventListener('orientationchange', hideUrlBar);

    return () => {
      window.removeEventListener('resize', hideUrlBar);
      window.removeEventListener('orientationchange', hideUrlBar);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
