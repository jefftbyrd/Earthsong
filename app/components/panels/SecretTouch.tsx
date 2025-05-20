export default function SecretTouch() {
  return (
    <div className="flex flex-col gap-2">
      <div className="guideItem">
        <h4>Change playback speed</h4>
        <p className="">
          Grab the edges of a circle with two fingers and spin it.
        </p>
        <ul className="">
          <li>
            <span>Clockwise</span> Faster
          </li>
          <li>
            <span>Counter-clockwise</span> Slower
          </li>
          <li>
            <span>Double-tap</span> Reset Speed
          </li>
        </ul>
      </div>

      <div className="guideItem">
        <h4>Toggle playback direction</h4>
        <ul className="">
          <li className="">
            <span className="">Touch & hold for 1 second</span>
          </li>
        </ul>
      </div>

      <div className="guideItem">
        <h4>Change a sound's base volume</h4>
        <p className="">Touch and drag with 3 fingers.</p>
        <ul className="">
          <li>
            <span>Drag UP</span> Louder
          </li>
          <li>
            <span>Drag DOWN</span> Quieter
          </li>
        </ul>
      </div>
    </div>
  );
}
