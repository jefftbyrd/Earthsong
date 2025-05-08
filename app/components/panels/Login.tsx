import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import ErrorMessage from '../../ErrorMessage';
import EarthsongButton from '../EarthsongButton';

interface ErrorObj {
  message: string;
}

export default function Login() {
  const { togglePanel } = useContext(journeyContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ErrorObj[]>([]);

  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
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
      <h3 className="font-abordage">Please sign in.</h3>

      <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
        <label>
          <span className="font-bold tracking-wide">Username</span>
          <input
            placeholder="Identify yourself"
            autoCapitalize="off"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>

        <label>
          <span className=" font-bold tracking-wide">Password</span>
          <input
            autoCapitalize="off"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>

        <EarthsongButton type="submit" buttonStyle={3}>
          Sign in
        </EarthsongButton>

        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        ))}
      </form>
    </>
  );
}
