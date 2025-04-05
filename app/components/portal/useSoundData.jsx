// hooks/useSoundData.js
import { useContext, useEffect, useState } from 'react';
import uniqolor from 'uniqolor';
import { soundsContext } from '../../context/soundsContext';

export function useSoundData() {
  const [isLoading, setIsLoading] = useState(true);
  const [soundsColor, setSoundsColor] = useState([]);
  const [error, setError] = useState(null);
  const { sounds } = useContext(soundsContext);

  useEffect(() => {
    let isMounted = true;

    const processSounds = async () => {
      try {
        if (!sounds) {
          throw new Error('Sounds data is not available');
        }

        const response = await sounds;

        if (!isMounted) return;

        if (!response?.results || !Array.isArray(response.results)) {
          throw new Error('Invalid sounds data format');
        }

        if (response.results.length === 0) {
          setSoundsColor([]);
          setIsLoading(false);
          return;
        }

        const soundsShuffled = response.results
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);

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
      } catch (error) {
        console.error('Error loading sounds:', error);
        setError(error.message || 'Failed to load sounds');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    processSounds();

    return () => {
      isMounted = false;
    };
  }, [sounds]);

  return { isLoading, soundsColor, error };
}

function formatSoundName(name) {
  // Fix regex usage - replace with separate operations
  return name
    .replace(/\.(wav|mp3|WAV|MP3|m4a|flac|aif|ogg)/g, '')
    .replace(/[_-]/g, ' ')
    .replace(/mp3/g, '')
    .trim();
}
