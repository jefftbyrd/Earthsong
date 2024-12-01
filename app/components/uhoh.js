'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React, { useEffect, useState } from 'react';
import uniqolor from 'uniqolor';
import styles from './portal.module.scss';
import { portalSound } from './portalSound';
import Save from './Save';
import SoundPlayerItem from './SoundPlayerItem';

export default function Portal(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [soundsColor, setSoundsColor] = useState();
  const [generate, setGenerate] = useState(false);
  const [playerTarget, setPlayerTarget] = useState();
  const [playing, setPlaying] = useState(false);
  const [dataFromChild, setDataFromChild] = useState();
  const [displayingItem, setDisplayingItem] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [saveIsOpen, setSaveIsOpen] = useState(false);
  const [manualClose, setManualClose] = useState(false);

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

  useEffect(() => {
    const addColor = async () => {
      const response = await props.sounds;
      const soundsShuffled = response.results
        .sort(() => 0.5 - Math.random()) // Shuffle array
        .slice(0, 5); // Select the first 5 items
      const soundsWithColor = soundsShuffled
        // .slice(0, 5)
        .map((sound) => ({
          ...sound,
          color: uniqolor
            .random({ format: 'rgb' })
            .color.replace(')', ', 1)')
            .replace('rgb', 'rgba'),
          url: sound.previews['preview-lq-mp3'],
          name: sound.name
            .replaceAll('.wav', '')
            .replaceAll('.mp3', '')
            .replaceAll('.WAV', '')
            .replaceAll('.MP3', '')
            .replaceAll('.m4a', '')
            .replaceAll('.flac', '')
            .replaceAll('.aif', '')
            .replaceAll('.ogg', '')
            .replaceAll('_', ' ')
            .replaceAll('-', ' ')
            .replaceAll('mp3', ''),
        }))
        .map(({ previews, ...sound }) => sound);
      setSoundsColor(soundsWithColor);
      setIsLoading(false);
    };

    addColor();
  }, []);

  if (isLoading) {
    // early return
    return 'Loading...';
  }

  return (
    <>
      {soundsColor.length > 0 ? (
        <NextReactP5Wrapper
          sketch={portalSound}
          soundsColor={soundsColor}
          generate={generate}
          playerTarget={playerTarget}
          play={playing}
          resetPortal={props.resetPortal}
        />
      ) : null}
      <div className={styles.multiController}>
        {soundsColor.map((sound, index) => {
          return (
            <div key={`soundId-${sound.id}`} className={styles.soundItem}>
              <SoundPlayerItem
                sound={sound}
                index={index}
                setPlayerTarget={setPlayerTarget}
                setPlaying={setPlaying}
                setDisplayingItem={setDisplayingItem}
                playing={playing}
                displayingItem={displayingItem}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            </div>
          );
        })}
        {props.user ? (
          <button
            className={styles.saveSnapshotButton}
            onClick={() => {
              setSaveIsOpen(!saveIsOpen);
            }}
          >
            Save
          </button>
        ) : null}
        {saveIsOpen ? (
          <Save sounds={soundsColor} setSaveIsOpen={setSaveIsOpen} />
        ) : null}
      </div>
      {/* End multiController */}
    </>
  );
}
