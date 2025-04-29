import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../context/journeyContext';
import { soundsContext } from '../context/soundsContext';

export default function Freesound() {
  const {
    setSounds,
    freesoundLoading,
    setFreesoundLoading,
    setNotEnough,
    isFetchingSounds,
    setIsFetchingSounds,
  } = useContext(soundsContext);
  const { pin, setSearchMessage, setFreesoundError } =
    useContext(journeyContext); // Add setSearchMessage from context
  const [currentRadius, setCurrentRadius] = useState(null);

  // Only depends on pin changes
  useEffect(() => {
    if (pin && pin.lat && pin.lng) {
      // console.log('Pin changed, setting isFetchingSounds to true...');
      setNotEnough(false); // Reset "not enough results" state
      setFreesoundError(false); // Reset error state
      setIsFetchingSounds(true); // This should be called
      setSounds(null); // Reset sounds to initial state
      setSearchMessage('Searching for sounds...'); // Initial message
      setCurrentRadius(null);
    }
  }, [pin]);

  // Only depends on pin and isFetchingSounds
  useEffect(() => {
    const searchRadiuses = [10, 50, 100, 200];
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      if (!pin || !pin.lat || !pin.lng || !isFetchingSounds) {
        // console.log('Skipping fetch: invalid pin or not in fetching state');
        setFreesoundLoading(false);
        setIsFetchingSounds(false);
        return;
      }

      setFreesoundLoading(true);
      // console.log('Starting sound searches:', searchRadiuses);
      setSearchMessage(
        `Searching for sounds near ${pin.locationName || 'this location'}...`,
      );

      try {
        for (const radius of searchRadiuses) {
          if (!isFetchingSounds) break; // Stop if fetching was canceled

          // Update message for each radius
          if (radius > 10) {
            setSearchMessage(`Expanding search radius to ${radius}km...`);
          } else {
            setSearchMessage(`Searching within ${radius}km radius...`);
          }
          setCurrentRadius(radius);

          const response = await fetch(
            `/api/freesound?lat=${pin.lat}&lng=${pin.lng}&radius=${radius}`,
            { signal },
          );

          if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
          const data = await response.json();

          if (data.count >= 5) {
            // console.log(
            //   `Using results from ${radius}km radius: ${data.count} sounds`,
            // );

            setSounds({
              ...data,
              pin,
              location: pin.locationName || 'Unknown location',
              searchRadius: radius,
              soundCount: data.count,
            });

            setSearchMessage(
              `Found ${data.count} sounds within ${radius}km of ${pin.locationName || 'this location'}`,
            );
            setNotEnough(false);
            setIsFetchingSounds(false); // Reset fetching state once sounds are set
            return;
          }
        }

        // console.log('Insufficient results in all radiuses');
        setNotEnough(true);
        setSearchMessage(
          `No sounds found near ${pin.locationName || 'this location'}. Try a different location.`,
        );
      } catch (error) {
        if (error.name === 'AbortError') {
          // console.log('Fetch aborted');
          setFreesoundError(true);
          setSearchMessage('Search cancelled. Try again.');
        } else {
          console.error('Error fetching sounds:', error);
          setFreesoundError(true);
          setSearchMessage('Error searching for sounds. Please try again.');
        }
      } finally {
        setFreesoundLoading(false);
        setIsFetchingSounds(false); // Always reset fetching state when done
      }
    };

    if (isFetchingSounds) {
      fetchData().catch((error) => {
        console.error('Error in fetchData:', error);
        setFreesoundError(true);
        setIsFetchingSounds(false);
        setSearchMessage('Error searching for sounds. Please try again.');
      });
    }

    return () => {
      controller.abort();
    };
  }, [pin, isFetchingSounds]);

  if (isFetchingSounds) {
    return <div>Fetching new sounds for the selected pin...</div>;
  }

  if (freesoundLoading) {
    return <div>Loading sounds from this location...</div>;
  }

  return null;
}
