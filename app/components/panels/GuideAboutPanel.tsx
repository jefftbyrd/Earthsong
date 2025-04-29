import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
import PanelWrap from './PanelWrap';

export default function GuideAboutPanel() {
  const { panelOpen, togglePanel } = useContext(journeyContext);
  useEffect(() => {
    // Create handler function for document-level keyboard events
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && panelOpen) {
        togglePanel();
      }
    };

    // Add keyboard event listener to document
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [panelOpen, togglePanel]);

  return (
    <PanelWrap panel="About" bg="#5381C4">
      <div className="w-full md:w-2/3 mx-auto text-left p-5">
        <div className=" flex justify-start items-center mb-7 text-center">
          <iframe
            className="aspect-16/9 w-full"
            src="https://www.youtube.com/embed/8z_00In-8Ig?si=aUvXfk019PZrQk89"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <hr className="border-black/30 my-5" />
        <h2 className="text-2xl mb-3">Thanks</h2>
        <ul className="thanks-list">
          <li>
            <a
              className=""
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
            for the name <strong>EARTH SONG</strong>, which is also the title of
            a song from the forthcoming{' '}
            <a
              target="_blank"
              href="https://budokanboys.club/"
              rel="noreferrer"
            >
              Budokan Boys
            </a>{' '}
            album, <strong>THE OOZE</strong>.
          </li>

          <li>
            <a target="_blank" href="https://freesound.org/" rel="noreferrer">
              Freesound.org
            </a>{' '}
            and all who contribute to it.
          </li>
        </ul>
        <hr className="border-black/30 my-5" />
        <h3>
          Created and developed by{' '}
          <a
            className="text-white underline hover:bg-white/50 hover:text-black hover:p-1 hover:rounded-lg transition-all"
            target="_blank"
            href="https://jefftbyrd.com"
            rel="noreferrer"
          >
            Jeff T Byrd
          </a>
          . Visit{' '}
          <a
            href="https://github.com/jefftbyrd/Earthsong"
            target="_blank"
            rel="noreferrer"
            className="text-white underline hover:bg-white/50 hover:text-black hover:p-1 hover:rounded-lg transition-all"
          >
            <span className="font-bold uppercase ">Earth Song</span> on Github
          </a>
        </h3>
      </div>
    </PanelWrap>
  );
}
