import { useContext, useEffect } from 'react';
import { journeyContext } from '../context/journeyContext';
import { soundsContext } from '../context/soundsContext';

export default function Freesound() {
  const { setSounds, freesoundLoading, setFreesoundLoading, setNotEnough } =
    useContext(soundsContext);
  const { setPhase, phase, pin, setPin } = useContext(journeyContext);

  useEffect(() => {
    const searchRadiuses = [10, 50, 100, 200];
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      if (!pin || !pin.lat || !pin.lng) {
        console.error('Invalid pin location:', pin);
        setFreesoundLoading(false);
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
              searchRadius: radius,
              soundCount: data.count,
            });
            setNotEnough(false);
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
      }
    };

    fetchData().catch((error) => {
      console.error('Error in fetchData:', error);
    });

    return () => {
      controller.abort();
    };
  }, [pin, setSounds, setFreesoundLoading, setNotEnough, setPhase]);

  if (freesoundLoading) {
    return <div>Loading sounds from this location...</div>;
  }

  return null;
}
