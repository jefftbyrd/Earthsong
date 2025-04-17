export default function EarthsongButton({
  buttonStyle = 1,
  children,
  ...props
}) {
  const buttonStyles = {
    1: 'rounded-md bg-blue-600 p-2 text-sm text-white border-1 cursor-pointer',
    2: 'font-bold cursor-pointer',
    journey: 'p-2 text-sm text-black text-xl cursor-pointer',
    remove:
      'font-bold bg-red-600 text-black p-1 rounded-md text-xs border-2 cursor-pointer',
  };

  const className = buttonStyles[buttonStyle] || buttonStyles[1]; // Default to style 1 if invalid style is passed

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
