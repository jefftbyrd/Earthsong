'use client';

import { useEffect } from 'react';

const MobileViewportHandler = () => {
  useEffect(() => {
    // Function to hide the URL bar
    const hideUrlBar = () => {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 1);
      }
    };

    // Hide URL bar after page loads
    if (typeof window !== 'undefined') {
      // Initial hide on load
      window.addEventListener('load', () => {
        // Slight delay to ensure page is fully loaded
        setTimeout(hideUrlBar, 0);
      });

      // Hide on resize and orientation change
      window.addEventListener('resize', hideUrlBar);
      window.addEventListener('orientationchange', () => {
        // Slight delay for orientation change
        setTimeout(hideUrlBar, 100);
      });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', hideUrlBar);
        window.removeEventListener('orientationchange', hideUrlBar);
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MobileViewportHandler;
