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
    // For mobile devices
    if (width < 768) {
      return 1.3;
    }
    // For tablets
    if (width < 1024) {
      return 1.8;
    }
    // For larger screens
    return 2.14;
  }
  return 2.14; // Default fallback
};

export default function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [fetch, setFetch] = useState(false);
  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(getInitialZoom());

  const { pin, setPin } = useContext(journeyContext);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GENERIC_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/jefftbyrd/cm473j0lh011801si8hos63hp',
      center: center,
      zoom: zoom,
    });

    let lng;
    let lat;

    const marker = new mapboxgl.Marker({
      color: '#314ccd',
    });

    mapRef.current.on('click', (event) => {
      lng = event.lngLat.lng;
      lat = event.lngLat.lat;
      const coords = { lng: lng, lat: lat };
      marker.setLngLat(coords).addTo(mapRef.current);
      setPin(coords);
      setFetch((prevState) => !prevState);
    });

    mapRef.current.on('move', () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      // update state
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    return () => {
      mapRef.current.remove();
    };
  }, [setPin]); // Empty dependency array - create map only once

  return (
    <>
      <MapMessages />
      <div
        id="map-container"
        ref={mapContainerRef}
        className="w-full h-[calc(100vh-2.5rem)]"
      />
      {pin.lat ? <Freesound /> : null}
    </>
  );
}
