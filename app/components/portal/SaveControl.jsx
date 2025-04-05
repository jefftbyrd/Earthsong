// components/SaveControl.jsx
import { motion } from 'motion/react';
import React, { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { userContext } from '../../context/userContext';
import LoginToSaveButton from '../LoginToSaveButton';
import Save from '../Save';
import SaveButton from '../SaveButton';

export default function SaveControl({ soundsColor }) {
  const [saveIsOpen, setSaveIsOpen] = React.useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

  const { user } = useContext(userContext);
  const { panelId, panelOpen } = useContext(journeyContext);

  return (
    <>
      {user ? (
        <SaveButton
          setSaveIsOpen={setSaveIsOpen}
          saveIsOpen={saveIsOpen}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      ) : (
        <LoginToSaveButton />
      )}

      {panelOpen && panelId === 'savePanel' && (
        <Save
          sounds={soundsColor}
          setShowSuccessMessage={setShowSuccessMessage}
          showSuccessMessage={showSuccessMessage}
        />
      )}

      {showSuccessMessage && (
        <motion.h1
          className="successMessage"
          animate={{
            opacity: [0, 1, 0],
            transition: { duration: 3, times: [0, 0.5, 1] },
          }}
        >
          Your journey was saved!
        </motion.h1>
      )}
    </>
  );
}
