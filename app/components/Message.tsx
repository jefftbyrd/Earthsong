import { motion } from 'motion/react';
import type React from 'react';
import type { CSSProperties } from 'react';

interface MessageProps {
  text?: React.ReactNode;
  isVisible: boolean;
  animationProps?: Record<string, any>;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export default function Message({
  text,
  isVisible,
  animationProps,
  style,
  className,
  children,
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
      {children ?? text}
    </motion.h1>
  );
}
