// hooks/useSoundData.js
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import uniqolor from 'uniqolor';
import { soundsContext } from '../../context/soundsContext';

// Utility: Shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Utility: Format sound names
const formatSoundName = (name) =>
  name
    .replace(/\.(wav|mp3|WAV|MP3|m4a|flac|aif|ogg)/g, '')
    .replace(/[_-]/g, ' ')
    .replace(/mp3/g, '')
    .trim();

export function useSoundData() {
  const [isLoading, setIsLoading] = useState(true);
  const [soundsColor, setSoundsColor] = useState([]);
  const [error, setError] = useState(null);
  const { sounds } = useContext(soundsContext);

  const processedRef = useRef(false);

  const processSounds = useCallback(
    async (signal) => {
      try {
        if (!sounds) throw new Error('Sounds data is not available');

        const response = await sounds;
        if (signal.aborted) return;

        if (!response?.results || !Array.isArray(response.results)) {
          throw new Error('Invalid sounds data format');
        }

        if (response.results.length === 0) {
          setSoundsColor([]);
          return;
        }

        // Filter sounds with duration <= 480 seconds if there are more than 5
        const filteredSounds =
          response.results.length > 5
            ? response.results.filter((sound) => sound.duration <= 480)
            : response.results;

        // Shuffle and pick the first 5 sounds
        const soundsShuffled = shuffleArray(filteredSounds).slice(0, 5);

        // Add color and format sound data
        const soundsWithColor = soundsShuffled.map((sound) => ({
          ...sound,
          freesoundUrl: sound?.url,
          color: uniqolor
            .random({ format: 'rgb' })
            .color.replace(')', ', 1)')
            .replace('rgb', 'rgba'),
          url: sound?.previews['preview-lq-mp3'],
          name: formatSoundName(sound?.name || ''),
        }));

        setSoundsColor(soundsWithColor);
        processedRef.current = true;
      } catch (error) {
        if (!signal.aborted) {
          console.error('Error loading sounds:', error);
          setError(error.message || 'Failed to load sounds');
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [sounds],
  );

  useEffect(() => {
    if (processedRef.current && soundsColor.length > 0) return;

    const abortController = new AbortController();
    const signal = abortController.signal;

    setIsLoading(true);
    processSounds(signal);

    return () => {
      abortController.abort();
    };
  }, [processSounds, soundsColor.length]);

  const resetSounds = useCallback(() => {
    processedRef.current = false;
    setIsLoading(true);
  }, []);

  return { isLoading, soundsColor, error, resetSounds };
}
