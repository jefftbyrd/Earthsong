import { useEffect, useState } from 'react';

interface Pin {
  lat: number;
  lng: number;
}

interface Sound {
  previews: string;
  name: string;
  description: string;
  username: string;
  id: number;
  tags: string[];
  duration: number;
  geotag: [number, number];
  url: string;
}

interface FreesoundResponse {
  count: number;
  results: Sound[];
}

interface FreesoundProps {
  pin: Pin;
  sendDataToParent: (data: FreesoundResponse | undefined) => void;
}

export default function Freesound({ pin, sendDataToParent }: FreesoundProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [sounds, setSounds] = useState<FreesoundResponse>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        // search within 10km
        `https://freesound.org/apiv2/search/text/?filter=%257B%2521geofilt%2520sfield%3Dgeotag%2520pt%3D${pin.lat}%2C${pin.lng}%2520d%3D10%257D%2520&fields=previews%2Cname%2Cdescription%2Cusername%2Cid%2Ctags%2Cduration%2Cgeotag%2Curl&page_size=100  &token=${process.env.NEXT_PUBLIC_FREESOUND_API_KEY}`,
      );
      const json = await response.json();
      if (json.count >= 5) {
        setSounds(json);
      } else if (json.count < 5) {
        const response2 = await fetch(
          // search within 50km
          `https://freesound.org/apiv2/search/text/?filter=%257B%2521geofilt%2520sfield%3Dgeotag%2520pt%3D${pin.lat}%2C${pin.lng}%2520d%3D50%257D%2520&fields=previews%2Cname%2Cdescription%2Cusername%2Cid%2Ctags%2Cduration%2Cgeotag%2Curl&page_size=100  &token=${process.env.NEXT_PUBLIC_FREESOUND_API_KEY}`,
        );
        const json2 = await response2.json();
        if (json2.count >= 5) {
          setSounds(json2);
        } else {
          const response3 = await fetch(
            // search within 100km
            `https://freesound.org/apiv2/search/text/?filter=%257B%2521geofilt%2520sfield%3Dgeotag%2520pt%3D${pin.lat}%2C${pin.lng}%2520d%3D100%257D%2520&fields=previews%2Cname%2Cdescription%2Cusername%2Cid%2Ctags%2Cduration%2Cgeotag%2Curl&page_size100  &token=${process.env.NEXT_PUBLIC_FREESOUND_API_KEY}`,
          );
          const json3 = await response3.json();
          if (json3.count >= 5) {
            setSounds(json3);
          } else {
            const response4 = await fetch(
              // search within 200km
              `https://freesound.org/apiv2/search/text/?filter=%257B%2521geofilt%2520sfield%3Dgeotag%2520pt%3D${pin.lat}%2C${pin.lng}%2520d%3D200%257D%2520&fields=previews%2Cname%2Cdescription%2Cusername%2Cid%2Ctags%2Cduration%2Cgeotag%2Curl&page_size=100  &token=${process.env.NEXT_PUBLIC_FREESOUND_API_KEY}`,
            );
            const json4 = await response4.json();

            setSounds(json4);
          }
        }
      }
    };
    setIsLoading(false);

    fetchData().catch(() => console.log('error'));
  }, [pin]);

  sendDataToParent(sounds);

  if (isLoading) {
    // early return
    return 'Loading...';
  }
}
