import { motion } from 'motion/react';
import { useContext, useEffect, useState } from 'react';
import Logo from '../../public/Logo';
import { journeyContext } from '../context/journeyContext';
import styles from '../styles/ui.module.scss';

export default function BackToMap() {
  const { setPhase } = useContext(journeyContext);
  const { setReset } = useContext(journeyContext);
  const [resetDone, setResetDone] = useState(false);

  useEffect(() => {
    if (resetDone) {
      setPhase('map');
    }
  }, [resetDone, setPhase]);

  return (
    <motion.button
      className={styles.backToMapIcon}
      onClick={() => {
        setReset(true);
        setTimeout(() => {
          setReset(false);
          setResetDone(true);
        }, 0);
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
      <Logo className="h-[6vw] w-[6vw]" />
    </motion.button>
  );
}
