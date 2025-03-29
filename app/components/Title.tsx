import { motion } from 'motion/react';
import styles from './ui.module.scss';

export default function Title() {
  return (
    <motion.h1
      className={styles.earthsong}
      animate={{
        opacity: [0, 0, 1, 1, 0],
        transition: { duration: 6, times: [0, 0.6, 0.8, 0.9, 1] },
      }}
    >
      Earth Song
    </motion.h1>
  );
}
