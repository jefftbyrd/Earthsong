'use client';
import React, { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
import type { Sound } from '../../context/soundsContext';
import { useDynamicHeight } from '../../hooks/useDynamicHeight';
import ClosePanelButton from './ClosePanelButton';

interface InfoPanelProps {
  sound: Sound;
  color: string;
}

export default function InfoPanel({ sound, color }: InfoPanelProps) {
  const minutes = Math.floor(sound?.duration / 60);
  const seconds = Math.floor(sound?.duration % 60)
    .toString()
    .padStart(2, '0');
  const geotagSplit = sound?.geotag.split(' ');
  const location = `${Number(geotagSplit[0]).toFixed(4)}, ${Number(geotagSplit[1]).toFixed(4)}`;
  const { panelOpen, togglePanel } = useContext(journeyContext);
  const { ref } = useDynamicHeight();

  const cleanDescription = sound.description.replace(/<[^>]*>/g, '');

  useEffect(() => {
    // Create handler function for document-level keyboard events
    const handleKeyDown = (e: React.KeyboardEvent | KeyboardEvent): void => {
      if (e.key === 'Escape' && panelOpen) {
        togglePanel();
      }
    };

    // Add keyboard event listener to document
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [panelOpen, togglePanel]);

  return (
    <div
      ref={ref}
      className=" text-black box-border overflow-auto mt-0.5 z-40 relative md:mt-20  md:w-4/5 lg:w-4/5 md:mx-auto lg:border-black/50 lg:border-x-6 lg:border-t-6 p-1 md:p-5"
      style={{ backgroundColor: color }}
    >
      <ClosePanelButton panel={sound.id} />
      <div className="p-5 lg:p-9 text-black ">
        <h2
          id="info-panel-title"
          className="text-2xl/9 md:text-5xl/12 wrap-break-word mt-2 lg:mt-2 text-center tracking-wide md:mb-3"
        >
          {sound.name}
        </h2>

        <div className="bg-white/30 p-4 lg:p-6 my-4 lg:my-6 text-sm/6 lg:text-lg/8 inline-block font-abordage outline-1 outline-offset-2 outline-black/30 w-full tracking-wide">
          <div>
            <span className="itemTitle">Location:</span> {location}
          </div>
          <div>
            <span className="itemTitle">Duration:</span> {minutes}:{seconds}
          </div>
          <div>
            <span className="itemTitle">Tags:</span> {sound.tags.join(', ')}
          </div>
          <div>
            <span className="itemTitle">Uploaded by:</span> {sound.username}
          </div>
          <div>
            <span className="itemTitle">Freesound page:</span>{' '}
            <a
              href={sound.freesoundUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:bg-black/30 hover:text-white p-1 text-black bg-white/30 transition-all duration-100"
            >
              {sound.name}
            </a>
          </div>
        </div>

        <p className="text-sm/6 lg:text-lg/8 wrap-break-word font-abordage tracking-wide">
          {cleanDescription}
        </p>
      </div>
    </div>
  );
}
