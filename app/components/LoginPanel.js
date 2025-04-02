'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { journeyContext } from '../context/journeyContext';
import ErrorMessage from '../ErrorMessage';
import styles from '../styles/ui.module.scss';
import About from './About';
import RegisterComponent from './RegisterComponent';

export default function LoginPanel({ setLoginOpen, loginOpen }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);

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
            togglePanel();
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
