import React, { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import type { SoundsColor } from '../../context/soundsContext';
import InfoPanel from '../panels/InfoPanel';
import SoundItem from './SoundItem';

interface SoundControllerProps {
  soundsColor?: SoundsColor;
  className?: string;
  recalledName?: string;
}

export default function SoundController({
  soundsColor,
  className,
  recalledName,
}: SoundControllerProps) {
  const { panelId, panelOpen } = useContext(journeyContext);

  const formatCoordinates = (pin?: { lat?: number; lng?: number }) => {
    if (!pin || pin.lat === undefined || pin.lng === undefined) return null;
    return `${pin.lat}, ${pin.lng}`;
  };

  return (
    <>
      <div className="text-center py-1">
        <p className="text-xl font-basteleur text-[#D589FF]">
          {soundsColor?.pin ? formatCoordinates(soundsColor.pin) : null}
        </p>
        <p className="font-abordage">
          {soundsColor?.location || recalledName || ''}
        </p>
      </div>
      <div className={`grid gap-0.5 grid-cols-5 ${className || ''}`}>
        {soundsColor?.sounds?.map((sound: any, index: number) => (
          <div key={`soundId-${sound.id}`} className="">
            <SoundItem sound={sound} index={index} />
          </div>
        ))}
      </div>
      <div>
        {soundsColor?.sounds?.map((sound: any) => (
          <div
            key={`soundId-${sound.id}`}
            className="absolute inset-x-0 z-40 overflow-hidden"
          >
            {panelOpen && panelId === sound.id && (
              <InfoPanel sound={sound} color={sound.color || ''} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
