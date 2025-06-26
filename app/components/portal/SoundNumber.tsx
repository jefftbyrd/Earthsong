export default function SoundNumber({ soundNumber = 1 }) {
  const aegean = ['𐄇', '𐄈', '𐄉', '𐄊', '𐄋'];

  return (
    <div className="flex items-center justify-center origin-center relative leading-0 ">
      <span
        className={`soundNumber font-(family-name:--font-noto) text-7xl lg:text-8xl xl:text-9xl leading-none text-black  ${
          soundNumber === 4 || soundNumber === 5
            ? '-translate-y-2 lg:-translate-y-4'
            : ''
        }`}
      >
        {aegean[soundNumber - 1]}
      </span>
    </div>
  );
}
