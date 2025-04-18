export default function EarthsongButton({
  buttonStyle = 1,
  children,
  ...props
}) {
  const buttonStyles = {
    1: 'rounded-md bg-blue-600 p-2 text-sm text-white border-1 cursor-pointer shadow-md hover:bg-white/80',
    2: 'font-bold cursor-pointer',
    3: 'rounded-md bg-white/50 p-2 text-md text-black border-1 border-gray-500 cursor-pointer w-fit shadow-md hover:bg-white/80',
    4: 'rounded-md bg-white/50 p-2 text-lg text-black border-1 border-gray-500 cursor-pointer w-fit shadow-md hover:bg-white/80',
    journey: 'text-xl cursor-pointer',
    6: 'text-white text-sm cursor-pointer underline hover:font-bold',
  };

  const className = buttonStyles[buttonStyle] || buttonStyles[1]; // Default to style 1 if invalid style is passed

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
