'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useContext, useEffect, useRef, useState } from 'react';
import { journeyContext } from '../context/journeyContext';
import Freesound from './Freesound';
import MapMessages from './MapMessages';

export default function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [placeFormatted, setPlaceFormatted] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false); // <-- NEW

  const { pin, setPin, mapCenter, setMapCenter, mapZoom, setMapZoom } =
    useContext(journeyContext);

  const fetchPlaceFormatted = async (lng, lat) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_GENERIC_TOKEN}`,
      );

      if (!response.ok) {
        console.error('API call failed with status:', response.status);
        setPlaceFormatted(null); // Set warning message
        return null;
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const place = data.features[1]?.properties?.place_formatted;
        if (place) {
          setPlaceFormatted(place); // Update state
          return place; // Return the value
        } else {
          console.error('place_formatted is missing in the response');
          setPlaceFormatted(null); // Set warning messagenow
          return null;
        }
      } else {
        console.error('No features found in response');
        setPlaceFormatted(null); // Set warning message
        return null;
      }
    } catch (error) {
      console.error('Error fetching place_formatted:', error);
      setPlaceFormatted(null); // Set warning message
      return null;
    }
  };

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GENERIC_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/jefftbyrd/cm9qux58w006l01s56f4oaen4',
      center: mapCenter,
      zoom: mapZoom,
    });

    // mapboxgl.setTelemetryEnabled(false);

    const marker = new mapboxgl.Marker({ color: '#314ccd' });

    mapRef.current.on('load', () => {
      setIsMapLoaded(true); // <-- Hide placeholder when map is loaded
    });

    mapRef.current.on('click', async (event) => {
      const lng = event.lngLat.lng;
      const lat = event.lngLat.lat;
      const coords = { lng, lat };

      marker.setLngLat(coords).addTo(mapRef.current);
      setPlaceFormatted(null); // Reset immediately

      const locationName = await fetchPlaceFormatted(lng, lat);

      setPin({
        ...coords,
        locationName: locationName || 'Unknown location',
      });
    });

    mapRef.current.on('move', () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();
      setMapCenter([mapCenter.lng, mapCenter.lat]);
      setMapZoom(mapZoom);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []); // Empty dependency array - create map only once

  return (
    <>
      <MapMessages location={placeFormatted} />
      <div className="w-full h-[calc(100vh-2.5rem)] relative">
        {/* The map container must be empty */}
        <div
          id="map-container"
          ref={mapContainerRef}
          className="w-full h-full"
        />
        {/* Loading overlay OUTSIDE the map container */}
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-start justify-center pt-[10vh] z-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-pink-500" />
            <span className="ml-4 text-white text-lg text-shadow-lg/20 ">
              Loading Map…
            </span>
          </div>
        )}
      </div>
      {pin.lat ? <Freesound /> : null}
    </>
  );
}
