'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useState } from 'react';
import LoginForm from '../(auth)/login/LoginForm';
import Star from '../../public/Star.js';
import StarInverted from '../../public/StarInverted';
import { journeyContext } from '../context/journeyContext';
import { userContext } from '../context/userContext';
import SnapshotForm from '../snapshots/SnapshotForm';
import styles from '../styles/ui.module.scss';
import LoginPanel from './LoginPanel';

export default function Profile() {
  const [profileOpen, setProfileOpen] = useState(false);
  const { phase, setPhase } = useContext(journeyContext);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user } = useContext(userContext);

  return user ? (
    <>
      <motion.button
        className={styles.userIcon}
        onClick={() => {
          setProfileOpen(!profileOpen);
        }}
        whileHover={{
          color: 'rgba(255, 0, 89, 1)',
        }}
      >
        <Star height="6vw" width="6vw" />
      </motion.button>

      {profileOpen ? (
        <SnapshotForm
          setProfileOpen={setProfileOpen}
          profileOpen={profileOpen}
        />
      ) : null}
    </>
  ) : (
    <>
      <motion.button
        className={styles.userIcon}
        onClick={() => {
          setLoginOpen(!loginOpen);
        }}
        whileHover={{
          color: 'rgba(255, 0, 89, 1)',
          rotate: 35,
        }}
      >
        <StarInverted height="6vw" width="6vw" />
      </motion.button>

      {loginOpen ? (
        <LoginPanel setLoginOpen={setLoginOpen} loginOpen={loginOpen} />
      ) : null}
    </>
  );
}
