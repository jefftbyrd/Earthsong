import React, { useContext, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import InfoPanel from './InfoPanel';
import SoundItem from './SoundItem';

export default function SoundController({
  soundsColor,
  // displayingItem,
  // setDisplayingItem,
  // isOpen,
  // setIsOpen,
  className,
}) {
  const [playerTarget, setPlayerTarget] = useState(null);
  const [playing, setPlaying] = useState(false);
  const { panelId, panelOpen } = useContext(journeyContext);

  const handlePlaySound = (soundId) => {
    if (playerTarget === soundId && playing) {
      setPlaying(false);
    } else {
      setPlayerTarget(soundId);
      setPlaying(true);
    }
  };

  return (
    <>
      <div className={`grid gap-0.5 grid-cols-2 ${className || ''}`}>
        <div className="text-3xl/9 uppercase text-center">Portal</div>
        {soundsColor.map((sound, index) => (
          <div key={`soundId-${sound.id}`} className="">
            <SoundItem
              sound={sound}
              index={index}
              onPlaySound={handlePlaySound}
              isPlaying={playing && playerTarget === sound.id}
              // displayingItem={displayingItem}
              // setIsOpen={setIsOpen}
              // isOpen={isOpen}
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
      </div>
    </>
  );
}
