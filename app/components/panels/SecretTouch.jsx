export default function SecretTouch() {
  return (
    <div className="flex flex-col gap-7 mt-7">
      <div className="border-b-1 border-black/30 ">
        <h4>Change playback speed</h4>
        <p className="text-lg">
          Grab opposite edges of a circle with two fingers and spin it.
        </p>
        <ul>
          <li>
            <span>Clockwise</span> faster
          </li>
          <li>
            <span>Counter-clockwise</span> slower
          </li>
          <li>
            <span>Double-tap</span> reset speed
          </li>
        </ul>
      </div>

      <div className="border-b-1 border-black/30 ">
        <h4>Toggle playback direction</h4>
        <ul>
          <li>
            <span>Touch & hold for 1 second</span> forward/reverse
          </li>
        </ul>
      </div>

      <div className="">
        <h4>Change a sound's base volume</h4>
        <p className="text-lg">Touch and drag with 3 fingers.</p>
        <ul>
          <li>
            <span>Drag UP</span> louder
          </li>
          <li>
            <span>Drag DOWN</span> quieter
          </li>
        </ul>
      </div>
    </div>
  );
}
