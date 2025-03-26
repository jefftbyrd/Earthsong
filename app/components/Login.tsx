'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import StarInverted from '../../public/StarInverted';
import LoginPanel from './LoginPanel';
import styles from './ui.module.scss';

export default function Login() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
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
