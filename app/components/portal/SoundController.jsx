import React, { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import InfoPanel from './InfoPanel';
import SoundItem from './SoundItem';

export default function SoundController({
  soundsColor,
  className,
  recalledName,
}) {
  const { panelId, panelOpen } = useContext(journeyContext);

  return (
    <>
      <div className="text-center py-1">
        <p className="font-black">
          {soundsColor[0]?.pin !== undefined
            ? `${soundsColor[0]?.pin.lat.toFixed(3)}, ${soundsColor[0]?.pin.lng.toFixed(3)}`
            : `${soundsColor[0]?.geotag}`}
        </p>
        <p>
          {soundsColor[0]?.location !== undefined
            ? `${soundsColor[0]?.location}`
            : `${recalledName}`}
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
        {soundsColor?.map((sound, index) => (
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
