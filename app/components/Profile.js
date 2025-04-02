'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useState } from 'react';
// import LoginForm from '../(auth)/login/LoginForm';
import Star from '../../public/Star.js';
import StarInverted from '../../public/StarInverted';
import { journeyContext } from '../context/journeyContext';
import { userContext } from '../context/userContext';
import styles from '../styles/ui.module.scss';
import LoginPanel from './LoginPanel';
import ProfilePanel from './ProfilePanel';

export default function Profile() {
  const [profileOpen, setProfileOpen] = useState(false);
  // const { phase, setPhase } = useContext(journeyContext);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user } = useContext(userContext);
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
          // setLoginOpen(!loginOpen);
          // setPanelId('profilePanel');
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
