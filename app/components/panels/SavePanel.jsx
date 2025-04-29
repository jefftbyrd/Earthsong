import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { soundsContext } from '../../context/soundsContext';
import EarthsongButton from '../EarthsongButton';
import PanelWrap from './PanelWrap';

export default function SummonPanel() {
  const { togglePanel, triggerJourneySaved } = useContext(journeyContext);
  const { soundsColor, setSoundsColor } = useContext(soundsContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [sounds, setSounds] = useState(soundsColor);

  const router = useRouter();

  return (
    <PanelWrap panel="Save" bg="#C45353">
      <div>
        <h3 className="text-xl mb-5">
          Save this journey so you can revisit it later.
        </h3>
        <form
          className="text-left flex flex-col gap-5"
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
          <label>
            <p className="">Give this journey a name:</p>
            <input
              autoCapitalize="off"
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
            />
          </label>

          <EarthsongButton buttonStyle={3} type="submit">
            Save
          </EarthsongButton>
        </form>
      </div>
    </PanelWrap>
  );
}
