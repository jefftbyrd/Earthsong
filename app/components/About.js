import styles from './ui.module.scss';

export default function About({}) {
  return (
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
          </a>{' '}
          and{' '}
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
          for coming up with the name Earthsong, which is also the title of a
          song from the forthcoming{' '}
          <a target="_blank" href="https://budokanboys.club/" rel="noreferrer">
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
          the p5 sketch that Earthsong's cloud overlay animation was adapted
          from.
        </li>
        <li>
          <a target="_blank" href="https://freesound.org/" rel="noreferrer">
            Freesound.org
          </a>{' '}
          and all who contribute to it.
        </li>
      </ul>
      <h3>
        Created and developed by{' '}
        <a target="_blank" href="https://github.com/jefftbyrd" rel="noreferrer">
          Jeff T Byrd
        </a>
        .
      </h3>
    </div>
  );
}
