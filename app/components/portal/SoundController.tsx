import React, { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import type { Sound } from '../../context/soundsContext';
import InfoPanel from './InfoPanel';
import SoundItem from './SoundItem';

interface SoundControllerProps {
  soundsColor?: Sound[];
  className?: string;
  recalledName?: string;
}

export default function SoundController({
  soundsColor,
  className,
  recalledName,
}: SoundControllerProps) {
  const { panelId, panelOpen } = useContext(journeyContext);

  return (
    <>
      <div className="text-center py-1">
        <p className="font-black">
          {soundsColor?.[0]
            ? soundsColor[0].pin
              ? `${soundsColor[0].pin?.lat?.toFixed(3) || 0}, ${soundsColor[0].pin?.lng?.toFixed(3) || 0}`
              : soundsColor[0].geotag || ''
            : ''}
        </p>
        <p>
          {soundsColor?.[0]
            ? soundsColor[0].location || recalledName || ''
            : recalledName || ''}
        </p>
      </div>
      <div className={`grid gap-0.5 grid-cols-5 ${className || ''}`}>
        {soundsColor?.map((sound, index) => (
          <div key={`soundId-${sound.id}`} className="">
            <SoundItem sound={sound} index={index} />
          </div>
        ))}
      </div>
      <div>
        {soundsColor?.map((sound) => (
          <div key={`soundId-${sound.id}`} className="">
            {panelOpen && panelId === sound.id && (
              <InfoPanel sound={sound} color={sound.color || ''} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
