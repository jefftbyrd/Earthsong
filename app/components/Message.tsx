import { motion } from 'motion/react';
import type { CSSProperties } from 'react';

interface MessageProps {
  text: string;
  isVisible: boolean;
  animationProps?: Record<string, any>;
  style?: CSSProperties;
  className?: string;
}

export default function Message({
  text,
  isVisible,
  animationProps,
  style,
  className,
}: MessageProps) {
  if (!isVisible) return null;

  return (
    <motion.h1
      className={`${className} message`}
      initial={{ opacity: 0 }}
      animate={{
        ...animationProps, // Allow custom animations
      }}
      style={style}
    >
      {text}
    </motion.h1>
  );
}
