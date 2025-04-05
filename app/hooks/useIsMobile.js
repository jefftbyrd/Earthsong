// hooks/useIsMobile.js
import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if the current device is mobile
 * @returns {boolean} True if the device is mobile, false otherwise
 */
export default function useIsMobile() {
  // Default to false on server-side
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Function to check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileRegex =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;

      setIsMobile(mobileRegex.test(userAgent));
    };

    // Initial check
    checkMobile();

    // Optional: Re-check on window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}
