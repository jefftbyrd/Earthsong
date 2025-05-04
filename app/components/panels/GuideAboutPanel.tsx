import Logo from '../vector/Logo';
import PanelWrap from './PanelWrap';

export default function GuideAboutPanel() {
  return (
    <PanelWrap panel="Earth Song" className="bg-[#5381C4]">
      <h3 className="text-xl mb-2">Listen to the planet</h3>
      <Logo className="w-40 text-black/30 drop-shadow-xl/30 md:hidden" />
      <div className="w-full md:w-2/3 mx-auto text-left p-5 ">
        <div className="flex flex-col gap-7">
          <div>
            <h2 className="text-3xl mb-4">
              <span className="uppercase">Earth Song</span> is...
            </h2>
            <ul className="list-disc list-outside ml-5 text-xl flex flex-col gap-1">
              <li>a vehicle for sonic teleportation.</li>
              <li>a game of chance.</li>
              <li>a tool for sonic inspiration.</li>
              <li>an adventure, a surprise — totally unpredictable!</li>
            </ul>
          </div>
          <hr className="border-black/30 my-5" />
          <h2 className="text-3xl mb-0">What does it do?</h2>
          <div className="flex gap-5">
            <Logo className="w-[50vw] text-black/30 drop-shadow-xl/30 hidden md:block" />
            <ul className="list-disc list-outside text-xl flex flex-col gap-1 tracking-wide ml-5">
              <li>Generate spontaneous sound collages.</li>
              <li>
                Build your own soundscapes in Earthsong's interactive 3D spatial
                sound player.
              </li>
              <li>
                Discover surprising interactions and harmonies between sounds
                that were never meant to be heard together.
              </li>
              <li>
                Mutate and transform sounds in real-time: reverse direction,
                change playback speed. “Tune” sounds to each other.
              </li>
            </ul>
          </div>
          <hr className="border-black/30 my-5" />
          <div className="mb-2">
            <h2 className="text-3xl mb-4">How does it work?</h2>
            <p className="text-lg leading-8">
              Choose a place to explore by selecting a point on the map. Sifting
              through{' '}
              <a
                href="https://freesound.org/"
                className="text-white  hover:bg-white/50 hover:text-black hover:p-1 hover:rounded-lg transition-all duration-100"
                target="_blank"
                rel="noreferrer"
              >
                freesound.org's
              </a>{' '}
              vast database of user-contributed sound recordings,{' '}
              <span className="uppercase">Earth song</span> locates audio
              material from the chosen point and, through a chance operation,
              extracts just 5 sounds, which are loaded into the 3-dimensional
              spatial sound player. The{' '}
              <span className="uppercase">Earth song</span> Sound Portal is a
              sonic playground where you can audition, manipulate and mix sounds
              to create your own custom sound environment. Registered users can
              save and recall their favorite journeys.
            </p>
          </div>
        </div>
        <hr className="border-black/30 my-5" />
        <h2 className="text-3xl mb-6 mt-10">Explainer video:</h2>
        <div className=" flex justify-start items-center mb-7 text-center">
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
        <hr className="border-black/30 my-5" />
        <h2 className="text-3xl mb-3">Thanks!</h2>
        <ul className="thanks-list text-lg ">
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
            for the name EARTH SONG, which is also the title of a song from the
            forthcoming{' '}
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
        <hr className="border-black/30 my-5" />
        <h3 className="text-lg mb-2">
          Created and developed by{' '}
          <a
            className="text-white  hover:bg-white/50 hover:text-black hover:p-1 hover:rounded-lg transition-all uppercase duration-100"
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
            className="text-white  hover:bg-white/50 hover:text-black hover:p-1 hover:rounded-lg transition-all duration-100"
          >
            <span className="uppercase ">Earth Song</span> on Github
          </a>
          .
        </h3>
      </div>
    </PanelWrap>
  );
}
