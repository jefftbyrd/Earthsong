'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { motion } from 'motion/react';
import React, { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../context/journeyContext';
import { userContext } from '../context/userContext';
import styles from '../styles/portal.module.scss';
import LoginToSaveButton from './LoginToSaveButton';
import Save from './Save';
import SaveButton from './SaveButton';
import SoundPlayerItem from './SoundPlayerItem';
import { soundPortal } from './soundPortal';

export default function PortalRecall(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [soundsColor, setSoundsColor] = useState();
  const [playerTarget, setPlayerTarget] = useState();
  const [playing, setPlaying] = useState(false);
  const [displayingItem, setDisplayingItem] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [saveIsOpen, setSaveIsOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { user } = useContext(userContext);
  const { reset } = useContext(journeyContext);
  const { pastJourney } = useContext(journeyContext);

  useEffect(() => {
    const recallSnapshot = async () => {
      const recalledSounds = await props.sounds;
      setSoundsColor(recalledSounds);
      setIsLoading(false);
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
          sketch={soundPortal}
          soundsColor={soundsColor}
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
