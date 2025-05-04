import chroma from 'chroma-js';
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
  const [error, setError] = useState(null);
  const { sounds, soundsColor, setSoundsColor } = useContext(soundsContext);
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

        // Ensure we have enough sounds to work with
        let allSounds = [...response.results];
        let filteredSounds = [];

        // Step 1: First prefer sounds <= 480 seconds
        filteredSounds = allSounds.filter((sound) => sound.duration <= 480);

        // Step 2: Filter to one sound per username while maintaining short duration preference
        const userMap = new Map();
        filteredSounds.forEach((sound) => {
          if (!userMap.has(sound.username)) {
            userMap.set(sound.username, []);
          }
          userMap.get(sound.username).push(sound);
        });

        // Select one random sound from each user
        let uniqueUserSounds = Array.from(userMap.values()).map(
          (userSounds) => {
            const randomIndex = Math.floor(Math.random() * userSounds.length);
            return userSounds[randomIndex];
          },
        );

        // Step 3: If we have less than 5 sounds, add back sounds from all users
        // but still try to respect duration filter first
        if (uniqueUserSounds.length < 5 && allSounds.length >= 5) {
          // Add longer duration sounds from unique users not yet included
          const usersIncluded = new Set(
            uniqueUserSounds.map((sound) => sound.username),
          );
          const remainingSounds = allSounds.filter(
            (sound) => !usersIncluded.has(sound.username),
          );

          if (remainingSounds.length > 0) {
            // Prefer shorter sounds first
            remainingSounds.sort((a, b) => a.duration - b.duration);
            uniqueUserSounds = [...uniqueUserSounds, ...remainingSounds];
          }

          // If still less than 5, add duplicate users with different sounds
          if (uniqueUserSounds.length < 5) {
            // Get all sounds not already selected
            const selectedSoundIds = new Set(
              uniqueUserSounds.map((sound) => sound.id),
            );
            const additionalSounds = allSounds.filter(
              (sound) => !selectedSoundIds.has(sound.id),
            );

            // Sort by duration (prefer shorter)
            additionalSounds.sort((a, b) => a.duration - b.duration);
            uniqueUserSounds = [...uniqueUserSounds, ...additionalSounds];
          }
        }

        filteredSounds = uniqueUserSounds;

        // Shuffle and pick the first 5 sounds
        const soundsShuffled = shuffleArray(filteredSounds).slice(0, 5);

        const palette = Array.from({ length: 5 }, (_, i) => {
          // Evenly distribute hues, randomize start
          const base = Math.random() * 360;
          const hue = (base + i * (360 / 5)) % 360;
          return chroma.hsl(hue, 0.8, 0.65).css('rgba');
        });

        const soundsWithColor = soundsShuffled.map(
          ({ previews, ...sound }, idx) => ({
            ...sound,
            freesoundUrl: sound?.url,
            color: chroma(palette[idx]).css('rgba'),
            url: previews?.['preview-lq-mp3'],
            name: formatSoundName(sound?.name || ''),
            pin: sounds.pin,
            location: sounds.location,
            searchRadius: sounds.searchRadius,
          }),
        );

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
