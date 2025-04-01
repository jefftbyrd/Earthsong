'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { motion } from 'motion/react';
import React, { useContext, useEffect, useState } from 'react';
import { earthsongContext } from '../context/earthsongContext';
import LoginToSaveButton from './LoginToSaveButton';
import styles from './portal.module.scss';
import { portalSound } from './portalSound';
import Save from './Save';
import SaveButton from './SaveButton';
import SoundPlayerItem from './SoundPlayerItem';

export default function PortalRecall(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [soundsColor, setSoundsColor] = useState();
  // const [generate, setGenerate] = useState(false);
  const [playerTarget, setPlayerTarget] = useState();
  const [playing, setPlaying] = useState(false);
  const [dataFromChild, setDataFromChild] = useState();
  const [displayingItem, setDisplayingItem] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [saveIsOpen, setSaveIsOpen] = useState(false);
  // const [manualClose, setManualClose] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { user } = useContext(earthsongContext);
  const { reset } = useContext(earthsongContext);

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

  useEffect(() => {
    const recallSnapshot = async () => {
      const recalledSounds = await props.sounds;
      setSoundsColor(recalledSounds);
      setIsLoading(false);
      // console.log('soundsColor on portal recall', soundsColor);
    };

    recallSnapshot();
  }, []);

  if (isLoading) {
    // early return
    return 'Loading...';
  }

  return (
    <>
      {console.log('showSuccessMessage', showSuccessMessage)}
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
