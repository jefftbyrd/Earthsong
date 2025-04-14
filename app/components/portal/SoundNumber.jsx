import { motion } from 'motion/react';

export default function SoundNumber({ soundNumber = 1 }) {
  // Define all sound patterns
  const aegean = ['𐄇', '𐄈', '𐄉', '𐄊', '𐄋'];

  // Only apply animation when isPlaying is true
  // const animationProps = isPlaying
  //   ? {
  //       animate: {
  //         rotate: [0, 360],
  //       },
  //       transition: {
  //         ease: 'linear',
  //         duration: 1.5,
  //         repeat: Infinity,
  //       },
  //     }
  //   : {};

  return (
    <div
      className="w-14 h-14 grid place-items-center origin-center text-black relative"
      // {...animationProps}
    >
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
