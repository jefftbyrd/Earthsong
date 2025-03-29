import styles from './portal.module.scss';

// interface SaveButtonProps {
//   setSaveIsOpen?: any;
//   saveIsOpen?: any;
//   setShowSuccessMessage?: any;
// }

type Props = {
  setSaveIsOpen: (value: boolean) => void;
  saveIsOpen: boolean;
  setShowSuccessMessage: (value: boolean) => void;
};

export default function SaveButton({
  setSaveIsOpen,
  saveIsOpen,
  setShowSuccessMessage,
}: Props) {
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
