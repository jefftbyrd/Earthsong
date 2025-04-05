// hooks/useSoundData.js
import { useContext, useEffect, useRef, useState } from 'react';
import uniqolor from 'uniqolor';
import { soundsContext } from '../../context/soundsContext';

export function useSoundData() {
  const [isLoading, setIsLoading] = useState(true);
  const [soundsColor, setSoundsColor] = useState([]);
  const [error, setError] = useState(null);
  const { sounds } = useContext(soundsContext);

  // Add processing state to avoid duplicate processing
  const processedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    // Add AbortController for proper cancellation
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (processedRef.current && soundsColor.length > 0) {
      return () => {
        abortController.abort();
      };
    }

    const processPromise = (async () => {
      try {
        // Check for cancellation
        if (signal.aborted) return;

        if (!sounds) {
          throw new Error('Sounds data is not available');
        }

        // You could use the signal in fetch operations if needed
        const response = await sounds;

        if (!isMounted || signal.aborted) return;

        if (!response?.results || !Array.isArray(response.results)) {
          throw new Error('Invalid sounds data format');
        }

        if (response.results.length === 0) {
          setSoundsColor([]);
          setIsLoading(false);
          return;
        }

        // Use a more efficient shuffling algorithm (Fisher-Yates)
        const shuffleArray = (array) => {
          const newArray = [...array];
          for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          }
          return newArray;
        };

        const soundsShuffled = shuffleArray(response.results).slice(0, 5);

        const soundsWithColor = soundsShuffled
          .map((sound) => ({
            ...sound,
            freesoundUrl: sound?.url,
            color: uniqolor
              .random({ format: 'rgb' })
              .color.replace(')', ', 1)')
              .replace('rgb', 'rgba'),
            url: sound?.previews['preview-lq-mp3'],
            name: formatSoundName(sound?.name || ''),
          }))
          .map(({ previews, ...sound }) => sound);

        setSoundsColor(soundsWithColor);
        // Mark as processed
        processedRef.current = true;
      } catch (error) {
        // Don't report errors if we've been cancelled
        if (signal.aborted) return;

        console.error('Error loading sounds:', error);
        setError(error.message || 'Failed to load sounds');
      } finally {
        if (isMounted && !signal.aborted) {
          setIsLoading(false);
        }
      }
    })();

    processPromise.catch((error) => {
      if (signal.aborted) return;

      console.error('Unhandled promise rejection in useSoundData:', error);
      if (isMounted) {
        setError('An unexpected error occurred');
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      abortController.abort();
      // Cancel any other resources here if needed
    };
  }, [sounds, soundsColor.length]);

  // Add a reset function to force re-processing if needed
  const resetSounds = () => {
    processedRef.current = false;
    setIsLoading(true);
  };

  return { isLoading, soundsColor, error, resetSounds };
}

function formatSoundName(name) {
  return name
    .replace(/\.(wav|mp3|WAV|MP3|m4a|flac|aif|ogg)/g, '')
    .replace(/[_-]/g, ' ')
    .replace(/mp3/g, '')
    .trim();
}
