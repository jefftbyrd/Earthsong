type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  formAction?: any; // If you still want to support this
  // className?: string;
};

type ButtonTextProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  formAction?: any; // If you still want to support this
  // className?: string;
};

export const Button = ({
  children,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      className="rounded-md bg-blue-600 p-2 text-sm text-white border-1"
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonText = ({
  children,
  type = 'button',
  ...props
}: ButtonTextProps) => {
  return (
    <button className="font-bold" type={type} {...props}>
      {children}
    </button>
  );
};
