import Logo from '../vector/Logo';
import PanelWrap from './PanelWrap';

export default function GuideAboutPanel() {
  return (
    <PanelWrap
      panel="About"
      heading="Earth Song"
      headingClassName="text-[#6AD7FF] opacity-100! text-7xl"
      className="bg-[#1c0929] text-white tracking-wide"
      panelTheme="dark"
    >
      <div className="panelMessage">Listen to the planet</div>
      <div className="w-full md:w-9/10 lg:w-4/5 mx-auto text-left p-0 md:px-0 md:py-3">
        <div className="flex flex-col gap-7">
          <div>
            <h2 className="text-3xl md:text-4xl mb-4 text-[#D589FF]">
              <span className="uppercase">Earth Song</span> is...
            </h2>
            <ul className="list-disc list-outside ml-5 flex flex-col gap-1">
              <li>a portal for exploring the sounds of other places</li>
              <li>a tool for sonic inspiration</li>
              <li>a surprising and unpredictable sonic adventure</li>
            </ul>
          </div>

          <h2 className="text-3xl md:text-4xl mb-0 text-[#D589FF]">
            What does it do?
          </h2>
          <div className="flex gap-1">
            <ul className="list-disc list-outside flex flex-col gap-1 tracking-wide ml-5">
              <li>Listen to sounds from anywhere on Earth</li>
              <li>
                Discover surprising interactions and harmonies between sounds
              </li>
              <li>
                Build your own soundscapes in{' '}
                <span className="earthSongName">EARTH SONG</span>'s interactive
                3-dimensional Sound Portal
              </li>
              <li>
                Mutate and transform sounds in real-time: reverse direction,
                change playback speed, "tune" sounds to each other
              </li>
            </ul>
          </div>

          <div className="mb-2">
            <h2 className="text-3xl md:text-4xl mb-4 text-[#D589FF]">
              How does it work?
            </h2>
            <ul className="list-disc list-outside flex flex-col gap-1 tracking-wide ml-5">
              <li>Choose a place to explore by selecting a point on the map</li>
              <li>
                EARTH SONG searches{' '}
                <a
                  href="https://freesound.org/"
                  className="underline hover:bg-white/50 hover:text-black hover:p-1 hover:rounded-lg transition-all duration-100"
                  target="_blank"
                  rel="noreferrer"
                >
                  freesound.org
                </a>{' '}
                - a massive collaborative database of user-contributed audio
                recordings - for sounds from that location
              </li>
              <li>
                5 sounds are selected at random and loaded into the{' '}
                <span className="earthSongName">EARTH SONG</span> Sound Portal,
                a sonic playground where you can audition, manipulate and mix
                sounds to create your own custom sound environment
              </li>
              <li>
                Registered users can save and recall their favorite journeys
              </li>
            </ul>
          </div>
        </div>

        <div className=" flex justify-start items-center mb-7 text-center mt-5">
          {/* eslint-disable-next-line react/iframe-missing-sandbox */}
          <iframe
            className="aspect-16/9 w-full"
            src="https://www.youtube.com/embed/8z_00In-8Ig?si=aUvXfk019PZrQk89"
            title="YouTube video player"
            frameBorder="0"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <h2 className="text-3xl md:text-4xl mb-4 text-[#D589FF]">Thanks!</h2>
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
            for the name <span className="earthSongName">EARTH SONG</span>,
            which is also a track from the forthcoming{' '}
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
            <a target="_blank" href="https://freesound.org/" rel="noreferrer">
              Freesound.org
            </a>{' '}
            and all who contribute to it.
          </li>
        </ul>

        <ul className="text-lg font-abordage tracking-wide mt-5 flex flex-col gap-2 w-auto text-center">
          <li className="guideItem">
            Concept & code by{' '}
            <a
              className="underline  hover:bg-white/50 hover:text-black hover:p-1 hover:rounded-lg transition-all uppercase duration-100"
              target="_blank"
              href="https://jefftbyrd.com"
              rel="noreferrer"
            >
              Jeff T Byrd
            </a>
          </li>
          <li className="guideItem">
            Visit{' '}
            <a
              href="https://github.com/jefftbyrd/Earthsong"
              target="_blank"
              rel="noreferrer"
              className="underline  hover:bg-white/50 hover:text-black hover:p-1 hover:rounded-lg transition-all duration-100"
            >
              <span className="earthSongName">EARTH SONG</span> on Github
            </a>
          </li>
        </ul>
      </div>
    </PanelWrap>
  );
}
