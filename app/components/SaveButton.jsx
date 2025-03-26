import styles from './portal.module.scss';

// interface SaveButtonProps {
//   setSaveIsOpen?: any;
//   saveIsOpen?: any;
//   setShowSuccessMessage?: any;
// }

export default function SaveButton({
  setSaveIsOpen,
  saveIsOpen,
  setShowSuccessMessage,
}) {
  return (
    <button
      className={styles.saveSnapshotButton}
      onClick={() => {
        setSaveIsOpen(!saveIsOpen);
        setShowSuccessMessage(false);
      }}
    >
      Save
    </button>
  );
}
