import React from 'react';

type ButtonStyle = 1 | 2 | 3 | 4 | 6 | 7 | 8 | 'journey';

interface EarthsongButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: ButtonStyle;
  children: React.ReactNode;
}

export default function EarthsongButton({
  buttonStyle = 1,
  className = '',
  children,
  ...props
}: EarthsongButtonProps) {
  const buttonStyles = {
    1: 'bg-blue-600 p-2 text-sm text-white border-1 cursor-pointer shadow-md hover:bg-white/80',
    2: 'font-bold cursor-pointer',
    3: `text-center flex items-center justify-center text-lg bg-black/50 p-3 text-white cursor-pointer w-fit justify-self-center shadow-md hover:bg-black/80 outline-1 outline-offset-2 outline-black/30 tracking-wider uppercase`,
    4: 'rounded-md bg-white/50 p-2 text-lg text-black border-1 border-gray-500 cursor-pointer w-fit shadow-md hover:bg-white/80',
    journey: 'text-xl cursor-pointer',
    6: 'text-white text-sm cursor-pointer underline hover:font-bold',
    7: `bg-white/60 py-2 px-3 text-black/90 hover:text-black/100 cursor-pointer w-fit shadow-md hover:bg-white/100 leading-normal tracking-wider outline-1 outline-offset-2 outline-white/30 uppercase text-lg`,
    8: `text-center flex items-center justify-center text-lg p-3 text-white cursor-pointer w-fit justify-self-center shadow-md hover:bg-white/100 hover:text-black outline-1 outline-offset-2 outline-black/30 tracking-wider`,
  };

  const finalClassName =
    `${buttonStyles[buttonStyle] || buttonStyles[1]} ${className}`.trim();

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
}
