export default function SecretKeyboard() {
  return (
    <div className="w-full">
      <p className="my-5 text-left">
        Manipulate sounds by hovering your cursor over a sound circle and using
        these keyboard commands:
      </p>
      <div className="flex flex-col gap-2 w-full">
        <div className="guideItem">
          <h4>
            Change <strong>playback speed</strong>
          </h4>
          <div className="w-full mx-auto flex gap-6">
            <div className="keyboardKey">
              <div className="">a</div>
              <p>Slower</p>
            </div>
            <div className="keyboardKey">
              <div className="">s</div>
              <p>Reset</p>
            </div>
            <div className="keyboardKey">
              <div className="">d</div>
              <p>Faster</p>
            </div>
          </div>
        </div>
        <div className="guideItem">
          <h4>
            Toggle <strong>playback direction</strong>
          </h4>
          <div className="w-full mx-auto flex">
            <div className="keyboardKey">
              <div className="">r</div>
            </div>
          </div>
        </div>
        <div className="guideItem">
          <h4>
            Change a sound's <strong>base volume</strong>
          </h4>
          <div className="w-full mx-auto flex gap-6">
            <div className="keyboardKey">
              <div className="">q</div>
              <p>Quieter</p>
            </div>
            <div className="keyboardKey">
              <div className="">w</div>
              <p>Reset</p>
            </div>
            <div className="keyboardKey">
              <div className="">e</div>
              <p>Louder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
