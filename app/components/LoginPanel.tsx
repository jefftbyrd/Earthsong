'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState } from 'react';
import ErrorMessage from '../ErrorMessage';
import About from './About';
import RegisterComponent from './RegisterComponent';
import styles from './ui.module.scss';

interface LoginPanelProps {
  setLoginOpen: (open: boolean) => void;
  loginOpen: boolean;
}

interface Error {
  message: string;
}

interface LoginResponse {
  errors?: Error[];
}

export default function LoginPanel({
  setLoginOpen,
  loginOpen,
}: LoginPanelProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponse = await response.json();

    if (data.errors) {
      setErrors(data.errors);
      return;
    }

    router.refresh();
  }

  return (
    <AnimatePresence>
      <motion.div
        className={styles.uiModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <button
          className="closeButtonAlt"
          onClick={() => {
            setLoginOpen(!loginOpen);
          }}
        >
          𐛠
        </button>
        <div className={styles.loginPanel}>
          <h3>
            Welcome to <span className={styles.heavy}>Earthsong.</span>
          </h3>

          {!registerOpen ? (
            <div className={styles.loginPath}>
              <h1>Login</h1>
              <form onSubmit={async (event) => await handleLogin(event)}>
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
                    // autoFocus={true}
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                </label>

                <button className={styles.uiButton}>login</button>

                {errors.map((error) => (
                  <div className="error" key={`error-${error.message}`}>
                    <ErrorMessage>{error.message}</ErrorMessage>
                  </div>
                ))}

                <p>
                  If you don't have an account, you should{' '}
                  <button
                    className={styles.textButton}
                    onClick={() => {
                      setRegisterOpen(!registerOpen);
                    }}
                  >
                    register
                  </button>
                  . Registered users can save their journeys and return to them
                  later.
                </p>
              </form>
            </div>
          ) : (
            <RegisterComponent
              setRegisterOpen={setRegisterOpen}
              registerOpen={registerOpen}
            />
          )}
          <button
            className={styles.textButton}
            onClick={() => {
              setAboutOpen(!aboutOpen);
            }}
          >
            About Earthsong
          </button>
          {aboutOpen && <About />}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
