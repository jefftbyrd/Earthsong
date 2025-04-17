'use client';
import React, { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';

export default function InfoPanel({ sound, index, color }) {
  const minutes = Math.floor(sound.duration / 60);
  const seconds = Math.floor(sound.duration % 60)
    .toString()
    .padStart(2, '0');
  const geotagSplit = sound.geotag.split(' ');
  const location = `${Number(geotagSplit[0]).toFixed(4)}, ${Number(geotagSplit[1]).toFixed(4)}`;
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);
  // const aegean = ['𐄇', '𐄈', '𐄉', '𐄊', '𐄋'];

  const cleanDescription = sound.description.replace(/<[^>]*>/g, '');
  // const adjustColor = color.replace('1)', '0.5)').replace(/\s/g, '');
  // const adjustColor = color.replace(/\s/g, '');

  useEffect(() => {
    // Create handler function for document-level keyboard events
    const handleKeyDown = (e) => {
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
      className="p-5 text-black box-border overflow-auto h-[calc(100vh-2.5rem-7.5rem)] mt-0.5"
      style={{ backgroundColor: color }}
      role="dialog" // Indicate this is a dialog
      aria-modal="true" // Indicate this is a modal dialog
      aria-labelledby="info-panel-title" // Reference to the title element
    >
      <h2
        id="info-panel-title"
        className="text-3xl lg:text-5xl wrap-break-word lg:mt-2"
      >
        {sound.name}
      </h2>

      <div className="border-2 p-3 lg:p-5 my-4 lg:my-6 text-sm/6 lg:text-lg/8 inline-block">
        <div>
          <span className="font-black">Location:</span> {location}
        </div>
        <div>
          <span className="font-black">Duration:</span> {minutes}:{seconds}
        </div>
        <div>
          <span className="font-black">Tags:</span> {sound.tags.join(', ')}
        </div>
        <div>
          <span className="font-black">Uploaded by:</span> {sound.username}
        </div>
        <div>
          <span className="font-black">Freesound page:</span>{' '}
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

      <p className="text-sm/6 lg:text-lg/8 wrap-break-word">
        {cleanDescription}
      </p>
    </div>
  );
}
