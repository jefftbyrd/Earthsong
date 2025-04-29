import { motion } from 'motion/react';
import type { CSSProperties } from 'react';

interface MessageProps {
  text: string;
  isVisible: boolean;
  animationProps?: Record<string, any>;
  style?: CSSProperties;
}

export default function Message({
  text,
  isVisible,
  animationProps,
  style,
}: MessageProps) {
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
