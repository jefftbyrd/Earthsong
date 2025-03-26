'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import LoginToSaveButton from './LoginToSaveButton';
import styles from './portal.module.scss';
import { portalSound } from './portalSound';
import Save from './Save';
import SaveButton from './SaveButton';
import SoundPlayerItem from './SoundPlayerItem';

interface ProcessedSound {
  id: number;
  url: string;
  name: string;
  freesoundUrl?: string;
  color?: string;
}

interface PortalRecallProps {
  sounds: Promise<ProcessedSound[]>;
  resetPortal: () => void;
  user?: any; // Note: This could be improved with a proper user type
}

export default function PortalRecall({
  sounds,
  resetPortal,
  user,
}: PortalRecallProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [soundsColor, setSoundsColor] = useState<ProcessedSound[]>([]);
  const [generate, setGenerate] = useState(false);
  const [playerTarget, setPlayerTarget] = useState<number | undefined>();
  const [playing, setPlaying] = useState(false);
  const [dataFromChild, setDataFromChild] = useState<any>();
  const [displayingItem, setDisplayingItem] = useState<number | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [saveIsOpen, setSaveIsOpen] = useState(false);
  const [manualClose, setManualClose] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  function handleDataFromChild(data: any) {
    setDataFromChild(data);
  }

  useEffect(() => {
    const recallSnapshot = async () => {
      const recalledSounds = await sounds;
      setSoundsColor(recalledSounds);
      setIsLoading(false);
    };

    recallSnapshot();
  }, [sounds]);

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div>
      {soundsColor.length > 0 && (
        <NextReactP5Wrapper
          sketch={portalSound}
          soundsColor={soundsColor}
          generate={generate}
          playerTarget={playerTarget}
          play={playing}
          resetPortal={resetPortal}
        />
      )}
      <div className={styles.multiController}>
        {soundsColor.map((sound, index) => (
          <div key={`soundId-${sound.id}`} className={styles.soundItem}>
            <SoundPlayerItem
              sound={sound}
              index={index}
              setPlayerTarget={setPlayerTarget}
              setPlaying={setPlaying}
              setDisplayingItem={setDisplayingItem}
              playing={playing}
              displayingItem={displayingItem}
            />
          </div>
        ))}
        {user ? (
          <SaveButton
            setSaveIsOpen={setSaveIsOpen}
            saveIsOpen={saveIsOpen}
            setShowSuccessMessage={setShowSuccessMessage}
          />
        ) : (
          <LoginToSaveButton
            setSaveIsOpen={setSaveIsOpen}
            saveIsOpen={saveIsOpen}
          />
        )}
        {saveIsOpen && (
          <Save
            sounds={soundsColor}
            setSaveIsOpen={setSaveIsOpen}
            setShowSuccessMessage={setShowSuccessMessage}
            showSuccessMessage={showSuccessMessage}
          />
        )}
        {showSuccessMessage && (
          <motion.h1
            className="successMessage"
            animate={{
              opacity: [0, 1, 0],
              transition: { duration: 3, times: [0, 0.5, 1] },
            }}
          >
            Your journey was saved!
          </motion.h1>
        )}
      </div>
    </div>
  );
}
