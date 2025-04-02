import styles from '../styles/portal.module.scss';

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
