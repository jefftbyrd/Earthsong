import { motion } from 'motion/react';

export default function Message({ text, isVisible, animationProps, style }) {
  if (!isVisible) return null;

  return (
    <motion.h1
      className="message uppercase"
      initial={{ opacity: 0 }}
      animate={{
        // opacity: [0, 1, 0],
        ...animationProps, // Allow custom animations
      }}
      style={style}
    >
      {text}
    </motion.h1>
  );
}
