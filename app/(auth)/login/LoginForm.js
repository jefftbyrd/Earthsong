'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import RegisterComponent from '../../components/RegisterComponent';
import { journeyContext } from '../../context/journeyContext';
import ErrorMessage from '../../ErrorMessage';
import styles from '../../styles/ui.module.scss';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const { togglePanel } = useContext(journeyContext);

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
            // setLoginOpen(!loginOpen);
            togglePanel();
          }}
        >
          𐛠
        </button>
        <div className={styles.loginPanel}>
          <p>
            Welcome to <span className={styles.heavy}>Earthsong.</span>
          </p>

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
          {aboutOpen && (
            <div className={styles.aboutEarthsong}>
              <h2>Thanks:</h2>
              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://github.com/saraelaela"
                    rel="noreferrer"
                  >
                    Sara El Abed
                  </a>
                  ,{' '}
                  <a
                    target="_blank"
                    href="https://github.com/antonkolo"
                    rel="noreferrer"
                  >
                    Anton Kolomoiets
                  </a>
                  (https://github.com/antonkolo) and{' '}
                  <a
                    target="_blank"
                    href="https://github.com/ProchaLu"
                    rel="noreferrer"
                  >
                    Lukas Prochazka
                  </a>{' '}
                  for technical and emotional support.
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.michaeljeffreylee.com/"
                    rel="noreferrer"
                  >
                    Michael Jeffrey Lee
                  </a>{' '}
                  for coming up with the name Earthsong, which is also the title
                  of a song from the forthcoming{' '}
                  <a
                    target="_blank"
                    href="https://budokanboys.club/"
                    rel="noreferrer"
                  >
                    Budokan Boys
                  </a>{' '}
                  album, THE OOZE.
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://decodingnature.nyuadim.com/author/ss14740/"
                    rel="noreferrer"
                  >
                    Sunny Sun
                  </a>
                  , who shared{' '}
                  <a
                    target="_blank"
                    href="https://editor.p5js.org/ss14740/sketches/z-cEmTUPD"
                    rel="noreferrer"
                  >
                    cloud sim
                  </a>{' '}
                  the p5 sketch that Earthsong's cloud overlay animation was
                  adapted from.
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://freesound.org/"
                    rel="noreferrer"
                  >
                    Freesound.org
                  </a>{' '}
                  and all who contribute to it.
                </li>
              </ul>
              <h3>
                Created and developed by{' '}
                <a
                  target="_blank"
                  href="https://github.com/jefftbyrd"
                  rel="noreferrer"
                >
                  Jeff T Byrd
                </a>
                .
              </h3>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
