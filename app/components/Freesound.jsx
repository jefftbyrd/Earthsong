import { useContext, useEffect } from 'react';
import { journeyContext } from '../context/journeyContext';
import { soundsContext } from '../context/soundsContext';

export default function Freesound({ location }) {
  const {
    setSounds,
    sounds,
    freesoundLoading,
    setFreesoundLoading,
    setNotEnough,
    notEnough,
    isFetchingSounds,
    setIsFetchingSounds, // Use the new state
  } = useContext(soundsContext);
  const { pin } = useContext(journeyContext);

  console.log('sounds on Freesound:', sounds);
  console.log('location on Freesound:', location);
  console.log('Freesound: isFetchingSounds:', isFetchingSounds);
  console.log('Freesound: notEnough:', notEnough);

  // Reset Freesound results whenever the pin changes
  // useEffect(() => {
  //   if (pin && pin.lat && pin.lng) {
  //     console.log('Pin changed, resetting Freesound results...');
  //     setSounds(null); // Reset sounds to initial state
  //     setNotEnough(false); // Reset "not enough results" state
  //     setIsFetchingSounds(true); // Set fetching state to true
  //   }
  // }, [pin, setSounds, setNotEnough, setIsFetchingSounds]);

  useEffect(() => {
    if (pin && pin.lat && pin.lng) {
      console.log('Pin changed, setting isFetchingSounds to true...');
      setNotEnough(false); // Reset "not enough results" state
      setIsFetchingSounds(true); // This should be called
      setSounds(null); // Reset sounds to initial state
    }
  }, [pin]);

  useEffect(() => {
    const searchRadiuses = [10, 50, 100, 200];
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      if (!pin || !pin.lat || !pin.lng) {
        console.error('Invalid pin location:', pin);
        setFreesoundLoading(false);
        setIsFetchingSounds(false); // Reset fetching state
        return;
      }

      setFreesoundLoading(true);
      console.log('Starting sound searches:', searchRadiuses);

      try {
        for (const radius of searchRadiuses) {
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

            setSounds({
              ...data,
              pin,
              location: location || 'Unknown location', // Use the latest location or a fallback
              searchRadius: radius,
              soundCount: data.count,
            });
            setNotEnough(false);
            setIsFetchingSounds(false); // Reset fetching state
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
        setIsFetchingSounds(false); // Reset fetching state
      }
    };

    fetchData().catch((error) => {
      console.error('Error in fetchData:', error);
    });

    return () => {
      controller.abort();
    };
  }, [
    pin,
    // setSounds,
    // setFreesoundLoading,
    // setNotEnough,
    // setIsFetchingSounds,
    // location,
  ]);

  if (isFetchingSounds) {
    return <div>Fetching new sounds for the selected pin...</div>;
  }

  if (freesoundLoading) {
    return <div>Loading sounds from this location...</div>;
  }

  return null;
}
