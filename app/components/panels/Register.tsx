import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import ErrorMessage from '../../ErrorMessage';
import EarthsongButton from '../EarthsongButton';

export default function Register() {
  const { togglePanel } = useContext(journeyContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Array<{ message: string }>>([]);

  const router = useRouter();

  interface RegisterResponse {
    errors?: Array<{ message: string }>;
    success?: boolean;
  }

  async function handleRegister(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const response = await fetch('api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: RegisterResponse = await response.json();

    if ('errors' in data) {
      setErrors(data.errors || []);
      return;
    }

    router.refresh();

    togglePanel();
  }

  return (
    <div className="grid gap-5 mt-4">
      <p className="">Create an account.</p>
      <form onSubmit={async (event) => await handleRegister(event)}>
        <label>
          <span>Username</span>
          <input
            autoCapitalize="off"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            autoCapitalize="off"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>

        <EarthsongButton type="submit" buttonStyle={3}>
          Register
        </EarthsongButton>

        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        ))}
      </form>
    </div>
  );
}
