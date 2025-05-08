import React from 'react';

type ButtonStyle = 1 | 2 | 3 | 4 | 6 | 'journey';

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
    1: 'rounded-md bg-blue-600 p-2 text-sm text-white border-1 cursor-pointer shadow-md hover:bg-white/80',
    2: 'font-bold cursor-pointer',
    3: `rounded-md bg-white/50 py-2 px-3 text-md text-black border-1 border-gray-500 cursor-pointer w-fit shadow-md hover:bg-white/80 leading-normal tracking-wide`,
    4: 'rounded-md bg-white/50 p-2 text-lg text-black border-1 border-gray-500 cursor-pointer w-fit shadow-md hover:bg-white/80',
    journey: 'text-xl cursor-pointer',
    6: 'text-white text-sm cursor-pointer underline hover:font-bold',
  };

  const finalClassName =
    `${buttonStyles[buttonStyle] || buttonStyles[1]} ${className}`.trim();

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
}
