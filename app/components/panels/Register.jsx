import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import ErrorMessage from '../../ErrorMessage';
import styles from '../../styles/ui.module.scss';

export default function Register() {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  async function handleRegister(event) {
    event.preventDefault();

    const response = await fetch('api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    // router.push(`/profile/${data.user.username}`);

    // This is not a secure returnTo
    // if (props.returnTo) {
    //   console.log('Checks Return to: ', props.returnTo);
    //   router.push(props.returnTo || `/profile/${data.user.username}`);
    // }

    // router.push(
    //   getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    // );

    router.refresh();

    // setPanelId('Powers');
    togglePanel();
  }

  return (
    <div className="grid gap-5">
      <p className="text-xl">Create an account</p>
      <form onSubmit={async (event) => await handleRegister(event)}>
        <label>
          Username
          <input
            autoFocus={true}
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>

        <button>register</button>

        {/* <p>
          Already have an account? Then you should{' '}
          <button
            className={styles.textButton}
            onClick={() => {
              props.setRegisterOpen(!props.registerOpen);
            }}
          >
            login
          </button>
          .
        </p> */}

        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        ))}
      </form>
    </div>
  );
}
