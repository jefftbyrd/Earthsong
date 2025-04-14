import React, { useContext, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
// import Messages from '../Messages';
import InfoPanel from './InfoPanel';
import SoundItem from './SoundItem';

export default function SoundController({ soundsColor, className }) {
  const [playerTarget, setPlayerTarget] = useState(null);
  const [playing, setPlaying] = useState(false);
  const { panelId, panelOpen } = useContext(journeyContext);
  // const messages = Messages(); // Call the Messages function with the user object

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
      <div
        className={`grid gap-0.5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ${className || ''}`}
      >
        <div className="text-3xl/9 uppercase text-center flex items-center justify-center xl:hidden">
          Portal
        </div>
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
