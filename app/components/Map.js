'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Freesound from './Freesound';
import styles from './ui.module.scss';

const initialCenter = [4.510020088079064, 44.66199079784276];
const initialZoom = 2.14;

export default function Map(props) {
  const [enterPortal, setEnterPortal] = useState(false);
  const [dataFromChild, setDataFromChild] = useState('');

  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [pin, setPin] = useState({});
  const [fetch, setFetch] = useState(false);

  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);

  function handleDataFromChild(data) {
    setDataFromChild(data);
    props.sendDataToParent(data);
  }

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
      {pin.lat ? null : (
        <motion.div
          className={styles.instruction}
          animate={{
            opacity: [0, 0, 1, 1],
            transition: { duration: 10, times: [0, 0.6, 0.9, 1] },
          }}
        >
          <motion.div
            animate={{
              color: ['rgb(255, 0, 89)', 'rgb(255, 145, 0)', 'rgb(255, 0, 89)'],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <h2>Choose a place to explore.</h2>
          </motion.div>
        </motion.div>
      )}

      {/* SEARCHING */}
      {pin.lat && !enterPortal && !dataFromChild ? (
        <div className={styles.projection}>
          <motion.h2
            animate={{
              opacity: [0, 1],
              transition: { duration: 2, times: [0, 1] },
            }}
          >
            {/* Announce the chosen coordinates */}
            You chose {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}.
          </motion.h2>

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
            </motion.button>
          </motion.div>
        </div>
      ) : null}

      {/* IF THERE ARE ENOUGH SOUNDS */}
      {pin.lat &&
      !enterPortal &&
      dataFromChild &&
      dataFromChild.results.length > 0 ? (
        <div className={styles.projection}>
          <motion.h2
            animate={{
              opacity: [0, 1],
              transition: { duration: 3, times: [0, 1] },
            }}
          >
            {/* Announce the chosen coordinates */}
            You chose {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}.
            <br />
            {/* Number of sounds found nearby. */}
            {dataFromChild.count} sounds found nearby.
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
                // props.openPortal();
                props.setEnterPortal(true);
                props.setStartWind(false);
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
      {pin.lat &&
      !enterPortal &&
      dataFromChild &&
      dataFromChild.results.length < 1 ? (
        <div className={styles.projection}>
          <motion.h2
            animate={{
              opacity: [0, 1],
              transition: { duration: 3, times: [0, 1] },
            }}
          >
            {/* Announce the chosen coordinates */}
            You chose {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
          </motion.h2>

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
      {pin.lat ? (
        <Freesound pin={pin} sendDataToParent={handleDataFromChild} />
      ) : null}
    </>
  );
}
