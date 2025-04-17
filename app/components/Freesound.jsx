import { useContext, useEffect } from 'react';
import { journeyContext } from '../context/journeyContext';
import { soundsContext } from '../context/soundsContext';

export default function Freesound() {
  const {
    setSounds,
    sounds,
    freesoundLoading,
    setFreesoundLoading,
    setNotEnough,
    notEnough,
    isFetchingSounds,
    setIsFetchingSounds,
  } = useContext(soundsContext);
  const { pin } = useContext(journeyContext);

  console.log('sounds on Freesound:', sounds);
  console.log('location from pin:', pin?.locationName);
  console.log('Freesound: isFetchingSounds:', isFetchingSounds);
  console.log('Freesound: notEnough:', notEnough);

  // Only depends on pin changes
  useEffect(() => {
    if (pin && pin.lat && pin.lng) {
      console.log('Pin changed, setting isFetchingSounds to true...');
      setNotEnough(false); // Reset "not enough results" state
      setIsFetchingSounds(true); // This should be called
      setSounds(null); // Reset sounds to initial state
    }
  }, [pin]);

  // Only depends on pin and isFetchingSounds
  useEffect(() => {
    const searchRadiuses = [10, 50, 100, 200];
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      if (!pin || !pin.lat || !pin.lng || !isFetchingSounds) {
        console.log('Skipping fetch: invalid pin or not in fetching state');
        setFreesoundLoading(false);
        setIsFetchingSounds(false);
        return;
      }

      setFreesoundLoading(true);
      console.log('Starting sound searches:', searchRadiuses);

      try {
        for (const radius of searchRadiuses) {
          if (!isFetchingSounds) break; // Stop if fetching was canceled

          const response = await fetch(
            `/api/freesound?lat=${pin.lat}&lng=${pin.lng}&radius=${radius}`,
            { signal },
          );

          if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
          const data = await response.json();

          if (data.count >= 5) {
            console.log(
              `Using results from ${radius}km radius: ${data.count} sounds`,
            );

            // Always use the current value of location at this moment
            // const currentLocation = pin.locationName || 'Unknown location';
            // console.log('Using current location:', currentLocation);

            setSounds({
              ...data,
              pin,
              location: pin.locationName || 'Unknown location',
              searchRadius: radius,
              soundCount: data.count,
            });

            setNotEnough(false);
            setIsFetchingSounds(false); // Reset fetching state once sounds are set
            return;
          }
        }

        console.log('Insufficient results in all radiuses');
        setNotEnough(true);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Error fetching sounds:', error);
        }
      } finally {
        setFreesoundLoading(false);
        setIsFetchingSounds(false); // Always reset fetching state when done
      }
    };

    if (isFetchingSounds) {
      fetchData().catch((error) => {
        console.error('Error in fetchData:', error);
        setIsFetchingSounds(false);
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
