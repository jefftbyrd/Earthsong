import { motion } from 'motion/react';
import { useContext } from 'react';
import Logo from '../../public/Logo.js';
import { journeyContext } from '../context/journeyContext';
import styles from '../styles/ui.module.scss';

export default function BackToMap({ setStartWind }) {
  const { setPhase } = useContext(journeyContext);
  const { setReset } = useContext(journeyContext);
  return (
    <motion.button
      className={styles.backToMapIcon}
      onClick={async () => {
        // await setResetPortal(true);
        // await setResetPortal(false);
        // setStartWind(true);
        // setEnterPortal(false);
        // setPortalRecall(false);
        await setReset(true);
        await setReset(false);
        await setPhase('map');
      }}
      animate={{
        opacity: [0, 0, 1],
        transition: { duration: 4, times: [0, 0.3, 1] },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 2 },
      }}
      whileHover={{
        color: 'rgba(255, 0, 89, 1)',
      }}
    >
      <Logo height="6vw" width="6vw" />
    </motion.button>
  );
}
