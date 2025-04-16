import React, { useContext, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import InfoPanel from './InfoPanel';
import SoundItem from './SoundItem';

export default function SoundController({ soundsColor, className }) {
  const { panelId, panelOpen } = useContext(journeyContext);

  return (
    <>
      <div className="text-center py-1">
        <p className="font-black">
          {soundsColor[0]?.pin.lat.toFixed(3)},{' '}
          {soundsColor[0]?.pin.lng.toFixed(3)}
        </p>
        <p>{soundsColor[0]?.location}</p>
      </div>
      <div
        className={`grid gap-0.5 grid-cols-5 lg:grid-cols-3 xl:grid-cols-5 ${className || ''}`}
      >
        {/* <div className="text-3xl/9 uppercase text-center flex items-center justify-center xl:hidden">
          Portal
        </div> */}
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
