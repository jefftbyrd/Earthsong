import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import ErrorMessage from '../../ErrorMessage';
import EarthsongButton from '../EarthsongButton';

export default function Login() {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [registerOpen, setRegisterOpen] = useState(false);
  // const { togglePanel } = useContext(journeyContext);

  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();

    const response = await fetch('api/login', {
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

    router.refresh();
    togglePanel();
  }

  return (
    <>
      <p className="text-xl">Please sign in.</p>

      <form onSubmit={handleLogin}>
        <label>
          Name
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            // id="username"
            // type="text"
            placeholder="identify yourself"
            autoCapitalize="off"
            // autoFocus={true}
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>

        <label>
          Password
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            // id="password"
            // type="password"
            // placeholder="******************"
            // autoFocus={true}
            autoCapitalize="off"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>

        <EarthsongButton type="submit" buttonStyle={1}>
          sign in
        </EarthsongButton>

        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        ))}
      </form>

      {/* <p>
        If you don't have an account, you should{' '}
        <ButtonText
          className=""
          onClick={() => {
            setRegisterOpen(!registerOpen);
          }}
        >
          register
        </ButtonText>
        . Registered users can save their journeys and return to them later.
      </p> */}
    </>
  );
}
