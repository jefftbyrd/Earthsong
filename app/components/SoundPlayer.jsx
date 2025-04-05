'use client';
import React, { useContext, useState } from 'react';
import { journeyContext } from '../context/journeyContext';
import { soundsContext } from '../context/soundsContext';
import { userContext } from '../context/userContext';
import styles from '../styles/portal.module.scss';
import LoginToSaveButton from './LoginToSaveButton';
import Save from './Save';
import SaveButton from './SaveButton';
import SoundInfoPanel from './SoundInfoPanel';
import SoundPlayerItem from './SoundPlayerItem';

export default function SoundPlayer() {
  const [displayingItem, setDisplayingItem] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [saveIsOpen, setSaveIsOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { panelId, panelOpen } = useContext(journeyContext);

  return (
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
      {panelOpen && panelId === 'savePanel' ? (
        <Save
          sounds={soundsColor}
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
  );
}
