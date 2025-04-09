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
      console.log('Starting sound searches:', searchRadiuses);

      try {
        // Create promises for all radius searches
        const searchPromises = searchRadiuses.map(async (radius) => {
          const filter = encodeURIComponent(
            `{!geofilt sfield=geotag pt=${pin.lat},${pin.lng} d=${radius}}`,
          );
          const response = await fetch(
            `https://freesound.org/apiv2/search/text/?filter=${filter}&fields=previews,name,description,username,id,tags,duration,geotag,url&page_size=100&token=${process.env.NEXT_PUBLIC_FREESOUND_API_KEY}`,
          );

          if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
          const json = await response.json();
          return { radius, data: json };
        });

        // Process results by smallest radius first
        const results = await Promise.all(searchPromises);
        const successfulResult = results
          .sort((a, b) => a.radius - b.radius)
          .find((result) => result.data.count >= 5);

        if (successfulResult) {
          const { radius, data } = successfulResult;
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
        } else {
          console.log('Insufficient results in all radiuses');
          setNotEnough(true);
        }
      } catch (error) {
        console.error('Error fetching sounds:', error);
      } finally {
        setFreesoundLoading(false);
      }
    };

    fetchData();
  }, [pin, setSounds, setFreesoundLoading]);

  if (freesoundLoading) {
    return <div>Loading sounds from this location...</div>;
  }

  return null;
}
