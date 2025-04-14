export default function SoundNumber({ soundNumber = 1 }) {
  // Define all sound patterns
  const aegean = ['𐄇', '𐄈', '𐄉', '𐄊', '𐄋'];

  return (
    <div className="w-6 h-10 lg:w-14 lg:h-14 grid place-items-center origin-center text-black relative">
      <span
        className={`font-(family-name:--font-noto) text-7xl xl:text-9xl leading-none absolute ${
          soundNumber === 4 || soundNumber === 5 ? '-translate-y-2' : ''
        }`}
        style={{
          transformOrigin: '50% 45%', // Adjust these percentages to fine-tune the center
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
        }}
      >
        {aegean[soundNumber - 1]}
      </span>
    </div>
  );
}
