export function Button({ children }) {
  return (
    <button className="rounded-md bg-blue-600 p-2 text-sm text-white border-1">
      {children}
    </button>
  );
}

export function ButtonText({ children }) {
  return <button className="font-bold">{children}</button>;
}
