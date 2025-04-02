import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import HelpIcon from '../../public/HelpIcon';
import styles from '../styles/ui.module.scss';
import HelpPanel from './HelpPanel';

export default function HelpButton() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      {!helpOpen && (
        <motion.button
          className={styles.helpIcon}
          onClick={() => {
            setHelpOpen(!helpOpen);
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.3, 1],
            color: ['rgb(255, 0, 89)', 'rgb(181, 0, 78)', 'rgb(255, 0, 89)'],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          exit={{
            opacity: 0,
            transition: { duration: 1 },
          }}
          whileHover={{
            color: 'rgba(255, 0, 89, 1)',
          }}
        >
          <HelpIcon height="5.6vw" width="5.6vw" />
        </motion.button>
      )}

      <AnimatePresence>
        {helpOpen && (
          <motion.div
            animate={{
              opacity: [0, 1],
              transition: { duration: 1, times: [0, 1] },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 1 },
            }}
          >
            <HelpPanel setHelpOpen={setHelpOpen} helpOpen={helpOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
