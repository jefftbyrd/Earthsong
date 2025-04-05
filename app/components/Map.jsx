'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { motion } from 'motion/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { journeyContext } from '../context/journeyContext';
import { soundsContext } from '../context/soundsContext';
import styles from '../styles/ui.module.scss';
import Freesound from './Freesound';

const initialCenter = [4.510020088079064, 44.66199079784276];
const initialZoom = 2.14;

export default function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [pin, setPin] = useState({});
  const [fetch, setFetch] = useState(false);

  console.log('pin', pin);

  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);

  const { setPhase, phase } = useContext(journeyContext);
  const { sounds, freesoundLoading, notEnough } = useContext(soundsContext);

  const instructionVariants = {
    container: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { duration: 10, times: [0, 0.6, 0.9, 1] },
      },
    },
    text: {
      animate: {
        color: ['rgb(255, 0, 89)', 'rgb(255, 145, 0)', 'rgb(255, 0, 89)'],
        transition: { repeat: Infinity, duration: 3 },
      },
    },
  };

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
  }, []);

  return (
    <>
      {phase === 'map' && !pin.lat ? (
        <motion.div
          className={styles.instruction}
          initial="initial"
          animate="animate"
          variants={instructionVariants.container}
        >
          <motion.h2
            variants={instructionVariants.text}
            // Add this to ensure the text animation runs independently
            animate="animate"
          >
            Choose a place to explore.
          </motion.h2>
        </motion.div>
      ) : null}

      {/* SEARCHING */}
      {pin.lat && phase === 'map' ? (
        <div className={styles.projection}>
          <motion.h2
            animate={{
              opacity: [0, 1],
              transition: { duration: 2, times: [0, 1] },
            }}
          >
            {/* Announce the chosen coordinates */}
            You chose {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}.
            <br />
            <br />
            <br />
          </motion.h2>
        </div>
      ) : null}

      {pin.lat && phase === 'map' && freesoundLoading === true ? (
        <div className={styles.projection}>
          <motion.div
            animate={{
              opacity: [0, 0, 1],
              transition: { duration: 2, times: [0, 0.5, 1] },
            }}
          >
            <motion.button
              className={styles.projectionStart}
              animate={{
                color: [
                  'rgb(255, 0, 89)',
                  'rgb(255, 145, 0)',
                  'rgb(255, 0, 89)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {/* Searching the area. */}
              Searching the area.
              <br />
              <br />
            </motion.button>
          </motion.div>
        </div>
      ) : null}

      {/* IF THERE ARE ENOUGH SOUNDS */}
      {pin.lat &&
      phase === 'map' &&
      notEnough === false &&
      sounds?.results?.length > 0 &&
      freesoundLoading === false ? (
        <div className={styles.projection}>
          <motion.h2
            animate={{
              opacity: [0, 1],
              transition: { duration: 3, times: [0, 1] },
            }}
          >
            {/* Number of sounds found nearby. */}
            {sounds?.count} sounds found nearby.
          </motion.h2>

          <motion.div
            animate={{
              opacity: [0, 0, 1],
              transition: { duration: 2, times: [0, 0.5, 1] },
            }}
          >
            <motion.button
              className={styles.projectionStart}
              onClick={() => {
                setPhase('portal');
                setPin({});
              }}
              animate={{
                color: [
                  'rgb(255, 0, 89)',
                  'rgb(255, 145, 0)',
                  'rgb(255, 0, 89)',
                ],
                scale: [1, 1.05, 1],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {/* Click to initiate sonic projection */}
              Take me there.
            </motion.button>
          </motion.div>
        </div>
      ) : null}

      {/* NOT ENOUGH SOUNDS */}
      {pin.lat && phase === 'map' && notEnough === true ? (
        <div className={styles.projection}>
          <motion.div
            animate={{
              opacity: [0, 0, 1],
              transition: { duration: 3, times: [0, 0.5, 1] },
            }}
          >
            <motion.button
              className={styles.projectionStart}
              animate={{
                color: [
                  'rgb(255, 0, 89)',
                  'rgb(255, 145, 0)',
                  'rgb(255, 0, 89)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {/* No sounds found */}
              No sounds found within 200km. Please choose another location.
            </motion.button>
          </motion.div>
        </div>
      ) : null}

      <div id="map-container" ref={mapContainerRef} />
      {pin.lat ? <Freesound pin={pin} /> : null}
    </>
  );
}
