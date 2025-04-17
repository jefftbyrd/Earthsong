import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { soundsContext } from '../../context/soundsContext';
import { userContext } from '../../context/userContext';
import ErrorMessage from '../../ErrorMessage';
import styles from '../../styles/ui.module.scss';
import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';
import EarthsongButton from '../EarthsongButton';

export default function SummonPanel() {
  const { togglePanel, triggerJourneySaved } = useContext(journeyContext);
  const { user, snapshots } = useContext(userContext);
  const { soundsColor, setSoundsColor } = useContext(soundsContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [sounds, setSounds] = useState(soundsColor);

  const router = useRouter();

  return (
    <PanelWrap panel="Save" bg="#C45353">
      <div>
        <h3 className="text-xl">
          Save this journey so you can revisit it later.
        </h3>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const response = await fetch('/api/snapshots', {
              method: 'POST',
              body: JSON.stringify({
                title,
                sounds,
              }),
            });

            setErrorMessage('');

            if (!response.ok) {
              const responseBody = await response.json();

              if ('error' in responseBody) {
                // TODO: Use toast instead of showing
                // this below creation / update form
                setErrorMessage(responseBody.error);
                return;
              }
            }

            setTitle('');
            await triggerJourneySaved();
            await togglePanel();
            router.refresh();
          }}
        >
          <div className={styles.journey}>
            <label>
              <h3>Give your journey a name:</h3>
              <input
                // autoFocus={true}
                autoCapitalize="off"
                className="bg-blue-600"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
              />
            </label>
          </div>
          <EarthsongButton buttonStyle={3} type="submit">
            Save
          </EarthsongButton>
        </form>
      </div>
    </PanelWrap>
  );
}
