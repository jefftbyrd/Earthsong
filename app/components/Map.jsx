'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
// import { motion } from 'motion/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { journeyContext } from '../context/journeyContext';
// import { soundsContext } from '../context/soundsContext';
// import styles from '../styles/ui.module.scss';
import Freesound from './Freesound';
import MapMessages from './MapMessages';

const initialCenter = [4.510020088079064, 44.66199079784276];
const initialZoom = 2.14;

export default function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  // const [pin, setPin] = useState({});
  const [fetch, setFetch] = useState(false);

  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);

  const { setPhase, phase, pin, setPin } = useContext(journeyContext);
  // const { sounds, freesoundLoading, notEnough } = useContext(soundsContext);

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
  }, []); // Empty dependency array - create map only once

  return (
    <>
      <MapMessages />
      <div id="map-container" ref={mapContainerRef} />
      {pin.lat ? <Freesound /> : null}
    </>
  );
}
