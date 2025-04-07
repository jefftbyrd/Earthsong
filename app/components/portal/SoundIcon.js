import { motion } from 'motion/react';

export default function SoundIcon({ height, width, soundNumber = 1 }) {
  // Define all sound patterns
  const soundPatterns = {
    1: <rect x="11" y="11" width="7" height="7" fill="currentColor" />,
    2: (
      <>
        <rect x="11" y="6" width="7" height="7" fill="black" />
        <rect x="11" y="16" width="7" height="7" fill="black" />
      </>
    ),
    3: (
      <>
        <rect x="11" y="1" width="7" height="7" fill="black" />
        <rect x="11" y="11" width="7" height="7" fill="black" />
        <rect x="11" y="21" width="7" height="7" fill="black" />
      </>
    ),
    4: (
      <>
        <rect x="16" y="6" width="7" height="7" fill="black" />
        <rect x="16" y="16" width="7" height="7" fill="black" />
        <rect x="6" y="6" width="7" height="7" fill="black" />
        <rect x="6" y="16" width="7" height="7" fill="black" />
      </>
    ),
    5: (
      <>
        <rect x="6" y="1" width="7" height="7" fill="currentColor" />
        <rect x="16" y="6" width="7" height="7" fill="currentColor" />
        <rect x="16" y="16" width="7" height="7" fill="currentColor" />
        <rect x="6" y="11" width="7" height="7" fill="currentColor" />
        <rect x="6" y="21" width="7" height="7" fill="currentColor" />
      </>
    ),
    // Add more soundNumbers as needed
  };

  return (
    <motion.div
      className="origin-center text-center col-span-3"
      style={{ height, width }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        ease: 'linear',
        duration: 1.5,
        repeat: Infinity,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 29 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-black"
      >
        {soundPatterns[soundNumber]}
      </svg>
    </motion.div>
  );
}

// You can also export animated soundNumbers directly
export function AnimatedSound1(props) {
  return <SoundIcon {...props} soundNumber={1} />;
}

export function AnimatedSound5(props) {
  return <SoundIcon {...props} soundNumber={5} />;
}
