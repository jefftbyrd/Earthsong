import { useContext, useEffect } from 'react';
import { journeyContext } from '../context/journeyContext';
import { soundsContext } from '../context/soundsContext';

export default function Freesound() {
  const { setSounds, freesoundLoading, setFreesoundLoading, setNotEnough } =
    useContext(soundsContext);
  const { setPhase, phase, pin, setPin } = useContext(journeyContext);

  useEffect(() => {
    const searchRadiuses = [10, 50, 100, 200];

    const fetchData = async () => {
      setFreesoundLoading(true);
      try {
        for (const radius of searchRadiuses) {
          const filter = encodeURIComponent(
            `{!geofilt sfield=geotag pt=${pin.lat},${pin.lng} d=${radius}}`,
          );
          const response = await fetch(
            `https://freesound.org/apiv2/search/text/?filter=${filter}&fields=previews,name,description,username,id,tags,duration,geotag,url&page_size=100&token=${process.env.NEXT_PUBLIC_FREESOUND_API_KEY}`,
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const json = await response.json();
          if (json.count >= 5) {
            setSounds({
              ...json,
              pin: pin,
            });
            setNotEnough(false);
            return;
          }
        }

        // If we get here, we didn't find enough results in any radius
        setNotEnough(true);
        throw new Error('No sufficient results found in any search radius');
      } catch (error) {
        console.error('Error fetching Freesound data:', error);
      } finally {
        setFreesoundLoading(false);
      }
    };

    fetchData().catch((error) => {
      console.error('Error in fetchData:', error);
      setFreesoundLoading(false);
    });
  }, [pin, setSounds, setFreesoundLoading]);

  if (freesoundLoading) {
    return <div>Loading sounds from this location...</div>;
  }

  return null;
}
