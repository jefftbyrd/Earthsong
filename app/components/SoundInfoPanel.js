'use client';
import React, { useContext, useState } from 'react';
import { journeyContext } from '../context/journeyContext';
import styles from '../styles/portal.module.scss';

export default function SoundInfoPanel({ sound, index, color }) {
  const { togglePanel } = useContext(journeyContext);
  const minutes = Math.floor(sound.duration / 60);
  const seconds = Math.floor(sound.duration % 60)
    .toString()
    .padStart(2, '0');
  const geotagSplit = sound.geotag.split(' ');
  const location = `${Number(geotagSplit[0]).toFixed(4)}, ${Number(geotagSplit[1]).toFixed(4)}`;

  const aegean = ['𐄇', '𐄈', '𐄉', '𐄊', '𐄋'];

  const cleanDescription = sound.description.replace(/<[^>]*>/g, '');
  const adjustColor = color.replace('1)', '0.5)');

  return (
    <div
      className={styles.soundInfoPanel}
      style={{ backgroundColor: adjustColor }}
    >
      <button
        className="closeButton"
        onClick={() => {
          togglePanel();
        }}
      >
        𐛠
      </button>
      <div className={styles.title}>
        <div className={styles.infoSoundNumber}>{aegean[index]}</div>
        <h2>{sound.name}</h2>
      </div>
      <div className={styles.content}>
        <ul>
          <li>
            <span className={styles.heavy}>Location:</span> {location}
          </li>
          <li>
            <span className={styles.heavy}>Duration:</span> {minutes}:{seconds}
          </li>
          <li>
            <span className={styles.heavy}>Tags:</span> {sound.tags.join(', ')}
          </li>
          <li>
            <span className={styles.heavy}>Uploaded by:</span> {sound.username}
          </li>
          <li>
            <span className={styles.heavy}>Page on Freesound:</span>{' '}
            <a href={sound.freesoundUrl} target="_blank" rel="noreferrer">
              {sound.name}
            </a>
          </li>
        </ul>
        <p>{cleanDescription}</p>
      </div>
    </div>
  );
}
