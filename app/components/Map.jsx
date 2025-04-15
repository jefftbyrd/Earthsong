'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useContext, useEffect, useRef, useState } from 'react';
import { journeyContext } from '../context/journeyContext';
import Freesound from './Freesound';
import MapMessages from './MapMessages';

const initialCenter = [4.510020088079064, 44.66199079784276];
const getInitialZoom = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width < 768) return 1.3; // Mobile
    if (width < 1024) return 1.8; // Tablet
    return 2.14; // Larger screens
  }
  return 2.14; // Default fallback
};

export default function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(getInitialZoom());
  const [placeFormatted, setPlaceFormatted] = useState('no place found');

  console.log('placeFormatted in Map:', placeFormatted);

  const { pin, setPin } = useContext(journeyContext);

  const fetchPlaceFormatted = async (lng, lat) => {
    console.log('Fetching place_formatted for coordinates:', { lng, lat });

    try {
      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_GENERIC_TOKEN}`,
      );

      if (!response.ok) {
        console.error('API call failed with status:', response.status);
        setPlaceFormatted('Error fetching location'); // Set warning message
        return null;
      }

      const data = await response.json();
      console.log('API response data:', data);

      if (data.features && data.features.length > 0) {
        const place = data.features[0]?.properties?.place_formatted;
        if (place) {
          console.log('Extracted place_formatted:', place);
          setPlaceFormatted(place); // Update state
          return place; // Return the value
        } else {
          console.error('place_formatted is missing in the response');
          setPlaceFormatted('No location found'); // Set warning message
          return null;
        }
      } else {
        console.error('No features found in response');
        setPlaceFormatted('No location found'); // Set warning message
        return null;
      }
    } catch (error) {
      console.error('Error fetching place_formatted:', error);
      setPlaceFormatted('Error fetching location'); // Set warning message
      return null;
    }
  };

  useEffect(() => {
    console.log('Initializing Mapbox map...');
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GENERIC_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/jefftbyrd/cm473j0lh011801si8hos63hp',
      center: center,
      zoom: zoom,
    });

    const marker = new mapboxgl.Marker({ color: '#314ccd' });

    mapRef.current.on('click', (event) => {
      const lng = event.lngLat.lng;
      const lat = event.lngLat.lat;
      const coords = { lng, lat };
      console.log('Map clicked at coordinates:', coords);

      marker.setLngLat(coords).addTo(mapRef.current);
      setPin(coords);
      console.log('Pin set to:', coords);

      // Reset placeFormatted when a new pin is chosen
      setPlaceFormatted(null);

      // Fetch place_formatted after setting the pin
      fetchPlaceFormatted(lng, lat);
    });

    mapRef.current.on('move', () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();
      console.log('Map moved. New center:', mapCenter, 'New zoom:', mapZoom);

      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    return () => {
      console.log('Cleaning up Mapbox map...');
      mapRef.current.remove();
    };
  }, []); // Empty dependency array - create map only once

  return (
    <>
      {/* {placeFormatted ? (
        <div className="text-5xl">
          <p>Location: {placeFormatted}</p>
        </div>
      ) : null} */}
      <MapMessages location={placeFormatted} />
      <div
        id="map-container"
        ref={mapContainerRef}
        className="w-full h-[calc(100vh-2.5rem)]"
      />
      {pin.lat ? <Freesound location={placeFormatted} /> : null}
    </>
  );
}
