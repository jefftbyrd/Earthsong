import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to dynamically calculate and set the height of an element
 * based on the available viewport space.
 *
 * @param {number} navHeight - The height of any fixed navigation or footer (default: 40px).
 * @returns {Object} - An object containing the ref to attach to the element and the calculated height.
 */
export function useDynamicHeight(navHeight = 40) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const calculateHeight = () => {
      if (!ref.current) return;

      const panelTop = ref.current.getBoundingClientRect().top;
      const availableHeight = window.innerHeight - panelTop - navHeight;

      ref.current.style.height = `${availableHeight}px`;
      setHeight(availableHeight);
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, [navHeight]);

  return { ref, height };
}
