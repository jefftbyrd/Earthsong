import { useContext, useEffect } from 'react';
import { soundsContext } from '../context/soundsContext';

export default function Freesound(props) {
  const { setSounds, freesoundLoading, setFreesoundLoading } =
    useContext(soundsContext);

  useEffect(() => {
    const fetchData = async () => {
      setFreesoundLoading(true);
      try {
        const response = await fetch(
          `/api/freesound?lat=${props.pin.lat}&lng=${props.pin.lng}`,
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to fetch sounds');
        }

        const json = await response.json();
        setSounds(json);
      } catch (error) {
        console.error('Error fetching Freesound data:', error);
        // You might want to set some error state here to show to the user
      } finally {
        setFreesoundLoading(false);
      }
    };

    fetchData();
  }, [props.pin, setSounds, setFreesoundLoading]);

  if (freesoundLoading) {
    return <div>Loading sounds from this location...</div>;
  }

  return null;
}
