'use client';
import { motion } from 'motion/react';
import { useContext } from 'react';
import { journeyContext } from '../context/journeyContext';
import { userContext } from '../context/userContext';
import styles from '../styles/ui.module.scss';
import LoginPanel from './LoginPanel';
import ProfilePanel from './ProfilePanel';
import Star from './vector/Star';
import StarInverted from './vector/StarInverted';

export default function Profile() {
  const { user } = useContext(userContext) || {};
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);

  return user ? (
    <>
      <motion.button
        className={styles.userIcon}
        onClick={() => {
          // setProfileOpen(!profileOpen);
          setPanelId('profilePanel');
          togglePanel();
        }}
        whileHover={{
          color: 'rgba(255, 0, 89, 1)',
        }}
      >
        <Star height="6vw" width="6vw" />
      </motion.button>

      {panelOpen && panelId === 'profilePanel' ? <ProfilePanel /> : null}
    </>
  ) : (
    <>
      <motion.button
        className={styles.userIcon}
        onClick={() => {
          setPanelId('profilePanel');
          togglePanel();
        }}
        whileHover={{
          color: 'rgba(255, 0, 89, 1)',
          rotate: 35,
        }}
      >
        <StarInverted height="6vw" width="6vw" />
      </motion.button>

      {panelOpen && panelId === 'profilePanel' ? <LoginPanel /> : null}
    </>
  );
}
