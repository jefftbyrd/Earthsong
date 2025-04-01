'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { motion } from 'motion/react';
import React, { useContext, useEffect, useState } from 'react';
import uniqolor from 'uniqolor';
// import { journeyContext } from '../context/journeyContext';
import { soundsContext } from '../context/soundsContext';
import { userContext } from '../context/userContext';
import LoginToSaveButton from './LoginToSaveButton';
import styles from './portal.module.scss';
import { portalSound } from './portalSound';
import Save from './Save';
import SaveButton from './SaveButton';
import SoundPlayerItem from './SoundPlayerItem';

export default function Portal(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [soundsColor, setSoundsColor] = useState();
  // const [generate, setGenerate] = useState(false);
  const [playerTarget, setPlayerTarget] = useState();
  const [playing, setPlaying] = useState(false);
  // const [dataFromChild, setDataFromChild] = useState();
  const [displayingItem, setDisplayingItem] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [saveIsOpen, setSaveIsOpen] = useState(false);
  // const [manualClose, setManualClose] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { user } = useContext(userContext);
  // const { snapshots } = useContext(earthsongContext);
  const { reset } = useContext(userContext);
  const { sounds } = useContext(soundsContext);

  // function handleDataFromChild(data) {
  //   setDataFromChild(data);
  // }

  useEffect(() => {
    const addColor = async () => {
      // const response = await props.sounds;
      const response = await sounds;
      console.log('sounds', sounds);
      const soundsShuffled = response.results
        .sort(() => 0.5 - Math.random()) // Shuffle array
        .slice(0, 5); // Select the first 5 items
      const soundsWithColor = soundsShuffled
        // .slice(0, 5)
        .map((sound) => ({
          ...sound,
          freesoundUrl: sound.url,
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
          // generate={generate}
          playerTarget={playerTarget}
          play={playing}
          resetPortal={props.resetPortal}
          reset={reset}
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
        {user ? (
          <SaveButton
            setSaveIsOpen={setSaveIsOpen}
            saveIsOpen={saveIsOpen}
            setShowSuccessMessage={setShowSuccessMessage}
          />
        ) : (
          <LoginToSaveButton />
        )}
        {saveIsOpen ? (
          <Save
            sounds={soundsColor}
            setSaveIsOpen={setSaveIsOpen}
            setShowSuccessMessage={setShowSuccessMessage}
            showSuccessMessage={showSuccessMessage}
          />
        ) : null}
        {showSuccessMessage ? (
          <motion.h1
            className="successMessage"
            animate={{
              opacity: [0, 1, 0],
              transition: { duration: 3, times: [0, 0.5, 1] },
            }}
          >
            Your journey was saved!
          </motion.h1>
        ) : null}
      </div>
      {/* End multiController */}
    </>
  );
}
