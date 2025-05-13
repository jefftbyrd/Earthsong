import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { soundsContext } from '../../context/soundsContext';
import EarthsongButton from '../EarthsongButton';
import PanelWrap from './PanelWrap';

export default function SavePanel() {
  const { togglePanel, triggerJourneySaved } = useContext(journeyContext);
  const { soundsColor } = useContext(soundsContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');

  const router = useRouter();

  return (
    <PanelWrap panel="Save" className="bg-[rgb(255,0,89)]" panelTheme="light">
      <div>
        <h3 className="panelMessage mb-5!">
          Save this journey so you can revisit it later.
        </h3>
        <form
          className="text-left flex flex-col gap-5"
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              const response = await fetch('/api/snapshots', {
                method: 'POST',
                body: JSON.stringify({
                  title,
                  sounds: soundsColor.sounds,
                  location: soundsColor.location,
                  pin: soundsColor.pin,
                }),
              });

              setErrorMessage('');

              let responseBody;
              try {
                responseBody = await response.json();
              } catch (parseError) {
                console.error('Failed to parse response:', parseError);
                setErrorMessage('Server returned an invalid response');
                return;
              }

              if (!response.ok) {
                setErrorMessage(
                  responseBody.error || 'Failed to save snapshot',
                );
                return;
              }

              setTitle('');
              await triggerJourneySaved();
              await togglePanel();
              router.refresh();
            } catch (error) {
              console.error('Error saving snapshot:', error);
              setErrorMessage('Failed to save snapshot. Please try again.');
            }
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
          {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
        </form>
      </div>
    </PanelWrap>
  );
}
