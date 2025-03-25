'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useEffect } from 'react';
import Logo from '../../public/Logo';
import playerBar from '../../public/playerBar.webp';
import Star from '../../public/Star';
import styles from './ui.module.scss';

export default function HelpPanel({ setHelpOpen, helpOpen }) {
  useEffect(() => {
    if (helpOpen) {
      document.body.addEventListener('click', () => {
        console.log('Click!');
        setHelpOpen(false);
      });
    }
  }, [helpOpen, setHelpOpen]);

  return (
    <div className={styles.helpOverlay}>
      <div className={styles.content}>
        <div className={styles.soundHelp}>
          <div>
            <h3>Start / stop ˆ</h3>
            <p>
              To start or stop a sound, click its name in the top bar or press{' '}
              <span>1</span>-<span>5</span> on your keyboard.
            </p>
          </div>

          <div>
            <h3>Learn more about a sound ˆ</h3>
            <p>
              Click the <span className={styles.infoSymbol}>𐛠</span> icon to
              open the sound info panel.
            </p>
          </div>
        </div>

        <h2>While hovering the cursor over a sound circle…</h2>
        <ul>
          <li>
            <h3>Change playback speed</h3>
            <ul className={styles.inner}>
              <li>
                Hold <span>d</span> to make a sound faster.
              </li>
              <li>
                Hold <span>a</span> to make a sound slower.
              </li>
              <li>
                Press <span>s</span> to return sound to its original speed.
              </li>
            </ul>
          </li>

          <li>
            <h3>Reverse</h3>
            <ul className={styles.inner}>
              <li>
                Press <span>r</span> to reverse a sound.
              </li>
            </ul>
          </li>

          <li>
            <h3>Volume trim</h3>
            <ul className={styles.inner}>
              <li>
                If a sound is much louder than the others, hold <span>q</span>{' '}
                to make it quieter.
              </li>
              <li>
                If a sound is much quieter than the others, hold <span>e</span>{' '}
                to make it louder.{' '}
              </li>
              <li>
                Press <span>w</span> to return sound to its original level.
              </li>
            </ul>
          </li>
        </ul>

        <div className={styles.navHelp}>
          <div className={styles.backToMapHelp}>
            <h3>‹ Return to map</h3>
          </div>
          <div className={styles.userHelp}>
            <h3>Open user panel ›</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
