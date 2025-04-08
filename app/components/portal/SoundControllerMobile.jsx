import React, { useContext, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import styles from '../../styles/portal.module.scss';
import GuidePanel from '../panels/GuidePanel';
import PowersPanel from '../panels/PowersPanel';
import InfoPanel from './InfoPanel';
import SoundItem from './SoundItem';

export default function SoundControllerMobile({
  soundsColor,
  // setPlayerTarget,
  // setPlaying,
  // playing,
  displayingItem,
  setDisplayingItem,
  isOpen,
  setIsOpen,
}) {
  const [playerTarget, setPlayerTarget] = useState(null);
  const [playing, setPlaying] = useState(false);
  const handlePlaySound = (soundId) => {
    if (playerTarget === soundId && playing) {
      // If clicking the currently playing sound, pause it
      setPlaying(false);
    } else {
      // Otherwise, set the target and play
      setPlayerTarget(soundId);
      setPlaying(true);
    }
  };
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);

  return (
    <>
      <div className="grid gap-0.5 grid-cols-2">
        <div className="text-3xl/9 uppercase text-center">Portal</div>
        {soundsColor.map((sound, index) => (
          <div key={`soundId-${sound.id}`} className="">
            <SoundItem
              sound={sound}
              index={index}
              // setPlayerTarget={setPlayerTarget}
              // setPlaying={setPlaying}
              // setDisplayingItem={setDisplayingItem}
              // playing={playing}
              onPlaySound={handlePlaySound}
              isPlaying={playing && playerTarget === sound.id}
              displayingItem={displayingItem}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          </div>
        ))}
      </div>
      <div>
        {soundsColor.map((sound, index) => (
          <div key={`soundId-${sound.id}`} className="">
            {panelOpen && panelId === sound.id && (
              <InfoPanel sound={sound} index={index} color={sound.color} />
            )}
          </div>
        ))}
        {panelOpen && panelId === 'Powers' && <PowersPanel />}
        {panelOpen && panelId === 'Guide' && <GuidePanel />}
      </div>
    </>
  );
}
