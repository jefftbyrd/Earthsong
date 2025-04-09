import { motion } from 'motion/react';

interface TitleProps {
  className?: string;
}

export default function Title({ className }: TitleProps) {
  return (
    <motion.h1
      className={className}
      animate={{
        opacity: [0, 0, 1, 1, 0],
        transition: { duration: 6, times: [0, 0.6, 0.8, 0.9, 1] },
      }}
    >
      Earth Song
    </motion.h1>
  );
}
